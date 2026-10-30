/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const META_PIXEL_ID = "1427563316187745";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Reads a cookie value by name from document.cookie
 */

function getCookieValue(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Sends a Meta Pixel browser event and triggers Vercel Serverless CAPI function
 */
export function trackMetaEvent(
  eventName: string,
  eventData: Record<string, unknown> = {},
  eventId?: string
) {
  const generatedEventId =
    eventId || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // 1. Client-Side Meta Pixel Tracking (Browser)
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    try {
      window.fbq("track", eventName, {
        value: 19.90,
        currency: "BRL",
        content_name: "Pack Viral Frutas Falantes",
        content_category: "Digital Pack",
        ...eventData
      }, { eventID: generatedEventId });
      console.log(`[Meta Pixel] Tracked browser event: ${eventName} (ID: ${generatedEventId})`, eventData);
    } catch (err) {
      console.warn("[Meta Pixel] Client tracking warning:", err);
    }
  }

  // 2. Server-Side Conversions API (CAPI) via Vercel Serverless Function
  const fbp = getCookieValue("_fbp");
  const fbc = getCookieValue("_fbc");

  fetch("/api/pixel-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      eventData,
      eventId: generatedEventId,
      sourceUrl: typeof window !== "undefined" ? window.location.href : "",
      userData: { fbp, fbc }
    })
  })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.warn(`[Meta CAPI Serverless Warning] ${res.status}:`, errorData);
      } else {
        const data = await res.json();
        console.log(`[Meta CAPI Serverless Success] Event ${eventName}:`, data);
      }
    })
    .catch((err) => {
      console.warn("[Meta CAPI Serverless Request Error]:", err);
    });
}

/**
 * Tracks InitiateCheckout event when visitor clicks CTA button
 */
export function trackInitiateCheckout() {
  trackMetaEvent("InitiateCheckout", {
    content_name: "Pack Viral Frutas Falantes",
    content_ids: ["pack_frutas_1990"],
    content_type: "product",
    value: 19.90,
    currency: "BRL",
    num_items: 1
  });
}
