import { z } from 'zod';

export const rideRequestSchema = z.object({
  pickup: z.object({
    name: z.string().min(2).optional(),
    lat: z.number(),
    lng: z.number(),
  }),
  dropoff: z.object({
    name: z.string().min(2).optional(),
    lat: z.number(),
    lng: z.number(),
  }),
  seats: z.number().int().min(1).max(4).default(1),
  carpool: z.boolean().optional().default(false),
});
