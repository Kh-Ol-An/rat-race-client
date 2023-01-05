require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}
start();
