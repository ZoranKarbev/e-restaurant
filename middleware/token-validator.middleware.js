const { verifyAccesToken } = require("../const/jwt.const");
const AuthModel = require("../models/auth.model");

const tokenValidator = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) return res.sendStatus(403);

        console.log("AUTHORIZATION HEADER", authorizationHeader)
        const token = authorizationHeader.split(" ")[1];
        console.log("TOKEN", token)
        //veryfying token and extracting the payload
        const { userId } = verifyAccesToken(token);
        console.log("USER ID:", userId)

        const user = await AuthModel.getUserById(userId);
        if (!user) return res.sendStatus(403);

        next();

    } catch (error) {
        console.log(error);
        res.sendStatus(403);
    }
}

module.exports = tokenValidator;