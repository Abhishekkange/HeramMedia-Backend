const express = require('express');
const Router = express.Router();
const {calculateSimilarityScore,preferredUsers,generateFeed} = require('../utilities/feedHandler');

  //functions 





  Router.get('/feed',async(req,res)=>{


    const userId = req.body.userId;
    try{

      const user = await UserProfile.findById(user);
      //check if userFeed is empty
      const userFeed = user.userFeed;

      if(userFeed.length == 0)
      {
        // generateFeed
      }
      else {

        if(userFeed.length>20)
        {
          //send feed directly
        }
        else{
          //send feed and generate new feed as well

        }
      }

    }catch(e){

      console.log("User not found");
    }


  });
 

module.exports = Router;