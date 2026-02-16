import { prisma } from '@/lib/prisma';
import { recommendDriver } from '@/lib/services/matching.service';

export async function requestRide(passengerId: number, input: {
  pickupLat: number; pickupLng: number; pickupName?: string | null;
  dropLat: number; dropLng: number; dropName?: string | null;
  seats: number; carpool: boolean;
}) {
  const rideReq = await prisma.rideRequest.create({
    data: {
      passengerId,
      pickupLat: input.pickupLat,
      pickupLng: input.pickupLng,
      pickupName: input.pickupName ?? null,
      dropLat: input.dropLat,
      dropLng: input.dropLng,
      dropName: input.dropName ?? null,
      seats: input.seats,
      carpool: input.carpool,
      status: 'REQUESTED',
    }
  });

  const rec = await recommendDriver(input.pickupLat, input.pickupLng);
  if (rec?.recommended) {
    await prisma.rideRequest.update({
      where: { id: rideReq.id },
      data: { status: 'ASSIGNED', assignedDriverId: rec.recommended.driverId }
    });
  }

  const updated = await prisma.rideRequest.findUnique({ where: { id: rideReq.id } });
  return { ride: updated, matching: rec };
}

export async function updateRideStatus(rideRequestId: number, status: 'PICKED_UP'|'COMPLETED'|'CANCELLED') {
  return prisma.rideRequest.update({ where: { id: rideRequestId }, data: { status } });
}

export async function getRide(id: number) {
  return prisma.rideRequest.findUnique({ where: { id } });
}
