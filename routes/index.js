//Dependencies
const express = require('express');
const controller = require('../controllers/index');

//Init express
const app = express();

//Routes
app.get('/', controller.home);

module.exports = app;