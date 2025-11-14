const express = require("express");

// force a build lol

var app = express();
var https = require('https');

app.get("/:place",async function(request,response){
    response.type('text/calendar');
    var utcTwoDaysAgo = new Date(Date.now() - (86400000 * 2)).toJSON().slice(0,10);
    var utcOneYearFromNow = new Date(Date.now() + (86400000 * 365)).toJSON().slice(0,10);
    var getURL = "https://api.eu.recollect.net/api/places/" + request.params.place + "/services/50003/events?hide=reminder_only&nomerge=true&locale=en-GB&after=" + utcTwoDaysAgo + "&before=" + utcOneYearFromNow;
    let out = '';
    out = goFetch(getURL);
    let realOut = await out.then(result => result);
    response.send(vcalendarMaker(realOut['events']));
});

app.listen(8398, function () {
    console.log("Started application on port %d", 8398);
});

function goFetch(url){
    return(
        fetch(url)
            .then((res) => res.json())
            .catch(error => {
                console.log(error)
            })
    )
}

function veventMaker(event_in){
    var eventStart = new Date(event_in['day']);
    var dtStart = eventStart.toISOString().slice(0,10).replace(/-/g, "");
    const stamp = "19970901T083000Z";
    var flags = event_in['flags'][0];
    var name = flags['name'];
    var subject = flags['subject'];
    var uid = dtStart + name + "@recollect.jocely.net";
    var prodId = "-//hacksw/handcal//NONSGML v1.0//EN";
    var version = "2.0";
    var desc = name;
    return(
`BEGIN:VEVENT
UID:` + uid + `
DTSTAMP:` + stamp + `
DTSTART:` + dtStart + `
SUMMARY:` + subject + `
DESCRIPTION:` + subject + `
END:VEVENT`
    )
}

function vcalendarMaker(events_in){
    let output = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
`;
    events_in.forEach(element => {
        output += veventMaker(element) + `\n`;
    });
    output += `END:VCALENDAR`;
    return(output);

}
