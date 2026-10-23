const excludedIds = [24741, 32933, 41125, ...Array.from({ length: 78 }, (_, i) => 12453 + i * 4096)];
var now = new Date();
var time;
var div = document.getElementById('unityContainer');
var start_time = (new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0).getTime() - new Date(2024, 0, 1, 0, 0).getTime())/60000+28400790;
var end_time = start_time + 9*60;
var status;
var opening = "Waiting for opening!";
var firstFreeId;
function AzureWeb() {
                timesRun += 1;
// Fetch the JSON response
fetch("https://wsp.flowscape.se/argus/secure/status/floorId/165?start="+start_time+"&end="+end_time+"&desks=true&rooms=true")
    .then(response => response.json())
    .then(jsonResponse => {
        // Extract IDs corresponding to the FREE state (excluding specified numbers)
        const freeIds = jsonResponse.deskStatus
            .filter(desk => desk.state === 'FREE' && !excludedIds.includes(desk.id))
            .map(desk => desk.id);

        // Get the first free ID (if available)
        firstFreeId = freeIds[0];

        console.log(`Open ID (excluding ${excludedIds}) is: ${firstFreeId}`);
    })
    .catch(error => {
        console.error(`Error fetching or parsing the JSON response: ${error}`);
    });
//
if (typeof firstFreeId !== 'undefined') {
opening = "Check booking status!"
fetch("https://wsp.flowscape.se/argus/secure/deskbooking/user", {
  "headers": {
    "accept": "application/json",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "https://wsp.flowscape.se/webapp/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}); ;
fetch(`https://wsp.flowscape.se/argus/secure/deskbooking/desk/${firstFreeId}`, {
  "headers": {
    "accept": "application/json",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "https://wsp.flowscape.se/webapp/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"start\":"+start_time+",\"end\":"+end_time+"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}).then(response=>response.text()).then(res => {status = res;}); 
//
console.log(timesRun)
}
firstFreeId = undefined;
div.innerHTML = timesRun+": "+opening+": "+status;
}
function ResponseON() {
var startTime = new Date().getTime();
var recurr = setInterval(function(){
time = new Date().getTime() - startTime;
    if(time > 3699000){
	div.innerHTML = "Script stopped";
        clearInterval(recurr);
        return;
    } else {
AzureWeb();
}
}, 1500);
}
var timesRun = 0;
console.log("Timer started!");
var eta_ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 2, 59).getTime() - Date.now()+50000; var timeout = setTimeout(ResponseON, eta_ms);
