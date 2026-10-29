/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const META_PIXEL_ID = "1427563316187745";
export const META_ACCESS_TOKEN =
  "EAAXhiY72ZBSoBS6XU96JBoAJ0h1DMXGIc3Sh9z3Hq4PgORGsuq3UMkW47Izm37R16etmZCbNnER2mZBMNrb8DrHj7CXTLdxrqkyqb6c3ynMYjgqoMIQv3H7ZAauDs9SVjZAJPHZCCjVSFXV6uPj7tZAvhzcqZBZBVDSe3P9EyFPL1ZAXtb8ZCZAkHayMBiCrRTbMVgZDZD";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a Meta Pixel browser event and triggers Meta Conversions API (CAPI)
 */
export function trackMetaEvent(
  eventName: string,
  eventData: Record<string, unknown> = {},
  eventId?: string
) {
  const generatedEventId =
    eventId || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // 1. Client-Side Meta Pixel Tracking
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    try {
      window.fbq("track", eventName, eventData, { eventID: generatedEventId });
      console.log(`[Meta Pixel] Tracked event: ${eventName}`, eventData);
    } catch (err) {
      console.warn("[Meta Pixel] Client tracking error:", err);
    }
  }

  // 2. Server-Side Conversions API (CAPI) Event
  if (META_PIXEL_ID && META_ACCESS_TOKEN) {
    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: generatedEventId,
          event_source_url: typeof window !== "undefined" ? window.location.href : "",
          action_source: "website",
          custom_data: {
            currency: "BRL",
            value: 19.90,
            content_name: "Pack Viral Frutas Falantes",
            content_category: "Digital Pack",
            ...eventData
          },
          user_data: {
            client_user_agent: typeof navigator !== "undefined" ? navigator.userAgent : ""
          }
        }
      ]
    };

    fetch(
      `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(
        META_ACCESS_TOKEN
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("[Meta CAPI] Server event sent:", data);
      })
      .catch((err) => {
        console.warn("[Meta CAPI] Server event error:", err);
      });
  }
}

/**
 * Tracks InitiateCheckout event on CTA clicks
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
