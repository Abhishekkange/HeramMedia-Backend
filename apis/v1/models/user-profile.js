const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the user profile
const userProfileSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  sexualOrientation: { type: String, required: true },
  profilePicture: { type: String, required: true },
  bio: { type: String },
  interests: [String],
  occupation: { type: String },
  education: { type: String },
  matchPreferences: {
    gender: { type: String, required: true },
    ageRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    distance: { type: Number, required: true },
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
    email: { type: String, required: true },
    phone: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  privacySettings: {
    showAge: { type: Boolean, default: true },
    showLocation: { type: Boolean, default: true },
  },
  activityStatus: {
    isOnline: { type: Boolean, default: false },
    lastActive: { type: Date },
  },
  interactionHistory: {
    likedProfiles: [{ type: Schema.Types.ObjectId, ref: 'UserProfile' }],
    matches: [{ type: Schema.Types.ObjectId, ref: 'UserProfile' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },
  personalityTraits: [String],
  relationshipGoals: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create a geospatial index on currentLocation
userProfileSchema.index({ currentLocation: '2dsphere' });

// Middleware to update timestamps
userProfileSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
