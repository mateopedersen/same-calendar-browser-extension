const test=require("node:test");const assert=require("node:assert/strict");const R=require("../lib/resources.js");
test("month-specific resource map contains only verified period and destinations",()=>{
  assert.equal(R.resources.length,12);
  assert.equal(R.get("November",2026).url,"https://www.betacalendars.com/november-calendar.html");
  assert.equal(R.get("January",2027).url,"https://www.betacalendars.com/january-calendar.html");
  assert.equal(R.get("August",2027).url,"https://www.betacalendars.com/august-calendar.html");
  assert.equal(R.get("September",2027).year,2027);
  assert.equal(R.get("October",2027),null);assert.equal(R.get("September",2026),null);
  for(const resource of R.resources){assert.equal(resource.verified,true);assert.ok(!/[?&](email|event|note|tracking)=/i.test(resource.url));}
});
test("general resources are exact public collection URLs",()=>{
  assert.deepEqual(R.collections.map(x=>x.url),[
    "https://www.betacalendars.com/monthly-calendar","https://www.betacalendars.com/blank-calendar",
    "https://www.betacalendars.com/weekly-calendar","https://www.betacalendars.com/monthly-planner",
    "https://www.betacalendars.com/weekly-planner"]);
});
