const test = require("node:test");
const assert = require("node:assert/strict");
require("../lib/calendar.js");
const E = require("../lib/exports.js");
const event={id:"evt-1",date:"2027-01-01",time:"23:30",allDay:false,title:"Plan, review",description:"Line one\nLine two; \"ok\"",category:"Work",color:"teal"};
test("CSV quotes separators and protects spreadsheet formulas",()=>{
  const csv=E.toCSV([{...event,title:"=1+1",description:'a,"b"'}]);
  assert.match(csv,/^\uFEFF/); assert.match(csv,/'=1\+1/); assert.match(csv,/"a,""b"""/);
});
test("ICS escapes text, uses exclusive all-day end, and rolls timed end into the next day",()=>{
  const ics=E.toICS([event,{...event,id:"all-day",date:"2027-01-31",allDay:true,time:"",title:"All day"}]);
  assert.match(ics,/SUMMARY:Plan\\, review/); assert.match(ics,/DESCRIPTION:Line one\\nLine two\\; "ok"/);
  assert.match(ics,/DTSTART:20270101T233000\r\nDTEND:20270102T003000/);
  assert.match(ics,/DTSTART;VALUE=DATE:20270131\r\nDTEND;VALUE=DATE:20270201/);
  assert.match(ics,/END:VCALENDAR\r\n$/); assert.equal((ics.match(/BEGIN:VEVENT/g)||[]).length,2);
});
test("ICS lines fold within the 75-octet content-line limit",()=>{
  const line=E.foldLine("SUMMARY:"+"é".repeat(90));
  for(const part of line.split("\r\n")) assert.ok(new TextEncoder().encode(part).length<=75);
});
test("JSON backup is versioned and valid JSON",()=>{
  const backup=JSON.parse(E.backup([event])); assert.equal(backup.format,"same-calendar-backup");assert.equal(backup.version,1);assert.equal(backup.events[0].id,event.id);
});
