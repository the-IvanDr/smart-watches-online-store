require('dotenv').config();
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const { User } = require('../models/models');


const PATH_STATIC_IMAGES_PRODUCT_DESCRIPTION = path.resolve(__dirname, '..', 'static', 'images', 'product-description');
const PATH_STATIC_IMAGES_PRODUCT_MAIN = path.resolve(__dirname, '..', 'static', 'images', 'main');



const parseImageNameFromSrc = (imageSrc) => {
    const splitedSrc = imageSrc.split('/');
    return splitedSrc[splitedSrc.length - 1];
}



exports.product = {
    UploadMainImage: async (req, res) => {
        try {
            const { image } = req.files;
            const imgName = uuid.v4() + '.jpg';

            await image.mv(path.resolve(PATH_STATIC_IMAGES_PRODUCT_MAIN, imgName));

            res.json({ src: imgName });

        } catch (error) {

            console.log('ERROR: ', error.message);
            res.status(500).json({ error: error.message });
        }
    },

    RemoveMainImage: async (req, res) => {
        try {
            const { imageSrc } = req.body;
            const imageName = parseImageNameFromSrc(imageSrc);

            await fs.unlink(path.resolve(PATH_STATIC_IMAGES_PRODUCT_MAIN, imageName), (error) => {
                if(error) return res.json({ success: false });
                else return res.json({ success: true });
            });

        } catch (error) {
            console.log('Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    },

    UploadDescriptionImage: async (req, res) => {
        try {
            const images = req.files;
            const sources = [];

            for (let img in images) {
                const imgName = uuid.v4() + '.jpg';
                await images[img].mv(path.resolve(PATH_STATIC_IMAGES_PRODUCT_DESCRIPTION, imgName));
                sources.push(imgName);
            }

            res.json({ sources });

        } catch (error) {
            console.log("ProductDescription Upload images Error:", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    RemoveDescriptionImage: async (req, res) => {
        try {
            const { imageSrc } = req.body;
            const imageName = parseImageNameFromSrc(imageSrc);

            await fs.unlink(path.resolve(PATH_STATIC_IMAGES_PRODUCT_DESCRIPTION, imageName), (error) => {
                if(error) return res.json({ success: false });
                else return res.json({ success: true });
            });

        } catch (error) {
            console.log("ProductDescription Remove image Error:", error.message);
            res.status(500).json({ error: error.message });
        }
    }
}