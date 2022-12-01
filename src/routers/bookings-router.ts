import { listBookings } from "@/controllers/bookings-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const bookingsRouter = Router();

bookingsRouter.all("/*", authenticateToken).get("/", listBookings);

export { bookingsRouter };
