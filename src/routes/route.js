const express = require("express")
const userController = require("../controllers/userController")
const Router = express.Router()
const mid = require("../Middleware/Auth")
const productController = require('../controllers/productController')
const orderController = require('../controllers/orderController')


Router.post("/register", userController.createUsers)
Router.post("/login", userController.userLogin)
Router.get("/user/:userId", mid.jwtValidation, mid.authorization, userController.getUserById)
Router.put("/user/:userId", mid.jwtValidation, mid.authorization, userController.updateUser)


Router.post("/createProduct", productController.createProduct)

Router.post("/users/:userId", mid.jwtValidation, mid.authorization, orderController.createOrder)
Router.put("/users/:userId/order", mid.jwtValidation, mid.authorization, orderController.updateOrder)



Router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct or Not!"
    })
})

module.exports = Router