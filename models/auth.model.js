const DataService = require("../services/data.service");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");
const path = require("path");
const usersPath = path.join(__dirname, "..", "db", "users.json");

class User {
    constructor(firstName, lastName, age, email, password, role = "user") {
        this.id = uuid();
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
        this.role = role
    }
}

class AuthModel {
    static async getAllUsers() {
        return DataService.readJSONFile(usersPath);
    }

    static async getUserById(userId) {
        console.log("USER ID", userId)
        const users = await this.getAllUsers();
        console.log("USERS", users)
        const foundUser = users.find(user => user.id === userId);
        console.log("FOUND USER", foundUser)
        return foundUser;
    }

    // 1. Create User
    static async createUser(userData) {
        // check if the user exist
        const users = await this.getAllUsers();
        const userExists = users.some(user => user.email === userData.email);
        if (userExists) return Promise.reject({ msg: "Email already exists" });

        // Hashing the user's password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        console.log("Hashed password", hashedPassword);

        // Create new User
        const newUser = new User(
            userData.firstName,
            userData.lastName,
            userData.age,
            userData.email,
            hashedPassword
        )
        console.log("This is new user: ", newUser);

        //Updating and saving users to db
        const updatedUsers = [...users, newUser];
        await DataService.saveJSONFile(usersPath, updatedUsers);

        // Remove hashed password before sending user data to client
        const { password, ...userWithoutPassword } = newUser;
        console.log("New user without password: ", userWithoutPassword);
        return userWithoutPassword;
    }

    // 2. Login User
    static async loginUser(credentials) {
        const { email, password } = credentials;
        const users = await this.getAllUsers();

        const foundUser = users.find(user => user.email === email);

        if (!foundUser) return Promise.reject({ msg: "Invalid Credentials" });
        console.log("FOUND USER", foundUser)

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) return Promise.reject({ msg: "Invalid Credentials" });

        const { password: hashedPassword, ...userWithoutPassword } = foundUser;
        return userWithoutPassword;
    }

    // 3. Save refresh token
    static async saveRefreshToken(userId, refreshToken) {
        const users = await this.getAllUsers();
        console.log(users)
        const updatedUsers = users.map(user => {
            if (user.id === userId) {
                user.refreshToken = refreshToken;
                return user;
            }
            return user;
        });
        await DataService.saveJSONFile(usersPath, updatedUsers);
    }

    // 4. Delete refresh token
    static async deleteRefreshToken(userId) {
        const users = await this.getAllUsers();
        const updatedUsers = users.map(user => {
            if (user.id === userId) {
                user.refreshToken = null;
                return user;
            }
            return user;
        });

        await DataService.saveJSONFile(usersPath, updatedUsers);
    }
}

module.exports = AuthModel;