import React from 'react';
import { TelemetryConfig } from './index.js';
export interface InsightsProviderProps extends TelemetryConfig {
    children?: React.ReactNode;
}
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
export declare function InsightsProvider({ domain, apiEndpoint, scriptSrc, consentRequired, excludePaths, allowLocalhost, children }: InsightsProviderProps): React.JSX.Element;
export * from './index.js';
//# sourceMappingURL=react.d.ts.map