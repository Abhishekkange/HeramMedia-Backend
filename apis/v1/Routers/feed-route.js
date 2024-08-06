const express = require('express');
const Router = express.Router();
const UserProfile = require('../models/user-profile');
const {calculateSimilarityScore,preferredUsers,generateFeed} = require('../utilities/feedHandler');

  //functions 
  async function updateUserFeed(userId, updateData) {
    try {
      if (!updateData || !Array.isArray(updateData)) {
        throw new Error('Invalid update data. It must be an array of user profile IDs.');
      }
  
      const updatedUser = await UserProfile.findByIdAndUpdate(
        userId,
        { $push: { userFeed: { $each: updateData.map(id => mongoose.Types.ObjectId(id)) } } },
        { new: true } // Return the updated document
      );
  
      console.log('User updated:', updatedUser);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  }
  
  async function fetchAndRemoveFirst20ItemsFromUserFeed(userId) {
    try {
      // Find the user profile by ID
      const user = await UserProfile.findById(userId);
      if (!user) {
        console.log('User not found');
        return;
      }
  
      // Fetch the first 20 items from the userFeed
      const first20Items = user.userFeed.slice(0, 20);
  
      // Remove the first 20 items from the userFeed
      user.userFeed = user.userFeed.slice(20);
  
      // Save the updated user profile back to the database
      await user.save();
  
      console.log('First 20 items fetched and removed from userFeed:', first20Items);
      return first20Items;
    } catch (error) {
      console.error('Error fetching and removing items from userFeed:', error);
    }
  }

  Router.post('/feed',async(req,res)=>{


    const userId = req.body.userId;
    console.log(userId);
    try{

      const user = await UserProfile.findById(userId);
      //check if userFeed is empty
      const userFeed = user.userFeed;

      if(userFeed.length == 0)
      {
        const similiarProfiles = await generateFeed(user);
        res.json({"message":similiarProfiles});

      }
      else {

        if(userFeed.length>20)
        {
          //send feed directly
          const feed = await fetchAndRemoveFirst20ItemsFromUserFeed(userId);
          res.send({"message":feed});

        }
        else{
          //send feed and generate new feed as well
          const feed = await fetchAndRemoveFirst20ItemsFromUserFeed(userId);
          res.send(feed);
          generateFeed(userId);
        
        }
      }

    }catch(e){

      console.log("User not found"+e);
    }

  });
 

module.exports = Router;