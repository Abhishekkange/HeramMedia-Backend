const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({

    // Basic Requirenments
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: { type: String },
    age: { type: Number },
    gender: { type: String },
    profilePicture: { type: String },
    bio: { type: String },
    occupation: { type: String },
    education: { type: String },
    interests: [String],
    languagesSpoken: [String],

    // Store pairs of profiles that have been shown to the user
    userFeedHistory: [[{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }]]
});

const usermodel = new mongoose.model('userprofile', userProfileSchema);
module.exports = usermodel;
