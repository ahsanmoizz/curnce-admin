// src/lib/adminApi.ts (ya jahan bhi rakha hai)

// ✅ .env se base URL le lo
const API_URL = "https://api.curnce.com";

// ✅ auto-append /v1/subscription for subscription endpoints
function resolvePath(path: string) {
  if (
    path.startsWith("/plans") ||
    path.startsWith("/tenants") ||
    path.startsWith("/billing") ||
    path.startsWith("/checkout")
  ) {
    return `/v1/subscription${path}`;
  }
  return path;
}

export async function apiGet(path: string, token?: string) {
  const fullPath = resolvePath(path);
  const res = await fetch(`${API_URL}${fullPath}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(`GET ${fullPath} failed`);
  return res.json();
}

export async function apiPost(path: string, body: any, token?: string) {
  const fullPath = resolvePath(path);
  const res = await fetch(`${API_URL}${fullPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${fullPath} failed`);
  return res.json();
}
