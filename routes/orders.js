//Dependencies
const express = require('express');
const controller = require('../controllers/orders');

const app = express();

//Routes
app.get('/', controller.get);
app.post('/add_to_cart', controller.add_to_cart);
app.get('/shopping-cart', controller.shopping_cart);
app.get('/remove-from-cart/:name', controller.remove_from_sc);
app.get('/finish', controller.finish);
module.exports = app;