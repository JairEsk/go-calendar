const fs = require('fs');
const path = require('path');

const resolveFile = (filename) => {
  if (fs.existsSync(filename)) return filename;
  const local = path.join(__dirname, filename);
  if (fs.existsSync(local)) return local;
  const sub = path.join(__dirname, 'GoCalendar', filename);
  if (fs.existsSync(sub)) return sub;
  return filename;
};

const checkEvents = (file, lang) => {
  let errors = 0;
  const filePath = resolveFile(file);
  const events = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  events.forEach((e, i) => {
    let eventHasError = false;

    // 1. Title prefix
    if (!e.title.startsWith('Pokémon GO: ')) {
      console.log(`[${lang}] Prefix Error at index ${i}: ${e.title}`);
      e.title = e.title.startsWith('Pokémon GO:') ? e.title.replace('Pokémon GO:', 'Pokémon GO: ') : `Pokémon GO: ${e.title}`;
      e.title = e.title.replace('Pokémon GO: Pokémon GO: ', 'Pokémon GO: ');
      eventHasError = true;
    }

    // 2. Date format: YYYY-MM-DD HH:mm
    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    if (!dateRegex.test(e.start)) {
      console.log(`[${lang}] Start Date Format Error at index ${i} (${e.title}): "${e.start}"`);
      eventHasError = true;
    }
    if (!dateRegex.test(e.end)) {
      console.log(`[${lang}] End Date Format Error at index ${i} (${e.title}): "${e.end}"`);
      eventHasError = true;
    }
    if (e.start > e.end) {
      console.log(`[${lang}] Chronological Error at index ${i} (${e.title}): start (${e.start}) > end (${e.end})`);
      eventHasError = true;
    }

    // 3. Separator
    if (!e.description.includes('---')) {
      console.log(`[${lang}] Separator Error at index ${i}: ${e.title}`);
      eventHasError = true;
    }

    // 4. Emojis
    if (!e.description.includes('🎁') || !e.description.includes('💀')) {
      console.log(`[${lang}] Emoji Error at index ${i}: ${e.title}`);
      eventHasError = true;
    }

    // 5. Source
    if (!e.description.includes('🔗')) {
      console.log(`[${lang}] Source Error at index ${i}: ${e.title}`);
      eventHasError = true;
    }

    if (eventHasError) errors++;
  });

  if (errors > 0) {
    fs.writeFileSync(filePath, JSON.stringify(events, null, 2));
    console.log(`[${lang}] Fixed/flagged ${errors} event issue(s) in ${filePath}.`);
    return false;
  } else {
    console.log(`[${lang}] Audit complete. 0 errors. All ${events.length} events follow the rules perfectly!`);
    return true;
  }
};

const enOk = checkEvents('events_en.json', 'EN');
const esOk = checkEvents('events_es.json', 'ES');

// Check parity
const enFile = resolveFile('events_en.json');
const esFile = resolveFile('events_es.json');
const enEvents = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const esEvents = JSON.parse(fs.readFileSync(esFile, 'utf8'));

let parityOk = true;
if (enEvents.length !== esEvents.length) {
  console.error(`[PARITY ERROR] Count mismatch: EN=${enEvents.length} vs ES=${esEvents.length}`);
  parityOk = false;
} else {
  for (let i = 0; i < enEvents.length; i++) {
    if (enEvents[i].start !== esEvents[i].start || enEvents[i].end !== esEvents[i].end) {
      console.error(`[PARITY ERROR] Date mismatch at index ${i}: EN [${enEvents[i].start} -> ${enEvents[i].end}] vs ES [${esEvents[i].start} -> ${esEvents[i].end}]`);
      parityOk = false;
    }
  }
  if (parityOk) {
    console.log(`[PARITY OK] Perfect 1:1 match across all ${enEvents.length} events between EN and ES.`);
  }
}

if (!enOk || !esOk || !parityOk) {
  process.exit(1);
}
