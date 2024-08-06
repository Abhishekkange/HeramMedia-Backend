const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    user1: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    timestamp: { type: Date, default: Date.now },
  });
  
  const Match = mongoose.model('Match', matchSchema);
  