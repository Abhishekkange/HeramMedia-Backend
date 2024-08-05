const matchSchema = new Schema({
    user1: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    user2: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    timestamp: { type: Date, default: Date.now },
  });
  
  const Match = mongoose.model('Match', matchSchema);
  