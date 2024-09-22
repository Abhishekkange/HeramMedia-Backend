const express = require('express');
const Router = express.Router();
const UserProfile = require('../models/user-profile');
const userPreference = require('../models/preference');
const jwt = require('jsonwebtoken');

// Helper function to verify JWT token
const verifyJwt = async (token) => {
  const data = jwt.verify(token, 'shahrukhKhan');  // Replace with your secret
  return data.userId;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate unique profile pairs (without reverse pairs like (B, A))
const generateUniquePairs = (profiles) => {
  let pairs = [];
  for (let i = 0; i < profiles.length; i++) {
    for (let j = i + 1; j < profiles.length; j++) {
      pairs.push([profiles[i], profiles[j]]);  // Only (i, j), no (j, i)
    }
  }
  return pairs;
};

// Feed route
Router.post('/feed', async (req, res) => {
  try {
    // const jwtToken = req.body.jwt;
    const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQxM2FkYmMxMTYxM2IwM2Y1MGNlYmEiLCJpYXQiOjE3MjYzMjIxMzd9.nbOdNJJ32OJDmMWhePQlqsq7aZ5mkRl80-q2nOEzuG0";
    const userId = await verifyJwt(jwtToken);
    

    // Find current user profile
   // console.log(userId);
    // const userProfile = await UserProfile.findOne({ userId: userId });
    // console.log(userProfile);
    // console.log(userProfile._id.toString());
    

    // Find all other profiles excluding the current user
    const allProfiles = await UserProfile.find({
      // _id: { $ne: userProfile._id.toString() }
    });

    if (allProfiles.length < 2) {
      return res.status(400).json({ message: "Not enough profiles to generate pairs." });
    }

    // Generate all unique pairs
    const uniquePairs = generateUniquePairs(allProfiles);

    const randomInt = getRandomInt(0, uniquePairs.length);

    
  
    // Send the selected profile pair to the user
    res.json({"message":uniquePairs});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//select preference
// Route to handle user preferences
Router.post('/user-preference', async (req, res) => {
  try {
    const { profile1, profile2, preferredProfile, jwt } = req.body;

    // Validate request body
    if (!profile1 || !profile2 || !preferredProfile || !jwt) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verify JWT
    const preferredBy = await verifyJwt(jwt);
    if (!preferredBy) {
      return res.status(401).json({ error: "Invalid or missing JWT" });
    }

    // Create the preference document
    const preference = new userPreference({
      profile1,
      profile2,
      preferredProfile,
      preferredBy
    });

    // Save the preference
    await preference.save();

    res.status(201).json({ success: true, message: "Preference saved successfully" });
  } catch (error) {
    console.error("Error saving preference:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = Router;
