const fs = require('fs');

const fixDescription = (desc) => {
  let newDesc = desc;
  
  // Fix Mega Ascension Missing 💀
  if (newDesc.includes('Daily Mega Raid Rotation:') && !newDesc.includes('💀')) {
    newDesc = newDesc.replace('Daily Mega Raid Rotation:', '💀 Daily Mega Raid Rotation:');
  }
  if (newDesc.includes('Rotación Diaria de Megaincursiones:') && !newDesc.includes('💀')) {
    newDesc = newDesc.replace('Rotación Diaria de Megaincursiones:', '💀 Rotación Diaria de Megaincursiones:');
  }

  // Fix Zamazenta missing 🎁
  if (newDesc.includes('Hero of Many Battles') && !newDesc.includes('🎁') && newDesc.includes('🔗')) {
    newDesc = newDesc.replace('---\n🔗', '---\n🎁 Bonuses:\n✅ N/A\n\n🔗');
  }
  if (newDesc.includes('Héroe de Múltiples Batallas') && !newDesc.includes('🎁') && newDesc.includes('🔗')) {
    newDesc = newDesc.replace('---\n🔗', '---\n🎁 Bonus:\n✅ N/A\n\n🔗');
  }
  
  // Fix ES Super Mega Raid Day missing 💀
  if (newDesc.includes('¡Día especial de Incursiones Super Mega!') && !newDesc.includes('💀')) {
    newDesc = newDesc.replace('¡Día especial de Incursiones Super Mega!\n\n---', '¡Día especial de Incursiones Super Mega!\n\n💀 Jefe de Incursión:\n🔹 Por anunciar\n\n---');
  }
  
  return newDesc;
};

const fixFile = (file) => {
  const events = JSON.parse(fs.readFileSync(file, 'utf8'));
  events.forEach(e => {
    e.description = fixDescription(e.description);
  });
  fs.writeFileSync(file, JSON.stringify(events, null, 2));
}

fixFile('GoCalendar/events_en.json');
fixFile('GoCalendar/events_es.json');
