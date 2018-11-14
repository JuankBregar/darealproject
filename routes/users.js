//Dependencies
const express = require('express');
const controller = require('../controllers/users');
const csrf = require('csurf');
const { isLoggedin, notLoggedin } = require('../config/middlewares');

//init express and csurf
const app = express();
const csrfProt = csrf();

app.use(csrfProt);

app.get('/singup', isLoggedin, controller.singup);
app.post('/singup', isLoggedin, controller.register);
app.get('/logout', controller.logout);
app.get('/login', notLoggedin, controller.login);
app.post('/login', notLoggedin, controller.loggingin);

module.exports = app;