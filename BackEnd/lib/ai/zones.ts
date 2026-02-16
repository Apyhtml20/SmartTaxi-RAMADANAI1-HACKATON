// lib/ai/zones.ts
export type Zone = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  demand: number; // 0..100
};

export const zones: Zone[] = [
  { id: "gueliz", name: "Gueliz", lat: 31.6373, lng: -8.0120, demand: 92 },
  { id: "medina", name: "Medina", lat: 31.6258, lng: -7.9892, demand: 85 },
  { id: "hivernage", name: "Hivernage", lat: 31.6268, lng: -8.0075, demand: 75 },
  { id: "nouvelleville", name: "Nouvelle Ville", lat: 31.6425, lng: -7.9950, demand: 55 },
  { id: "palmeraie", name: "Palmeraie", lat: 31.6680, lng: -7.9670, demand: 45 },
  { id: "kasbah", name: "Kasbah", lat: 31.6205, lng: -7.9935, demand: 68 },
];
