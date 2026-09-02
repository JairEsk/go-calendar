const https = require('https');
https.get('https://leekduck.com/events/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /data-event-start-date-check="([^"]+)".*?data-event-end-date="([^"]+)".*?<h2>(.*?)<\/h2>/gs;
    let match;
    while ((match = regex.exec(data)) !== null) {
      if (match[3].includes('Horizons')) {
        console.log(`Title: ${match[3]}\nStart: ${match[1]}\nEnd: ${match[2]}\n---`);
      }
    }
  });
});
