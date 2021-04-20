require('dotenv').config();
const { User } = require('../models/models');

exports.productCreateSetDescriptionImages = (req, res) => {
    console.log("descrImages: ");
    console.log(req.files);

    res.json({message: "CREATE PRODUCT IMAGES"});
}