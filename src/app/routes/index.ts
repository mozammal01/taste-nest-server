import { Router } from "express";
import { MenuRoutes } from "../module/menu/menu.routes.js";
import { CartRoutes } from "../module/cart/cart.routes.js";
import { OrderRoutes } from "../module/order/order.routes.js";
import { UserRoutes } from "../module/user/user.routes.js";
import { PaymentRoutes } from "../module/payment/payment.routes.js";
import { AdminRoutes } from "../module/admin/admin.routes.js";
import { UploadRoutes } from "../module/upload/upload.routes.js";
import { ReservationRoutes } from "../module/reservation/reservation.routes.js";
import { FavoriteRoutes } from "../module/favorite/favorite.routes.js";
import { RewardRoutes } from "../module/reward/reward.routes.js";

const router = Router();

const moduleRoutes = [
    {
        path: "/menu",
        route: MenuRoutes
    },
    {
        path: "/cart",
        route: CartRoutes
    },
    {
        path: "/order",
        route: OrderRoutes
    },
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/payment",
        route: PaymentRoutes
    },
    {
        path: "/admin",
        route: AdminRoutes
    },
    {
        path: "/upload",
        route: UploadRoutes
    },
    {
        path: "/reservation",
        route: ReservationRoutes
    },
    {
        path: "/favorite",
        route: FavoriteRoutes
    },
    {
        path: "/reward",
        route: RewardRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
