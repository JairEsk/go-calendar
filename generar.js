const fs = require('fs');

// Leer los eventos del archivo JSON
const eventos = JSON.parse(fs.readFileSync('eventos.json', 'utf8'));

// Cabecera estándar para un calendario suscribible
let icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Roxy AI//ES\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nX-WR-CALNAME:GO Events\r\nX-WR-TIMEZONE:America/Mexico_City\r\n`;

eventos.forEach((evento, index) => {
    // Formatear fecha "YYYY-MM-DD HH:mm" a "YYYYMMDDTHHmm00" (Floating Time, se adapta a la zona horaria del usuario)
    const formatFecha = (fechaStr) => fechaStr.replace(/[-:]/g, '').replace(' ', 'T') + '00';
    
    // Crear un ID único para cada evento
    const uid = `go-event-${index}-${Date.now()}@gocalendar.local`;
    
    // Obtener la fecha actual para el sello de creación
    const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    icsContent += `BEGIN:VEVENT\r\n`;
    icsContent += `UID:${uid}\r\n`;
    icsContent += `DTSTAMP:${dtstamp}\r\n`;
    icsContent += `DTSTART:${formatFecha(evento.inicio)}\r\n`;
    icsContent += `DTEND:${formatFecha(evento.fin)}\r\n`;
    icsContent += `SUMMARY:${evento.titulo}\r\n`;
    icsContent += `DESCRIPTION:${evento.descripcion}\r\n`;
    icsContent += `END:VEVENT\r\n`;
});

icsContent += `END:VCALENDAR\r\n`;

// Guardar el archivo final
fs.writeFileSync('go_events.ics', icsContent);
console.log('¡Éxito! Archivo go_events.ics generado correctamente.');
