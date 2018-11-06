const mongoose = require('mongoose');
const Operation = require('../models/operation');
const Verbose = require('../json/verboses.json');

exports.buy = ({ name, quantity, acquisition_price, tranport_price_per_unit, sell_price, IVA, final_price }) => {
    if (quantity != 0) {
        const operation = new Operation({
            _id: mongoose.Types.ObjectId(),
            verbose: Verbose.buy,
            purchase_amount: (Number(quantity) * (Number(acquisition_price) + Number(tranport_price_per_unit))).toFixed(2),
            detail: {
                name: name,
                quantity: quantity,
                acquisition_price: acquisition_price,
                transport_price_per_unit: tranport_price_per_unit,
                sell_price: sell_price,
                IVA: IVA,
                final_price: final_price
            },
            date: new Date().toISOString(),
            description: `${Verbose.buy}-${name}/${quantity} UNIDADES`
        })
        operation.save()
            .then(result => {
                return result.description;
            })
            .catch(err => {
                return err;
            })
    }
}