const express = require('express')
const mongoose = require("mongoose")
const router = require("./routes/route")
const PORT = process.env.PORT || 3000
require('dotenv').config();
// const dotenv = require("dotenv").config({ path: '.env' })
// const multer = require('multer')
const app = express()
app.use(express.json())
// app.use( multer().any())

// mongoose.connect(process.env.MONGODB_CLUSTER, {

// })
//     .then(() => console.log("MongoDB is connected successfully.."))
//     .catch((err) => console.log(err))


let connectToMongoDB = async function () {
    try {
        await mongoose.connect(process.env.MONGODB_CLUSTER, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    } 
    // finally {
    //     // Close the connection when you're done
    //     await mongoose.disconnect();
    //     console.log('Disconnected from MongoDB');
    // }
}

connectToMongoDB();


app.use("/", router)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is connected on Port ${PORT}`)
}) 