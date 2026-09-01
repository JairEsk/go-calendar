const fs = require('fs');

const currentEn = JSON.parse(fs.readFileSync('GoCalendar/events_en.json', 'utf8'));
const currentEs = JSON.parse(fs.readFileSync('GoCalendar/events_es.json', 'utf8'));

const newEnEvents = [
  {
    "title": "Pokémon GO: 10th Anniversary Celebration",
    "start": "2026-09-05 10:00",
    "end": "2026-09-06 23:59",
    "description": "Celebrate Pokémon GO's 10th Anniversary with special Timed Research!\n\n💀 Features:\n🔹 Perfect Mewtwo Encounter\n🔹 10th Anniversary Pikachu Spawns\n\n---\n🎁 Bonuses:\n✅ 2x Catch XP\n✅ 1/2 Hatch Distance\n\n🔗 Source: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Spotlight Hour (Weedle, Kakuna, Beedrill)",
    "start": "2026-09-01 18:00",
    "end": "2026-09-01 19:00",
    "description": "Weekly Spotlight Hour.\n\n💀 Featured Pokémon:\n🔹 Weedle\n🔹 Kakuna\n🔹 Beedrill\n\n---\n🎁 Bonuses:\n✅ 2x Evolve XP\n\n🔗 Source: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Raid Hour (Regi Trio)",
    "start": "2026-09-02 18:00",
    "end": "2026-09-02 19:00",
    "description": "Weekly Raid Hour.\n\n💀 Raid Bosses:\n🔹 Regirock\n🔹 Regice\n🔹 Registeel\n\n---\n🎁 Bonuses:\n✅ Increased 5-Star Raids\n\n🔗 Source: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Max Monday (Dynamax Rhyhorn)",
    "start": "2026-09-07 18:00",
    "end": "2026-09-07 19:00",
    "description": "Max Monday Event.\n\n💀 Max Battles:\n🔹 Dynamax Rhyhorn\n\n---\n🎁 Bonuses:\n✅ Increased Max Particles\n\n🔗 Source: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Spotlight Hour (Houndour & Houndoom)",
    "start": "2026-09-08 18:00",
    "end": "2026-09-08 19:00",
    "description": "Weekly Spotlight Hour.\n\n💀 Featured Pokémon:\n🔹 Houndour\n🔹 Houndoom\n\n---\n🎁 Bonuses:\n✅ 2x Catch Stardust\n\n🔗 Source: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Raid Hour (Zacian)",
    "start": "2026-09-09 18:00",
    "end": "2026-09-09 19:00",
    "description": "Weekly Raid Hour.\n\n💀 Raid Bosses:\n🔹 Zacian (Hero of Many Battles)\n\n---\n🎁 Bonuses:\n✅ Increased 5-Star Raids\n\n🔗 Source: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Gible Community Day Classic",
    "start": "2026-09-12 14:00",
    "end": "2026-09-12 17:00",
    "description": "Community Day Classic featuring Gible!\n\n💀 Featured Pokémon:\n🔹 Gible (Increased Shiny Odds)\n🔹 Evolve to Garchomp for Earth Power\n\n---\n🎁 Bonuses:\n✅ 1/4 Hatch Distance\n✅ 3-Hour Incense & Lures\n✅ Surprise Snapshots\n\n🔗 Source: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Max Monday (Galar Birds)",
    "start": "2026-09-14 18:00",
    "end": "2026-09-14 19:00",
    "description": "Max Monday Event.\n\n💀 Max Battles:\n🔹 Dynamax Articuno\n🔹 Dynamax Zapdos\n🔹 Dynamax Moltres\n\n---\n🎁 Bonuses:\n✅ Increased Max Particles\n\n🔗 Source: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Spotlight Hour (Mystery)",
    "start": "2026-09-15 18:00",
    "end": "2026-09-15 19:00",
    "description": "Weekly Spotlight Hour.\n\n💀 Featured Pokémon:\n🔹 Mystery Pokémon\n\n---\n🎁 Bonuses:\n✅ 2x Catch Candy\n\n🔗 Source: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Raid Hour (Zamazenta)",
    "start": "2026-09-16 18:00",
    "end": "2026-09-16 19:00",
    "description": "Weekly Raid Hour.\n\n💀 Raid Bosses:\n🔹 Zamazenta (Hero of Many Battles)\n\n---\n🎁 Bonuses:\n✅ Increased 5-Star Raids\n\n🔗 Source: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Phantump Catch Mastery",
    "start": "2026-09-20 10:00",
    "end": "2026-09-20 20:00",
    "description": "Catch Mastery Event.\n\n💀 Featured Pokémon:\n🔹 Phantump (Increased Shiny Odds)\n\n---\n🎁 Bonuses:\n✅ Increased XP for Excellent Throws\n✅ Timed Research available\n\n🔗 Source: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Max Monday (Dynamax Sobble)",
    "start": "2026-09-21 18:00",
    "end": "2026-09-21 19:00",
    "description": "Max Monday Event.\n\n💀 Max Battles:\n🔹 Dynamax Sobble\n\n---\n🎁 Bonuses:\n✅ Increased Max Particles\n\n🔗 Source: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Spotlight Hour (Rattata)",
    "start": "2026-09-22 18:00",
    "end": "2026-09-22 19:00",
    "description": "Weekly Spotlight Hour.\n\n💀 Featured Pokémon:\n🔹 Rattata\n\n---\n🎁 Bonuses:\n✅ 2x Transfer Candy\n\n🔗 Source: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Raid Hour (Xerneas)",
    "start": "2026-09-23 18:00",
    "end": "2026-09-23 19:00",
    "description": "Weekly Raid Hour.\n\n💀 Raid Bosses:\n🔹 Xerneas\n\n---\n🎁 Bonuses:\n✅ Increased 5-Star Raids\n\n🔗 Source: LeekDuck.com"
  }
];

