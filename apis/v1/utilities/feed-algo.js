const getRecommendedProfiles = async (currentUser) => {
    // Retrieve the current user's profile
    const user = await UserProfile.findById(currentUser._id);
  
    // Find users that match the basic preferences (gender, age, location)
    const preferredUsers = await UserProfile.find({
      gender: user.matchPreferences.gender,
      age: { $gte: user.matchPreferences.ageRange.min, $lte: user.matchPreferences.ageRange.max },
      'currentLocation.coordinates': {
        $geoWithin: {
          $centerSphere: [
            user.currentLocation.coordinates,
            user.matchPreferences.distance / 3963.2 // Convert distance to radians (Earth radius in miles)
          ],
        },
      },
    });
  
    // Calculate similarity score based on interests
    const scoredUsers = preferredUsers.map((profile) => {
      const commonInterests = user.interests.filter((interest) => profile.interests.includes(interest));
      const similarityScore = commonInterests.length / user.interests.length; // Jaccard index
      return { profile, similarityScore };
    });
  
    // Sort users by similarity score and other factors (e.g., proximity)
    scoredUsers.sort((a, b) => b.similarityScore - a.similarityScore);
  
    // Return the sorted list of profiles
    return scoredUsers.map((item) => item.profile);
  };

  
module.exports = getRecommendedProfiles();