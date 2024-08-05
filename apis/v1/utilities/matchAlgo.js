const handleSwipe = async (swiperId, swipedId, isRightSwipe) => {
    // Store the swipe action
    const swipe = new Swipe({
      swiper: swiperId,
      swiped: swipedId,
      isRightSwipe,
    });
    await swipe.save();
  
    if (isRightSwipe) {
      // Check if the swiped user has also swiped right on the swiper
      const mutualSwipe = await Swipe.findOne({
        swiper: swipedId,
        swiped: swiperId,
        isRightSwipe: true,
      });
  
      if (mutualSwipe) {
        // Create a match
        const match = new Match({
          user1: swiperId,
          user2: swipedId,
        });
        await match.save();
  
        // Notify both users (pseudo-code, depends on your notification system)
        notifyUser(swiperId, `You have a new match with ${swipedId}`);
        notifyUser(swipedId, `You have a new match with ${swiperId}`);
      } else {
        // Notify the swiped user (pseudo-code, depends on your notification system)
        notifyUser(swipedId, `Someone has swiped you right`);
      }
    }
  };

module.exports =handleSwipe;