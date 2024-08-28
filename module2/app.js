
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');

const errorController = require('./controllers/error')

const { engine } = require('express-handlebars')

const app = express();

// app.set('view engine','pug'); // with express it is possible 
// app.engine('hbs', engine()); // register name handle bars
// app.set('view engine', 'hbs');
app.set('view engine','ejs');

app.set('views','views'); //location of those templates

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public'))); // static access to public folder



app.use('/admin',adminRoutes);
app.use(shopRoutes);



// If no route matches following will match  
// also be carefull about get and use, use matches starting only and can match to multiple middlewares
// which start by it, while get is precise and has to match entirely

app.use('/', errorController.get404);

app.listen(3000);