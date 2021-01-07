const express = require('express');
const Request = require('../../Models/Request');
const { LOGIN_ROLES }  = require('../../utils/constants');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/',(req,res)=>{
    try {
        Request.find().then((requests)=>{
            return res.json(requests);
        });
    } catch (error) {
        console.log(err);
        res.status(500).send("Server Error");
    }
})

router.post('/',(req,res)=>{
    const { type,contact,user,city,hospital,details } = req.body;
    try{
        Request.find({ user, isActive: true}).then((requests)=>{
            if(requests.length>3){
                return res.status(302).json({errors: [{msg: "Request Limit Exceeded"}]});
            }
            const request = new Request({
                type,
                contact,
                user,
                city,
                hospital,
                details,
                active: false,
                completed: false,
            });
            res.status(302).json({success: [{msg: "Request sent for verification to Authorized Hospital"}]});
            request.save();
        });
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
});

router.post('/edit',(req,res)=>{
    const { id,type,contact,user,city,hospital,details } = req.body;
    const doc = {type,contact,user,city,hospital,details};
    try{
        return Request.findByIdAndUpdate(id,doc).then(()=>{
            return res.send("Updated SuccessFully");
        });
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
});

router.get('/complete',(req,res)=>{
    const { id } = req.query;
    try{
        Request.findByIdAndUpdate(id,{isActive: false, completed: true});
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
});

router.get('/verify',(req,res)=>{
    const { id } = req.query;
    if(!user || req.role !== LOGIN_ROLES.HOSPITAL) return res.status(400).json({errors: [{msg: "Could not find hospital"}]});
    try{
        Request.findByIdAndUpdate(id,{isVerified: true});
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
});

router.get('/hospital',auth,(req,res)=>{
    try{
        const user = req.user;
        if(!user || req.role !== LOGIN_ROLES.HOSPITAL) return res.status(400).json({errors: [{msg: "Could not find hospital"}]});
        Request.find({hospital: user._id}).then((requests)=>{
            return res.json(requests);
        });
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
});

router.get('/user',auth,(req,res)=>{
    try{
        const user = req.user;
        if(!user || req.role !== LOGIN_ROLES.USER) return res.status(400).json({errors: [{msg: "Could not find User"}]});
        Request.find({user: user._id}).populate('user').populate('hospital').then((requests)=>{
            return res.json(requests);
        });
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;