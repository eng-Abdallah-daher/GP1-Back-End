const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function uploadImage(base64Data) {
  let y;
  const CLIENT_ID = "bae1c7177f1cb8d";

  try {
    const buffer = Buffer.from(base64Data.split(",")[1], "base64");
    const tempPath = path.join(__dirname, "temp_image.png");
    fs.writeFileSync(tempPath, buffer);

    const imageData = fs.readFileSync(tempPath, { encoding: "base64" });

    const response = await axios.post(
      "https://api.imgur.com/3/upload",
      {
        image: imageData,
        type: "base64",
      },
      {
        headers: {
          Authorization: `Client-ID ${CLIENT_ID}`,
          "Content-Type": "application/json",
        },
      }
    );

    const uploadResult = response.data.data;
    const imageUrl = uploadResult.link;
    y = imageUrl;

    const optimizedUrl = `${imageUrl}?auto=compress`;
    const autoCropUrl = `${imageUrl}?crop=auto&gravity=auto&width=500&height=500`;

    console.log("Image URL:", imageUrl);
    console.log("Optimized Image URL:", optimizedUrl);
    console.log("Auto-cropped Image URL:", autoCropUrl);

    fs.unlinkSync(tempPath);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
  return y;
}

module.exports = uploadImage;
