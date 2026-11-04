// Calendar utility for Wedding Events
// Generates standard .ics files and Google Calendar links

export function generateIcsContent(event) {
  const { title, description, location, startDate, endDate } = event;

  const formatDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aarav & Ananya Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${event.id}-${Date.now()}@aaravananya.wedding`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(new Date(startDate))}`,
    `DTEND:${formatDate(new Date(endDate))}`,
    `SUMMARY:${title} — Aarav & Ananya Wedding`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return ics;
}

export function downloadIcsFile(event) {
  const icsContent = generateIcsContent(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${event.id}-aarav-ananya.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
}

export function getGoogleCalendarUrl(event) {
  const { title, description, location, startDate, endDate } = event;

  const formatGCalDate = (date) => {
    return new Date(date).toISOString().replace(/-|:|\.\d+/g, '');
  };

  const start = formatGCalDate(startDate);
  const end = formatGCalDate(endDate);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${title} — Aarav & Ananya Wedding`,
    dates: `${start}/${end}`,
    details: `${description}\n\nVenue: ${location}\nCelebration of Aarav & Ananya's Wedding`,
    location: location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

