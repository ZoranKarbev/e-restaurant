const router = require("express").Router();
const DishController = require("../controllers/dish.controller");
const dishPriceValidator = require("../middleware/dish-price-validator.middleware");
const dishValidator = require("../middleware/dish-validator.middleware");
const tokenValidator = require("../middleware/token-validator.middleware");
const adminValidator = require("../middleware/admin-validator.middleware");

router.use(tokenValidator);

// 1. Get all Dishes
router.get("/all", DishController.getAllDishes);

// 2. Get dishes by ID
router.get("/:id", DishController.getDishById);

// 3. Add new Dishes
router.post("/add", adminValidator, dishPriceValidator, dishValidator, DishController.addNewDish);

// 4. Update Dish
router.patch("/:id/update", adminValidator, dishPriceValidator, DishController.updateDish);

// 5. Delete dish
router.delete("/:id", adminValidator, DishController.deleteDish);

module.exports = router;