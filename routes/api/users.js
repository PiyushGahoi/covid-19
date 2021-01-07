const express = require('express');
const User = require('../../Models/User');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { LOGIN_ROLES }  = require('../../utils/constants');

const router = express.Router();


router.get('/',(req,res)=>{
    try{
        User.find({}).select('-password').then((users)=>{
            return res.json(users);
        });
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
});

router.post('/',(req,res)=>{
    const { name, email, password, blood, gender} = req.body;
    User.findOne({email}).then(async (user)=>{
        if(user){
            return res.status(400).json({errors: [{msg:"User already Exists!"}]});
        }
        const newUser =new User({
            name,
            blood,
            email,
            password,
            gender
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password =await  bcrypt.hash(password,salt);
        await newUser.save();
        const payload = {
            newUser: {
                id: newUser.id
            },
            role: LOGIN_ROLES.USER,
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