const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const salt = 12;
const { User, Basket, Type, Brand, BrandType, Device, DeviceInfo } = require('../models/models');

module.exports = resolvers = {

    // Создание пользователя (возвращает пользователя)
    createUser: async ({ data }) => {
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const user = await User.create({
            name: data.name,
            role: data.role,
            email: data.email,
            password: hashedPassword
        });

        const basket = await Basket.create({
            userId: user.id
        });

        return user;
    },


    // Создание нового ТИПА
    createType: async ({ data }) => {
        console.log('createType: ', data);

        const [type, created] = await Type.findOrCreate({
            where: { name: data.name },
            defaults: { name: data.name }
        });

        if (created) return type;
        else throw new Error('Такой тип уже есть.');
    },

    // Создание нового БРЕНДА
    createBrand: async ({ data }) => {
        console.log('createBrand: ', data);

        const [brand, created] = await Brand.findOrCreate({
            where: { name: data.name },
            defaults: { name: data.name, icon: data.icon }
        });

        if (created) return brand;
        else throw new Error('Такой бренд уже есть.');
    },

    // Связывание Брэнда с типами
    connectBrandWithTypes: async (data) => {
        console.log(data);

        // Поиск бренда по даному ID. Если не удалось, сообщить об ошибке
        const brand = await Brand.findOne({ where: { id: data.brandId } });
        if (!brand) throw new Error('Бренд с таким ID не найден.');

        // Поиск типов по указанным ID. Если не удалось, сообщить об ошибке
        const types = await Type.findAll({
            where: {
                [Op.or]: data.typesId.map(id => ({ id }))
            }
        });
        if (!types) throw new Error('Типов с даными ID не найдено.');

        // Перенос id типов и бренда в таблицу связи "brand_types"
        data.typesId.forEach(async (id) => {
            await BrandType.findOrCreate({
                where: {
                    [Op.and]: [
                        { brandId: data.brandId },
                        { typeId: id }
                    ]
                },
                defaults: { brandId: data.brandId, typeId: id }
            });
        })

        // Вернуть читабельный результат: Брэнд и его типы (соответственно со схемой GraphQL)
        return {
            brand, types
        }
    },


    // Создание нового товара (устройства)
    createDevice: async ({ data }) => {
        console.log('CreateDevice:', data);

        // Добавление нового устройства в БД, если такого устройства еще нет
        const [device, created] = await Device.findOrCreate({
            where: { name: data.name },
            defaults: {
                name: data.name,
                price: data.price,
                old_price: data.old_price || null,
                is_novelty: data.is_novelty,
                image: data.image,
                description: data.description,
                brandId: data.brandId,
                typeId: data.typeId
            }
        });

        console.log('DEVICE: ', device.dataValues);
        if (!created) throw new Error('Такой товар уже есть.');


        // Добавление описаний устройства в БД 
        data.info.map(async (info) => {
            const [deviceInfo, created] = await DeviceInfo.findOrCreate({
                where: {
                    [Op.and]: [
                        { deviceId: device.dataValues.id },
                        { title: info.title },
                        { description: info.description }
                    ]
                },
                defaults: {
                    title: info.title,
                    description: info.description,
                    deviceId: device.dataValues.id
                }
            });

            if (!created) throw new Error('Странно, конечно, но такое описание устройства уже есть. Хм-хм-хм...');
        });


        return device.dataValues;
    }

}