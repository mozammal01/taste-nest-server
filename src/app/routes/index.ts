import { Router } from "express";
import { MenuRoutes } from "../module/menu/menu.routes";
import { CartRoutes } from "../module/cart/cart.routes";
import { OrderRoutes } from "../module/order/order.routes";

import { UserRoutes } from "../module/user/user.routes";
import { PaymentRoutes } from "../module/payment/payment.routes";
import { AdminRoutes } from "../module/admin/admin.routes";
import { UploadRoutes } from "../module/upload/upload.routes";
import { ReservationRoutes } from "../module/reservation/reservation.routes";
import { FavoriteRoutes } from "../module/favorite/favorite.routes";
import { RewardRoutes } from "../module/reward/reward.routes";

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
