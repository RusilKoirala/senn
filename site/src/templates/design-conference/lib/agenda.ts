// Framework independent calendar and conflict logic. All times are explicit ISO
// instants so exports remain correct in every visitor's local timezone.
export type Track = "All" | "Design" | "Engineering";
export type Session = { id: string; start: string; end: string; room: string; title: string; speaker: string; speakerId: string | null; track: Track; takeaway: string; description: string };

export function overlaps(a: Pick<Session, "start" | "end">, b: Pick<Session, "start" | "end">) {
  return Date.parse(a.start) < Date.parse(b.end) && Date.parse(b.start) < Date.parse(a.end);
}
export function findConflicts(selected: readonly Session[], candidate: Session) {
  return selected.filter(session => session.id !== candidate.id && overlaps(session, candidate));
}
export function restoreSelection(raw: string | null, available: readonly Session[]) {
  if (raw === null) return [];
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error("Invalid saved agenda");
  const ids = new Set(parsed.filter((value): value is string => typeof value === "string"));
  // Keep known IDs in timetable order, discard stale IDs and overlapping records.
  const restored: Session[] = [];
  for (const session of available) if (ids.has(session.id) && !findConflicts(restored, session).length) restored.push(session);
  return restored.map(session => session.id);
}
export function escapeCalendarText(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
}
function foldLine(line: string) {
  const encoder = new TextEncoder();
  const lines: string[] = [];
  let current = "";
  let size = 0;
  for (const char of line) {
    const bytes = encoder.encode(char).length;
    if (size + bytes > 75) { lines.push(current); current = " "; size = 1; }
    current += char; size += bytes;
  }
  return [...lines, current].join("\r\n");
}
const utc = (iso: string | Date) => {
  const date = typeof iso === "string" ? new Date(iso) : iso;
  if (!Number.isFinite(date.getTime())) throw new Error("Invalid session date");
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
};
export function createCalendar(selected: readonly Session[], options: { name: string; venue: string; city: string; domain: string; now?: Date }) {
  if (!selected.length) throw new Error("Choose a session first");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Senn//Assembly Agenda//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", `X-WR-CALNAME:${escapeCalendarText(options.name)}`];
  const stamp = utc(options.now ?? new Date());
  for (const session of [...selected].sort((a, b) => Date.parse(a.start) - Date.parse(b.start))) {
    if (Date.parse(session.end) <= Date.parse(session.start)) throw new Error("Invalid session duration");
    lines.push("BEGIN:VEVENT", `UID:${encodeURIComponent(session.id)}@${options.domain}`, `DTSTAMP:${stamp}`, `DTSTART:${utc(session.start)}`, `DTEND:${utc(session.end)}`, `SUMMARY:${escapeCalendarText(session.title)}`, `DESCRIPTION:${escapeCalendarText(`${session.speaker}\n${session.takeaway}`)}`, `LOCATION:${escapeCalendarText(`${options.venue}, ${options.city}, ${session.room}`)}`, "END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join("\r\n") + "\r\n";
}
