import { prisma } from '@/lib/prisma';

// Very simple KPI placeholder for hackathon demo.
export async function driverKpis(driverUserId: number) {
  const driver = await prisma.driver.findUnique({ where: { userId: driverUserId } });
  if (!driver) throw new Error('DRIVER_NOT_FOUND');

  const assigned = await prisma.rideRequest.count({ where: { assignedDriverId: driver.id } });
  const completed = await prisma.rideRequest.count({ where: { assignedDriverId: driver.id, status: 'COMPLETED' } });
  const emptyRideRate = assigned === 0 ? 0 : Math.max(0, Math.round(((assigned - completed) / assigned) * 100));

  // Fake numbers for demo; you can replace by real fare calc later.
  const earningsToday = 1200 + completed * 25;
  const optimizedTrips = completed;
  const efficiencyIndex = Math.min(100, 70 + completed * 3);

  return { earningsToday, emptyRideRate, optimizedTrips, efficiencyIndex };
}
