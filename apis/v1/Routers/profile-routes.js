const express = require('express');
const router = express.Router();
const User = require('../models//user-profile');

//create a new profile
router.post('/profile', async (req, res) => {

    try {

        const {name,age,gender,profilePicture,bio,occupation,education,interests,socialMediaLinks,height,lifestyleChoices,languagesSpoken,religionAndBeliefs} = req.body;
        const newUser = new User({ name, age, gender, profilePicture, bio, occupation, education, interests, socialMediaLinks, height, lifestyleChoices, languagesSpoken, religionAndBeliefs });
        const savedUser = await newUser.save();
        res.json({"message": savedUser});

    } catch (e) {

        console.error("something went wrong"+e);
    }
});

//get profile details from userId
router.get('/profile/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (e) {
      console.error('Error fetching user profile:', e);
      res.status(500).json({ message: 'Error fetching user profile', error: e });
    }
  });

  //update user details
  router.put('/profile/:id', async (req, res) => {
    try {
      const { name, age, gender, profilePicture, bio, occupation, education, interests, socialMediaLinks, height, lifestyleChoices, languagesSpoken, religionAndBeliefs } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, age, gender, profilePicture, bio, occupation, education, interests, socialMediaLinks, height, lifestyleChoices, languagesSpoken, religionAndBeliefs },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (e) {
      console.error('Error updating user profile:', e);
      res.status(500).json({ message: 'Error updating user profile', error: e });
    }
  });
  



module.exports = router;