const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'fashion-leather',
    api_key: '458944499679692',
    api_secret: 'JQtdNno34dsWr8e_rYsclUwIdB4'
});

module.exports = cloudinary