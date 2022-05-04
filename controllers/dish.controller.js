const DishModel = require("../models/dish.model");

class DishController {
    // 1. Get all Dishes
    static async getAllDishes(req, res) {
        try {
            const dishes = await DishModel.getAllDishes();
            res.status(200).send(dishes);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // 2. Get dishes by ID
    static async getDishById(req, res) {
        try {
            const { id: dishId } = req.params;
            const dish = await DishModel.getDishById(dishId);
            res.status(200).send(dish);
        } catch (error) {
            res.status(400).send(error);

        }
    }
    // 3. Add new Dishes
    static async addNewDish(req, res) {
        try {
            const newDish = req.body;
            const createdDish = await DishModel.addNewDish(newDish);
            res.status(201).send(createdDish);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // 4. Update Dish
    static async updateDish(req, res) {
        try {
            const dishId = req.params.id;
            const dishUpdates = req.body;

            if (!dishUpdates.name) return res.status(400).send({ msg: "\"name\" is required" });
            if (dishUpdates.id) return res.status(400).send({ msg: "Invalid update!" });

            await DishModel.updateDish(dishId, dishUpdates);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    // 5. Delete dish
    static async deleteDish(req, res) {
        try {
            const dishId = req.params.id;
            await DishModel.deleteDish(dishId);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = DishController;