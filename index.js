const express = require("express");

var app = express();
var https = require('https');
var utcTwoDaysAgo = new Date(Date.now() - (86400000 * 2)).toJSON().slice(0,10);
var utcOneYearFromNow = new Date(Date.now() + (86400000 * 365)).toJSON().slice(0,10);

const COLORS = [
    {
        'name': 'red',
        'rgb': 0xe00000,
        'emoji': '🟥'
    },
    {
        'name': 'orange',   
        'rgb': 0xc06000,
        'emoji': '🟧'
    },
    {
        'name': 'yellow',
        'rgb': 0xe0c000,
        'emoji': '🟨'
    },
    {
        'name': 'green',
        'rgb': 0x00a000,
        'emoji': '🟩'
    },
    {
        'name': 'blue',
        'rgb': 0x0080e0,
        'emoji': '🟦'
    },
    {
        'name': 'purple',
        'rgb': 0x804000,
        'emoji': '🟪'
    },
    {
        'name': 'brown',
        'rgb': 0xa080c0,
        'emoji': '🟫'
    },
    {
        'name': 'black',
        'rgb': 0x000000,
        'emoji': '⬛'
    },
    {
        'name': 'white',
        'rgb': 0xffffff,
        'emoji': '⬜'
    },
]

var colorMap = [];

function toColor(num) {
    num >>>= 0;
    var b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16
    return ({'r': r, 'g': g, 'b': b});
}

function findRgbDistance(a, b) {
    return (
        Math.sqrt((
            Math.pow(a.r - b.r, 2) +
            Math.pow(a.g - b.g, 2) +
            Math.pow(a.b - b.b, 2)
        ))
    )
}

function findPaletteEntry(rgb) {
    var shortest_distance = 0xffffff;
    var best_candidate = COLORS[0];
    COLORS.forEach(
        (el) => {
            var distance = findRgbDistance(toColor(el.rgb), rgb);
            if (distance < shortest_distance) {
                shortest_distance = distance;
                best_candidate = el;
            }
        }
    )
    return(best_candidate);
}

for (let i = 0; i < 0x1000000; i++) {
    colorMap.push(findPaletteEntry(toColor(i))['emoji']);
}

app.get("/:place",async function(request,response){
    response.type('text/calendar');
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
    var desc = flags['html_message'].replace(/(<([^>]+)>)/ig, '');
    var color = colorMap[parseInt(flags['color'].slice(1), 16)];
    return(
`BEGIN:VEVENT
UID:` + uid + `
DTSTAMP:` + stamp + `
DTSTART:` + dtStart + `
SUMMARY:` + color + ` ` + subject + `
DESCRIPTION:` + desc + `
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
