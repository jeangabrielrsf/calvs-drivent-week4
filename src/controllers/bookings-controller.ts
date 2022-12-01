import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/bookings-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function listBookings(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const result = await bookingService.getBooking(userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name == "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}
