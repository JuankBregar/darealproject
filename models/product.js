//Dependencies
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    quantity: { type: Number, required: true },
    actual_quantity: { type: Number, required: true },
    acquisition_price: { type: Number },
    tranport_price_per_unit: { type: Number },
    sell_price: { type: Number },
    IVA: { type: Number },
    final_price: { type: Number },
    material: { type: String, required: true },
    sub_products: [mongoose.Schema.Types.ObjectId],
    created: { type: String, required: false, default: new Date().toISOString() }, //auto
    lastUpdate: { type: String, required: true, default: new Date().toISOString() }, //auto
    image: { type: String }
});

module.exports = mongoose.model('Product', productSchema);