require('dotenv').config();
const express = require('express');
const { connectDB, disconnectDB} = require('./config/database');
const {productService} = require('./service/productService');

const app = express();

(async () => {
    await connectDB();
    app.use(express.json());
    await productService();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });

    await disconnectDB();
})();