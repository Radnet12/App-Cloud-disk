const ApiError = require("../exceptions/ApiError");

module.exports = (err, req, res, next) => {
    console.log("Описание ошибки: ", err);

    if (err instanceof ApiError || (err?.status && err?.message)) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }

    return res.status(500).json({message: "Непредвиденная ошибка!"})
};
