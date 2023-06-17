const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")
require('dotenv').config();

const Razorpay = require('razorpay');
var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})

// const createPayment = async (createdOrder) => {
//     try {
//         let order = await instance.orders.create(createdOrder)
//         console.log(order)

//         var orderId = createdOrder._id;
//         $(document).ready(function () {
//             var settings = {
//                 "url": "/create/orderId",
//                 "method": "POST",
//                 "timeout": 0,
//                 "headers": {
//                     "Content-Type": "application/json"
//                 },
//                 "data": order,
//             };

//             //creates new orderId everytime
//             $.ajax(settings).done(function (response) {

//                 orderId = response.orderId;
//                 console.log(orderId);
//                 $("button").show();
//             });
//         });

//     } catch (error) {
//         console.log(error.message);
//     }
// }


// let createPayment = async function (createdOrder) {
//     console.log(createdOrder)

//     let order = await instance.orders.create({ createdOrder })
//     console.log(order)

//     var orderId = createdOrder._id;
//     $(document).ready(function () {
//         var settings = {
//             "url": "/create/orderId",
//             "method": "POST",
//             "timeout": 0,
//             "headers": {
//                 "Content-Type": "application/json"
//             },
//             "data": JSON.stringify({
//                 "amount": "50000"
//             }),
//         };

//         //creates new orderId everytime
//         $.ajax(settings).done(function (response) {

//             orderId = response.orderId;
//             console.log(orderId);
//             $("button").show();
//         });
//     });

// }



const createOrder = async function (req, res) {
    try {
        let data = req.body
        let userId = req.params.userId

        let { productId, quantity } = data

        let getProduct = await productModel.findOne({ _id: productId })
        if (!getProduct) {
            return res.status(400).send({
                status: false,
                message: 'product not found with this productId'
            })
        }
        data = {
            userId: userId,
            items: [{
                productId: productId
            }],
            totalPrice: getProduct.price,
        }

        if (quantity) {
            data.items[0].quantity = quantity
            data.totalPrice = getProduct.price * quantity
        }

        let createdOrder = await orderModel.create(data)

        instance.orders.create(createdOrder, (err, order) => {
            if (err) {
                console.error(err);
                return res.status(500).send('An error occurred');
            } else {
                console.log(order);
                return res.status(201).send({
                    data: order
                });
            }
        });

        // return res.status(201).send({
        //     status: true,
        //     message: 'order created',
        //     data: createdOrder
        // })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}


const updateOrder = async function (req, res) {
    try {

        let userId = req.params.userId
        let data = req.body

        let { orderId, status } = data

        if (!orderId) {
            return res.status(400).send({
                status: false,
                message: "Order Id is required field please give it"
            })
        }
        if (!status) {
            return res.status(400).send({
                status: false,
                message: "please give status delevered or cancelled"
            })
        }

        if (!["pending", "completed", "cancelled"].includes(status)) {
            return res.status(400).send({
                status: false,
                message: "Status should be only ['completed','cancelled']"
            })
        }

        let dbOrder = await orderModel.findOne({ _id: orderId, userId: userId })

        if (!dbOrder) {
            return res.status(400).send({
                status: false,
                message: "order is not present"
            })
        }

        if (dbOrder.cancellable = false) {
            return res.status(400).send({
                status: false,
                message: "you can't cancelled this order"
            })
        }

        if (dbOrder.status == "completed") {
            await orderModel.findOneAndUpdate({ userId: userId }, { items: [], totalPrice: 0 })
            return res.status(400).send({
                status: false,
                message: "order already completed"
            })
        }
        if (dbOrder.status == "cancelled") {
            await orderModel.findOneAndUpdate({ userId: userId }, { items: [], totalPrice: 0 })
            return res.status(400).send({
                status: false,
                message: "order already cancelled"
            })
        }

        if (status == "cancelled") {
            let belongToUser = await orderModel.findOneAndUpdate({ _id: orderId },
                { status: status }, { new: true }).select({ "items._id": 0 })

            return res.status(200).send({ status: true, message: "Success", data: belongToUser })

        }

        if (status == "completed") {
            let belongToUser = await orderModel.findOneAndUpdate({ _id: orderId },
                { items: [], totalPrice: 0, status: status }, { new: true }).select({ "items._id": 0 })

            return res.status(200).send({ status: true, message: "Success", data: belongToUser })
        }

    } catch (err) {
        return res.status(500).send({
            status: false,
            error: err.message
        })
    }
}

module.exports = {
    createOrder,
    updateOrder
}