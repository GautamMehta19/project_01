const mongoose = require('mongoose')

const d = new Date();

const pSchema = new mongoose.Schema({
    UHID: {
        type: String,
        require: true,
        // unique : true
    },

    fName: {
        type: String,
        require: true
    },

    mName: {
        type: String,
        require: true
    },

    lName: {
        type: String,
        require: true
    },

    gender: {
        type: String,
        require: true,
        enum: ['Male', 'Female']
    },

    age: {
        type: Number,
        require: true
    },

    weight: {
        type: Number,
        require: true
    },

    title: {
        type: String,
        enum: ['Mr', 'Mrs', 'Miss'],
        require: true
    },

    address: {
        type: String,
        require: true,
    },

    mobile: {
        type: Number,
        require: true,
        unique : true
    },

    email: {
        type: String,
        require: true,
        unique : true
    },

    dob: {
        type: String,
        require: true,
    },

    // patientImage: {
    //     type: String,
    //     required: true
    // },

    visited :[{
        visitedDay: {
            type : String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday', 'Sunday']
        },
        investigation : {
            type : String,
        },
        visitedDate: {
            type : String,
            default : d.toLocaleDateString()
        },
        visitedTime: {
            type : String,
            default : d.toLocaleTimeString()
        }
    }]

}, { timestamps: true })


module.exports = mongoose.model('pDetail', pSchema)