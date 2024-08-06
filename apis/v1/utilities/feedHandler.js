const UserProfile = require('../models/user-profile');

const calculateSimilarityScore=(user, profile)=>{

    let score = 0;
    const maxInterests = 10; // Assumed maximum number of interests
    const maxScore = maxInterests + 1 + 1; // Max interests + occupation + education
  
    // Compare interests
    if (user.interests && profile.interests) {
      const commonInterests = user.interests.filter(interest => profile.interests.includes(interest));
      score += commonInterests.length; // Increase score based on common interests
    }
  
    // Compare occupation
    if (user.occupation === profile.occupation) {
      score += 1; // Increase score if occupation matches
    }
  
    // Compare education
    if (user.education === profile.education) {
      score += 1; // Increase score if education matches
    }
  
    // Normalize the score to be between 1 and 10
    const normalizedScore = 1 + (score / maxScore) * 9;
    return normalizedScore;
  
    }

    const preferredUsers = async(user) =>{

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const minAge = user.age - 3;
        const maxAge = user.age;
        const preferredGender = "female";
    
        // Find profiles that match the criteria
        const matchingProfiles = await UserProfile.find({
          _id: { $ne: user._id },
          gender: preferredGender,
          age: { $gte: minAge, $lte: maxAge }
        });
        console.log("matching profiles are ");
        console.log(matchingProfiles);
  
        return matchingProfiles;

  }

  const generateFeed = async(user)=>{

    try {
    
      const preferredProfiles = await preferredUsers(user);
      if(preferredProfiles.length > 0)
      {
        //filter the profile here
        similiarProfiles= preferredProfiles.map(profile => {
          const similarityScore = calculateSimilarityScore(user, profile);
          return { profile, similarityScore };
        });

        //return the most similiar profiles back
        mostSimiliarProfiles = similiarProfiles.filter(obj =>{
  
          if(obj.similarityScore >3)
          {
            return obj;
          }
        });
  
        console.log("0");
        return mostSimiliarProfiles;
      }
  
    } catch (error) {
      console.error('Error fetching matching profiles:', error);
    }
   
  }
  module.exports = {calculateSimilarityScore,preferredUsers,generateFeed};