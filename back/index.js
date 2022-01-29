// Modules
require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const AuthRoutes = require("./routes/AuthRoutes");
const FileRoutes = require("./routes/FileRoutes");

// Middlewares
const ErrorMiddleware = require("./middlewares/ErrorMiddleware");

const PORT = process.env.PORT || 5001;

const app = express();

app.use(fileUpload({}));
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
app.use(express.static(process.env.STATIC_DIR_NAME));

// routes
app.use("/api/auth", AuthRoutes);
app.use("/api/files", FileRoutes);

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
