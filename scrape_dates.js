const https = require('https');
https.get('https://leekduck.com/events/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // We can extract dates from <span class="event-header-item-wrapper" ...>
    // It contains data-event-start-date-check and data-event-end-date
    // and inside it has <h2>
    const regex = /data-event-start-date-check="([^"]+)".*?data-event-end-date="([^"]+)".*?<h2>(.*?)<\/h2>/gs;
    let match;
    console.log("EVENTS WITH DATES:");
    let count = 0;
    while ((match = regex.exec(data)) !== null && count < 30) {
      console.log(`Title: ${match[3]}\nStart: ${match[1]}\nEnd: ${match[2]}\n---`);
      count++;
    }
  });
});
