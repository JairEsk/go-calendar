const https = require('https');
https.get('https://leekduck.com/events/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Leekduck uses class "event-item-wrapper"
    const eventRegex = /<div class="event-item-wrapper[^>]*>.*?<p>(.*?)<\/p>.*?<h2>(.*?)<\/h2>.*?<span class="event-header-item-wrapper"[^>]*data-event-start-date-check="(.*?)"[^>]*data-event-end-date="(.*?)"/gs;
    
    // Actually, data-event-start-date-check is usually on the parent span.
    // Let's just find the names first.
    const headers = data.match(/<h2>(.*?)<\/h2>/g);
    if(headers) {
      console.log("Found Events:");
      headers.slice(0, 40).forEach(h => console.log(h.replace(/<\/?h2>/g, '')));
    }
  });
});
