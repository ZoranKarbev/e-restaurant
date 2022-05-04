const { verifyAccesToken } = require("../const/jwt.const");
const AuthModel = require("../models/auth.model");

const tokenValidator = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) return res.sendStatus(403);

        const token = authorizationHeader.split(" ")[1];
        //veryfying token and extracting the payload
        const { userId } = verifyAccesToken(token);

        const user = await AuthModel.getUserById(userId);
        if (!user) return res.sendStatus(403);

        next();

    } catch (error) {
        res.sendStatus(403);
    }
}

module.exports = tokenValidator;