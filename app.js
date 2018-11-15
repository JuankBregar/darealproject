//Dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const validator = require('express-validator');
const mongoStore = require('connect-mongo')(session);
const { isLoggedin } = require('./config/middlewares');

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

require('./config/passport');

//Parsing request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
//Use express sessions
app.use(session({
    secret: 'test123',
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 120 * 60 * 100 } //Dos horas
}));
//Use flash to store messages on session
app.use(flash());
//Init passport for handle users operation
app.use(passport.initialize());
//Enable passport to use sessions
app.use(passport.session());

//Static dir
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));

/**
 * Create global variables to use in views
 */

app.use((req, res, next) => {
    //res.locals.allowed = 'Define middle ware that retrieves allowed menus'
    res.locals.session = req.session;
    next();
})

//Routes
/**
 * Enable this routes after finishing inventory features.
 */

// const accountRoute = require('./routes/accounts');
// app.use('/accounts', accountRoute);
const productRoute = require('./routes/products');
app.use('/products', isLoggedin, productRoute);
const orderRoute = require('./routes/orders');
app.use('/ventas', isLoggedin, orderRoute);
const userRoute = require('./routes/users');
app.use('/users', userRoute);

//Index
const indexRoute = require('./routes/index');
app.use('/', isLoggedin, indexRoute);

//Export
module.exports = app;