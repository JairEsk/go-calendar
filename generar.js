const fs = require('fs');

// Leer los eventos del archivo JSON
const eventos = JSON.parse(fs.readFileSync('eventos.json', 'utf8'));

// Cabecera estándar para un calendario suscribible
let icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Roxy AI//ES\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nX-WR-CALNAME:GO Events\r\nX-WR-TIMEZONE:America/Mexico_City\r\n`;

eventos.forEach((evento, index) => {
    // Formatear fecha "YYYY-MM-DD HH:mm" a "YYYYMMDDTHHmm00"
    const formatFecha = (fechaStr) => fechaStr.replace(/[-:]/g, '').replace(' ', 'T') + '00';
    
    // Crear un ID único para cada evento (ahora sin Date.now() en cada run para evitar cambios innecesarios en git, usando solo index y el titulo)
    const uid = `go-event-${index}-roxy@gocalendar.local`;
    
    // Obtener la fecha actual para el sello de creación
    const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    icsContent += `BEGIN:VEVENT\r\n`;
    icsContent += `UID:${uid}\r\n`;
    icsContent += `DTSTAMP:${dtstamp}\r\n`;
    // CORRECCIÓN APLICADA: Forzamos el uso horario local para Outlook
    icsContent += `DTSTART;TZID=America/Mexico_City:${formatFecha(evento.inicio)}\r\n`;
    icsContent += `DTEND;TZID=America/Mexico_City:${formatFecha(evento.fin)}\r\n`;
    icsContent += `SUMMARY:${evento.titulo}\r\n`;
    icsContent += `DESCRIPTION:${evento.descripcion}\r\n`;
    icsContent += `END:VEVENT\r\n`;
});

icsContent += `END:VCALENDAR\r\n`;

// Guardar el archivo final
fs.writeFileSync('go_events.ics', icsContent);
console.log('¡Éxito! Archivo go_events.ics generado correctamente.');