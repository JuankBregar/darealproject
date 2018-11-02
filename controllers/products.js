const mongoose = require('mongoose');
const Product = require('../models/product');

exports.get = (req, res, next) => {
    //Find those product who have childs
    Product.find({ sub_products: { $exists: true, $ne: [] } })
        .select('name type material quantity sell_price')
        .exec()
        .then(products => {
            const data = {
                labels: [
                    { name: 'inicio', url: '/' },
                    { name: 'productos' }
                ],
                assets: ['assets/vendor/dataTables/jquery.dataTables.min.js',
                    'assets/vendor/dataTables/dataTables.bootstrap4.min.js',
                    'assets/js/product.js'
                ],
                styles: ['assets/vendor/dataTables/dataTables.bootstrap4.min.css'],
                products: products
            }
            res.render('product_index', data);
        })
        .catch(err => {
            res.send(err);
        })
}

exports.add_view = (req, res, next) => {
    const data = {
        labels: [
            { name: 'inicio', url: '/' },
            { name: 'productos', url: '/products' },
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
            name: `${req.body.name}-${val.name}`,
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
            image: req.file ? req.file.path : ''

        })
        the_product.save()
            .then(result => {
                res.redirect('/products');
            })
            .catch(err => {
                res.send(err);
            });
    })
}

exports.getByName = (req, res, next) => {
    const path = req.path.split('/').filter(Boolean);
    const name = req.params.name;
    Product.findOne({ name: name })
        .populate('sub_products', 'name quantity')
        .exec()
        .then(product => {
            const data = {
                labels: [
                    { name: 'inicio', url: '/' },
                    { name: 'productos', url: '/products' },
                    { name: product.name }
                ],
                assets: ['assets/js/product.js', 'assets/js/swal.js'],
                product: product,
                deblocked: path.includes('add') && path.includes(name),
            }
            res.render('product_add', data);
        })
        .catch(err => {
            res.send(err);
        })
}

//Updates a product inventory
exports.add_inventory = (req, res, next) => {
    /**
     * TODO: add a new subproduct
     * use findOneAndUpdate({},{},upsert:true)
     * then return result._id
     */
    const objects = decompose(req.body);
    //Collect update promisses
    let promisses = objects.map(element => {
        let { name, quantity, ...update } = element;
        //Update the prices field and increase the quantity
        return Product
            .findOneAndUpdate({ name: name }, { $set: update, $inc: { quantity: quantity } })
            .exec()
            .then(result => { return result })
    });

    Promise
        .all(promisses)
        .then(result => {
            /**
             * To add new sub objects
             * update the parent object subobject fields with result
             */
            res.redirect('/products');
        })
        .catch(err => {
            res.send(err);
        })

}

decompose = (body) => {
    let update = {
        acquisition_price: body.acquisition_price,
        tranport_price_per_unit: body.tranport_price_per_unit,
        sell_price: body.sell_price,
        IVA: body.IVA,
        final_price: body.final_price
    }
    let master = JSON.parse(body.sub_objects).map(val => {
        return {...update, name: val.name, quantity: val.cantidad }
    })
    master.push({...update, name: body.name, quantity: body.quantity });
    return master;

}