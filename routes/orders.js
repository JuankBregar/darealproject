//Dependencies
const express = require('express');
const controller = require('../controllers/orders');

const app = express();

//Routes
app.get('/', controller.get);
app.post('/add_to_cart', controller.add_to_cart);

module.exports = app;