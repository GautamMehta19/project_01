const express = require('express')
const Router = express.Router()
const patientController = require('../controllers/patientController')
const investigationController = require('../controllers/investigationController')
const pController = require('../controllers/pController')

Router.post('/register', patientController.createPatient)
Router.get('/getAllPatient', patientController.fetchpatient)
Router.get('/getPatientById/:patientId', patientController.fetchpatientById)
Router.put('/edit/:patientId', patientController.editPatient)
Router.delete('/delete/:patientId', patientController.deletePatient)



Router.post('/createInvestigation', investigationController.createInvestigation)
Router.get('/get/:patientId', investigationController.getInvestigation)
Router.put('/update/:investigationId', investigationController.updateInvestigation)



Router.post('/create', pController.createP)
Router.get('/getByDay/:pId',pController.getInvestigationByDay)
Router.put('/updateVisit/:pId', pController.updateVisit)


module.exports = Router