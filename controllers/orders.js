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
            console.log(products);
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

exports.shopping_cart = (req, res, next) => {
    const data = {
        labels: [
            { name: 'inicio', url: '/' },
            { name: 'ventas', url: '/ventas' },
            { name: 'canasta' }
        ]
    }
    res.render('orders/shopping_cart', data);
}

exports.remove_from_sc = (req, res, next) => {
    const name = req.params.name;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.remove(name);
    req.session.cart = cart;
    res.redirect('/ventas/shopping-cart');
}

exports.finish = (req, res, next) => {
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    let products = cart.toArray();
    /**First update product */
    let promises = products.map(val => Products.updateAfterSell(val));

    Promise.all(promises).then(result => {

    }).catch();
    /**Then save operation */
}