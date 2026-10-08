# Firefox AMO source review

Reviewed on 2026-10-08 before preparing the Opera release.

## What exists

The authenticated Firefox Add-ons developer page contains **Same Calendar — Private Planner**, version **1.0.0**, with status **Awaiting Review**. The public add-on page exists, but its versions page shows no published version. This is an uploaded review submission, not a released Firefox add-on.

The submitted archive was downloaded from the developer portal and inspected locally. It contains 19 files (74,778 uncompressed bytes): a Manifest V3 manifest, popup and planner pages, a print page, five icons, and seven unminified JavaScript/CSS source files under `src/`. It declares the `storage` permission and Firefox-specific `browser_specific_settings.gecko` metadata, including the Firefox add-on ID and a no-required-data-collection declaration. The package has no external runtime dependencies.

The AMO version notes say the submitted JavaScript is unminified, generated code is not used, the supported date range is 1900–2100, and recurring events, reminders, ICS, and sync are not implemented. They also state that real Firefox installation and print-layout clipping were not verified. The developer panel reports 0 errors and 13 warnings.

## Reuse and compatibility

The AMO archive is the only recovered source artifact; no matching GitHub source repository or Git history was found in the authorized account searches. Its Firefox implementation uses the `browser.*` API namespace and a different event data model. The Opera build uses Chromium's `chrome.*` APIs and a separately validated, tested data/export layer. The AMO artifact was preserved for review under the task's temporary `work/amo-review/` directory and is not copied into the Opera package or public source repository as a second maintained application.

The current Opera work continues the same product, offline-first behavior, publisher, verified resource map, and existing visual/product direction. It does not modify the pending AMO submission. No Firefox upload, edit, or review action was performed.

## References

- Public add-on: <https://addons.mozilla.org/en-US/firefox/addon/same-calendar-private-planner/>
- Firefox developer dashboard: <https://addons.mozilla.org/en-US/developers/addons>
