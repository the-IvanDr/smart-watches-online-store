require('dotenv').config();
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const { User, Brand, Type, Product, ProductDetails } = require('../models/models');
const { Op } = require('sequelize');


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
    },

    GetList: async (req, res) => {
        try {
            let products = await Product.findAll();

            products = await Promise.all(products.map(async product => {
                const brand = await Brand.findOne({ where: { id: product.brandId } });
                const type = await Type.findOne({ where: { id: product.typeId } });

                delete product.dataValues.brandId;
                delete product.dataValues.typeId;

                return { ...product.dataValues, brand, type };
            }));

            res.json({ products });

        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    GetHits: async (req, res) => {
        try {
            let products = await Product.findAll({
                where: { is_hit: true }
            });

            products = await Promise.all(products.map(async product => {
                const brand = await Brand.findOne({ where: { id: product.brandId } });
                const type = await Type.findOne({ where: { id: product.typeId } });

                delete product.dataValues.brandId;
                delete product.dataValues.typeId;

                return { ...product.dataValues, brand, type };
            }));

            res.json({ products });

        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    GetNovelty: async (req, res) => {
        try {
            let products = await Product.findAll({
                where: { is_novelty: true }
            });

            products = await Promise.all(products.map(async product => {
                const brand = await Brand.findOne({ where: { id: product.brandId } });
                const type = await Type.findOne({ where: { id: product.typeId } });

                delete product.dataValues.brandId;
                delete product.dataValues.typeId;

                return { ...product.dataValues, brand, type };
            }));

            res.json({ products });

        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    GetByFilter: async (req, res) => {
        try {
            console.log('req.body', req.body);

            const { character, icons, price, brands, sort } = req.body;

            let filter = {};

            // Sorting by character
            if (character == 'Женский') filter.is_for_woman = true;
            if (character == 'Мужской') filter.is_for_man = true;
            if (character == 'Детский') filter.is_for_kids = true;

            // Sorting by icons
            if (icons.novelty) filter.is_novelty = true;
            if (icons.hit) filter.is_hit = true;

            // Sorting by price
            if (price.min !== null) filter.price = { [Op.between]: [price.min, price.max] };

            // Sorting by brands
            const chosenBrands = brands.filter(brand => brand.active);
            if (chosenBrands.length) {
                Object.assign(filter, {
                    brandId: { [Op.in]: chosenBrands.map(brand => brand.id) }
                });
            }

            // Order
            const order = [];
            const chosenSort = sort.find(item => item.active);
            if(chosenSort.name === 'cheaper-first') order.push(['price', 'ASC']);
            else if (chosenSort.name === 'by-name') order.push(['name', 'ASC']);

            const products = await Product.findAll({ where: filter, order });

            res.json({ products });

        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    Create: async (req, res) => {
        try {
            console.log('req.body', req.body);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log('errors.array(): ', errors.array());

                return res.status(200).json({
                    errors: errors.array().map(error => error.msg),
                    message: "Некорректные данные"
                });
            }

            const data = req.body;

            const [productDetails] = await ProductDetails.findOrCreate({
                where: {
                    series: data.series,
                    os: data.os,
                    os_compatibility: data.osCompatibility,
                    watch_shape: data.watchShape,
                    body_material: data.bodyMaterial,
                    strap_material: data.strapMaterial,
                    body_color: data.bodyColor,
                    strap_color: data.strapColor,
                    display_type: data.displayType,
                    display_diagonal: data.displayDiagonal,
                    display_resolution: data.displayResolution,
                    monitoring: data.monitoring,
                    sensors: data.sensors,
                    battery_type: data.batteryType,
                    battery_capacity: data.batteryCapacity,
                    standby_time: data.standbyTime,
                    dimensions: data.dimensions,
                    weight: data.weight,
                    equipment: data.equipment,
                    features: data.features,
                    is_touch_display: data.isTouchDisplay,
                    is_replaceable_strap: data.isReplaceableStrap,
                    is_strap_length_adjusment: data.isStrapLengthAdjusment,
                    is_moisture_and_dust_protection: data.isMoistureAndDustProtection,
                    is_phone_calls: data.isPhoneCalls,
                    is_gps_support: data.isGpsSupport
                }
            });

            const [_, created] = await Product.findOrCreate({
                where: { name: data.title },
                defaults: {
                    imageSrc: data.mainImageSrc,
                    price: data.price,
                    article: data.article,
                    discount: data.discount,
                    is_novelty: data.isNovelty,
                    is_hit: data.isHit,
                    is_for_woman: data.character == 'Женский',
                    is_for_man: data.character == 'Мужской',
                    is_for_kids: data.character == 'Детский',
                    description: data.description,
                    typeId: data.typeId,
                    brandId: data.brandId,
                    productDetailId: productDetails.id
                }
            });

            if (created) return res.json({ success: true, message: 'Товар успешно добавлен' });
            else return res.json({ success: false, message: 'Товар с таким названием уже есть' });

        } catch (error) {
            console.log("Error: ", error.message);
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
    },

    Delete: async (req, res) => {
        try {
            const { id } = req.params;

            const brand = await Brand.findOne({ where: { id } });
            if (!brand) return res.json({ success: false, message: 'Бренд с таким id не найден' });

            const imageName = parseImageNameFromSrc(brand.logoSrc);

            await fs.unlink(path.resolve(PATH_STATIC_IMAGES_BRANDS, imageName), (error) => {
                if (error) return res.json({ success: false, message: 'Не удалось удалить изображение' });
            });

            await Brand.destroy({ where: { id } });

            res.json({ success: true });

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
    },

    Delete: async (req, res) => {
        try {
            const { id } = req.params;

            await Type.destroy({ where: { id } });

            return res.json({ success: true });

        } catch (error) {
            console.log("Error:", error.message);
            res.status(500).json({ error: error.message });
        }
    }
}