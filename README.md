# Same Calendar — Calendar & Print Planner

An offline-first calendar and planner for Chromium-based browsers, developed by Beta Calendars. The extension contains its own month, week, year, agenda, date-tool, print, backup, and optional printable-resource views. Event titles and notes stay in the browser's local extension storage.

Publisher: [Beta Calendars](https://www.betacalendars.com/)

## Build the Opera package

Requirements: Node.js 20 or later and Python 3.10 or later. The application has no runtime or build-library dependencies.

```sh
npm test
npm run build:opera
```

The build copies the reviewable production files into `dist/opera/` and creates a versioned ZIP (currently `dist/same-calendar-opera-1.0.1.zip`). The ZIP has `manifest.json` at its root. No code is minified or downloaded during the build.

To try an unpacked build, open the browser's extension manager, enable developer mode, and load `dist/opera/`. Use only a browser/profile where you are comfortable running a locally built extension.

## Features

- Toolbar month popup, date navigation, today shortcut, event markers, and selected-day events.
- Full month, week, year, and agenda views with search and category filtering.
- Local event create, edit, delete, all-day dates, optional local times, notes, categories, and marker colors.
- Printable dated and blank monthly calendars, weekly planners, yearly overview, event planner, and deadline checklist; A4/US Letter, portrait/landscape, Sunday/Monday start, monochrome/subtle-color themes, notes space, and browser print preview.
- Date utilities for ISO week/year, leap year, day-of-year, date differences, and date addition/subtraction.
- JSON backup/restore, CSV export, and ICS export.
- Optional, user-clicked printable links from Beta Calendars. Links are not opened automatically.

## Privacy

The package uses the `storage` permission only. It does not use a remote server, account, analytics, tracking, externally hosted executable code, or background worker. Event data is stored in `chrome.storage.local` and is not transmitted. Exporting, importing, printing, clearing data, and opening a printable resource are actions the user explicitly starts.

See [docs/privacy.md](docs/privacy.md) for the extension-specific statement.

## Repository contents

- `lib/`: civil-date arithmetic, local event storage, exports, verified resource map.
- `popup.*` and `planner.*`: bundled extension pages and styles.
- `tests/`: deterministic unit, storage, export, and resource tests.
- `docs/`: privacy, support, testing, architecture, Opera listing draft, submission notes, and link mapping.
- `docs/firefox-amo-source-review.md`: audit of the existing pending Firefox AMO submission and its Opera API differences.

## Store status

The Firefox AMO submission is awaiting review and has no published version. The Opera package is built and ready for the Opera Add-ons workflow; it has not been uploaded or submitted for moderation. A public Opera listing and moderation status will be added here only after Opera provides them.

## License

Source code is distributed under the MIT License. Store distribution terms are set separately by the Opera Add-ons submission process and should be checked in the developer portal before submission.
