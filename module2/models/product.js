const fs = require('fs');
const path = require('path');
 const p = path.join(process.cwd(), 'data', 'products.json');

const getProductsFromFile = (callback) => {
    

        fs.readFile(p, (err, fileContent) => {
            if (err) {
                // Handle the error, or pass an empty array to the callback
                callback([]);
            } else {
                // Pass the parsed content to the callback
                callback(JSON.parse(fileContent));
            }
        });
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile((products)=>{
            products.push(this); //make sure to use arrow funcitons to make sure this refers to class (is binded)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });



    }

    static fetchAll(callback) {
        // Makes sure we can call it on class
        getProductsFromFile(callback);
    }
}
