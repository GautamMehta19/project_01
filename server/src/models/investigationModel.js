const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const d = new Date();
const investigationSchema = new mongoose.Schema({
    patientId :{
        type : ObjectId,
        required : true,
        ref : 'Patient_Detail'
    },

    investigation : {
        type : String,
    },

    visitedDay: {
        type : String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Sataurday', 'Sunday']
    },

    visitedDate: {
        type : Date,
        // default : d.getDate()
    },
    
    visitedTime: {
        type : String,
        default : d.toLocaleTimeString()
    }
}, {timestamps : true})

module.exports = mongoose.model('investigation', investigationSchema)