var mongoose=require('mongoose');

var requestSchema=new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true,
    },
    details: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
    },
    completed: {
        type: Boolean,
        required: true,
    }
},{ timestamps: true });

module.exports=mongoose.model("Request",requestSchema);