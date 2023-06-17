const mongoose = require('mongoose')
var Schema = mongoose.Schema

let productSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        trim: true
    },
})

module.exports = mongoose.model('product', productSchema)