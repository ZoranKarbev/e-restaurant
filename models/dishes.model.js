const DataService = require("../services/data.service");
const path = require("path");
const dishesPath = path.join(__dirname, "..", "db", "dishes.json");
const { v4: uuid } = require("uuid");


class DishModel {
    // 1. Get all Dishes
    static async getAllDishes() {
        return DataService.readJSONFile(dishesPath);
    }

    // 2. Get dishes by ID
    static async getDishById(dishId) {
        const dishes = await this.getAllDishes();
        const foundDish = dishes.find(dish => dish.id === dishId);
        if (foundDish) {
            return foundDish;
        } else {
            return Promise.reject({ msg: "Dish not found" });
        }
    }

    // 3. Add new Dishes
    static async addNewDish(newDishData) {
        const dishes = await this.getAllDishes();
        const dishExists = dishes.some(dish => dish.name.toLowerCase() === newDishData.name.toLowerCase());
        if (dishExists) return Promise.reject({ msg: "Dish already exists!" });

        const newDish = { id: uuid(), ...newDishData };

        const updatedDishes = [...dishes, newDish];
        await DataService.saveJSONFile(dishesPath, updatedDishes);

        return newDish;
    }

    // 4. Update Dish
    static async updateDish(dishId, dishUpdatedData) {
        const dishes = await this.getAllDishes();
        const foundDish = await this.getDishById(dishId);

        const updatedDish = { ...foundDish, ...dishUpdatedData };
        const updatedDishes = dishes.map(
            dish => dish.id === foundDish.id ? updatedDish : dish
        );

        await DataService.saveJSONFile(dishesPath, updatedDishes);
    }

    // 5. Delete dish
    static async deleteDish(dishId) {
        const dishes = await this.getAllDishes();
        const updatedDishes = dishes.filter(
            dish => dish.id !== dishId
        );

        if (updatedDishes.length === dishes.length) {
            return Promise.reject({ msg: "Dish not found!" })
        }

        await DataService.saveJSONFile(dishesPath, updatedDishes);
    }
}

module.exports = DishModel;