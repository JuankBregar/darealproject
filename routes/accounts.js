//Depedencies
const express = require('express');
const controller = require('../controllers/account');

//Init express
const app = express();

app.get('/add', controller.add);
app.post('/add', controller.save);

module.exports = app;