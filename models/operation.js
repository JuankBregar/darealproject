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
    amount: { type: Number, required: true, default: 0 },
    //quantity: {type:Number},
    date: { type: String, required: true, default: new Date().toISOString() },
    description: { type: string },
    owner: { type: String, required: true },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true }
});