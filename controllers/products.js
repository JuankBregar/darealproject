const mongoose = require('mongoose');
const Product = require('../models/product');

exports.get = (req, res, next) => {
    const data = {
        labels: [
            { name: 'inicio', url: 'localhost:3000/' },
            { name: 'productos' }
        ]
    }
    res.render('product_index', data);
}

exports.add_view = (req, res, next) => {
    const data = {
        labels: [
            { name: 'inicio', url: 'localhost:3000/' },
            { name: 'productos', url: 'localhost:3000/products' },
            { name: 'añadir' }
        ],
        assets: ['assets/js/product.js', 'assets/js/swal.js']
    }
    res.render('product_add', data);
}

exports.add = (req, res, next) => {
    //First save the sub objects
    promises = JSON.parse(req.body.sub_objects).map(val => {
        const product = new Product({
            _id: mongoose.Types.ObjectId(),
            name: val.name,
            type: req.body.type,
            quantity: val.cantidad,
            actual_quantity: val.cantidad,
            acquisition_price: req.body.acquisition_price,
            tranport_price_per_unit: req.body.tranport_price_per_unit,
            sell_price: req.body.sell_price,
            IVA: req.body.IVA,
            final_price: req.body.final_price,
            material: req.body.material,
            created: new Date().toISOString(), //auto
            lastUpdate: new Date().toISOString(), //auto
            image: req.file.path
        });
        return product.save()
            .then(result => {
                return result._id;
            })
            .catch(err => {
                res.send(err);
            })
    });
    //Save the product
    Promise.all(promises).then(result => {
        const the_product = new Product({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            type: req.body.type,
            quantity: req.body.quantity,
            actual_quantity: req.body.quantity,
            acquisition_price: req.body.acquisition_price,
            tranport_price_per_unit: req.body.tranport_price_per_unit,
            sell_price: req.body.sell_price,
            IVA: req.body.IVA,
            final_price: req.body.final_price,
            material: req.body.material,
            sub_products: result,
            created: new Date().toISOString(), //auto
            lastUpdate: new Date().toISOString(), //auto
            image: req.file.path

        })
        the_product.save()
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            });
    })
}