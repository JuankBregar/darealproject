exports.get = (req, res, next) => {
    const data = {
        labels: [
            { name: 'inicio', url: 'localhost:3000/' },
            { name: 'productos' }
        ]
    }
    res.render('product_index', data);
}

exports.add = (req, res, next) => {
    const data = {
        labels: [
            { name: 'inicio', url: 'localhost:3000/' },
            { name: 'productos', url: 'localhost:3000/products' },
            { name: 'añadir' }
        ],
        assets: ['assets/js/product.js']
    }
    res.render('product_add', data);
}