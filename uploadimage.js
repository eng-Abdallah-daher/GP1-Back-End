const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

async function uploadToPinata(base64Data) {
  const apiKey = "09c63fd4cbc88778169f";
  const apiSecret = "1fb156b37a0fe8cb18fab797b03b40a6284f32a3cac06e213d146f0a2b8ade1e";
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  const buffer = Buffer.from(base64Data.split(",")[1], "base64");
  const tempPath = path.join(__dirname, `image_${Date.now()}.png`);
  fs.writeFileSync(tempPath, buffer);

  const formData = new FormData();
  formData.append("file", fs.createReadStream(tempPath));

  try {
    const response = await axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
        pinata_api_key: apiKey,
        pinata_secret_api_key: apiSecret,
      },
    });

    fs.unlinkSync(tempPath); 
    console.log(`https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`)
    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  } catch (error) {
    fs.unlinkSync(tempPath); 
    throw error;
  }
}

module.exports = uploadToPinata;
