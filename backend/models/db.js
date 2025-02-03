const mongoose = require('mongoose');
require('dotenv').config();

const mongo_url = process.env.MONGO_CONN;

if (!mongo_url) {
    console.error('MongoDB URI is not defined');
    process.exit(1);
}

mongoose.connect(mongo_url)
    .then(()=>{
        console.log("MongoDB Connected...");
    }).catch((err)=>{
        console.log("MongoDB Connection Error", err)
    });