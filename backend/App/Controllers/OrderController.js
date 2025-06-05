import prisma from "../../prisma/client.js";
import OrderService from "../Services/OrderService.js";

const OrderController = {
    async index(req, res) {
        try {
            const orders = await OrderService.getAllOrders(req.user.id);
            res.json(orders);
        } catch (error) {
            res.status(500).json({error: "Failed to load orders", message: error.message});
        }
    },

    async show(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({error: "Invalid order ID"});
        }

        try {
            const order = await OrderService.getOrderById(id);
            if (!order || order.userId !== req.user.id) {
                return res.status(404).json({error: "Order not found"});
            }

            res.json(order);
        } catch (err) {
            res.status(500).json({error: "Failed to fetch order", message: err.message});
        }
    },

    async update(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({error: "Invalid order ID"});
        }

        try {
            const updatedOrder = await OrderService.updateOrder(id, req.body);
            res.json(updatedOrder);
        } catch (err) {
            res.status(500).json({error: "Failed to update order", message: err.message});
        }
    },

    async pay(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({error: "Invalid order ID"});
        }

        try {
            const order = await OrderService.updateOrder(id, {status: "paid"});
            res.json({success: true, order});
        } catch (err) {
            res.status(500).json({error: "Failed to mark as paid", message: err.message});
        }
    },
};

export default OrderController;
