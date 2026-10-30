/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Dynamically appends incoming tracking parameters (fbclid, UTMs, src, sck, fbp, fbc)
 * to Kirvano checkout URLs.
 */
export function getCheckoutUrlWithParams(baseUrl: string): string {
  if (typeof window === 'undefined') return baseUrl;

  try {
    // If baseUrl is relative or hash anchor, return as is
    if (baseUrl.startsWith('#') || baseUrl.startsWith('/')) {
      return baseUrl;
    }

    const url = new URL(baseUrl);
    const currentParams = new URLSearchParams(window.location.search);

    // Kirvano and Meta tracking keys
    const trackingKeys = [
      'fbclid',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'src',
      'sck'
    ];

    trackingKeys.forEach((key) => {
      const value = currentParams.get(key);
      if (value) {
        url.searchParams.set(key, value);
      }
    });

    // Add Meta cookies _fbp and _fbc if present and not already in URL
    const getCookie = (name: string) => {
      if (typeof document === 'undefined') return null;
      const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    };

    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');

    if (fbp && !url.searchParams.has('fbp')) {
      url.searchParams.set('fbp', fbp);
    }
    if (fbc && !url.searchParams.has('fbc')) {
      url.searchParams.set('fbc', fbc);
    }

    return url.toString();
  } catch (err) {
    return baseUrl;
  }
}
