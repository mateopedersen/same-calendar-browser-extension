(function (root) {
  "use strict";
  const KEY = "sameCalendar.v1";
  const COLORS = new Set(["teal","blue","violet","rose","amber","slate"]);
  function cleanEvent(input) {
    if (!input || typeof input !== "object") throw new TypeError("Event must be an object.");
    const date = root.CalendarEngine.parseDate(input.date);
    const title = String(input.title || "").trim();
    if (!title || title.length > 120) throw new RangeError("Add a title of 1–120 characters.");
    const description = String(input.description || "").trim();
    if (description.length > 2000) throw new RangeError("Notes must be 2,000 characters or fewer.");
    const allDay = Boolean(input.allDay);
    const time = allDay ? "" : String(input.time || "");
    if (time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new RangeError("Choose a valid 24-hour time.");
    const category = String(input.category || "Personal").slice(0,40);
    const color = COLORS.has(input.color) ? input.color : "teal";
    return { id: String(input.id || (root.crypto && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`)), date: root.CalendarEngine.formatDate(date), title, description, time, allDay, category, color, updatedAt: new Date().toISOString() };
  }
  async function read() {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      const result = await chrome.storage.local.get(KEY); return Array.isArray(result[KEY]) ? result[KEY].map(cleanEvent) : [];
    }
    try { const value = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(value) ? value.map(cleanEvent) : []; } catch { return []; }
  }
  async function write(items) {
    const safe = items.map(cleanEvent).sort((a,b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time) || a.title.localeCompare(b.title));
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) await chrome.storage.local.set({[KEY]:safe});
    else localStorage.setItem(KEY, JSON.stringify(safe));
    return safe;
  }
  async function save(input) { const item = cleanEvent(input), items = await read(), i = items.findIndex(x => x.id === item.id); if (i < 0) items.push(item); else items[i] = item; await write(items); return item; }
  async function remove(id) { return write((await read()).filter(item => item.id !== id)); }
  function validateBackup(data) {
    const parsed = typeof data === "string" ? JSON.parse(data) : data;
    const events = Array.isArray(parsed) ? parsed : parsed && parsed.format === "same-calendar-backup" && parsed.version === 1 && Array.isArray(parsed.events) ? parsed.events : null;
    if (!events || events.length > 10000) throw new RangeError("This backup format is invalid or contains too many events.");
    const ids = new Set(); return events.map(event => { const e=cleanEvent(event); if(ids.has(e.id)) throw new RangeError("Backup contains duplicate event IDs."); ids.add(e.id); return e; });
  }
  async function importBackup(data, mode = "replace") { const imported = validateBackup(data); const items = mode === "merge" ? [...await read(), ...imported] : imported; const unique = new Map(items.map(e => [e.id,e])); return write([...unique.values()]); }
  async function clear() { return write([]); }
  root.CalendarStore = { KEY, cleanEvent, read, write, save, remove, validateBackup, importBackup, clear };
  if (typeof module !== "undefined" && module.exports) module.exports = root.CalendarStore;
})(typeof globalThis !== "undefined" ? globalThis : this);
