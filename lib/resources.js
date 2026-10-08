(function(root){"use strict";
  const MONTHS=["October","November","December","January","February","March","April","May","June","July","August","September"];
  const resources=MONTHS.map((month,i)=>({month,year:i<3?2026:2027,url:`https://www.betacalendars.com/${month.toLowerCase()}-calendar.html`,verified:true,description:`Free printable ${month} ${i<3?2026:2027} monthly calendar.`}));
  const collections=[{label:"Monthly calendar collection",url:"https://www.betacalendars.com/monthly-calendar"},{label:"Blank calendar",url:"https://www.betacalendars.com/blank-calendar"},{label:"Weekly calendar",url:"https://www.betacalendars.com/weekly-calendar"},{label:"Monthly planner",url:"https://www.betacalendars.com/monthly-planner"},{label:"Weekly planner",url:"https://www.betacalendars.com/weekly-planner"}];
  function get(month,year){return resources.find(x=>x.month.toLowerCase()===String(month).toLowerCase()&&x.year===Number(year))||null;}
  const api={resources,collections,get};root.CalendarResources=api;if(typeof module!=="undefined"&&module.exports)module.exports=api;
})(typeof globalThis!=="undefined"?globalThis:this);
