const router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const orderValidator = require("../middleware/order-validator.middleware");

// 1. Get all Orders
router.get("/all", OrderController.getAllOrders);

// 2. Get Orders by ID
router.get("/:id", OrderController.getOrderById);

// 3. Add new Orders
router.post("/add", orderValidator, OrderController.addNewOrder);
// POST Order (validate that one only one order is recieved in the body with a middleware)

// 4. Update Order
router.patch("/:id/update", orderValidator, OrderController.updateOrder);

// 5. Update Order status
router.patch("/:id/status", orderValidator, OrderController.updateOrderStatus);

// 6. Delete Order
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;