const swipeSchema = new Schema({
    swiper: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    swiped: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    isRightSwipe: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now },
  });
  
  const Swipe = mongoose.model('Swipe', swipeSchema);
  