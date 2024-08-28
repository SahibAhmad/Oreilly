const Product = require('../models/product');



exports.getAddProduct = (req,res,next)=> {

    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add product </button> </form>');

    // res.sendFile(path.join(__dirname,'../','views','add-product.html'));
    // res.sendFile(path.join(rootDir,'views','add-product.html'))
    res.render('add-product', {pageTitle:'Add product',
         path:'/admin/add-product',
         docTitle:'Add Product',
         activeProducts: true,
         
        });
}
exports.postAddProduct = (req,res,next)=> {
    // console.log(req.body);
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}


exports.getProducts = (req,res,next)=>{
   
    // res.send('<h1> Hello from  expressjs </h1>');
    // console.log(path.join(__dirname,'../','views','shop.html'));

    Product.fetchAll((products)=>{
        
        console.log(products);
   
        res.render('shop',{
                products:products ,
                docTitle: 'Shop',
                path:'/',
                hasProducts: products.length>0,
                activeShop: true,
                productCSS: true,
            }); //.pug files to be rendered provided functionality by express
        // res.sendFile(path.join(rootDir,'views','shop.html'));
        });
    
}