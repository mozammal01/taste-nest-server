import { Router } from "express";
import { MenuRoutes } from "../module/menu/menu.routes";
import { CartRoutes } from "../module/cart/cart.routes";
import orderRoutes from "../../routes/order"; // Still using the basic one in src/routes/order.ts temporarily

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
        route: orderRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
