require('dotenv').config();
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const { User } = require('../models/models');

exports.productUploadDescriptionImages = async (req, res) => {
    try {
        const images = req.files;
        const sources = [];

        for (let img in images) {
            const imgName = uuid.v4() + '.jpg';
            await images[img].mv(path.resolve(__dirname, '..', 'static', 'images', 'product-description', imgName));
            sources.push(imgName);
        }

        res.json({ sources });

    } catch (error) {
        console.log("ProductDescription Upload images Error:", error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.productRemoveDescriptionImage = (req, res) => {
    try {
        console.log('req.body', req.body);

        const { imageSrc } = req.body;
        const splitedSrc = imageSrc.split('/');
        const imageName = splitedSrc[splitedSrc.length - 1];


        fs.unlink(path.resolve(__dirname, '..', 'static', 'images', 'product-description', imageName), (err) => {
            if (err) res.json({ success: false });
        });

        res.json({ success: true });

    } catch (error) {
        console.log("ProductDescription Remove image Error:", error.message);
        res.status(500).json({ error: error.message });
    }
}