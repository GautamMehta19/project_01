const userModel = require("../models/userModel")
const aws = require("../util/aws")
const jwt = require("jsonwebtoken")
const valid = require("../validations/validation")


const createUsers = async function (req, res) {
    try {

        let data = req.body

        let { fname, lname, email, password, address } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create user"
            })
        }

        if (!valid.isValid(fname)) {
            return res.status(400).send({
                status: false,
                message: "fname field is mandatory"
            })
        }

        if (!lname) {
            return res.status(400).send({
                status: false,
                msg: "lname field is mandatory"
            });
        }

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

        // let files = req.files
        // if (!files || files.length == 0) return res.status(400).send({
        //     status: false, message: "user image is required and also insert user Image"
        // })

        // let profileImage = await aws.uploadFile(files[0])
        // data.profileImage = profileImage

        if (!address) {
            return res.status(400).send({
                status: false,
                msg: "address field is mandatory"
            });
        }

        if (address == "") return res.status(400).send({ status: false, message: "Don't leave address Empty" })
        if (address) {

            if (!address || Object.keys(address).length === 0) {
                return res.status(400).send({ status: false, message: "Please enter address and it should be in object!!" })
            }

            let addresss = JSON.parse(address)

            const { shipping, billing } = addresss

            if (!shipping) {
                return res.status(400).send({
                    status: false,
                    msg: "shipping field is mandatory"
                });
            }

            if (shipping) {
                const { street, city, pincode } = shipping

                if (!street) {
                    return res.status(400).send({
                        status: false,
                        msg: "street field is mandatory"
                    });
                }
                if (shipping.street) {
                    data["addresss.shipping.street"] = street
                }

                if (!city) {
                    return res.status(400).send({
                        status: false,
                        msg: "city field is mandatory"
                    });
                }
                if (shipping.city) {
                    data["addresss.shipping.city"] = city
                }

                if (!pincode) {
                    return res.status(400).send({
                        status: false,
                        msg: "pincode field is mandatory..."
                    });
                }
                if (shipping.pincode) {
                    data["addresss.shipping.pincode"] = pincode
                }
            }

            if (!billing) {
                return res.status(400).send({
                    status: false,
                    msg: "billing field is mandatory..."
                });
            }
            if (billing) {
                const { street, city, pincode } = billing

                if (!street) {
                    return res.status(400).send({
                        status: false,
                        msg: "street field is mandatory..."
                    });
                }
                if (billing.street) {
                    data["addresss.billing.street"] = street
                }

                if (!city) {
                    return res.status(400).send({
                        status: false,
                        msg: "city field is mandatory..."
                    });
                }
                if (billing.city) {
                    data["addresss.billing.city"] = city
                }

                if (!pincode) {
                    return res.status(400).send({
                        status: false,
                        msg: "pincode field is mandatory..."
                    });
                }
                if (billing.pincode) {
                    data["addresss.billing.pincode"] = pincode
                }
            }
            data["address"] = addresss
        }

        const userCreated = await userModel.create(data)

        return res.status(201).send({
            status: true,
            message: "User created successfully",
            data: userCreated
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
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
        }, "rozerpay",)

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


const getUserById = async function (req, res) {
    try {

        let userId = req.params.userId
        let getUser = await userModel.findById({ _id: userId })
        if (!getUser) {
            return res.status(404).send({
                status: false,
                message: "no data found with this userid"
            })
        }

        return res.status(200).send({
            status: true,
            message: "User profile details",
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

const updateUser = async function (req, res) {
    try {
        let userId = req.params.userId.trim()
        let data = req.body

        data = JSON.parse(JSON.stringify(data))

        let { fname, lname, email, password, address } = data

        let obj = {};

        if (Object.keys(data).length == 0 && !req.files) {
            return res.status(400).send({
                status: false,
                msg: "For updating please put atleast one key"
            })
        }

        if (fname) {
            obj["fname"] = fname
        }

        if (lname) {
            obj["fname"] = lname

        }

        if (email) {
            obj["email"] = email
        }

        if (password) {
            obj["password"] = password
        }

        // let files = req.files
        // if (data.hasOwnProperty("profileImage")) {
        //     if (!files || files.length == 0)
        //         return res.status(400).send({
        //             status: false, message: "please insert profile image"
        //         })
        // }
        // if (files.length != 0) {
        //     let profileImage = await aws.uploadFile(files[0])
        //     obj["profileImage"] = profileImage
        // }

        

        if (address == "") return res.status(400).send({ status: false, message: "Don't leave address Empty" })
        if (data.address) {

            if (!address || Object.keys(address).length === 0) {
                return res.status(400).send({ status: false, message: "Please enter address and it should be in object!!" })
            }

            let addresss = JSON.parse(address)

            const { shipping, billing } = addresss

            if (address.shipping) {

                const { street, city, pincode } = shipping

                if (shipping.street) {
                    if (!street) {
                        return res.status(400).send({ 
                            status: false, 
                            message: "street is not valid" 
                        })
                    }
                    obj["addresss.shipping.street"] = street
                }
                if (shipping.city) {
                    if (!city) return res.status(400).send({ 
                        status: false, 
                        message: "city is not valid" 
                    })
                    obj["addresss.shipping.city"] = city
                }
                if (shipping.pincode) {
                    if (!pincode) return res.status(400).send({ 
                        status: false, 
                        message: "pincode is not valid" 
                    })
                    obj["addresss.shipping.pincode"] = pincode
                }
            }

            if (addresss.billing) {

                const { street, city, pincode } = billing

                if (billing.street) {
                    if (!street) return res.status(400).send({ 
                        status: false, 
                        message: "street is not valid" 
                    })
                    obj["addresss.billing.street"] = street
                }
                if (billing.city) {
                    if (!city) return res.status(400).send({ 
                        status: false, 
                        message: "city is not valid" 
                    })
                    obj["addresss.billing.city"] = city
                }
                if (billing.pincode) {
                    if (!pincode) return res.status(400).send({ 
                        status: false, 
                        message: "shipping pincode is not valid" 
                    })
                    obj["addresss.billing.pincode"] = pincode
                }
            }
            obj["address"] = addresss
        }

        let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { $set: obj }, { new: true })
        if (!updatedUser) {
            return res.status(404).send({
                status: false,
                message: "no data found with this userid"
            })
        }
        return res.status(200).send({ status: true, message: "User profile updated", data: updatedUser })
    } catch (Err) {
        return res.status(500).send({
            status: false,
            msg: Err.message
        })
    }
}


module.exports = {
    createUsers,
    userLogin,
    getUserById,
    updateUser
}
