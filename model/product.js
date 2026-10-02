const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
    productID: {
        type: String,
        required: true
    },

    productName: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: ['Electronics', 'Stationery'],
        required: true
    },

    price: {
        type: Number,
        min: 0,
        required: true
    },

    stock: {
        type: Number,
        min: 0,
        required: true
    },

    supplierCity: {
        type: String,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    }
});

const product = mongoose.model("Product", productSchema, "products");

module.exports = product