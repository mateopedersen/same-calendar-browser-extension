const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../lib/calendar.js");

test("Gregorian leap-year century boundaries", () => {
  assert.equal(C.isLeapYear(1900), false);
  assert.equal(C.isLeapYear(2000), true);
  assert.equal(C.isLeapYear(2100), false);
  assert.equal(C.daysInMonth(2027, 2), 28);
  assert.equal(C.daysInMonth(2028, 2), 29);
});
test("weekday and exact dates around New Year 2027", () => {
  assert.equal(C.weekday("2027-01-01"), 5);
  assert.equal(C.addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(C.addDays("2027-01-01", -1), "2026-12-31");
});
test("ISO week/year transitions", () => {
  assert.deepEqual(C.isoWeek("2026-12-31"), { year: 2026, week: 53 });
  assert.deepEqual(C.isoWeek("2027-01-01"), { year: 2026, week: 53 });
  assert.deepEqual(C.isoWeek("2027-01-04"), { year: 2027, week: 1 });
});
test("month grids contain six full weeks for both week starts", () => {
  for (const weekStart of [0, 1]) {
    const grid = C.monthGrid(2027, 2, weekStart);
    assert.equal(grid.length, 42);
    assert.equal(C.weekday(grid[0]), weekStart);
    assert.equal(grid[41], C.addDays(grid[0], 41));
  }
});
test("strict date validation, ordinal, and difference", () => {
  for (const value of ["2027-02-29", "1900-02-29", "2027-13-01", "2027-2-01", "not-a-date"]) assert.throws(() => C.parseDate(value));
  assert.equal(C.dayOfYear("2028-12-31"), 366);
  assert.equal(C.dateFromOrdinal(2028, 60), "2028-02-29");
  assert.equal(C.dateDifference("2026-12-31", "2027-01-01"), 1);
  assert.equal(C.dateDifference("2027-01-01", "2026-12-31"), -1);
});
test("century February dates", () => {
  assert.equal(C.parseDate("1900-02-28").day, 28);
  assert.throws(() => C.parseDate("1900-02-29"));
  assert.equal(C.parseDate("2000-02-29").day, 29);
  assert.throws(() => C.parseDate("2100-02-29"));
});
