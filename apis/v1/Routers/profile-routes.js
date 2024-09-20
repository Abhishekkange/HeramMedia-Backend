const express = require('express');
const router = express.Router();
const { uploadImage } = require('../utilities/uploadhandler');
const User = require('../models//user-profile');
const multer = require('multer');
const mongoose = require('mongoose');
const {createJWT,verifyJwt} = require('../utilities/jwt-handler');

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/getId',(req,res)=>{

  const jwt = req.body.jwt;
  const data = verifyJwt(jwt);
  res.json({"message":data});


})

//create a new profile
router.post('/profile', async (req, res) => {

    try {

        const {name,age,gender,profilePicture,bio,occupation,education,interests,socialMediaLinks,height,lifestyleChoices,languagesSpoken,religionAndBeliefs,userId} = req.body;
        const userIdObjectId = new mongoose.Types.ObjectId(userId);
        const newUser = new User({ userIdObjectId,name, age, gender, profilePicture, bio, occupation, education, interests, socialMediaLinks, height, lifestyleChoices, languagesSpoken, religionAndBeliefs });
        const savedUser = await newUser.save();
        res.json({"message": "profile created"});

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

  router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      // Convert buffer to base64 string
      const fileStr = req.file.buffer.toString('base64');
  
      // Upload image to Cloudinary
      const result = await uploadImage(`data:image/jpeg;base64,${fileStr}`);
  
      res.status(200).json({
        message: 'Image uploaded successfully',
        url: result.secure_url
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ message: 'Error uploading image', error });
    }
  });



module.exports = router;