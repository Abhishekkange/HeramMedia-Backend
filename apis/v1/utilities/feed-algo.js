const express = require('express');
const router = express.Router();
const UserProfile = require('../models/user-profile');

//feed algorithm
router.get('/feed/:id',async (req,res)=>{

  const userId = req.params.id;
  
  


});


module.exports = router;

