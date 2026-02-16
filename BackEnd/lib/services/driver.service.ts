import { prisma } from '@/lib/prisma';

export async function setAvailability(userId: number, isAvailable: boolean) {
  return prisma.driver.update({
    where: { userId },
    data: { isAvailable },
    select: { id: true, isAvailable: true, updatedAt: true }
  });
}

export async function addLocation(userId: number, lat: number, lng: number, speed?: number | null) {
  const driver = await prisma.driver.findUnique({ where: { userId } });
  if (!driver) throw new Error('DRIVER_NOT_FOUND');
  await prisma.driverLocation.create({
    data: { driverId: driver.id, lat, lng, speed: speed ?? null }
  });
  return { ok: true };
}

export async function getLatestLocationsForAvailableDrivers(limit=200) {
  const drivers = await prisma.driver.findMany({
    where: { isAvailable: true },
    include: { locations: { orderBy: { updatedAt: 'desc' }, take: 1 } },
    take: limit,
  });
  return drivers
    .filter(d => d.locations.length > 0)
    .map(d => ({ driverId: d.id, userId: d.userId, lat: d.locations[0].lat, lng: d.locations[0].lng, updatedAt: d.locations[0].updatedAt }));
}
