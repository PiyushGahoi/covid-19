const express = require('express');
const Hospital = require('../../Models/Hospital');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { LOGIN_ROLES }  = require('../../utils/constants');

const router = express.Router();

router.get('/',(req,res)=>{
    try{
        Hospital.find({}).select('-password').then((hospitals)=>{
            return res.json(hospitals);
        });
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
});

router.post('/',(req,res)=>{
    const { name, userName, password, address, city} = req.body;
    Hospital.findOne({userName}).then(async (user)=>{
        if(user){
            return res.status(400).json({errors: [{msg:"Hospital already Registered!"}]});
        }
        const newUser =new Hospital({
            name,
            userName,
            password,
            address,
            city
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password =await  bcrypt.hash(password,salt);
        await newUser.save();
        const payload = {
            newUser: {
                id: newUser.id
            },
            role: LOGIN_ROLES.HOSPITAL,
        };
        await jwt.sign(payload, 
            config.get("jwtSecret"), 
            {expiresIn: 360000},
            (err, token)=>{
                if(err) throw err;
                res.json({token});
            });
    }).catch((err)=>{
        console.log(err);
        return res.status(500).send("Server Error");
    });
});

module.exports = router;