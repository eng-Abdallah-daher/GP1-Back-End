const axios = require("axios");
const FormData = require("form-data");
const path = require("path");
const fs = require("fs");
async function uploadImage(base64Data) {
    let y;

    try {
        const buffer = Buffer.from(base64Data.split(',')[1], 'base64');
        const tempPath = path.join(__dirname, 'temp_image.png');
        fs.writeFileSync(tempPath, buffer);

        const formData = new FormData();
        formData.append('image', fs.createReadStream(tempPath));

        const headers = {
            'Authorization': 'Client-ID bae1c7177f1cb8d',
            ...formData.getHeaders(),
        };

        const uploadResult = await axios.post('https://api.imgur.com/3/upload', formData, { headers });

        console.log('Upload Result:', uploadResult.data);

        const imageUrl = uploadResult.data.data.link;

        console.log('Image URL:', imageUrl);
        y = imageUrl;

        fs.unlinkSync(tempPath);

    } catch (error) {
        console.error('Error uploading image:', error);
    }

    return y;
}

module.exports = uploadImage;
