const axios = require("axios");
const FormData = require("form-data");

async function uploadImage(base64Data) {
  let result;

  try {
    const buffer = Buffer.from(base64Data.split(",")[1], "base64");

    const formData = new FormData();
    formData.append("image", buffer, "image.png");

    const headers = {
      Authorization: "Client-ID bae1c7177f1cb8d",
      ...formData.getHeaders(),
    };

    const uploadResult = await axios.post(
      "https://api.imgur.com/3/upload",
      formData,
      { headers }
    );

    result = uploadResult.data;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error;
  }

  return result["data"]["link"];
}

module.exports = uploadImage;
