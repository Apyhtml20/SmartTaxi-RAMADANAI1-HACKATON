// src/services/api.js

// IMPORTANT: avec le proxy Vite, BASE = "" (même origin)
const BASE = import.meta.env.VITE_API_BASE || "";

function getToken() {
  return localStorage.getItem("smarttaxi_token");
}

async function http(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let text = "";
    try {
      text = await res.text();
    } catch {}
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

// AUTH
export const apiLogin = (payload) =>
  http("/api/auth/login", { method: "POST", body: payload });

export const apiRegister = (payload) =>
  http("/api/auth/register", { method: "POST", body: payload });

// AI
export const getHeatmap = () => http("/api/ai/heatmap"); // GET
export const getMatch = (payload) =>
  http("/api/ai/match", { method: "POST", body: payload });

export const getForecast = (zone) =>
  http(`/api/ai/forecast?zone=${encodeURIComponent(zone)}`);

export const getCityIndex = () => http("/api/ai/city-index");

export const aiChat = (payload) =>
  http("/api/ai/chat", { method: "POST", body: payload });
