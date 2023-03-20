const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    UHID: {
        type: String,
        require: true,
        // unique : true
    },
    sex: {
        type: String,
        require: true,
        enum: ['male', 'female']
    },
    age: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true,
    },
    mobile: {
        type: Number,
        require: true,
        // unique : true
    },
    email: {
        type: String,
        require: true,
        // unique : true
    },
    dob: {
        type: Date,
        require: true,
    },
    patientImage: {
        type: String,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('Patient_Detail', patientSchema)