
const mongoose = require('mongoose');

const swipeSchema = new mongoose.Schema({
    swiper: { type: mongoose.Schema.Types.ObjectId, ref: 'userprofile', required: true },
    swiped: { type: mongoose.Schema.Types.ObjectId, ref: 'userprofile', required: true },
    isRightSwipe: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now },
  });
  
  const Swipe = mongoose.model('Swipe', swipeSchema);
  