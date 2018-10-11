//Dependencies
const express = require('express');
const controller = require('../controllers/products');

const app = express();

//Routes
app.get('/', controller.get);
app.get('/add', controller.add);

module.exports = app;