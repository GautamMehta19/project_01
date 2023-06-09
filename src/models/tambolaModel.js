const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const tambolaSchema = new mongoose.Schema({
    userId : {
        type: ObjectId,
        ref: "user",
    },
    matrix : {
        type : Array
    }
},{ timestamps: true });

module.exports = mongoose.model("tambola", tambolaSchema)
