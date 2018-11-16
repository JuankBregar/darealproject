//Dependencies
const mongoose = require('mongoose');
const Order = require('../models/order');
const Cart = require('../models/cart');
const Products = require('../controllers/products');

exports.get = (req, res, next) => {
    const data = {
        labels: [
            { name: 'inicio', url: '/' },
            { name: 'ventas' },
        ],
        assets: ['assets/js/swal.js', 'assets/js/orders.js'],
    }

    product = Promise.resolve(Products.get_aviables());
    product
        .then(products => {
            data.products = products;
            res.render('orders/order_index', data);
        })
        .catch(err => {
            res.send(err);
        });
}

exports.add_to_cart = (req, res, next) => {
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    Promise.resolve(Products.getByNamePromise(req.body.name))
        .then(product => {
            cart.add(product, req.body.quantity);
            req.session.cart = cart;
            res.redirect('/ventas');
        })
        .catch(err => {
            res.send(err);
        })
}