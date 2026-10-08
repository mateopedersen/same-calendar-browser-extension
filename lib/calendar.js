(function (root) {
  "use strict";
  const DAY = 86400000;
  function validParts(y, m, d) {
    if (!Number.isInteger(y) || y < 1 || y > 9999 || !Number.isInteger(m) || m < 1 || m > 12 || !Number.isInteger(d) || d < 1) return false;
    return d <= daysInMonth(y, m);
  }
  function utcDate(y, m, d) { const x = new Date(0); x.setUTCHours(0, 0, 0, 0); x.setUTCFullYear(y, m - 1, d); return x; }
  function parseDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value));
    if (!match) throw new RangeError("Use a calendar date in YYYY-MM-DD format.");
    const [y, m, d] = match.slice(1).map(Number);
    if (!validParts(y, m, d)) throw new RangeError("Invalid Gregorian calendar date.");
    return { year: y, month: m, day: d };
  }
  function formatDate({ year, month, day }) { return `${String(year).padStart(4,"0")}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`; }
  function isLeapYear(year) { return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0); }
  function daysInMonth(year, month) { if (month < 1 || month > 12 || !Number.isInteger(month)) throw new RangeError("Month must be 1–12."); return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]; }
  function weekday(date) { const p = typeof date === "string" ? parseDate(date) : date; return utcDate(p.year, p.month, p.day).getUTCDay(); }
  function addDays(date, amount) {
    if (!Number.isInteger(amount)) throw new RangeError("Day offset must be an integer.");
    const p = typeof date === "string" ? parseDate(date) : date;
    const x = utcDate(p.year, p.month, p.day + amount);
    return formatDate({ year: x.getUTCFullYear(), month: x.getUTCMonth() + 1, day: x.getUTCDate() });
  }
  function dayOfYear(date) { const p = typeof date === "string" ? parseDate(date) : date; return Math.floor((utcDate(p.year,p.month,p.day) - utcDate(p.year,1,1)) / DAY) + 1; }
  function dateDifference(a, b) { return Math.round((utcDate(...Object.values(parseDate(b))) - utcDate(...Object.values(parseDate(a)))) / DAY); }
  function isoWeek(date) {
    const p = typeof date === "string" ? parseDate(date) : date;
    const x = utcDate(p.year,p.month,p.day), dow = (x.getUTCDay() + 6) % 7;
    x.setUTCDate(x.getUTCDate() - dow + 3);
    const isoYear = x.getUTCFullYear();
    const jan4 = utcDate(isoYear,1,4); jan4.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() + 6) % 7));
    return { year: isoYear, week: 1 + Math.round((x - jan4) / (7 * DAY)) };
  }
  function monthGrid(year, month, weekStart = 1) {
    if (!Number.isInteger(year) || year < 1 || year > 9999) throw new RangeError("Year must be 1–9999.");
    if (weekStart !== 0 && weekStart !== 1) throw new RangeError("Week start must be Sunday (0) or Monday (1).");
    const firstOffset = (weekday({year,month,day:1}) - weekStart + 7) % 7;
    const start = addDays(formatDate({year,month,day:1}), -firstOffset);
    return Array.from({length:42}, (_,i) => addDays(start,i));
  }
  function monthName(month, locale = "en") { return new Intl.DateTimeFormat(locale,{month:"long",timeZone:"UTC"}).format(utcDate(2020,month,1)); }
  function formatLongDate(date, locale = "en", options = {weekday:"long",year:"numeric",month:"long",day:"numeric"}) { const p = typeof date === "string" ? parseDate(date) : date; return new Intl.DateTimeFormat(locale,{...options,timeZone:"UTC"}).format(utcDate(p.year,p.month,p.day)); }
  function dateFromOrdinal(year, ordinal) { if (!Number.isInteger(ordinal) || ordinal < 1 || ordinal > (isLeapYear(year)?366:365)) throw new RangeError("Day of year is out of range."); return addDays(formatDate({year,month:1,day:1}),ordinal-1); }
  const api = { parseDate, formatDate, isLeapYear, daysInMonth, weekday, addDays, dayOfYear, dateDifference, isoWeek, monthGrid, monthName, formatLongDate, dateFromOrdinal };
  root.CalendarEngine = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
