import express from "express";
import AnalyticsController from "../../App/Controllers/AnalyticsController.js";

const router = express.Router();

router.get("/product-category-distribution", AnalyticsController.productCategoryDistribution);
router.get("/average-rating-by-category", AnalyticsController.averageRatingByCategory);
router.get("/average-price-by-category", AnalyticsController.averagePriceByCategory);
router.get("/top-products-by-orders", AnalyticsController.topProductsByOrders);
router.get("/revenue-by-category", AnalyticsController.revenueByCategory);
router.get("/sales-over-time", AnalyticsController.salesOverTime);
router.get("/cart-to-order-funnel", AnalyticsController.cartToOrderFunnel);
router.get("/price-range-distribution", AnalyticsController.priceRangeDistribution);

export default router;
