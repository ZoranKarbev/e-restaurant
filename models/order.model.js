const DishModel = require("../models/dish.model");
const DataService = require("../services/data.service");
const path = require("path");
const ordersPath = path.join(__dirname, "..", "db", "orders.json");
const { v4: uuid } = require("uuid");

class OrderModel {
    // 1. Get all Orders
    static async getAllOrders() {
        return DataService.readJSONFile(ordersPath);
    }

    // 2. Get orders by ID
    static async getOrderById(orderId) {
        const orders = await this.getAllOrders();
        const foundOrder = orders.find(order => order.id === orderId);
        if (foundOrder) {
            return foundOrder;
        } else {
            return Promise.reject({ msg: "Order not found" });
        }
    }

    // 3. Add new Order
    static async addNewOrder(newOrderData) {
        const dishes = await DishModel.getAllDishes();
        const orders = await this.getAllOrders();

        const newOrderDishName = newOrderData.dishName;
        if (!newOrderDishName) return Promise.reject(
            { msg: `Invalid dish name in the order!` }
        );

        const dishExists = dishes.some(
            dish => dish.name.toLowerCase() === newOrderDishName.toLowerCase()
        );

        if (!dishExists) return Promise.reject(
            { msg: `Sorry, we don't have ${newOrderDishName} in the menu!` }
        );

        const newOrder = { id: uuid(), ...newOrderData, status: "new" };
        const updatedOrders = [...orders, newOrder];

        await DataService.saveJSONFile(ordersPath, updatedOrders);

        return newOrder;
    }

    // 4. Update Order
    static async updateOrder(orderId, orderUpdatedData) {
        const orders = await this.getAllOrders();
        const foundOrder = await this.getOrderById(orderId);

        const updatedOrder = { ...foundOrder, ...orderUpdatedData };

        const updatedOrders = orders.map(
            order => order.id === foundOrder.id ? updatedOrder : order
        );

        await DataService.saveJSONFile(ordersPath, updatedOrders);
    }

    // 5. Delete Order
    static async deleteOrder(orderId) {
        const orders = await this.getAllOrders();

        const updatedOrders = orders.filter(
            order => order.id !== orderId
        );

        if (updatedOrders.length === orders.length) {
            return Promise.reject({ msg: "Order not found!" })
        }

        await DataService.saveJSONFile(ordersPath, updatedOrders);
    }
}

module.exports = OrderModel;