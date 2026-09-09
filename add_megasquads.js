const fs = require('fs');

const currentEn = JSON.parse(fs.readFileSync('GoCalendar/events_en.json', 'utf8'));
const currentEs = JSON.parse(fs.readFileSync('GoCalendar/events_es.json', 'utf8'));

const newEn = [
  {
    "title": "Pokémon GO: Mega Squads",
    "start": "2026-09-08 10:00",
    "end": "2026-09-14 20:00",
    "description": "Mega Squads Event introducing Super Max Mega Levels!\n\n💀 Raid Bosses:\n🔹 Mega Beedrill (Sep 8 - 15)\n🔹 Mega Houndoom (Sep 11 - 15)\n\n🗓️ Event Features:\n🔹 Debuts: Maschiff & Mabosstiff\n🔹 Shiny Debut: Flamigo\n🔹 New Mechanic: Super Max Level for Beedrill & Houndoom\n\n---\n🎁 Bonuses:\n✅ 2x Hatch Stardust\n✅ Mega Energy from catching Weedle, Pidgey, Houndour, Carvanha\n\n🔗 Source: LeekDuck.com"
  }
];

const newEs = [
  {
    "title": "Pokémon GO: Escuadrones Mega",
    "start": "2026-09-08 10:00",
    "end": "2026-09-14 20:00",
    "description": "¡Evento Escuadrones Mega con el debut de los Niveles Súper Max!\n\n💀 Jefes de Incursión:\n🔹 Mega-Beedrill (8 al 15 Sep)\n🔹 Mega-Houndoom (11 al 15 Sep)\n\n🗓️ Novedades del Evento:\n🔹 Debuts: Maschiff y Mabosstiff\n🔹 Debut Shiny: Flamigo\n🔹 Nueva mecánica: Nivel Súper Max para Beedrill y Houndoom\n\n---\n🎁 Bonus:\n✅ 2x Polvo Estelar por eclosión\n✅ Megaenergía al atrapar Weedle, Pidgey, Houndour, Carvanha\n\n🔗 Fuente: LeekDuck.com"
  }
];

const allEn = [...currentEn, ...newEn].sort((a, b) => a.start.localeCompare(b.start));
const allEs = [...currentEs, ...newEs].sort((a, b) => a.start.localeCompare(b.start));

fs.writeFileSync('GoCalendar/events_en.json', JSON.stringify(allEn, null, 2));
fs.writeFileSync('GoCalendar/events_es.json', JSON.stringify(allEs, null, 2));
console.log('Mega Squads Added!');
