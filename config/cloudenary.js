const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// console.log("key => ", process.env.CLOUD_NAME, process.env.API_KEY, process.env.API_SECRETE);

const mediaConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRETE,
        });
    } catch (error) {
        console.log(error);
        console.log("error while connecting to Cloudinary");
    }
}

module.exports = mediaConnect;
