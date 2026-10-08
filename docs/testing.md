# Test and compatibility record

The test suite uses Node's built-in test runner and has no third-party test dependencies. `npm test` covers Gregorian date boundaries, ISO week/year changes, fixed six-row month grids, local storage create/edit/delete and restore validation, CSV escaping/formula protection, ICS date rollover and escaping, and the verified resource map.

`npm run build:opera` validates the MV3 manifest and production file references, copies an unminified build to `dist/opera/`, and packages the build as a ZIP. This is a source/build check, not proof that Opera has accepted or published the extension.

The current workstation has Chrome but no Opera application. The browser's security policy blocked opening local `file:` pages, so no static browser preview was used as a substitute. No Opera unpacked-load, toolbar popup, Opera console, Mac/Windows/Linux matrix, or actual printer-driver test is claimed. The extension was not installed in Chrome. Static compatibility is based on the MV3 package, the actual build checks, and Opera's published store transition.

Automated results on 2026-10-08: 15 tests passed, 0 failed; production package build passed. These are unit/build checks, not a runtime Opera compatibility claim.
