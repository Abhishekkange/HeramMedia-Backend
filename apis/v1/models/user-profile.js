const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({

    //Basic Requirenments
    name: { type: String },
    age: { type: Number },
    gender: { type: String },
    profilePicture: { type: String },
    bio: { type: String },
    occupation: { type: String },
    education: { type: String },
    interests: [String],

    //Other requirenments

    //store location

    socialMediaLinks: {
        instagram: { type: String },
        spotify: { type: String },
      },
  
})