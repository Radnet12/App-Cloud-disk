// Modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ErrorMiddleware = require("./middlewares/ErrorMiddleware");

// Routes
const AuthRoutes = require("./routes/AuthRoutes");

const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());

// routes
app.use("/api/auth", AuthRoutes);

// ErrorMiddleware
app.use(ErrorMiddleware);

const startServer = async () => {
    try {
        // Connection to DB
        await mongoose.connect(process.env.DB_CONNECTION_URL);

        app.listen(PORT, () => console.log(`Сервер запущен! Порт ${PORT}`));
    } catch (e) {
        console.log("Ошибка при запуске сервера! Ошибка: ", e);
    }
};

startServer();
