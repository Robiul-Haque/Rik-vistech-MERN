const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL = process.env.DB_URL;

module.exports = () => {
    if (mongoose.connection.readyState === 0) {
        mongoose.connect(DB_URL)
            .then(() => {
                console.log('Connected to the database');
            })
            .catch((error) => {
                console.error('Failed to connect to the database:', error);
            });

    } else {
        console.log('Already connected to MongoDB');
    }
}
