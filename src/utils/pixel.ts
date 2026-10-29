/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const META_PIXEL_ID = "1427563316187745";
export const META_ACCESS_TOKEN =
  "EAAXhiY72ZBSoBS1rpaK8UZCWCT4jIzQhCZBZCnyhUoiNhlAJmSAjn1QdZAyUSeodZAObiOkgF3xOPEZCjytd64m3NvmFMr64SivRr1WIsSZC9E8r1KmbII6yqjFZBDbVMWezeDyK4m2SoKKWNwH11ex5RI7J2ZCAUkYzcTZCK0oeSTuZB7PmMBgn3N8Izz7xourUZCAZDZD";

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
      window.fbq("track", eventName, {
        value: 19.90,
        currency: "BRL",
        content_name: "Pack Viral Frutas Falantes",
        content_category: "Digital Pack",
        ...eventData
      }, { eventID: generatedEventId });
      console.log(`[Meta Pixel] Tracked browser event: ${eventName}`, eventData);
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
            content_type: "product",
            content_ids: ["pack_frutas_1990"],
            ...eventData
          },
          user_data: {
            client_user_agent: typeof navigator !== "undefined" ? navigator.userAgent : ""
          }
        }
      ]
    };

    // First try sending via local proxy API if available
    fetch("/api/pixel-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventData,
        eventId: generatedEventId,
        sourceUrl: typeof window !== "undefined" ? window.location.href : ""
      })
    }).catch(() => {
      // Direct Graph API fallback if proxy server is bypassed
      fetch(
        `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(
          META_ACCESS_TOKEN
        )}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("[Meta CAPI Direct] Server response:", data);
        })
        .catch((err) => {
          console.warn("[Meta CAPI Direct] Error:", err);
        });
    });
  }
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

/**
 * Tracks Purchase event (Evento de Compra)
 */
export function trackPurchase(customValue = 19.90, transactionId?: string) {
  trackMetaEvent("Purchase", {
    content_name: "Pack Viral Frutas Falantes",
    content_ids: ["pack_frutas_1990"],
    content_type: "product",
    value: customValue,
    currency: "BRL",
    num_items: 1,
    transaction_id: transactionId || `txn_${Date.now()}`
  });
}
