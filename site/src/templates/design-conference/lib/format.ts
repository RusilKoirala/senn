import { event } from "../content";
import type { Session } from "./agenda";
const time = new Intl.DateTimeFormat("en-GB", { timeZone: event.timeZone, hour: "2-digit", minute: "2-digit", hour12: false });
export const localTime = (iso: string) => time.format(new Date(iso));
export const duration = (session: Session) => Math.round((Date.parse(session.end) - Date.parse(session.start)) / 60000);
