const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const resolveFile = (filename) => {
    if (fs.existsSync(filename)) return filename;
    const local = path.join(__dirname, filename);
    if (fs.existsSync(local)) return local;
    return filename;
};

const configs = [
    { inputFile: 'events_en.json', outputFile: 'go_events_en.ics', calName: 'GO Events (EN)', langCode: 'EN' },
    { inputFile: 'events_es.json', outputFile: 'go_events_es.ics', calName: 'GO Events (ES)', langCode: 'ES' },
    { inputFile: 'events_en.json', outputFile: 'go_events.ics', calName: 'GO Events', langCode: 'EN' }
];

configs.forEach(config => {
    const inputPath = resolveFile(config.inputFile);
    const outputPath = path.isAbsolute(config.outputFile) ? config.outputFile : path.join(__dirname, config.outputFile);
    const events = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

    let icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Roxy AI//${config.langCode}\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nX-WR-CALNAME:${config.calName}\r\nX-WR-TIMEZONE:America/Mexico_City\r\n`;

    events.forEach((event) => {
        const formatDate = (dateStr) => {
            const clean = dateStr.trim();
            const match = clean.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/);
            if (match) {
                const [, y, m, d, hh, mm, ss] = match;
                return `${y}${m}${d}T${hh}${mm}${ss || '00'}`;
            }
            return clean.replace(/[-:]/g, '').replace(' ', 'T') + '00';
        };
        
        // Fix UID: Hash based on title and start date (immune to array index changes)
        const hashInput = `${event.title}-${event.start}`;
        const eventHash = crypto.createHash('md5').update(hashInput).digest('hex');
        const uid = `go-event-${eventHash}@gocalendar.local`;
        
        const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

        icsContent += `BEGIN:VEVENT\r\n`;
        icsContent += `UID:${uid}\r\n`;
        icsContent += `DTSTAMP:${dtstamp}\r\n`;
        icsContent += `DTSTART;TZID=America/Mexico_City:${formatDate(event.start)}\r\n`;
        icsContent += `DTEND;TZID=America/Mexico_City:${formatDate(event.end)}\r\n`;
        icsContent += `SUMMARY:${event.title}\r\n`;
        icsContent += `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}\r\n`;
        
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
