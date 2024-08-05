const mongoose = require('mongoose');

// Define the schema for user interactions
const userInteractionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  action: { type: String, enum: ['swipeLeft', 'swipeRight'], required: true },
  timestamp: { type: Date, default: Date.now }
});

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
      height: { type: Number },
  lifestyleChoices: {
    smoking: { type: Boolean },
    drinking: { type: Boolean },
    diet: { type: String },
  },
  languagesSpoken: [String],
  religionAndBeliefs: { type: String },
  genderSpecifcation: { type: String },
  userFeed: [{ type: Schema.Types.ObjectId, ref: 'UserProfile' }],
  userFeedHistory: [userInteractionSchema]
  
//   verification: {
//     email: { type: String },
//     phone: { type: String },
//     isVerified: { type: Boolean, default: false },
//   },
//   activityStatus: {
//     isOnline: { type: Boolean, default: false },
//     lastActive: { type: Date },
//   },
  
});
const usermodel = new mongoose.model('userprofile',userProfileSchema);
module.exports = usermodel;