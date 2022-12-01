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

const bookingRepository = {
  findBookingByUserId,
};

export default bookingRepository;
