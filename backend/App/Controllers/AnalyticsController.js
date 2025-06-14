import AnalyticsService from "../Services/AnalyticsService.js";

const AnalyticsController = {
    async productCategoryDistribution(req, res) {
        const data = await AnalyticsService.getProductCategoryDistribution();
        res.json(data);
    },
    async averageRatingByCategory(req, res) {
        const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : null;
        const data = await AnalyticsService.getAverageRatingByCategory({ categoryId });
        res.json(data);
    },
    async averagePriceByCategory(req, res) {
        const data = await AnalyticsService.getAveragePriceByCategory();
        res.json(data);
    },
    async topProductsByOrders(req, res) {
        const data = await AnalyticsService.getTopProductsByOrders();
        res.json(data);
    },
    async revenueByCategory(req, res) {
        const data = await AnalyticsService.getRevenueByCategory();
        res.json(data);
    },
    async salesOverTime(req, res) {
        const { startDate, endDate } = req.query;
        const data = await AnalyticsService.getSalesOverTime({ startDate, endDate });
        res.json(data);
    },
    async cartToOrderFunnel(req, res) {
        const data = await AnalyticsService.getCartToOrderFunnel();
        res.json(data);
    },
    async priceRangeDistribution(req, res) {
        const data = await AnalyticsService.getPriceRangeDistribution();
        res.json(data);
    },
};

export default AnalyticsController;
