var mongoose=require('mongoose');

var hospitalSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});
module.exports=mongoose.model("Hospital",hospitalSchema);