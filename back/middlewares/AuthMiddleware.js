// Modules
const jwt = require("jsonwebtoken");

// Exception
const ApiError = require("../exceptions/ApiError");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        // Getting token from headers
        const token = req.headers.authorization.split(" ")[1];

        // handling error
        if (!token) {
            return ApiError.UnauthorizedError();
        }

        // decoding token
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET_KEY,
            function (err, decoded) {
                if (err) {
                    throw err;
                } else {
                    return decoded;
                }
            }
        );

        // adding to request
        req.user = decodedToken;
        next();
    } catch (e) {
        console.log("Ошибка при авторизации: ", e);
        return next(ApiError.UnauthorizedError());
    }
};
