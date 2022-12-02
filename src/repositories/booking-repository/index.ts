import { prisma } from "@/config";
import { Booking } from "@prisma/client";

//type findBookingReturn = Omit<Booking, 'userId' | 'roomId' | 'createdAt' | 'updatedAt'>;

async function findBookingByUserId(userId: number) {
  const response = await prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
  delete response.createdAt;
  delete response.updatedAt;
  delete response.roomId;
  delete response.userId;
  return response;
}

async function createBooking(userId: number, roomId: number) {
  const response = await prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
  delete response.createdAt;
  delete response.id;
  delete response.updatedAt;
  delete response.userId;
  return response;
}

const bookingRepository = {
  findBookingByUserId,
  createBooking,
};

export default bookingRepository;
