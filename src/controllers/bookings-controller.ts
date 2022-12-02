import { requestError } from "@/errors";
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
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function makeBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  try {
    if (!roomId) {
      return requestError(httpStatus.BAD_REQUEST, "Bad Request Error");
    }
    const result = await bookingService.postBooking(roomId, userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
