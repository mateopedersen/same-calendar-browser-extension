(function(root){"use strict";
  function create(data){
    const resources=data.resources,collections=data.collections;
    function get(month,year){return resources.find(x=>x.month.toLowerCase()===String(month).toLowerCase()&&x.year===Number(year))||null;}
    return {resources,collections,get};
  }
  if(typeof module!=="undefined"&&module.exports){module.exports=create(require("./resources.json"));return;}
  const ready=fetch(chrome.runtime.getURL("lib/resources.json")).then(response=>{
    if(!response.ok)throw new Error("Could not load printable resource directory.");
    return response.json();
  }).then(data=>{root.CalendarResources=create(data);return root.CalendarResources;});
  root.CalendarResourcesReady=ready;
})(typeof globalThis!=="undefined"?globalThis:this);
