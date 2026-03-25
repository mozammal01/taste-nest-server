import { Router } from "express";
import { MenuRoutes } from "../module/menu/menu.routes";
import { CartRoutes } from "../module/cart/cart.routes";
import { OrderRoutes } from "../module/order/order.routes";

import { UserRoutes } from "../module/user/user.routes";
import { PaymentRoutes } from "../module/payment/payment.routes";

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
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
