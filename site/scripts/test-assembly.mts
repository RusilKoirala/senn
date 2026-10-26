import assert from "node:assert/strict";
import { test } from "node:test";
import { createCalendar, escapeCalendarText, findConflicts, overlaps, restoreSelection, type Session } from "../src/templates/design-conference/lib/agenda.ts";

const session = (id: string, start: string, end: string): Session => ({
  id, start: `2027-05-14T${start}:00+02:00`, end: `2027-05-14T${end}:00+02:00`,
  room: "Studio", title: "A session", speaker: "A speaker", speakerId: null,
  track: "Design", takeaway: "One useful idea.", description: "Session description.",
});
const opening = session("opening", "09:30", "10:00");
const design = session("design", "10:00", "11:00");
const engineering = session("engineering", "10:00", "11:00");
const available = [opening, design, engineering];
const options = { name: "Assembly 2027", venue: "Harbor Hall", city: "Rotterdam", domain: "assembly.example", now: new Date("2026-10-26T00:00:00Z") };

test("touching sessions can coexist, simultaneous sessions conflict", () => {
  assert.equal(overlaps(opening, design), false);
  assert.equal(overlaps(design, engineering), true);
  assert.deepEqual(findConflicts([opening, design], engineering), [design]);
  assert.deepEqual(findConflicts([design], design), []);
});

test("restoring removes unknown, duplicate and conflicting saved IDs in timetable order", () => {
  assert.deepEqual(restoreSelection(null, available), []);
  assert.deepEqual(restoreSelection('["engineering","opening","design","opening","old",null]', available), ["opening", "design"]);
  assert.throws(() => restoreSelection("broken", available));
  assert.throws(() => restoreSelection('{"opening":true}', available));
});

test("calendar exports only the chosen sessions in UTC, sorted with stable IDs", () => {
  const calendar = createCalendar([design, opening], options);
  assert.equal(calendar.match(/BEGIN:VEVENT/g)?.length, 2);
  assert(calendar.indexOf("UID:opening@") < calendar.indexOf("UID:design@"));
  assert(calendar.includes("DTSTART:20270514T073000Z\r\nDTEND:20270514T080000Z"));
  assert(calendar.includes("DTSTART:20270514T080000Z\r\nDTEND:20270514T090000Z"));
  assert(calendar.endsWith("END:VCALENDAR\r\n"));
  assert(!calendar.replaceAll("\r\n", "").includes("\n"));
  assert(!calendar.includes("UID:engineering@"));
});

test("calendar escapes user copy, folds at 75 UTF-8 octets and preserves Unicode", () => {
  assert.equal(escapeCalendarText("A\\B;C,D\r\nE"), "A\\\\B\\;C\\,D\\nE");
  const title = "Café, design; together 🌿 ".repeat(12);
  const calendar = createCalendar([{ ...design, title }], options);
  for (const line of calendar.split("\r\n")) assert(Buffer.byteLength(line, "utf8") <= 75);
  const unfolded = calendar.replace(/\r\n /g, "");
  assert(unfolded.includes(`SUMMARY:${escapeCalendarText(title)}\r\n`));
});

test("empty selection, invalid dates and invalid durations cannot produce a calendar", () => {
  assert.throws(() => createCalendar([], options));
  assert.throws(() => createCalendar([{ ...design, start: "invalid" }], options));
  assert.throws(() => createCalendar([{ ...design, end: design.start }], options));
});
