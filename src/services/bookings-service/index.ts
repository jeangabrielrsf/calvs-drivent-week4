import { notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { TicketStatus } from "@prisma/client";

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBookingByUserId(userId);
  if (!booking) {
    throw notFoundError();
  }
  const bookingResponse = {
    id: booking.id,
    Room: booking.Room,
  };
  return bookingResponse;
}

async function postBooking(roomId: number, userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
    // tem que ser forbidden. Fazer depois.
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (ticket.TicketType.isRemote || ticket.status != TicketStatus.PAID || ticket.TicketType.includesHotel === false) {
    throw notFoundError();
    // tem que ser forbidden. Fazer depois.
  }
  //checar sem roomId existe
  //checar se a room em questão tem vaga.

  await bookingRepository.createBooking(userId, roomId);
}

const bookingService = {
  getBooking,
  postBooking,
};

export default bookingService;
