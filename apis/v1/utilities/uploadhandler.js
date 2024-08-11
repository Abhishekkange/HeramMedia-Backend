const { v2: cloudinary } = require('cloudinary');

// Configuration
cloudinary.config({ 
  cloud_name: 'dqfpnw5v4', 
  api_key: '858991468122927', 
  api_secret: 'xGmS8Hc79GWXTLXrtCTZRILjOf4' // Replace with your actual API secret
});

const uploadImage = async (localFilePath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'image'
    });
    return uploadResult;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

module.exports = { uploadImage };
