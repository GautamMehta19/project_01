const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

    userId: {
        type: ObjectId,
        ref: "user",
        // required: true
    },

    items: [{
        productId: {
            type: ObjectId,
            ref: "product",
            // required: true
        },

        quantity: {
            type: Number,
            // required: true,
            default: 1
        }
    }],

    cancellable: {
        type: Boolean,
        default: true
    },

    status: {
        type: String,
        default: "pending",
        enum: ["pending", "completed", "cancelled"]
    },

    totalPrice: {
        type: Number,
        // required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("order", orderSchema);