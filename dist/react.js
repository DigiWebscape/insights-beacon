import React, { useEffect } from 'react';
import { initTelemetry } from './index.js';
/**
 * InsightsProvider
 *
 * Lightweight React component that mounts the DigiWebscape Private Insights Telemetry™ beacon.
 * Safe for Next.js (Pages and App Router), Remix, Gatsby, and standard React SPAs.
 *
 * @example
 * ```tsx
 * import { InsightsProvider } from '@digiwebscape/beacon/react';
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html>
 *       <body>
 *         <InsightsProvider domain="mybusiness.com" />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function InsightsProvider({ domain, apiEndpoint, scriptSrc, consentRequired, excludePaths, allowLocalhost, children }) {
    useEffect(() => {
        initTelemetry({
            domain,
            apiEndpoint,
            scriptSrc,
            consentRequired,
            excludePaths,
            allowLocalhost
        });
    }, [domain, apiEndpoint, scriptSrc, consentRequired, allowLocalhost]);
    return React.createElement(React.Fragment, null, children);
}
export * from './index.js';
//# sourceMappingURL=react.js.map