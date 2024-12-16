const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

async function uploadImage(base64Data) {

    let y
    cloudinary.config({ 
        cloud_name: 'dkass9jnq', 
        api_key: '936456332441919', 
        api_secret: 'xzgm6MxZXjwS_n1bzjGquAO7tsQ'
    });

    try {
        const buffer = Buffer.from(base64Data.split(',')[1], 'base64');
        const tempPath = path.join(__dirname, 'temp_image.png');
        fs.writeFileSync(tempPath, buffer);

        const uploadResult = await cloudinary.uploader.upload(tempPath, {
            public_id: path.basename(tempPath, path.extname(tempPath)),
        });

        console.log('Upload Result:', uploadResult);

        const imageUrl = uploadResult.secure_url;

        console.log('Image URL:', imageUrl);
y=imageUrl;
        const optimizedUrl = cloudinary.url(uploadResult.public_id, {
            fetch_format: 'auto',
            quality: 'auto',
        });
      
        console.log('Optimized Image URL:', optimizedUrl);

        const autoCropUrl = cloudinary.url(uploadResult.public_id, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });
        console.log('Auto-cropped Image URL:', autoCropUrl);

        fs.unlinkSync(tempPath); 

    } catch (error) {
        console.error('Error uploading image:', error);
    }
    return y;
}

module.exports = uploadImage;
