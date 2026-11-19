# @digiwebscape/beacon

> Ultra-lightweight, typed cookieless edge telemetry client, React component, and reverse-proxy recipes for [DigiWebscape Private Insights Telemetry™](https://digiwebscape.com/platform/insights).

[![npm version](https://img.shields.io/npm/v/@digiwebscape/beacon.svg)](https://www.npmjs.com/package/@digiwebscape/beacon)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Privacy Architecture](https://img.shields.io/badge/Privacy-100%25%20Cookieless-green.svg)](https://digiwebscape.com/privacy)

---

## ⚡ Features

- **100% Cookieless & Zero-Storage**: Zero tracking cookies, zero `localStorage` writes, and zero persistent browser fingerprinting.
- **Stateless Edge Telemetry**: Evaluated against EU ePrivacy Directive Article 5(3) & GDPR Article 11(2) audience measurement exemption architecture.
- **React & Next.js Ready**: Dedicated `<InsightsProvider />` supporting Next.js App Router, Pages Router, and modern React SPAs.
- **Custom Conversion Events**: Strongly typed `trackEvent()` utility for tracking business conversions and milestone events.
- **First-Party Reverse-Proxy Recipes**: Standardized configurations for Node.js, static site generators, and edge middleware to bypass ad-blocker false positives.

---

## 📦 Installation

```bash
# npm
npm install @digiwebscape/beacon

# pnpm
pnpm add @digiwebscape/beacon

# yarn
yarn add @digiwebscape/beacon
```

---

## 🚀 Quickstarts

### 1. React & Next.js (App Router)

Mount `<InsightsProvider />` inside your root layout:

```tsx
// app/layout.tsx
import { InsightsProvider } from '@digiwebscape/beacon/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <InsightsProvider domain="yourdomain.com" />
        {children}
      </body>
    </html>
  );
}
```

### 2. Standalone JavaScript / TypeScript

```typescript
import { initTelemetry, trackEvent } from '@digiwebscape/beacon';

// Initialize the telemetry beacon
initTelemetry({
  domain: 'yourdomain.com',
  excludePaths: ['/admin', '/internal']
});

// Dispatch a custom conversion event
trackEvent('signup_completed', { plan: 'enterprise' });
```

### 3. Pure HTML `<script>` Drop-In

If you do not use a bundler or framework, simply embed the script tag directly:

```html
<script defer data-domain="yourdomain.com" src="https://collect.digiwebscape.com/insights.js"></script>
```

---

## 🛡️ Reverse-Proxy Integration Recipes

Ad blockers and aggressive browser extensions occasionally block third-party analytics scripts by default. You can route telemetry through your own domain using a first-party reverse proxy.

### A. Next.js Rewrites (`next.config.js`)

Route the script and telemetry events through your own origin:

```javascript
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/stats/script.js',
        destination: 'https://collect.digiwebscape.com/insights.js'
      },
      {
        source: '/stats/event',
        destination: 'https://collect.digiwebscape.com/v1/events/collect'
      }
    ];
  }
};
```

Then configure the beacon client:

```tsx
<InsightsProvider
  domain="yourdomain.com"
  scriptSrc="/stats/script.js"
  apiEndpoint="/stats/event"
/>
```

### B. Standard Edge Middleware / Server Rewrites

Configure your edge server or reverse proxy to forward traffic:

- **Path 1**: `/stats/script.js` ➔ `https://collect.digiwebscape.com/insights.js`
- **Path 2**: `/stats/event` ➔ `https://collect.digiwebscape.com/v1/events/collect`

When proxying POST requests to `/stats/event`, pass through the incoming client headers (`User-Agent`, `Referer`, and client IP headers) so the edge pipeline can calculate geo-distribution and referrer metadata accurately.

---

## 📑 API Reference

### `initTelemetry(config: TelemetryConfig): void`

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `domain` | `string` | *(required)* | Registered domain name for event attribution. |
| `apiEndpoint` | `string` | `https://collect.digiwebscape.com/v1/events/collect` | Custom event collection endpoint URL. |
| `scriptSrc` | `string` | `https://collect.digiwebscape.com/insights.js` | Custom script source path. |
| `consentRequired` | `boolean` | `false` | When `true`, delays tracking until `optIn()` is called. |
| `excludePaths` | `string[]` | `[]` | Path prefixes to exclude from pageview tracking. |
| `allowLocalhost` | `boolean` | `false` | Enable tracking during local testing. |

### `trackEvent(name: string, properties?: Record<string, string | number | boolean>): void`
Dispatches a custom event with optional metadata attributes.

### `optOut(): void` / `optIn(): void`
Toggles client-side telemetry preferences in transient window memory.

---

## 🔒 Security & Cloaking Architecture

- Strictly zero vendor lock-in or third-party ad network tracking.
- Client tracker remains fully decoupled from backend server hashing mechanics.
- Raw IP addresses are processed in transient edge memory and discarded immediately (zero raw IP disk persistence).

---

## 📄 License

Apache-2.0 License. Copyright © 2026 Hitender Sharma (DigiWebscape). All rights reserved.
Part of the [DigiWebscape™ platform](https://digiwebscape.com).
