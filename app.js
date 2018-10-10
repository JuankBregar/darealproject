//Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');

//Init express
const app = express();

//Morgan logger
app.use(morgan('dev'));

//View engine
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layout',
    partialsDir: __dirname + '/views/layout',
    helpers: require('./assets/js/hbsHelpers').helpers,
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Mongo connection
mongoose.connect('mongodb://' +
    process.env.MONGO_USER + ':' +
    process.env.MONGO_PW + '@127.0.0.1:27017/' +
    process.env.MONGO_DB)

//Parsing request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
const indexRoute = require('./routes/index');
app.use('/', indexRoute);
const accountRoute = require('./routes/accounts');
app.use('/accounts', accountRoute);
//Static dir
app.use('/assets', express.static(__dirname + '/assets'));

//Export
module.exports = app;