const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/demo',async(req,res)=>{
    try{

        const user = new User({

            "email":"Abhishek"
        });
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(e){

console.log("not saving");
    }

    
})



module.exports = router;