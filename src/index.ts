/**
 * @digiwebscape/beacon
 *
 * Official TypeScript client and runtime interfaces for DigiWebscape Private Insights Telemetry™.
 * Zero-storage, cookieless, and stateless edge audience measurement.
 */

declare global {
  interface Window {
    dws_optout?: boolean;
    dwsInsights?: {
      enable: () => void;
      track: (name: string, props?: Record<string, string | number | boolean>) => void;
      optOut: () => void;
      optIn: () => void;
      isOptedOut: () => boolean;
    };
  }
}

export interface TelemetryConfig {
  /** The registered domain or hostname to attribute telemetry events to. */
  domain: string;
  /** Optional custom collection endpoint or reverse-proxy path (e.g. '/api/telemetry'). */
  apiEndpoint?: string;
  /** Optional script source URL if serving from a custom or first-party path. */
  scriptSrc?: string;
  /** When true, telemetry remains disabled until explicitly opted in or enabled. */
  consentRequired?: boolean;
  /** Paths or path prefixes to exclude from automatic pageview recording. */
  excludePaths?: string[];
  /** Allow tracking on localhost during development. Defaults to false. */
  allowLocalhost?: boolean;
}

export interface CustomEventPayload {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

/**
 * Checks whether the current visitor or environment has opted out of telemetry,
 * honoring Global Privacy Control (GPC), Do Not Track (DNT), or window.dws_optout.
 */
export function isOptedOut(): boolean {
  if (typeof window === 'undefined') return true;
  const nav = window.navigator as Navigator & { globalPrivacyControl?: boolean };
  if (nav.globalPrivacyControl === true) return true;
  if (nav.doNotTrack === '1' || (window as unknown as { doNotTrack?: string }).doNotTrack === '1') return true;
  return window.dws_optout === true;
}

/**
 * Dispatches a custom conversion or business milestone event to the telemetry endpoint.
 *
 * @param eventName Identifier for the custom event (max 100 characters).
 * @param properties Optional custom event attributes.
 *
 * @example
 * ```typescript
 * import { trackEvent } from '@digiwebscape/beacon';
 *
 * trackEvent('checkout_completed', { plan: 'pro' });
 * ```
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return;
  if (!eventName || typeof eventName !== 'string') {
    console.warn('[digiwebscape/beacon] trackEvent called with invalid event name.');
    return;
  }

  if (window.dwsInsights && typeof window.dwsInsights.track === 'function') {
    window.dwsInsights.track(eventName, properties);
  }
}

/**
 * Opts the visitor out of all telemetry tracking by setting the in-memory window flag.
 * Does not write cookies or persistent localStorage identifiers.
 */
export function optOut(): void {
  if (typeof window === 'undefined') return;
  window.dws_optout = true;
  if (window.dwsInsights && typeof window.dwsInsights.optOut === 'function') {
    window.dwsInsights.optOut();
  }
}

/**
 * Clears the in-memory opt-out flag, resuming telemetry collection if permitted.
 */
export function optIn(): void {
  if (typeof window === 'undefined') return;
  window.dws_optout = false;
  if (window.dwsInsights && typeof window.dwsInsights.optIn === 'function') {
    window.dwsInsights.optIn();
  }
}

/**
 * Programmatically loads and mounts the Private Insights Telemetry™ script into the document.
 * Useful for custom dynamic client setups or single-page applications.
 */
export function initTelemetry(config: TelemetryConfig): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const existingScript = document.querySelector('script[data-dws-beacon]');
  if (existingScript) return;

  const script = document.createElement('script');
  script.defer = true;
  script.src = config.scriptSrc || 'https://collect.digiwebscape.com/insights.js';
  script.setAttribute('data-domain', config.domain);
  script.setAttribute('data-dws-beacon', 'true');

  if (config.apiEndpoint) {
    script.setAttribute('data-api', config.apiEndpoint);
  }
  if (config.consentRequired) {
    script.setAttribute('data-consent', 'required');
  }
  if (config.excludePaths && config.excludePaths.length > 0) {
    script.setAttribute('data-exclude', config.excludePaths.join(','));
  }
  if (config.allowLocalhost) {
    script.setAttribute('data-localhost', 'true');
  }

  document.head.appendChild(script);
}
