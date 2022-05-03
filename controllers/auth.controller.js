const AuthModel = require("../models/auth.model");

const {
    createAccessToken,
    createRefreshToken,
    verifyAccesToken,
    verifyRefreshToken
} = require("../const/jwt.const")

class AuthController {
    // 1. Register User
    static async registerUser(req, res) {
        try {
            const userData = req.body;
            console.log(userData)

            const registeredUser = await AuthModel.createUser(userData);
            res.status(201).send(registeredUser);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    // 2. Login User
    static async loginUser(req, res) {
        try {
            const credentials = req.body;
            console.log(credentials)

            const user = await AuthModel.loginUser(credentials);
            console.log("USER", user)
            // Create Access token and Refresh token, save Refresh token to DB, creaete Refresh token cookie,
            // send cookie and tokens to the client 
            const token = createAccessToken(user.id, user.role);
            console.log("TOKEN", token)
            const refreshToken = createRefreshToken(user.id);
            console.log("REFRESH TOKEN", refreshToken)

            await AuthModel.saveRefreshToken(user.id, refreshToken)

            res.cookie("refresh-token", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/refresh-token"
            });

            res.status(200).send({ user, token, refreshToken });
        } catch (error) {
            console.log(error);
            res.status(401).send(error);
        }
    }

    // 3. Logout User
    static async logoutUser(req, res) {
        try {
            const userId = req.params.id;
            console.log("USER ID LOGOUT", userId);
            await AuthModel.deleteRefreshToken(userId);
            res.sendStatus(200);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }

    // 4. Refresh Token endpoint
    static async refreshAccessToken(req, res) {
        try {
            const refreshToken = req.cookies["refresh-token"];
            console.log("COOKIES: ", req.cookies)
            console.log("REFRESH TOKEN: ", refreshToken)
            if (!refreshToken) return res.sendStatus(403);

            const { userId } = verifyRefreshToken(refreshToken);
            console.log(userId);
            const foundUser = await AuthModel.getUserById(userId);
            console.log("FOUND USER: ", foundUser);

            if (!foundUser) return res.sendStatus(403);

            if (refreshToken !== foundUser.refreshToken) return res.sendStatus(403);

            const token = createAccessToken(foundUser.id, foundUser.role);
            console.log("TOKEN: ", token)
            res.status(200).send({ token });

        } catch (error) {
            console.log(error);
            res.status(403).send(error);
        }
    }
}

module.exports = AuthController;