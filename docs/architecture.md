# Architecture

The extension is a static Manifest V3 WebExtension. The popup and full planner are bundled HTML/CSS/JavaScript pages. No background worker is needed. `lib/calendar.js` operates on strict `YYYY-MM-DD` civil dates using UTC date primitives so local time zones cannot move a date. `lib/store.js` validates event input and uses browser-local extension storage. `lib/exports.js` creates JSON, CSV, and ICS data locally. `lib/resources.js` is a static directory of month pages whose labels and destinations were checked against the live Beta Calendars site on 2026-10-08.

The manifest declares only `storage`. Web pages have a restrictive CSP and no inline scripts, remote scripts, dynamic code evaluation, or host permissions. External printable pages appear as explicit user-click links with `noopener noreferrer`.
