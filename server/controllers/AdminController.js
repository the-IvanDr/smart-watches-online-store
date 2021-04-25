require('dotenv').config();
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const { User, Brand, Type } = require('../models/models');


const PATH_STATIC_IMAGES_PRODUCT_DESCRIPTION = path.resolve(__dirname, '..', 'static', 'images', 'products', 'description');
const PATH_STATIC_IMAGES_PRODUCT_MAIN = path.resolve(__dirname, '..', 'static', 'images', 'products', 'main');
const PATH_STATIC_IMAGES_BRANDS = path.resolve(__dirname, '..', 'static', 'images', 'brands');


const parseImageNameFromSrc = (imageSrc) => {
    const splitedSrc = imageSrc.split('/');
    return splitedSrc[splitedSrc.length - 1];
}

const getImageUrl = (path, imgName) => {
    return `${process.env.SERVER_URL}/${path.split("static")[1]}/${imgName}`.replace(/\\/g, '/');
}


exports.product = {
    UploadMainImage: async (req, res) => {
        try {
            const { image } = req.files;
            const imgName = uuid.v4() + '.jpg';

            await image.mv(path.resolve(PATH_STATIC_IMAGES_PRODUCT_MAIN, imgName));
            const url = getImageUrl(PATH_STATIC_IMAGES_PRODUCT_MAIN, imgName);

            res.json({ src: url });

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
                if (error) return res.json({ success: false });
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
                const url = getImageUrl(PATH_STATIC_IMAGES_PRODUCT_DESCRIPTION, imgName);
                sources.push(url);
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
                if (error) return res.json({ success: false });
                else return res.json({ success: true });
            });

        } catch (error) {
            console.log("ProductDescription Remove image Error:", error.message);
            res.status(500).json({ error: error.message });
        }
    }
}

exports.brand = {
    GetList: async (req, res) => {
        try {
            const brands = await Brand.findAll();
            res.json({ brands });

        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    UploadImage: async (req, res) => {
        try {
            const { image } = req.files;
            const imgName = uuid.v4() + '.jpg';

            await image.mv(path.resolve(PATH_STATIC_IMAGES_BRANDS, imgName));
            const url = getImageUrl(PATH_STATIC_IMAGES_BRANDS, imgName);

            res.json({ src: url });

        } catch (error) {
            console.log('ERROR: ', error.message);
            res.status(500).json({ error: error.message });
        }
    },

    RemoveImage: async (req, res) => {
        try {
            const { imageSrc } = req.body;
            const imageName = parseImageNameFromSrc(imageSrc);

            await fs.unlink(path.resolve(PATH_STATIC_IMAGES_BRANDS, imageName), (error) => {
                if (error) return res.json({ success: false });
                else return res.json({ success: true });
            });

        } catch (error) {
            console.log('Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    },

    Create: async (req, res) => {
        try {
            const { photo, name } = req.body;

            const [_, created] = await Brand.findOrCreate({
                where: { name },
                defaults: { logoSrc: photo }
            });

            if (created) res.json({ success: true, message: 'Бренд успешно добавлен' });
            else res.json({ success: false, message: 'Такой бренд уже есть в базе' });

        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: error.message });
        }
    }
}

exports.type = {
    GetList: async (req, res) => {
        try {
            const types = await Type.findAll();
            res.json({ types });

        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    Create: async (req, res) => {
        try {
            const { name } = req.body;

            const [_, created] = await Type.findOrCreate({ where: { name } });

            if (created) res.json({ success: true, message: 'Тип успешно добавлен' });
            else res.json({ success: false, message: 'Такой тип уже есть' });

        } catch (error) {
            console.log("Error:", error.message);
            res.status(500).json({ error: error.message });
        }
    }
}