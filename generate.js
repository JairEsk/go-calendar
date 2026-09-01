const fs = require('fs');
const crypto = require('crypto');

const configs = [
    { inputFile: 'events_en.json', outputFile: 'go_events_en.ics', calName: 'GO Events (EN)', langCode: 'EN' },
    { inputFile: 'events_es.json', outputFile: 'go_events_es.ics', calName: 'GO Events (ES)', langCode: 'ES' }
];

configs.forEach(config => {
    const events = JSON.parse(fs.readFileSync(config.inputFile, 'utf8'));

    let icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Roxy AI//${config.langCode}\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nX-WR-CALNAME:${config.calName}\r\nX-WR-TIMEZONE:America/Mexico_City\r\n`;

    events.forEach((event) => {
        const formatDate = (dateStr) => dateStr.replace(/[-:]/g, '').replace(' ', 'T') + '00';
        
        // Fix UID: Hash based on title and start date (immunte to array index changes)
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
        
        // Add 15-minute push notification alarm
        icsContent += `BEGIN:VALARM\r\n`;
        icsContent += `TRIGGER:-PT15M\r\n`;
        icsContent += `ACTION:DISPLAY\r\n`;
        icsContent += `DESCRIPTION:Reminder: ${event.title}\r\n`;
        icsContent += `END:VALARM\r\n`;
        
        icsContent += `END:VEVENT\r\n`;
    });

    icsContent += `END:VCALENDAR\r\n`;

    fs.writeFileSync(config.outputFile, icsContent);
    console.log(`Success! ${config.outputFile} generated correctly.`);
});
