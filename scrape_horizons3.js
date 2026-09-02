const https = require('https');
https.get('https://leekduck.com/events/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    let index = data.indexOf('pokemon-horizons-celebration');
    if (index > -1) {
       console.log(data.substring(index - 500, index + 800));
    }
  });
});
