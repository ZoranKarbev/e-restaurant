const router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const orderValidator = require("../middleware/order-validator.middleware");
const tokenValidator = require("../middleware/token-validator.middleware");
const adminValidator = require("../middleware/admin-validator.middleware");

router.use(tokenValidator);

// 1. Get all Orders
router.get("/all", adminValidator, OrderController.getAllOrders);

// 2. Get Orders by ID
router.get("/:id", adminValidator, OrderController.getOrderById);

// 3. Add new Orders
router.post("/add", orderValidator, OrderController.addNewOrder);
// POST Order (validate that one only one order is recieved in the body with a middleware)

// 4. Update Order
router.patch("/:id/update", adminValidator, orderValidator, OrderController.updateOrder);

// 5. Update Order status
router.patch("/:id/status", adminValidator, orderValidator, OrderController.updateOrderStatus);

// 6. Delete Order
router.delete("/:id", adminValidator, OrderController.deleteOrder);

module.exports = router;