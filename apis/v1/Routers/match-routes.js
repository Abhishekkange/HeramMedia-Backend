const express = require('express');
const router  = express.Router();
const Match = require('../models/match');

router.get('/matches/:id',async(req,res)=>{

    const id = req.params.id;
    const matches = await Match.find({id: id});
    res.json({"mesage": matches});

});


module.exports = router;