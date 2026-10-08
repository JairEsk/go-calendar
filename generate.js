const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { resolveFile } = require('./lib/resolveFile');

const configs = [
    { inputFile: 'events_en.json', outputFile: 'go_events_en.ics', calName: 'GO Events (EN)', langCode: 'EN' },
    { inputFile: 'events_es.json', outputFile: 'go_events_es.ics', calName: 'GO Events (ES)', langCode: 'ES' }
];

const formatDate = (dateStr) => {
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/);
    if (!match) {
        throw new Error(`Invalid date format: "${dateStr}". Expected "YYYY-MM-DD HH:mm".`);
    }
    const [, y, m, d, hh, mm] = match;
    return `${y}${m}${d}T${hh}${mm}00`;
};

const parseExistingIcs = (icsText) => {
    const unfolded = icsText.replace(/\r?\n[ \t]/g, '');
    const vevents = unfolded.split('BEGIN:VEVENT').slice(1);
    const map = new Map();
    for (const v of vevents) {
        const top = v.split('BEGIN:VALARM')[0];
        const uid = (top.match(/UID:([^\r\n]+)/) || [])[1];
        const dtstamp = (top.match(/DTSTAMP:([^\r\n]+)/) || [])[1];
        const dtstart = (top.match(/DTSTART[^:]*:([^\r\n]+)/) || [])[1];
        const dtend = (top.match(/DTEND[^:]*:([^\r\n]+)/) || [])[1];
        const summary = (top.match(/SUMMARY:([^\r\n]+)/) || [])[1];
        const desc = (top.match(/DESCRIPTION:([^\r\n]+)/) || [])[1];
        if (uid && dtstamp) {
            map.set(uid.trim(), {
                dtstamp: dtstamp.trim(),
                dtstart: dtstart ? dtstart.trim() : '',
                dtend: dtend ? dtend.trim() : '',
                summary: summary ? summary.trim() : '',
                description: desc ? desc.trim() : ''
            });
        }
    }
    return map;
};

const nowStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

configs.forEach(config => {
    const inputPath = resolveFile(config.inputFile);
    const outputPath = path.isAbsolute(config.outputFile) ? config.outputFile : path.join(__dirname, config.outputFile);
    const events = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

    const existingEvents = fs.existsSync(outputPath)
        ? parseExistingIcs(fs.readFileSync(outputPath, 'utf8'))
        : new Map();

    let icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Roxy AI//${config.langCode}\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nX-WR-CALNAME:${config.calName}\r\nX-WR-TIMEZONE:America/Mexico_City\r\n`;

    events.forEach((event) => {
        // Fix UID: Hash based on title and start date (immune to array index changes)
        const hashInput = `${event.title}-${event.start}`;
        const eventHash = crypto.createHash('md5').update(hashInput).digest('hex');
        const uid = `go-event-${eventHash}@gocalendar.local`;
        
        const dtstart = formatDate(event.start);
        const dtend = formatDate(event.end);
        const summary = event.title;
        const description = event.description.replace(/\n/g, '\\n');

        const existing = existingEvents.get(uid);
        const isUnchanged = existing &&
            existing.dtstart === dtstart &&
            existing.dtend === dtend &&
            existing.summary === summary &&
            existing.description === description;

        const dtstamp = isUnchanged ? existing.dtstamp : nowStamp;

        icsContent += `BEGIN:VEVENT\r\n`;
        icsContent += `UID:${uid}\r\n`;
        icsContent += `DTSTAMP:${dtstamp}\r\n`;
        icsContent += `DTSTART;TZID=America/Mexico_City:${dtstart}\r\n`;
        icsContent += `DTEND;TZID=America/Mexico_City:${dtend}\r\n`;
        icsContent += `SUMMARY:${summary}\r\n`;
        icsContent += `DESCRIPTION:${description}\r\n`;
        
        // Add push notification alarm EXACTLY at start time (0 minutes before)
        icsContent += `BEGIN:VALARM\r\n`;
        icsContent += `TRIGGER:-PT0M\r\n`;
        icsContent += `ACTION:DISPLAY\r\n`;
        icsContent += `DESCRIPTION:Reminder: ${event.title}\r\n`;
        icsContent += `END:VALARM\r\n`;
        
        icsContent += `END:VEVENT\r\n`;
    });

    icsContent += `END:VCALENDAR\r\n`;

    fs.writeFileSync(outputPath, icsContent);
    console.log(`Success! ${config.outputFile} generated correctly.`);
});
