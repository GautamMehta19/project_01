const express = require("express")
const userController = require("../controllers/userController")
const Router = express.Router()
const mid = require("../middleware/auth")



Router.post("/register", userController.createUsers)

Router.post("/login", userController.userLogin);

Router.post("/createTambola/:userId", mid.jwtValidation,mid.authorization, userController.createTambola);
Router.get("/createTambola/:userId", mid.jwtValidation,mid.authorization, userController.getTambolaById);

module.exports = Router