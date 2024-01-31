require('dotenv').config("../.env")
const mongoose = require("mongoose");

const connectDB = async () => {
    const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8wzqzge.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

    // console.log(process.env.DB_USER);
    try {
        // Use `await mongoose.connect` Connect the mongoose to the server
        await mongoose.connect(MONGO_URI);
        console.log("Database is connected");
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB;

