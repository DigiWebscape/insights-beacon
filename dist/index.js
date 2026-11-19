/**
 * @digiwebscape/beacon
 *
 * Official TypeScript client and runtime interfaces for DigiWebscape Private Insights Telemetry™.
 * Zero-storage, cookieless, and stateless edge audience measurement.
 */
/**
 * Checks whether the current visitor or environment has opted out of telemetry,
 * honoring Global Privacy Control (GPC), Do Not Track (DNT), or window.dws_optout.
 */
export function isOptedOut() {
    if (typeof window === 'undefined')
        return true;
    const nav = window.navigator;
    if (nav.globalPrivacyControl === true)
        return true;
    if (nav.doNotTrack === '1' || window.doNotTrack === '1')
        return true;
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
export function trackEvent(eventName, properties) {
    if (typeof window === 'undefined')
        return;
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
export function optOut() {
    if (typeof window === 'undefined')
        return;
    window.dws_optout = true;
    if (window.dwsInsights && typeof window.dwsInsights.optOut === 'function') {
        window.dwsInsights.optOut();
    }
}
/**
 * Clears the in-memory opt-out flag, resuming telemetry collection if permitted.
 */
export function optIn() {
    if (typeof window === 'undefined')
        return;
    window.dws_optout = false;
    if (window.dwsInsights && typeof window.dwsInsights.optIn === 'function') {
        window.dwsInsights.optIn();
    }
}
/**
 * Programmatically loads and mounts the Private Insights Telemetry™ script into the document.
 * Useful for custom dynamic client setups or single-page applications.
 */
export function initTelemetry(config) {
    if (typeof window === 'undefined' || typeof document === 'undefined')
        return;
    const existingScript = document.querySelector('script[data-dws-beacon]');
    if (existingScript)
        return;
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
//# sourceMappingURL=index.js.map