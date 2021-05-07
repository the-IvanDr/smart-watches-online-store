require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const sequelize = require('./db');


const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}))

// Static files directory
app.use(express.static('static'));

// API ROUTES (:ENDPOINTS)
app.use('/api/auth', require('./routes/auth.router'));
app.use('/api/admin', require('./routes/admin.router'));
app.use('/api/client', require('./routes/client.router'));



const PORT = process.env.PORT || 5500;

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(/*{ force: true }*/);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

    } catch (err) {
        console.log(err.message)
    }
}

start();