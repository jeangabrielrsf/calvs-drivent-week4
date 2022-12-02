import { prisma } from "@/config";
import { Booking } from "@prisma/client";

//type findBookingReturn = Omit<Booking, 'userId' | 'roomId' | 'createdAt' | 'updatedAt'>;

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

async function findBookingsForARoom(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
  });
}

async function createBooking(userId: number, roomId: number) {
  const response = await prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });

  return response;
}

const bookingRepository = {
  findBookingByUserId,
  createBooking,
  findBookingsForARoom,
};

export default bookingRepository;
