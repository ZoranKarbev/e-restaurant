const router = require("express").Router();
const DishController = require("../controllers/dish.controller");
const dishPriceValidator = require("../middleware/dish-price-validator.middleware");
const dishValidator = require("../middleware/dish-validator.middleware");

// 1. Get all Dishes
router.get("/all", DishController.getAllDishes);

// 2. Get dishes by ID
router.get("/:id", DishController.getDishById);

// 3. Add new Dishes
router.post("/add", dishPriceValidator, dishValidator, DishController.addNewDish);

// 4. Update Dish
router.patch("/:id/update", dishPriceValidator, DishController.updateDish);

// 5. Delete dish
router.delete("/:id", DishController.deleteDish);

module.exports = router;