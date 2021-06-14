const sequelize = require('../db.js');
const { DataTypes, NOW } = require('sequelize');

// Визначення типу ідентифікатора
const ID_TYPE = {
    type: DataTypes.INTEGER, // Тип атрибуту 
    primaryKey: true, // Чи є атрибут первиним ключем
    autoIncrement: true // Чи збільшувати значення нового запису
};

// Користувач
const User = sequelize.define('user', {
    id: ID_TYPE, // Ідентифікатор (ключ)

    // Ім'я
    f_name: {
        type: DataTypes.STRING, // тип (строка)
        allowNull: false // чи можливо значення null (чи є поле обов'язковим)
    },
    l_name: { type: DataTypes.STRING, allowNull: false }, // Фамілія
    m_name: { type: DataTypes.STRING }, // По батькові (не обов'язкове поле)

    email: { type: DataTypes.STRING, unique: true }, // e-mail (унікальне значення)
    phone: { type: DataTypes.STRING }, // Телефон

    password: { type: DataTypes.STRING, allowNull: false }, // пароль

    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USER' } // роль (за замовчуванням "USER")
});

// Товар
const Product = sequelize.define('product', {
    id: ID_TYPE, // первинний ключ

    name: { type: DataTypes.STRING, allowNull: false }, // назва товару
    imageSrc: { type: DataTypes.STRING, allowNull: false }, // посилання на зображення товару

    article: { type: DataTypes.STRING, allowNull: false }, // артикул товару

    price: { type: DataTypes.INTEGER, allowNull: false }, // ціна товару
    discount: { type: DataTypes.INTEGER }, // знижка (%)

    is_novelty: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // чи є новинкою
    is_hit: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }, // чи є хітом

    is_for_woman: { type: DataTypes.BOOLEAN, allowNull: false }, // чи жіночий 
    is_for_man: { type: DataTypes.BOOLEAN, allowNull: false }, // чи чоловічий
    is_for_kids: { type: DataTypes.BOOLEAN, allowNull: false }, // чи дитячий

    description: { type: DataTypes.TEXT, allowNull: false } // опис товару
});

// Бренд
const Brand = sequelize.define('brand', {
    id: ID_TYPE,
    name: { type: DataTypes.STRING, allowNull: false },
    logoSrc: { type: DataTypes.STRING, allowNull: false }
});

// Тип
const Type = sequelize.define('type', {
    id: ID_TYPE,
    name: { type: DataTypes.STRING, allowNull: false }
});

// Описание товара
const ProductDetails = sequelize.define('product_detail', {
    id: ID_TYPE,

    series: DataTypes.STRING, // серия
    os: DataTypes.STRING, // ОС
    os_compatibility: DataTypes.STRING, // совместимость с ОС

    watch_shape: DataTypes.STRING, // форма часов
    body_material: DataTypes.STRING, // материал корпуса
    strap_material: DataTypes.STRING, // материал ремешка

    body_color: DataTypes.STRING, // цвет корпуса
    strap_color: DataTypes.STRING, // цвет ремешка

    display_type: DataTypes.STRING, // тип дисплея
    display_diagonal: DataTypes.STRING, // диагональ дисплея
    display_resolution: DataTypes.STRING, // разрешение дисплея

    monitoring: DataTypes.STRING, // мониторинг
    sensors: DataTypes.STRING, // датчики
    battery_type: DataTypes.STRING, // тип аккумулятора
    battery_capacity: DataTypes.STRING, // емкость аккумулятора
    standby_time: DataTypes.STRING, // время работы в режиме ожидания
    dimensions: DataTypes.STRING, // габариты
    weight: DataTypes.FLOAT, // вес в граммах
    equipment: DataTypes.STRING, // комплектация
    features: DataTypes.STRING, // особенности

    is_touch_display: DataTypes.BOOLEAN, // сенсорный дисплей (да/нет)
    is_replaceable_strap: DataTypes.BOOLEAN, // сменный ремешок (да/нет)
    is_strap_length_adjusment: DataTypes.BOOLEAN, // регулировка длины ремешка (да/нет)
    is_moisture_and_dust_protection: DataTypes.BOOLEAN, // защита от влаги и пыли (да/нет)
    is_phone_calls: DataTypes.BOOLEAN, // телефонные звонки (да/нет)
    is_gps_support: DataTypes.BOOLEAN // поддержка GPS (да/нет)
});


// Отзыв: связь
const Feedback = sequelize.define('feedback', {
    id: ID_TYPE,

    rate: { type: DataTypes.SMALLINT, allowNull: false, defaultValue: 1 },
    text: { type: DataTypes.TEXT, allowNull: false },
    time: { type: DataTypes.DATE, allowNull: false, defaultValue: NOW },
    user_name: { type: DataTypes.STRING, allowNull: false },
    user_email: { type: DataTypes.STRING, allowNull: false }
});
User.hasMany(Feedback);
Product.hasMany(Feedback);
Feedback.belongsTo(User);
Feedback.belongsTo(Product);


// Корзина: связь
const Basket = sequelize.define('basket', {
    id: ID_TYPE,
    total_price: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
});
Product.hasMany(Basket);
User.hasOne(Basket);
Basket.belongsTo(User);


// Оформленные заказы: связь
const PlacedOrder = sequelize.define('placed_order', {
    id: ID_TYPE,
    time: { type: DataTypes.DATE, allowNull: false, defaultValue: NOW },
    total_price: { type: DataTypes.INTEGER, allowNull: false },

    phone_number: { type: DataTypes.STRING, allowNull: false },
    customer_name: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    warehouse: { type: DataTypes.STRING },
    deliveryMethod: { type: DataTypes.STRING },
    paymentMethod: { type: DataTypes.STRING },
    productsJSON: { type: DataTypes.JSON }
});
Product.hasMany(PlacedOrder);
User.hasOne(PlacedOrder);
PlacedOrder.belongsTo(User);


// Товар "включает в себя": связь из ER-диаграммы
Type.hasMany(Product);
Brand.hasMany(Product);
ProductDetails.hasOne(Product);
Product.belongsTo(Type);
Product.belongsTo(Brand);
Product.belongsTo(ProductDetails);


module.exports = { User, Product, Brand, Type, ProductDetails, Feedback, Basket, PlacedOrder };