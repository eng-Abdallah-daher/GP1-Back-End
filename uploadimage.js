const axios = require("axios");
const FormData = require("form-data");

async function uploadImage(base64Data) {
  let imageUrl;
  const clientId = "bae1c7177f1cb8d";

  try {
    const base64Image = base64Data.split(",")[1];
    const form = new FormData();
    form.append("image", base64Image);

    const response = await axios.post("https://api.imgur.com/3/upload", form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Client-ID ${clientId}`,
      },
    });

    imageUrl = response.data.data.link;
  } catch (error) {
    console.error("Error uploading image:", error);
  }

  return imageUrl;
}

module.exports = uploadImage;
