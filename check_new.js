const fs = require('fs');
const https = require('https');

const currentEvents = JSON.parse(fs.readFileSync('GoCalendar/events_en.json', 'utf8')).map(e => e.title.toLowerCase());

https.get('https://leekduck.com/events/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /data-event-start-date-check="([^"]+)".*?data-event-end-date="([^"]+)".*?<h2>(.*?)<\/h2>/gs;
    let match;
    const foundEvents = [];
    while ((match = regex.exec(data)) !== null) {
       foundEvents.push({ start: match[1], end: match[2], title: match[3].replace(/<\/?h2>/g, '').trim() });
    }
    
    const newEvents = foundEvents.filter(fe => {
       const titleLower = fe.title.toLowerCase();
       // Ignore GBL
       if (titleLower.includes('league') || titleLower.includes('cup')) return false;
       // Ignore Season
       if (titleLower.includes('season')) return false;
       if (titleLower.includes('forever forward')) return false;
       
       // Check if already in calendar
       const isIncluded = currentEvents.some(ce => {
          return ce.includes(titleLower.split(' ')[0]) || titleLower.includes(ce.replace('pokémon go: ', ''));
       });
       return !isIncluded;
    });

    console.log('Potentially missing notable events:');
    console.log(newEvents.slice(0, 10));
  });
});
