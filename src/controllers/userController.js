const tambolaModel = require("../models/tambolaModel")
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createUsers = async function (req, res) {
    try {

        let data = req.body

        let { email, password } = data

        if (!email) {
            return res.status(400).send({
                status: false,
                msg: "email field is mandatory"
            });
        }

        let checkEmail = await userModel.findOne({ email: email })
        if (checkEmail) {
            return res.status(400).send({
                status: false,
                message: "Email is already exist in the DB"
            })
        }

        if (!password) {
            return res.status(400).send({
                status: false,
                msg: "password field is mandatory"
            });
        }

        const userCreated = await userModel.create(data)

        return res.status(201).send({
            status: true,
            message: "User created successfully",
            data: userCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}



const userLogin = async function (req, res) {
    try {
        let data = req.body
        let { email, password } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "login credentials must be presents & only email and password should be inside body"
            })
        }

        if (!email) {
            return res.status(400).send({
                status: false,
                message: "email is required"
            })
        }

        if (!password) {
            return res.status(400).send({
                status: false,
                message: "password is required"
            })
        }

        let user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(400).send({
                status: false,
                msg: "please check your email"
            })
        }

        let token = jwt.sign({
            userId: user._id,
            iat: new Date().getTime(),
            exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60
        }, "tambola_project",

        )

        return res.status(200).send({
            status: true,
            msg: "User login successfull",
            data: { userId: user._id, token: token }
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}


let createTambola = async function (req, res) {
    try {

        let userId = req.params.userId
        let obj = {}

        if(!userId){
            return res.status(400).send({
                status: false,
                message: "userId is required in params"
            })
        }
        obj.userId  = userId

        let max = 19
        let min = 10
        let random = function (min, max) {
            return Math.floor(Math.random() * (max - min)) + min
        }

        let randomIndex = function () {
            return Math.floor(Math.random() * (4 - 1))
        }

        let matrix = [];
        for (let i = 0; i < 3; i++) {
            matrix[i] = [];


            // for (let j = 0; j < 9; j++) {
            //     let value = random(min, max)
            //     let value2 = randomIndex()
            //     if (value >= 10 && value < 20) {
            //         if (value2 == 0) {
            //             matrix[i][value2] = value
            //         }
            //         // matrix[i][0] = undefined
            //         if (value2 == 1) {
            //             matrix[i][value2] = value
            //         }
            //         // matrix[i][1] = undefined
            //         if (value2 == 2) {
            //             matrix[i][value2] = value
            //         }
            //         // matrix[i][2] = undefined
            //     }
            // }

            for (let j = 0; j < 9; j++) {
                let value = random(min, max)
                let value2 = randomIndex()
                if (value >= 1 && value < 10) {
                    matrix[value2][0] = value
                }
                if (value >= 10 && value < 20) {
                    matrix[i][j] = value
                }
                if (value >= 20 && value < 30) {
                    matrix[value2][2] = value
                }
                if (value >= 30 && value < 40) {
                    matrix[value2][3] = value
                }
                if (value >= 40 && value < 50) {
                    matrix[value2][4] = value
                }
                if (value >= 50 && value < 60) {
                    matrix[value2][5] = value
                }
                if (value >= 60 && value < 70) {
                    matrix[value2][6] = value
                }
                if (value >= 70 && value < 80) {
                    matrix[value2][7] = value
                }
                if (value >= 80 && value < 90) {
                    matrix[value2][8] = value
                }
            }
        }
        obj.matrix = matrix

        let created = await tambolaModel.create(obj)

        return res.status(201).send({
            status: true,
            data: created
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}


const getTambolaById = async function (req, res) {
    try {

        let userId = req.params.userId

        let getUser = await tambolaModel.find({userId : userId}).populate('userId', {_id : 1})
        if (!getUser) {
            return res.status(404).send({
                status: false,
                message: "no data found with this userid"
            })
        }
        return res.status(201).send({
            status: true,
            data: getUser
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

module.exports = { createUsers, userLogin, createTambola, getTambolaById }