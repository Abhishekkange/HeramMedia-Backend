const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the user profile
const userProfileSchema = new Schema({
  name: { type: String },
  age: { type: Number },
  gender: { type: String },
  sexualOrientation: { type: String },
  profilePicture: { type: String },
  bio: { type: String },
  interests: [String],
  occupation: { type: String },
  education: { type: String },
  matchPreferences: {
    gender: { type: String },
    ageRange: {
      min: { type: Number },
      max: { type: Number },
    },
    distance: { type: Number },
    interests: [String],
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  socialMediaLinks: {
    instagram: { type: String },
    spotify: { type: String },
  },
  socialMediaInterests: {
    favoriteMusic: [String],
    favoriteBooks: [String],
  },
  height: { type: Number },
  lifestyleChoices: {
    smoking: { type: Boolean },
    drinking: { type: Boolean },
    diet: { type: String },
  },
  languagesSpoken: [String],
  religionAndBeliefs: { type: String },
  verification: {
    email: { type: String },
    phone: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  activityStatus: {
    isOnline: { type: Boolean, default: false },
    lastActive: { type: Date },
  },
});




// Create the model
const UserProfile = mongoose.model('userprofile', userProfileSchema);

module.exports = UserProfile;
