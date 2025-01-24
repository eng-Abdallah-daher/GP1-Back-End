const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

async function uploadImage(base64Data) {
  let y;
  const clientId = "bae1c7177f1cb8d";

  try {
    const buffer = Buffer.from(base64Data.split(",")[1], "base64");
    const tempPath = path.join(__dirname, "temp_image.png");
    fs.writeFileSync(tempPath, buffer);

    const form = new FormData();
    form.append("image", fs.createReadStream(tempPath));

    const response = await axios.post("https://api.imgur.com/3/upload", form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Client-ID ${clientId}`,
      },
    });

    
    const imageUrl = response.data.data.link;
    
    y = imageUrl;

    fs.unlinkSync(tempPath);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
  return y;
}

module.exports = uploadImage;
