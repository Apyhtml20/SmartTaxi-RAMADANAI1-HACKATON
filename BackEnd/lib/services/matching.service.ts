import { getLatestLocationsForAvailableDrivers } from '@/lib/services/driver.service';
import { haversineKm } from '@/lib/geo';

export async function recommendDriver(pickupLat: number, pickupLng: number) {
  const drivers = await getLatestLocationsForAvailableDrivers(200);
  if (drivers.length === 0) return null;

  const scored = drivers
    .map(d => ({
      driverId: d.driverId,
      distKm: haversineKm(pickupLat, pickupLng, d.lat, d.lng),
    }))
    .sort((a,b) => a.distKm - b.distKm);

  return { recommended: scored[0], top5: scored.slice(0,5) };
}
