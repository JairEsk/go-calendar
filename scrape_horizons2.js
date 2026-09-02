const https = require('https');
https.get('https://leekduck.com/events/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    let index = data.indexOf('Horizons');
    if (index > -1) {
       console.log(data.substring(index - 200, index + 500));
    }
  });
});
