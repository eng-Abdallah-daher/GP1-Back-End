const axios = require("axios");

async function uploadToImgur(base64Data) {
  const clientId = "bae1c7177f1cb8d"; 

  try {
    const response = await axios.post(
      "https://api.imgur.com/3/image",
      { image: base64Data.split(",")[1] }, 
      {
        headers: {
          Authorization: `Client-ID ${clientId}`,
        },
      }
    );

    const imageUrl = response.data.data.link;
    console.log("Image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error uploading to Imgur:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = uploadToImgur;
