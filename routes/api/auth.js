const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

const { LOGIN_ROLES }  = require('../../utils/constants');
const auth = require('../../middleware/auth');
const User = require('../../Models/User');
const Hospital = require('../../Models/Hospital');

const router = express.Router();

router.get('/', auth, async (req,res)=>{
    try{
        return res.json({user: req.user, role: req.role});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

router.post('/user',async (req,res)=>{
    const {email, password} = req.body;
    User.findOne({email}).then(async (user)=>{
        if(!user) {
            return res.status(400).json({errors:[{msg: "Invalid Credentials"}]});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg: "Invalid Credentials"}]});
        }
        const payload = {
            user,
            role: LOGIN_ROLES.USER,
        }
        await jwt.sign(payload, 
            config.get("jwtSecret"), 
            {expiresIn: 360000},
            (err, token)=>{
                if(err) throw err;
                res.json({token});
            });
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("Server Error");
    })
});

router.post('/hospital',async (req,res)=>{
    const {email, password} = req.body;
    Hospital.findOne({email}).then( async (user)=>{
        if(!user) {
            return res.status(400).json({errors:[{msg: "Invalid Credentials"}]});
        }
        const isMatch = bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg: "Invalid Credentials"}]});
        }
        const payload = {
            user,
            role: LOGIN_ROLES.HOSPITAL,
        }
        await jwt.sign(payload, 
            config.get("jwtSecret"), 
            {expiresIn: 360000},
            (err, token)=>{
                if(err) throw err;
                res.json({token});
            });
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("Server Error");
    })
});

module.exports = router;