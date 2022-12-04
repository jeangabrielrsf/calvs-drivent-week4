import { notFoundError } from "@/errors";
import { forbiddenError } from "@/errors/forbbiden-error";
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
    throw forbiddenError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (ticket.TicketType.isRemote || ticket.status != TicketStatus.PAID || ticket.TicketType.includesHotel === false) {
    throw forbiddenError();
  }
  //checar sem roomId existe
  const room = await hotelRepository.findRoom(roomId);
  if (!room) {
    throw notFoundError();
  }
  //checar se a room em questão tem vaga.
  const roomBookings = await bookingRepository.findBookingsForARoom(roomId);
  if (roomBookings.length == room.capacity) {
    throw forbiddenError();
  }

  const bookingCreated = await bookingRepository.createBooking(userId, roomId);
  return bookingCreated.id;
}

async function putBooking(roomId: number, userId: number, bookingId: number) {
  const room = await hotelRepository.findRoom(roomId);
  if (!room) {
    throw notFoundError();
  }

  //checa se o quarto que o usuário quer está livre
  const roomBookings = await bookingRepository.findBookingsForARoom(roomId);
  if (roomBookings.length == room.capacity || room.capacity == 0) {
    throw forbiddenError();
  }

  //checar se o usuário tem reserva
  const userBooking = await bookingRepository.findBookingByUserId(userId);
  if (!userBooking) {
    throw notFoundError();
  }

  const response = await bookingRepository.updateBooking(bookingId, roomId);

  return response.id;
}

const bookingService = {
  getBooking,
  postBooking,
  putBooking,
};

export default bookingService;
