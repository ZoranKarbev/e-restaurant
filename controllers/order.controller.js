const OrderModel = require("../models/order.model");

class OrderController {
    // 1. Get all Orders
    static async getAllOrders(req, res) {
        try {
            const orders = await OrderModel.getAllOrders();
            res.status(200).send(orders);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // 2. Get Orders by ID
    static async getOrderById(req, res) {
        try {
            const { id: orderId } = req.params;
            const order = await OrderModel.getOrderById(orderId);
            res.status(200).send(order);
        } catch (error) {
            res.status(400).send(error);

        }
    }
    // 3. Add new Order
    static async addNewOrder(req, res) {
        try {
            const newOrder = req.body;
            const createdOrder = await OrderModel.addNewOrder(newOrder);
            res.status(201).send(createdOrder);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // 4. Update Order
    static async updateOrder(req, res) {
        try {
            const orderId = req.params.id;
            const orderUpdates = req.body;

            if (!orderUpdates.dishName) return res.status(400).send({ msg: "\"dishName\" is required" });
            if (orderUpdates.id) return res.status(400).send({ msg: "Invalid update!" });

            await OrderModel.updateOrder(orderId, orderUpdates);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // 5. Update Order status
    static async updateOrderStatus(req, res) {
        try {
            const orderId = req.params.id;
            const orderStatus = { status: req.body.status };
            await OrderModel.updateOrder(orderId, orderStatus);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // 6. Delete Order
    static async deleteOrder(req, res) {
        try {
            const orderId = req.params.id;
            await OrderModel.deleteOrder(orderId);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = OrderController;