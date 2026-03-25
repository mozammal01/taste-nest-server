import { Router } from "express";
import { MenuRoutes } from "../module/menu/menu.routes";
import { CartRoutes } from "../module/cart/cart.routes";
import { OrderRoutes } from "../module/order/order.routes";

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
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
