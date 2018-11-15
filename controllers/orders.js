//Dependencies
const mongoose = require('mongoose');
const Order = require('../models/order');
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