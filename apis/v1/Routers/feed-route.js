const express = require('express');
const Router = express.Router();
const UserProfile = require('../models/user-profile');
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
    const jwtToken = req.body.jwt;
    const userId = await verifyJwt(jwtToken);

    // Find current user profile
    const userProfile = await UserProfile.findOne({ userId: userId });
    

    // Find all other profiles excluding the current user
    const allProfiles = await UserProfile.find({
      _id: { $ne: userProfile._id.toString() }
    });

    if (allProfiles.length < 2) {
      return res.status(400).json({ message: "Not enough profiles to generate pairs." });
    }

    // Generate all unique pairs
    const uniquePairs = generateUniquePairs(allProfiles);

    const randomInt = getRandomInt(0, uniquePairs.length);

    // Retrieve user's feed history or initialize it if undefined
    // const shownPairs = userProfile.userFeedHistory || [];

    // Create a set of shown pairs
    // const shownPairSet = new Set(shownPairs.map(pair => pair.map(id => id.toString()).sort().join(',')));

    // Filter out pairs that have already been shown, considering both (A, B) and (B, A)
    // const availablePairs = uniquePairs.filter(pair => {
    //   const pairIds = pair.map(p => p._id.toString()).sort().join(',');
    //   return !shownPairSet.has(pairIds);
    // });

    // If no available pairs remain, return an error
    // if (availablePairs.length === 0) {
    //   return res.status(400).json({ message: "No more profile pairs to show." });
    // }

    // Select the first available pair to show
    // const profilePair = availablePairs[0];

    // Prepare sorted pair for consistent tracking (sorted by ObjectId)
    // const sortedPair = profilePair.map(p => p._id.toString()).sort(); // Ensure (A, B) and (B, A) are consistent

    // Add the new pair to the user's feed history
    // await UserProfile.findOneAndUpdate(
    //   { userId: userId },
    //   { $push: { userFeedHistory: sortedPair } },
    //   { new: true }
    // );
    
    // Send the selected profile pair to the user
    res.json(uniquePairs[randomInt]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = Router;
