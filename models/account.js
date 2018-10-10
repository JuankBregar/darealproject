//Dependencies
const mongoose = require('mongoose');
/**
 * Define the structure of an account 
 */

//Schema
//TODO: Change owner for a ref to user
const accountSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    created: { type: String, required: false, default: new Date().toISOString() },
    lastUpdate: { type: String, required: true, default: new Date().toISOString() },
    child: { type: Boolean }
    //owner: { type: String, required: true }
});

module.exports = mongoose.model('Account', accountSchema);

//TODO: Add models to manage inventories