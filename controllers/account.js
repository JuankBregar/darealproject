//Dependencies
const mongoose = require('mongoose');
const Account = require('../models/account');

exports.add = (req, res, next) => {
    const data = {
        title: "Nueva Cuenta",
        labels: [
            { name: 'Cuentas', url: 'localhost:3000/accounts' },
            { name: 'Añadir' }
        ]
    }
    res.render('accounts/add', data);
}

exports.save = (req, res, next) => {
    const account = new Account({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        amount: req.body.amount,
        created: new Date().toISOString(),
        lastUpdate: new Date().toDateString(),
        child: req.body.hasParent ? true : false,
    });
    res.send(account);
    account.save()
        .then(result => {
            /**
             * Redirect to /accounts/{name}
             */
            res.send(result);
        })
        .catch(err => {
            /**
             * Handle errors
             */
            res.send(err)
        });
}