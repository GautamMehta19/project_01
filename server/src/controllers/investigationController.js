const investigationModel = require('../models/investigationModel')


const createInvestigation = async function(req, res){
    try{

        let data = req.body
        let {patientId, investigation, visitedDay} = data

        let createdInvestigation = await investigationModel.create(data)
        return res.status(201).send({
            status: true,
            message: 'successfully Investigation created',
            data: createdInvestigation
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            error: err.message
        })
    }
}


const getInvestigation = async function(req, res){
    try{

        let patientId = req.params.patientId

        // let getPatient = await investigationModel.find({patientId : patientId}).populate('patientId')
        let getPatient = await investigationModel.find({patientId : patientId})
        return res.status(201).send({
            status: true,
            message: 'successfully Investigation created',
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


const updateInvestigation = async function(req, res){
    try{

        let data = req.body
        let investigationId = req.params.investigationId

        let editedData = await investigationModel.findByIdAndUpdate({ _id: investigationId }, {$set :data}, { new: true, upsert: true })
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


module.exports = {createInvestigation, getInvestigation, updateInvestigation}