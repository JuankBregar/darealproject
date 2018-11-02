//Dependencies
const mongoose = require('mongoose');
/**
 * Define the structure to describe
 * an operation over an account or an inventory
 */

//Schema
//TODO: Change owner for a ref to user
//TODO: Define a list a allowed verboses
//TODO: This will change to fit inventory operations to
const operationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    verbose: { type: String, required: true },
    purchase_amount: { type: Number, required: true, default: 0 },
    detail: {
        name: { type: String },
        quantity: { type: Number },
        acquisition_price: { type: Number },
        transport_price_per_unit: { type: Number },
        sell_price: { type: Number },
        IVA: { type: Number },
        final_price: { type: Number }
    },
    date: { type: String, required: true, default: new Date().toISOString() },
    description: { type: String },
    //owner: { type: String, required: true },
    //account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true }
});

module.exports = mongoose.model('Operation', operationSchema);