const { verifyAccesToken } = require("../const/jwt.const");
const AuthModel = require("../models/auth.model");

const adminValidator = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];

        //veryfying token and extracting the payload
        const { userId, userRole } = verifyAccesToken(token);

        const user = await AuthModel.getUserById(userId);

        if (user.role.toLowerCase() === "admin" && userRole.toLowerCase() === "admin") {
            next();
            // Дали има потреба вака да го проверувам "user role-от" од датабазата или доволно е 
            //  да се проверува само од токенот? Сигурно ќе биде побрзо без да се повикува датабазата.
        } else {
            res.sendStatus(403);
        }
    } catch (error) {
        res.sendStatus(403);
    }
}

module.exports = adminValidator;