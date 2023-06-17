const productModel = require('../models/productModel')

const createProduct = async function (req, res){
    try {

        let data = req.body
        let { title, description, price } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should be not Empty "
            })
        }

        if(!title) {
            return res.status(400).send({ 
                status: false, 
                message: "title is mandatory" 
            })
        }
        let checkTitle = await productModel.findOne({ title: title })
        if (checkTitle) {
            return res.status(400).send({
                status: false,
                message: "title is already present in the DB"
            })
        }

        if(!description) {
            return res.status(400).send({ 
                status: false, 
                message: "title is mandatory" 
            })
        }
        
        if(!price) {
            return res.status(400).send({ 
                status: false, 
                message: "title is mandatory" 
            })
        }

        let createdProduct = await productModel.create(data)
        return res.status(201).send({
            status : true,
            message : "product created",
            data : createdProduct
        })

    }
    catch(err){
        return res.status(500).send({
            status : false,
             message : err.message
        })
    }
}

module.exports = {
    createProduct
}