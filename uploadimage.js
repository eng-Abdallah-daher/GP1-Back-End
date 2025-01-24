const axios = require("axios");
const FormData = require("form-data");

async function uploadImage(base64Data) {
  let imageUrl;
  const clientId = "bae1c7177f1cb8d";
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const base64Image = base64Data.split(",")[1];
      const form = new FormData();
      form.append("image", base64Image);

      const response = await axios.post(
        "https://api.imgur.com/3/upload",
        form,
        {
          headers: {
            ...form.getHeaders(),
            Authorization: `Client-ID ${clientId}`,
          },
        }
      );

      imageUrl = response.data.data.link;
      return imageUrl;
    } catch (error) {
      retries++;
      console.error("Error uploading image, retrying...", error);
      if (retries >= maxRetries) {
        throw new Error("Failed to upload image after multiple attempts.");
      }
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
    }
  }
}


module.exports = uploadImage;