const newEsEvents = [
  {
    "title": "Pokémon GO: Celebración 10º Aniversario",
    "start": "2026-09-05 10:00",
    "end": "2026-09-06 23:59",
    "description": "¡Celebra el 10º Aniversario de Pokémon GO con Investigación Temporal!\n\n💀 Características:\n🔹 Encuentro con Mewtwo Perfecto\n🔹 Apariciones de Pikachu 10º Aniversario\n\n---\n🎁 Bonus:\n✅ 2x XP por captura\n✅ 1/2 Distancia de eclosión\n\n🔗 Fuente: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Hora Destacada (Weedle, Kakuna, Beedrill)",
    "start": "2026-09-01 18:00",
    "end": "2026-09-01 19:00",
    "description": "Hora Destacada Semanal.\n\n💀 Pokémon Destacados:\n🔹 Weedle\n🔹 Kakuna\n🔹 Beedrill\n\n---\n🎁 Bonus:\n✅ 2x XP por evolucionar\n\n🔗 Fuente: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Hora Legendaria (Trío Regi)",
    "start": "2026-09-02 18:00",
    "end": "2026-09-02 19:00",
    "description": "Hora de Incursiones Semanal.\n\n💀 Jefes de Incursión:\n🔹 Regirock\n🔹 Regice\n🔹 Registeel\n\n---\n🎁 Bonus:\n✅ Aumento de Incursiones Nivel 5\n\n🔗 Fuente: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Max Monday (Dynamax Rhyhorn)",
    "start": "2026-09-07 18:00",
    "end": "2026-09-07 19:00",
    "description": "Evento Max Monday.\n\n💀 Combates Max:\n🔹 Dynamax Rhyhorn\n\n---\n🎁 Bonus:\n✅ Aumento de Partículas Max\n\n🔗 Fuente: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Hora Destacada (Houndour y Houndoom)",
    "start": "2026-09-08 18:00",
    "end": "2026-09-08 19:00",
    "description": "Hora Destacada Semanal.\n\n💀 Pokémon Destacados:\n🔹 Houndour\n🔹 Houndoom\n\n---\n🎁 Bonus:\n✅ 2x Polvo Estelar por captura\n\n🔗 Fuente: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Hora Legendaria (Zacian)",
    "start": "2026-09-09 18:00",
    "end": "2026-09-09 19:00",
    "description": "Hora de Incursiones Semanal.\n\n💀 Jefes de Incursión:\n🔹 Zacian (Héroe de Múltiples Batallas)\n\n---\n🎁 Bonus:\n✅ Aumento de Incursiones Nivel 5\n\n🔗 Fuente: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Día de la Comunidad Clásico (Gible)",
    "start": "2026-09-12 14:00",
    "end": "2026-09-12 17:00",
    "description": "¡Día de la Comunidad Clásico protagonizado por Gible!\n\n💀 Pokémon Destacado:\n🔹 Gible (Mayor probabilidad Shiny)\n🔹 Evoluciona a Garchomp para Tierra Viva\n\n---\n🎁 Bonus:\n✅ 1/4 Distancia de eclosión\n✅ Inciensos y Módulos Cebo de 3 horas\n✅ Sorpresas en Instantáneas\n\n🔗 Fuente: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Max Monday (Aves de Galar)",
    "start": "2026-09-14 18:00",
    "end": "2026-09-14 19:00",
    "description": "Evento Max Monday.\n\n💀 Combates Max:\n🔹 Dynamax Articuno\n🔹 Dynamax Zapdos\n🔹 Dynamax Moltres\n\n---\n🎁 Bonus:\n✅ Aumento de Partículas Max\n\n🔗 Fuente: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Hora Destacada (Misterio)",
    "start": "2026-09-15 18:00",
    "end": "2026-09-15 19:00",
    "description": "Hora Destacada Semanal.\n\n💀 Pokémon Destacados:\n🔹 Pokémon Misterio\n\n---\n🎁 Bonus:\n✅ 2x Caramelos por captura\n\n🔗 Fuente: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Hora Legendaria (Zamazenta)",
    "start": "2026-09-16 18:00",
    "end": "2026-09-16 19:00",
    "description": "Hora de Incursiones Semanal.\n\n💀 Jefes de Incursión:\n🔹 Zamazenta (Héroe de Múltiples Batallas)\n\n---\n🎁 Bonus:\n✅ Aumento de Incursiones Nivel 5\n\n🔗 Fuente: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Maestría de Captura (Phantump)",
    "start": "2026-09-20 10:00",
    "end": "2026-09-20 20:00",
    "description": "Evento de Maestría de Captura.\n\n💀 Pokémon Destacado:\n🔹 Phantump (Mayor probabilidad Shiny)\n\n---\n🎁 Bonus:\n✅ Aumento de XP por lanzamientos Excelentes\n✅ Investigación Temporal disponible\n\n🔗 Fuente: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Max Monday (Dynamax Sobble)",
    "start": "2026-09-21 18:00",
    "end": "2026-09-21 19:00",
    "description": "Evento Max Monday.\n\n💀 Combates Max:\n🔹 Dynamax Sobble\n\n---\n🎁 Bonus:\n✅ Aumento de Partículas Max\n\n🔗 Fuente: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Hora Destacada (Rattata)",
    "start": "2026-09-22 18:00",
    "end": "2026-09-22 19:00",
    "description": "Hora Destacada Semanal.\n\n💀 Pokémon Destacados:\n🔹 Rattata\n\n---\n🎁 Bonus:\n✅ 2x Caramelos por transferencia\n\n🔗 Fuente: LeekDuck.com"
  },
  {
    "title": "Pokémon GO: Hora Legendaria (Xerneas)",
    "start": "2026-09-23 18:00",
    "end": "2026-09-23 19:00",
    "description": "Hora de Incursiones Semanal.\n\n💀 Jefes de Incursión:\n🔹 Xerneas\n\n---\n🎁 Bonus:\n✅ Aumento de Incursiones Nivel 5\n\n🔗 Fuente: LeekDuck.com"
  }
];

// Append and sort by start date
const allEn = [...currentEn, ...newEnEvents].sort((a, b) => a.start.localeCompare(b.start));
const allEs = [...currentEs, ...newEsEvents].sort((a, b) => a.start.localeCompare(b.start));

fs.writeFileSync('GoCalendar/events_en.json', JSON.stringify(allEn, null, 2));
fs.writeFileSync('GoCalendar/events_es.json', JSON.stringify(allEs, null, 2));
console.log('Merged successfully!');
