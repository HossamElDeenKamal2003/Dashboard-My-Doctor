const { v2: cloudinary } = require('cloudinary');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({ 
    cloud_name: "dm6tuiowz", 
    api_key: "915375685666441", 
    api_secret: "Y7zwlQwNhzISNGcBd7d93cszPRc"
});

module.exports = cloudinary;
