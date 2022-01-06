// Modules
require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 5001;
const app = express();

app.listen(PORT, () => `Сервер запущен! Порт ${PORT}`);
