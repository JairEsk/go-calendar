const fs = require('fs');

const currentEn = JSON.parse(fs.readFileSync('GoCalendar/events_en.json', 'utf8'));
const currentEs = JSON.parse(fs.readFileSync('GoCalendar/events_es.json', 'utf8'));

// Modifying the Super Mega Raid Day to Staraptor Super Mega Raid Day
currentEn.forEach(e => {
  if (e.title.includes("Super Mega Raid Day")) {
    e.title = "Pokémon GO: Staraptor Super Mega Raid Day";
    e.description = e.description.replace("Special Super Mega Raid Day!", "Staraptor Super Mega Raid Day!\n\n💀 Featured Boss:\n🔹 Mega Staraptor");
  }
});
currentEs.forEach(e => {
  if (e.title.includes("Super Mega Raid Day")) {
    e.title = "Pokémon GO: Día de Super Megaincursiones (Staraptor)";
    e.description = e.description.replace("¡Día especial de Incursiones Super Mega!", "¡Día especial de Incursiones Super Mega!\n\n💀 Jefe Destacado:\n🔹 Mega-Staraptor");
  }
});

// Adding newly discovered ones
const newEn = [
  {
    "title": "Pokémon GO: Harvest Festival",
    "start": "2026-10-03 14:00",
    "end": "2026-10-05 20:00",
    "description": "The annual Harvest Festival returns!\n\n💀 Features:\n🔹 Increased Grass-type Spawns\n🔹 Shiny Smoliv Debut (Rumored)\n\n---\n🎁 Bonuses:\n✅ 2x Catch Candy\n✅ Extended Lure duration\n\n🔗 Source: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: LEGO Stores & Pokémon GO",
    "start": "2026-09-30 18:00",
    "end": "2026-09-30 23:59",
    "description": "Special collaboration at physical LEGO Stores.\n\n💀 Features:\n🔹 Special PokéStops at LEGO Retail locations\n🔹 Timed Research available globally\n\n---\n🎁 Bonuses:\n✅ Exclusive avatar items\n\n🔗 Source: LeekDuck.com"
  }
];

const newEs = [
  {
    "title": "Pokémon GO: Festival de la Cosecha",
    "start": "2026-10-03 14:00",
    "end": "2026-10-05 20:00",
    "description": "¡Regresa el Festival de la Cosecha anual!\n\n💀 Características:\n🔹 Mayor aparición de Pokémon tipo Planta\n🔹 Posible debut de Smoliv variocolor (Shiny)\n\n---\n🎁 Bonus:\n✅ 2x Caramelos por captura\n✅ Mayor duración de los Módulos Cebo\n\n🔗 Fuente: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Tiendas LEGO y Pokémon GO",
    "start": "2026-09-30 18:00",
    "end": "2026-09-30 23:59",
    "description": "Colaboración especial en tiendas físicas LEGO.\n\n💀 Características:\n🔹 Poképaradas especiales en tiendas LEGO\n🔹 Investigación Temporal global\n\n---\n🎁 Bonus:\n✅ Artículos exclusivos para el avatar\n\n🔗 Fuente: LeekDuck.com"
  }
];

const allEn = [...currentEn, ...newEn].sort((a, b) => a.start.localeCompare(b.start));
const allEs = [...currentEs, ...newEs].sort((a, b) => a.start.localeCompare(b.start));

fs.writeFileSync('GoCalendar/events_en.json', JSON.stringify(allEn, null, 2));
fs.writeFileSync('GoCalendar/events_es.json', JSON.stringify(allEs, null, 2));
console.log('Updated with new events!');
