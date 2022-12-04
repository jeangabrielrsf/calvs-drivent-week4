import { changeBooking, listBookings, makeBooking } from "@/controllers/bookings-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", listBookings)
  .post("/", makeBooking)
  .put("/:bookingId", changeBooking);

export { bookingsRouter };
