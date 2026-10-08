const test = require("node:test");
const assert = require("node:assert/strict");
require("../lib/calendar.js");
const Store = require("../lib/store.js");
let data;
test.beforeEach(() => {
  data = {};
  global.chrome = { storage: { local: { async get(key) { return { [key]: data[key] }; }, async set(obj) { Object.assign(data, obj); } } } };
});
test.after(() => { delete global.chrome; });

test("creates, edits, sorts, and deletes events in local storage", async () => {
  await Store.save({id:"two",date:"2027-02-01",title:"Second"});
  await Store.save({id:"one",date:"2027-01-01",title:"First"});
  let all=await Store.read(); assert.deepEqual(all.map(e=>e.id),["one","two"]);
  await Store.save({id:"one",date:"2027-01-02",title:"Updated"});
  all=await Store.read(); assert.equal(all.length,2); assert.equal(all[0].title,"Updated");
  await Store.remove("one"); assert.deepEqual((await Store.read()).map(e=>e.id),["two"]);
});
test("rejects invalid event dates and excessive text", () => {
  assert.throws(()=>Store.cleanEvent({date:"2027-02-29",title:"Invalid"}));
  assert.throws(()=>Store.cleanEvent({date:"2027-01-01",title:""}));
  assert.throws(()=>Store.cleanEvent({date:"2027-01-01",title:"A",description:"x".repeat(2001)}));
});
test("validates backup structure and duplicates; replace and merge restore safely", async () => {
  const base={id:"evt",date:"2027-01-01",title:"Planning"};
  assert.throws(()=>Store.validateBackup("{}"));
  assert.throws(()=>Store.validateBackup([base,base]));
  await Store.save({id:"local",date:"2026-12-30",title:"Local"});
  let result=await Store.importBackup({format:"same-calendar-backup",version:1,events:[base]},"merge");
  assert.equal(result.length,2);
  result=await Store.importBackup([base],"replace"); assert.equal(result.length,1); assert.equal(result[0].id,"evt");
  assert.equal(await Store.clear().then(x=>x.length),0);
});
