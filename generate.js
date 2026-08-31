const fs = require('fs');

// Read events from the JSON file
const events = JSON.parse(fs.readFileSync('events.json', 'utf8'));

// Standard header for a subscribable calendar
let icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Roxy AI//EN\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nX-WR-CALNAME:GO Events\r\nX-WR-TIMEZONE:America/Mexico_City\r\n`;

events.forEach((event, index) => {
    // Format date "YYYY-MM-DD HH:mm" to "YYYYMMDDTHHmm00"
    const formatDate = (dateStr) => dateStr.replace(/[-:]/g, '').replace(' ', 'T') + '00';
    
    // Create a unique ID for each event
    const uid = `go-event-${index}-roxy@gocalendar.local`;
    
    // Get current date for the creation stamp
    const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    icsContent += `BEGIN:VEVENT\r\n`;
    icsContent += `UID:${uid}\r\n`;
    icsContent += `DTSTAMP:${dtstamp}\r\n`;
    // Enforce local timezone for Outlook compatibility
    icsContent += `DTSTART;TZID=America/Mexico_City:${formatDate(event.start)}\r\n`;
    icsContent += `DTEND;TZID=America/Mexico_City:${formatDate(event.end)}\r\n`;
    icsContent += `SUMMARY:${event.title}\r\n`;
    icsContent += `DESCRIPTION:${event.description}\r\n`;
    icsContent += `END:VEVENT\r\n`;
});

icsContent += `END:VCALENDAR\r\n`;

// Save the final file
fs.writeFileSync('go_events.ics', icsContent);
console.log('Success! go_events.ics file generated correctly.');