//Dependencies
const express = require('express');
const controller = require('../controllers/orders');

const app = express();

//Routes
app.get('/', controller.get);

module.exports = app;