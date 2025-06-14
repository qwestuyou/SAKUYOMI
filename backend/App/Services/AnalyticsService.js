import prisma from "../../prisma/client.js";
import { subDays } from "date-fns";

const AnalyticsService = {
    async getProductCategoryDistribution() {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });

        return categories.map(cat => ({
            category: cat.name,
            productCount: cat._count.products
        }));
    },

    async getAverageRatingByCategory({ categoryId }) {
        const whereClause = categoryId ? { id: categoryId } : {};
        const categories = await prisma.category.findMany({
            where: whereClause,
            include: {
                products: {
                    include: {
                        reviews: true
                    }
                }
            }
        });

        return categories.map(cat => {
            const allRatings = cat.products.flatMap(p => p.reviews.map(r => r.rating));
            const avg = allRatings.length
                ? allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length
                : 0;

            return {
                category: cat.name,
                averageRating: Math.round(avg * 10) / 10
            };
        });
    },

    async getAveragePriceByCategory() {
        const categories = await prisma.category.findMany({
            include: {
                products: true
            }
        });

        return categories.map(cat => {
            const prices = cat.products.map(p => p.price);
            const avg = prices.length
                ? prices.reduce((sum, p) => sum + p, 0) / prices.length
                : 0;

            return {
                category: cat.name,
                averagePrice: Math.round(avg * 100) / 100
            };
        });
    },

    async getTopProductsByOrders(limit = 10) {
        const top = await prisma.orderItem.groupBy({
            by: ['productId'],
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: 'desc' } },
            take: limit
        });

        const productIds = top.map(t => t.productId);
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } }
        });

        return top.map(t => {
            const product = products.find(p => p.id === t.productId);
            return {
                name: product?.name || "Unknown",
                orderCount: t._sum.quantity
            };
        });
    },

    async getRevenueByCategory() {
        const categories = await prisma.category.findMany({
            include: {
                products: {
                    include: {
                        orderItems: true
                    }
                }
            }
        });

        return categories.map(cat => {
            const revenue = cat.products.reduce((sum, p) => {
                return sum + p.orderItems.reduce((s, item) => s + item.quantity * p.price, 0);
            }, 0);

            return {
                category: cat.name,
                revenue: Math.round(revenue * 100) / 100
            };
        });
    },

    async getSalesOverTime({ startDate, endDate }) {
        const where = {};
        if (startDate && endDate) {
            where.createdAt = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        }

        const orders = await prisma.order.findMany({
            where,
            select: {
                createdAt: true,
                items: {
                    select: {
                        quantity: true,
                        product: { select: { price: true } }
                    }
                }
            }
        });

        const daily = {};

        for (const order of orders) {
            const date = order.createdAt.toISOString().split("T")[0];
            const revenue = order.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
            daily[date] = (daily[date] || 0) + revenue;
        }

        return Object.entries(daily).map(([date, revenue]) => ({
            date,
            revenue: Math.round(revenue * 100) / 100
        }));
    },

    async getCartToOrderFunnel() {
        const cartItems = await prisma.cartItem.count();
        const orderItems = await prisma.orderItem.count();

        return {
            cartItems,
            orderItems
        };
    },

    async getPriceRangeDistribution() {
        const products = await prisma.product.findMany({
            select: { price: true }
        });

        const ranges = {
            "0-10": 0,
            "10-20": 0,
            "20-50": 0,
            "50+": 0
        };

        for (const p of products) {
            if (p.price < 10) ranges["0-10"]++;
            else if (p.price < 20) ranges["10-20"]++;
            else if (p.price < 50) ranges["20-50"]++;
            else ranges["50+"]++;
        }

        return Object.entries(ranges).map(([range, count]) => ({
            range,
            count
        }));
    }
};

export default AnalyticsService;
