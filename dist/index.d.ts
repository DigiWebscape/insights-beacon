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
export declare function isOptedOut(): boolean;
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
export declare function trackEvent(eventName: string, properties?: Record<string, string | number | boolean>): void;
/**
 * Opts the visitor out of all telemetry tracking by setting the in-memory window flag.
 * Does not write cookies or persistent localStorage identifiers.
 */
export declare function optOut(): void;
/**
 * Clears the in-memory opt-out flag, resuming telemetry collection if permitted.
 */
export declare function optIn(): void;
/**
 * Programmatically loads and mounts the Private Insights Telemetry™ script into the document.
 * Useful for custom dynamic client setups or single-page applications.
 */
export declare function initTelemetry(config: TelemetryConfig): void;
//# sourceMappingURL=index.d.ts.map