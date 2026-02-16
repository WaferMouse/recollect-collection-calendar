const express = require("express");

var app = express();
var https = require('https');
var utcTwoDaysAgo = new Date(Date.now() - (86400000 * 2)).toJSON().slice(0,10);
var utcOneYearFromNow = new Date(Date.now() + (86400000 * 365)).toJSON().slice(0,10);

const EMOJI = [
    {
        'name': 'red',
        'rgb': 0xe00000,
        'emoji': '🟥'
    },
    {
        'name': 'orange',   
        'rgb': 0xffa500,
        'emoji': '🟧'
    },
    {
        'name': 'yellow',
        'rgb': 0xFFFF00,
        'emoji': '🟨'
    },
    {
        'name': 'green',
        'rgb': 0x00FF00,
        'emoji': '🟩'
    },
    {
        'name': 'blue',
        'rgb': 0x0000FF,
        'emoji': '🟦'
    },
    {
        'name': 'purple',
        'rgb': 0x800080,
        'emoji': '🟪'
    },
    {
        'name': 'brown',
        'rgb': 0xa52a2a,
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
    {
        'name': 'gray',
        'rgb': 0x808080,
        'emoji': '🪨'
    },
]



const COLORS = [
    {'name': `black`, 'rgb': 0x000000},
    {'name': `silver`, 'rgb': 0xC0C0C0},
    {'name': `gray`, 'rgb': 0x808080},
    {'name': `white`, 'rgb': 0xFFFFFF},
    {'name': `maroon`, 'rgb': 0x800000},
    {'name': `red`, 'rgb': 0xFF0000},
    {'name': `purple`, 'rgb': 0x800080},
    {'name': `fuchsia`, 'rgb': 0xFF00FF},
    {'name': `green`, 'rgb': 0x008000},
    {'name': `lime`, 'rgb': 0x00FF00},
    {'name': `olive`, 'rgb': 0x808000},
    {'name': `yellow`, 'rgb': 0xFFFF00},
    {'name': `navy`, 'rgb': 0x000080},
    {'name': `blue`, 'rgb': 0x0000FF},
    {'name': `teal`, 'rgb': 0x008080},
    {'name': `aqua`, 'rgb': 0x00FFFF},

    {'name': `aliceblue`, 'rgb': 0xf0f8ff},
    {'name': `antiquewhite`, 'rgb': 0xfaebd7},
    {'name': `aqua`, 'rgb': 0x00ffff},
    {'name': `aquamarine`, 'rgb': 0x7fffd4},
    {'name': `azure`, 'rgb': 0xf0ffff},
    {'name': `beige`, 'rgb': 0xf5f5dc},
    {'name': `bisque`, 'rgb': 0xffe4c4},
    {'name': `black`, 'rgb': 0x000000},
    {'name': `blanchedalmond`, 'rgb': 0xffebcd},
    {'name': `blue`, 'rgb': 0x0000ff},
    {'name': `blueviolet`, 'rgb': 0x8a2be2},
    {'name': `brown`, 'rgb': 0xa52a2a},
    {'name': `burlywood`, 'rgb': 0xdeb887},
    {'name': `cadetblue`, 'rgb': 0x5f9ea0},
    {'name': `chartreuse`, 'rgb': 0x7fff00},
    {'name': `chocolate`, 'rgb': 0xd2691e},
    {'name': `coral`, 'rgb': 0xff7f50},
    {'name': `cornflowerblue`, 'rgb': 0x6495ed},
    {'name': `cornsilk`, 'rgb': 0xfff8dc},
    {'name': `crimson`, 'rgb': 0xdc143c},
    {'name': `cyan`, 'rgb': 0x00ffff},
    {'name': `darkblue`, 'rgb': 0x00008b},
    {'name': `darkcyan`, 'rgb': 0x008b8b},
    {'name': `darkgoldenrod`, 'rgb': 0xb8860b},
    {'name': `darkgray`, 'rgb': 0xa9a9a9},
    {'name': `darkgreen`, 'rgb': 0x006400},
    {'name': `darkgrey`, 'rgb': 0xa9a9a9},
    {'name': `darkkhaki`, 'rgb': 0xbdb76b},
    {'name': `darkmagenta`, 'rgb': 0x8b008b},
    {'name': `darkolivegreen`, 'rgb': 0x556b2f},
    {'name': `darkorange`, 'rgb': 0xff8c00},
    {'name': `darkorchid`, 'rgb': 0x9932cc},
    {'name': `darkred`, 'rgb': 0x8b0000},
    {'name': `darksalmon`, 'rgb': 0xe9967a},
    {'name': `darkseagreen`, 'rgb': 0x8fbc8f},
    {'name': `darkslateblue`, 'rgb': 0x483d8b},
    {'name': `darkslategray`, 'rgb': 0x2f4f4f},
    {'name': `darkslategrey`, 'rgb': 0x2f4f4f},
    {'name': `darkturquoise`, 'rgb': 0x00ced1},
    {'name': `darkviolet`, 'rgb': 0x9400d3},
    {'name': `deeppink`, 'rgb': 0xff1493},
    {'name': `deepskyblue`, 'rgb': 0x00bfff},
    {'name': `dimgray`, 'rgb': 0x696969},
    {'name': `dimgrey`, 'rgb': 0x696969},
    {'name': `dodgerblue`, 'rgb': 0x1e90ff},
    {'name': `firebrick`, 'rgb': 0xb22222},
    {'name': `floralwhite`, 'rgb': 0xfffaf0},
    {'name': `forestgreen`, 'rgb': 0x228b22},
    {'name': `fuchsia`, 'rgb': 0xff00ff},
    {'name': `gainsboro`, 'rgb': 0xdcdcdc},
    {'name': `ghostwhite`, 'rgb': 0xf8f8ff},
    {'name': `gold`, 'rgb': 0xffd700},
    {'name': `goldenrod`, 'rgb': 0xdaa520},
    {'name': `gray`, 'rgb': 0x808080},
    {'name': `green`, 'rgb': 0x008000},
    {'name': `greenyellow`, 'rgb': 0xadff2f},
    {'name': `grey`, 'rgb': 0x808080},
    {'name': `honeydew`, 'rgb': 0xf0fff0},
    {'name': `hotpink`, 'rgb': 0xff69b4},
    {'name': `indianred`, 'rgb': 0xcd5c5c},
    {'name': `indigo`, 'rgb': 0x4b0082},
    {'name': `ivory`, 'rgb': 0xfffff0},
    {'name': `khaki`, 'rgb': 0xf0e68c},
    {'name': `lavender`, 'rgb': 0xe6e6fa},
    {'name': `lavenderblush`, 'rgb': 0xfff0f5},
    {'name': `lawngreen`, 'rgb': 0x7cfc00},
    {'name': `lemonchiffon`, 'rgb': 0xfffacd},
    {'name': `lightblue`, 'rgb': 0xadd8e6},
    {'name': `lightcoral`, 'rgb': 0xf08080},
    {'name': `lightcyan`, 'rgb': 0xe0ffff},
    {'name': `lightgoldenrodyellow`, 'rgb': 0xfafad2},
    {'name': `lightgray`, 'rgb': 0xd3d3d3},
    {'name': `lightgreen`, 'rgb': 0x90ee90},
    {'name': `lightgrey`, 'rgb': 0xd3d3d3},
    {'name': `lightpink`, 'rgb': 0xffb6c1},
    {'name': `lightsalmon`, 'rgb': 0xffa07a},
    {'name': `lightseagreen`, 'rgb': 0x20b2aa},
    {'name': `lightskyblue`, 'rgb': 0x87cefa},
    {'name': `lightslategray`, 'rgb': 0x778899},
    {'name': `lightslategrey`, 'rgb': 0x778899},
    {'name': `lightsteelblue`, 'rgb': 0xb0c4de},
    {'name': `lightyellow`, 'rgb': 0xffffe0},
    {'name': `lime`, 'rgb': 0x00ff00},
    {'name': `limegreen`, 'rgb': 0x32cd32},
    {'name': `linen`, 'rgb': 0xfaf0e6},
    {'name': `magenta`, 'rgb': 0xff00ff},
    {'name': `maroon`, 'rgb': 0x800000},
    {'name': `mediumaquamarine`, 'rgb': 0x66cdaa},
    {'name': `mediumblue`, 'rgb': 0x0000cd},
    {'name': `mediumorchid`, 'rgb': 0xba55d3},
    {'name': `mediumpurple`, 'rgb': 0x9370db},
    {'name': `mediumseagreen`, 'rgb': 0x3cb371},
    {'name': `mediumslateblue`, 'rgb': 0x7b68ee},
    {'name': `mediumspringgreen`, 'rgb': 0x00fa9a},
    {'name': `mediumturquoise`, 'rgb': 0x48d1cc},
    {'name': `mediumvioletred`, 'rgb': 0xc71585},
    {'name': `midnightblue`, 'rgb': 0x191970},
    {'name': `mintcream`, 'rgb': 0xf5fffa},
    {'name': `mistyrose`, 'rgb': 0xffe4e1},
    {'name': `moccasin`, 'rgb': 0xffe4b5},
    {'name': `navajowhite`, 'rgb': 0xffdead},
    {'name': `navy`, 'rgb': 0x000080},
    {'name': `oldlace`, 'rgb': 0xfdf5e6},
    {'name': `olive`, 'rgb': 0x808000},
    {'name': `olivedrab`, 'rgb': 0x6b8e23},
    {'name': `orange`, 'rgb': 0xffa500},
    {'name': `orangered`, 'rgb': 0xff4500},
    {'name': `orchid`, 'rgb': 0xda70d6},
    {'name': `palegoldenrod`, 'rgb': 0xeee8aa},
    {'name': `palegreen`, 'rgb': 0x98fb98},
    {'name': `paleturquoise`, 'rgb': 0xafeeee},
    {'name': `palevioletred`, 'rgb': 0xdb7093},
    {'name': `papayawhip`, 'rgb': 0xffefd5},
    {'name': `peachpuff`, 'rgb': 0xffdab9},
    {'name': `peru`, 'rgb': 0xcd853f},
    {'name': `pink`, 'rgb': 0xffc0cb},
    {'name': `plum`, 'rgb': 0xdda0dd},
    {'name': `powderblue`, 'rgb': 0xb0e0e6},
    {'name': `purple`, 'rgb': 0x800080},
    {'name': `red`, 'rgb': 0xff0000},
    {'name': `rosybrown`, 'rgb': 0xbc8f8f},
    {'name': `royalblue`, 'rgb': 0x4169e1},
    {'name': `saddlebrown`, 'rgb': 0x8b4513},
    {'name': `salmon`, 'rgb': 0xfa8072},
    {'name': `sandybrown`, 'rgb': 0xf4a460},
    {'name': `seagreen`, 'rgb': 0x2e8b57},
    {'name': `seashell`, 'rgb': 0xfff5ee},
    {'name': `sienna`, 'rgb': 0xa0522d},
    {'name': `silver`, 'rgb': 0xc0c0c0},
    {'name': `skyblue`, 'rgb': 0x87ceeb},
    {'name': `slateblue`, 'rgb': 0x6a5acd},
    {'name': `slategray`, 'rgb': 0x708090},
    {'name': `slategrey`, 'rgb': 0x708090},
    {'name': `snow`, 'rgb': 0xfffafa},
    {'name': `springgreen`, 'rgb': 0x00ff7f},
    {'name': `steelblue`, 'rgb': 0x4682b4},
    {'name': `tan`, 'rgb': 0xd2b48c},
    {'name': `teal`, 'rgb': 0x008080},
    {'name': `thistle`, 'rgb': 0xd8bfd8},
    {'name': `tomato`, 'rgb': 0xff6347},
    {'name': `turquoise`, 'rgb': 0x40e0d0},
    {'name': `violet`, 'rgb': 0xee82ee},
    {'name': `wheat`, 'rgb': 0xf5deb3},
    {'name': `white`, 'rgb': 0xffffff},
    {'name': `whitesmoke`, 'rgb': 0xf5f5f5},
    {'name': `yellow`, 'rgb': 0xffff00},
    {'name': `yellowgreen`, 'rgb': 0x9acd32},
]

var colorMap = [];
var emojiMap = [];

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

function findPaletteEntry(rgb, colors) {
    var shortest_distance = 0xffffff;
    var best_candidate = colors[0];
    colors.forEach(
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

console.log("generating colormaps...")

for (let i = 0; i < 0x1000000; i++) {
    colorMap.push(findPaletteEntry(toColor(i), COLORS));
    emojiMap.push(findPaletteEntry(toColor(i), EMOJI));
}

console.log("generated colormaps")

function roughSizeOfObject(object) {
  const objectList = [];
  const stack = [object];
  let bytes = 0;

  while (stack.length) {
    const value = stack.pop();

    switch (typeof value) {
      case 'boolean':
        bytes += 4;
        break;
      case 'string':
        bytes += value.length * 2;
        break;
      case 'number':
        bytes += 8;
        break;
      case 'object':
        if (!objectList.includes(value)) {
          objectList.push(value);
          for (const prop in value) {
            if (value.hasOwnProperty(prop)) {
              stack.push(value[prop]);
            }
          }
        }
        break;
    }
  }

  return bytes;
}

console.log(`emojiMap size: ` + roughSizeOfObject(emojiMap));
console.log(`colorMap size: ` + roughSizeOfObject(colorMap));

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
    var emoji = emojiMap[parseInt(flags['color'].slice(1), 16)]['emoji'];
    var color = colorMap[parseInt(flags['color'].slice(1), 16)]['name']
    return([
        `BEGIN:VEVENT`,
        `UID:` + uid,
        `DTSTAMP:` + stamp,
        `DTSTART:` + dtStart,
        `SUMMARY:` + emoji + ` ` + subject,
        `DESCRIPTION:` + desc,
        `COLOR:` + color,
        `END:VEVENT`,
    ].join('\n'))
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
