const patientModel = require('../models/patientModel')
const aws = require('aws-sdk')


const createPatient = async function (req, res) {
    try {

        let data = req.body
        console.log(data)

        let files = req.files
        console.log(files)
        if (!files || files.length == 0) return res.status(400).send({
            status: false, message: "product image is required and also insert product Image"
        })
        let patientImage = await uploadFile(files[0])
        data.patientImage = patientImage

        let createdResta = await patientModel.create(data)
        return res.status(201).send({
            status: true,
            message: 'Restaurant successfully created',
            data: createdResta
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}



aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    // "AKIAY3L35MCRZNIRGT6N",
    // "AKIAY3L35MCRVFM24Q7U",
    secretAccessKey: "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",
    // "9f+YFBVcSjZWM6DG9R4TUN8k8TGe4X+lXmO4jPiU",
    // "qGG1HE0qRixcW1T1Wg1bv+08tQrIkFVyDFqSft4J",
    region: "ap-south-1"
})


let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        let s3 = new aws.S3({ apiVersion: '2006-03-01' })

        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "projectGroup44/" + file.originalname,
            Body: file.buffer
        }

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            console.log("file uploaded succesfully")
            return resolve(data.Location)
        })
    })
}


const fetchpatient = async function (req, res) {
    try {
        let getPatient = await patientModel.find()
        return res.status(201).send({
            status: true,
            message: 'Patient Details',
            data: getPatient
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            error: err.message
        })
    }
}



const fetchpatientById = async function (req, res) {
    try {
        let patientId = req.params.patientId
        let getPatient = await patientModel.findById({ _id: patientId })
        return res.status(201).send({
            status: true,
            message: 'Patient Details',
            data: getPatient
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            error: err.message
        })
    }
}




const editPatient = async function (req, res) {
    try {
        let data = req.body
        let patientId = req.params.patientId
        data = JSON.parse(JSON.stringify(data))

        let obj = {}        
        let { investigation } = data

        let getData = await patientModel.findById({ _id: patientId })

        let item = getData.investigation
        item.push(investigation)
        console.log(item)
        obj.investigation = item

        let editedData = await patientModel.findByIdAndUpdate({ _id: patientId }, {$set :obj}, { new: true, upsert: true })
        console.log(editedData)
        return res.status(201).send({
            status: true,
            message: 'patient successfully edited',
            data: editedData
        })
    } 
    catch (err) {
        return res.status(500).send({
            status: false,
            error: err.message
        })
    }
}




const deletePatient = async function (req, res) {
    try {
        let patientId = req.params.patientId
        await patientModel.findByIdAndRemove({ _id: patientId })
        return res.status(201).send({
            status: true,
            message: 'patient successfully deleted',
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            error: err.message
        })
    }
}


module.exports = { createPatient, fetchpatient, fetchpatientById, editPatient, deletePatient }