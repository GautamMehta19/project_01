const pModel = require('../models/pModel')
const valid = require('../validations/valid')

const createP = async function (req, res) {
    try {
        let data = req.body

        let { UHID, fName, mName, lName, age, gender, title, weight, address, mobile, email, dob, patientImage, visited, visitedDay, investigation, visitedDate } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create user"
            })
        }
 

        if (!valid.isValid(UHID)) {
            return res.status(400).send({ 
                status: false, 
                message: "UHID field is mandatory" 
            })
        }


        if (!valid.isValid(fName)) {
            return res.status(400).send({ 
                status: false, 
                message: `first name field is mandatory` 
            })
        }

        if (!valid.nameValidationRegex(fName)) {
            return res.status(400).send({
                status: false,
                message: `first name contain only alphabets`
            })
        }

        if (!valid.isValid(lName)) {
            return res.status(400).send({ 
                status: false, 
                message: `last name field is mandatory` 
            })
        }

        if (!valid.nameValidationRegex(lName)) {
            return res.status(400).send({
                status: false,
                message: `last name contain only alphabets`
            })
        }

        if (title != "Mr" && title != "Mrs" && title != "Miss") {
            return res.status(400).send({
                status: false,
                message: "Title can only be Mr Mrs or Miss"
            })
        }

        if (gender != "Male" && gender != "Female" ) {
            return res.status(400).send({
                status: false,
                message: "gender can only be Male or Female"
            })
        }

        if (isNaN(age)) {
            return res.status(400).send({ 
                status: false, 
                message: `age must be a number` 
            })
        }

        if (isNaN(weight)) {
            return res.status(400).send({ 
                status: false, 
                message: `weight must be a number` 
            })
        }


        let checkmobile = await pModel.findOne({ mobile: mobile })
        if (checkmobile) {
            return res.status(400).send({
                status: false,
                message: "mobile is already exist in the DB"
            })
        }

        if (!valid.phoneValidationRegex(mobile)) {
            return res.status(400).send({
                status: false,
                message: "Please Enter valid mobile No. which is starts from 6,7,8,9"
            })
        }

        if (!valid.isValid(address)) {
            return res.status(400).send({ 
                status: false, 
                message: `address field is mandatory` 
            })
        }


        let checkEmail = await pModel.findOne({ email: email })
        if (checkEmail) {
            return res.status(400).send({
                status: false,
                message: "Email is already exist in the DB"
            })
        }

        if (!valid.emailValidationRegex(email)) {
            return res.status(400).send({
                status: false,
                message: "Enter valid email"
            })
        }

        if (!valid.isValid(dob)) {
            return res.status(400).send({ 
                status: false, 
                message: `dob field is mandatory` 
            })
        }


        let visit = {
            visitedDay : visitedDay,
            investigation : investigation,
            visitedDate : visitedDate
        }

        let obj = {
            UHID : UHID,
            fName : fName,
            mName : mName,
            lName : lName,
            age : age,
            gender : gender,
            address : address,
            mobile : mobile,
            email : email,
            dob : dob,
            visited : [{...visit}]
        }

        let createdP = await pModel.create(obj)
        console.log(createdP)
        return res.status(201).send({
            status: true,
            message: 'created',
            data: createdP
        })
    } 
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
} 



const getInvestigationByDay = async function (req, res){
    try{
        let data = req.query
        let pId = req.params.pId

        let {visitedDay} = data

        let getData = await pModel.findById({_id :pId})
        let item = getData.visited

        let arr = []
        for(let i = 0; i<item.length; i++){
            if(item[i].visitedDay == visitedDay ){
                arr.push(item[i])
            }
        }
        return res.status(200).send({
            status: true,
            message: 'created',
            data: arr
        })
        
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}



const updateVisit = async function (req, res){
    try{
        let data = req.body
        let pId = req.params.pId
        let {visited} = data

        const getData = await pModel.findById({_id : pId})

        let item = getData.visited
        item.push(visited)
        
        let updateP = await pModel.create(getData)
        return res.status(200).send({
            status: true,
            message: 'created',
            data: updateP
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

 
module.exports = { createP, getInvestigationByDay, updateVisit }