import { MONGODB_URL } from "../Config/config";
// import mongoose  from "mongoose"
const mongoose = require('mongoose');
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
})
var config = mongoose.connection;
config.on('connected', function(){
    console.log("Database connected");
})
config.on('disconnected', function(){
    console.log("Database disconnected");
})

export default config