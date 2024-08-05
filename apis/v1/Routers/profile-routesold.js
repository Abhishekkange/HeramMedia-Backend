const express = require('express');
const Router = express.Router();
const { body, validationResult } = require('express-validator');
const UserProfile = require('../models/user-profile');

// Get all user profiles
Router.get('/profiles', async (req, res) => {
    try {
      const profiles = await UserProfile.find();
      if(profiles!=null)
      {
        res.json(profiles);
      }
      
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  // Get a user profile by ID
  Router.get('/profiles/:id', async (req, res) => {
    try {
      const profile = await UserProfile.findById(req.params.id);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  // Create a new user profile
  Router.post('/profile', 
    // Validate incoming data
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('age').isInt({ min: 18 }).withMessage('Age must be an integer and at least 18'),
      body('gender').notEmpty().withMessage('Gender is required'),
      body('sexualOrientation').notEmpty().withMessage('Sexual Orientation is required'),
      body('profilePicture').notEmpty().withMessage('Profile Picture is required'),
      body('matchPreferences.gender').notEmpty().withMessage('Match Preference Gender is required'),
      body('matchPreferences.ageRange.min').isInt({ min: 18 }).withMessage('Minimum age must be at least 18'),
      body('matchPreferences.ageRange.max').isInt({ min: 18 }).withMessage('Maximum age must be at least 18'),
      body('matchPreferences.distance').isInt({ min: 1 }).withMessage('Distance must be a positive integer'),
      body('currentLocation.type').equals('Point').withMessage('Current location type must be Point'),
      body('currentLocation.coordinates').isArray({ min: 2, max: 2 }).withMessage('Coordinates must be an array of two numbers')
    ],
    async (req, res) => {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        console.log("creaying profile")
        const newUserProfile = new UserProfile(req.body);
        console.log("created profile")
        await newUserProfile.save();
        res.status(201).json(newUserProfile);
      } catch (error) {
        res.status(400).json({ message: 'Bad request', error });
      }
    }
  );
  // Update a user profile by ID
  Router.put('/profiles/:id', async (req, res) => {
    try {
      const updatedProfile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(updatedProfile);
    } catch (error) {
      res.status(400).json({ message: 'Bad request', error });
    }
  });
  
  // Delete a user profile by ID
  Router.delete('/profiles/:id', async (req, res) => {
    try {
      const deletedProfile = await UserProfile.findByIdAndDelete(req.params.id);
      if (!deletedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  




module.exports = Router;