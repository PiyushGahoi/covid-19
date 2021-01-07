const mongoose = require('mongoose');
const config = require('config');

db= config.get("mongodbURI");

const connectDb =async () =>{
    try{
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
        console.log("Mongodb connected");
    }catch(err){
        console.log(`Error connecting mongoDB ${err}`);
        process.exit(1);
    }
}

module.exports = connectDb;