const fs = require('fs');

const currentEn = JSON.parse(fs.readFileSync('GoCalendar/events_en.json', 'utf8'));
const currentEs = JSON.parse(fs.readFileSync('GoCalendar/events_es.json', 'utf8'));

const newEn = [
  {
    "title": "Pokémon GO: Pokémon Horizons Celebration",
    "start": "2026-09-16 10:00",
    "end": "2026-09-22 20:00",
    "description": "Pokémon Horizons: The Series Celebration Event!\n\n💀 Raid Bosses:\n🔹 1-Star: Captain's Cap Pikachu\n🔹 3-Star: Charizard (Friede's goggles), Meowscarada, Skeledirge, Quaquaval\n\n🗓️ Daily Rotations & Spawns:\n🔹 Day Spawns: Fidough, Wattrel, Chansey\n🔹 Night Spawns: Eevee, Hatenna, Rockruff\n🔹 Special: Charmander with Friede's goggles & Captain's Cap Pikachu\n\n---\n🎁 Bonuses:\n✅ 2x Catch Candy (via GO Pass)\n✅ 1-Hour Lure Modules\n✅ Increased Kecleon at PokéStops\n✅ Photobomb Surprise Encounters\n\n🔗 Source: LeekDuck.com"
  }
];

const newEs = [
  {
    "title": "Pokémon GO: Celebración Horizontes Pokémon",
    "start": "2026-09-16 10:00",
    "end": "2026-09-22 20:00",
    "description": "¡Evento de celebración de la serie Horizontes Pokémon!\n\n💀 Jefes de Incursión:\n🔹 1 Estrella: Pikachu con gorra de Capi\n🔹 3 Estrellas: Charizard (Gafas de Friede), Meowscarada, Skeledirge, Quaquaval\n\n🗓️ Apariciones y Rotaciones:\n🔹 Día: Fidough, Wattrel, Chansey\n🔹 Noche: Eevee, Hatenna, Rockruff\n🔹 Especial: Charmander con gafas de Friede y Pikachu gorra de Capi\n\n---\n🎁 Bonus:\n✅ 2x Caramelos por captura (Pase GO)\n✅ Módulos Cebo de 1 Hora\n✅ Más Kecleon en Poképaradas\n✅ Encuentros sorpresa en Instantáneas\n\n🔗 Fuente: LeekDuck.com"
  }
];

const allEn = [...currentEn, ...newEn].sort((a, b) => a.start.localeCompare(b.start));
const allEs = [...currentEs, ...newEs].sort((a, b) => a.start.localeCompare(b.start));

fs.writeFileSync('GoCalendar/events_en.json', JSON.stringify(allEn, null, 2));
fs.writeFileSync('GoCalendar/events_es.json', JSON.stringify(allEs, null, 2));
console.log('Horizons Event Added!');
