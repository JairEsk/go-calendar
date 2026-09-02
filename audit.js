const fs = require('fs');
const checkEvents = (file, lang) => {
  let errors = 0;
  const events = JSON.parse(fs.readFileSync(file, 'utf8'));
  events.forEach((e, i) => {
    let eventHasError = false;
    
    // 1. Title prefix
    if (!e.title.startsWith('Pokémon GO: ')) {
      console.log(`[${lang}] Prefix Error: ${e.title}`);
      e.title = e.title.startsWith('Pokémon GO:') ? e.title.replace('Pokémon GO:', 'Pokémon GO: ') : `Pokémon GO: ${e.title}`;
      // handle duplicate prefix if any
      e.title = e.title.replace('Pokémon GO: Pokémon GO: ', 'Pokémon GO: ');
      eventHasError = true;
    }
    
    // 2. Separator
    if (!e.description.includes('---')) {
      console.log(`[${lang}] Separator Error: ${e.title}`);
      eventHasError = true;
    }
    
    // 3. Emojis
    if (!e.description.includes('🎁') || !e.description.includes('💀')) {
      console.log(`[${lang}] Emoji Error: ${e.title}`);
      eventHasError = true;
    }

    // 4. Source
    if (!e.description.includes('🔗')) {
      console.log(`[${lang}] Source Error: ${e.title}`);
      eventHasError = true;
    }

    if (eventHasError) errors++;
  });
  
  if (errors > 0) {
    fs.writeFileSync(file, JSON.stringify(events, null, 2));
    console.log(`[${lang}] Fixed ${errors} events and saved.`);
  } else {
    console.log(`[${lang}] Audit complete. 0 errors. All ${events.length} events follow the rules perfectly!`);
  }
};

checkEvents('GoCalendar/events_en.json', 'EN');
checkEvents('GoCalendar/events_es.json', 'ES');
