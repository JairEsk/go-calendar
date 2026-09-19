const fs = require('fs');
const { resolveFile } = require('./lib/resolveFile');

const checkEvents = (file, lang) => {
  let fixedCount = 0;
  let blockingCount = 0;
  const filePath = resolveFile(file);
  const events = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  events.forEach((e, i) => {
    let eventFixed = false;
    let eventBlocking = false;

    // 1. Title prefix (auto-fixable, does not block the pipeline)
    if (!e.title.startsWith('Pokémon GO: ')) {
      console.log(`[${lang}] Prefix Error at index ${i}: ${e.title}`);
      e.title = e.title.startsWith('Pokémon GO:') ? e.title.replace('Pokémon GO:', 'Pokémon GO: ') : `Pokémon GO: ${e.title}`;
      e.title = e.title.replace('Pokémon GO: Pokémon GO: ', 'Pokémon GO: ');
      eventFixed = true;
    }

    // 2. Date format: YYYY-MM-DD HH:mm (blocking, not auto-fixable)
    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    if (!dateRegex.test(e.start)) {
      console.log(`[${lang}] Start Date Format Error at index ${i} (${e.title}): "${e.start}"`);
      eventBlocking = true;
    }
    if (!dateRegex.test(e.end)) {
      console.log(`[${lang}] End Date Format Error at index ${i} (${e.title}): "${e.end}"`);
      eventBlocking = true;
    }
    if (e.start > e.end) {
      console.log(`[${lang}] Chronological Error at index ${i} (${e.title}): start (${e.start}) > end (${e.end})`);
      eventBlocking = true;
    }

    // 3. Separator (blocking)
    if (!e.description.includes('---')) {
      console.log(`[${lang}] Separator Error at index ${i}: ${e.title}`);
      eventBlocking = true;
    }

    // 4. Emojis (blocking)
    if (!e.description.includes('🎁') || !e.description.includes('💀')) {
      console.log(`[${lang}] Emoji Error at index ${i}: ${e.title}`);
      eventBlocking = true;
    }

    // 5. Source (blocking)
    if (!e.description.includes('🔗')) {
      console.log(`[${lang}] Source Error at index ${i}: ${e.title}`);
      eventBlocking = true;
    }

    if (eventFixed) fixedCount++;
    if (eventBlocking) blockingCount++;
  });

  if (fixedCount > 0) {
    fs.writeFileSync(filePath, JSON.stringify(events, null, 2));
    console.log(`[${lang}] Auto-fixed ${fixedCount} title prefix issue(s) in ${filePath}.`);
  }

  if (blockingCount > 0) {
    console.log(`[${lang}] ${blockingCount} blocking issue(s) found in ${filePath}.`);
    return false;
  }

  console.log(`[${lang}] Audit complete. 0 blocking errors. All ${events.length} events follow the rules perfectly!`);
  return true;
};

const enOk = checkEvents('events_en.json', 'EN');
const esOk = checkEvents('events_es.json', 'ES');

// Check parity (blocking)
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
