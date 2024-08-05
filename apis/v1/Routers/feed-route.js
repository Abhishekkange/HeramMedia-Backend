const express = require('express');
const Router = express.Router();
const feedAlogrithm = require('../utilities/feed-algo');


  //functions 
  const preferredUsers = async(user) =>{

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const minAge = user.age - 3;
        const maxAge = user.age;
        const preferredGender = user.genderSpecifcation;
    
        // Find profiles that match the criteria
        const matchingProfiles = await UserProfile.find({
          _id: { $ne: userId },
          gender: preferredGender,
          age: { $gte: minAge, $lte: maxAge }
        });
  
        return matchingProfiles;



  }


  Router.get('/feed',async(req,res)=>{


    const userId = req.body.userId;
    try{

      const user = await UserProfile.findById(user);
      //check if userFeed is empty
      const userFeed = user.userFeed;
      try {
  
        const preferredProfiles = await preferredUsers(userId);
        if(preferredProfiles.length > 0)
        {
        
        }
  
    
    
    
        res.json(matchingProfiles);
      } catch (error) {
        console.error('Error fetching matching profiles:', error);
        res.status(500).json({ message: 'Internal server error' });
      }

    }catch(e){

      console.log("User not found");
    }
   
  });


module.exports = Router;