// Assembly is a fictional sample event. Replace all people, dates, venue details
// and destinations with verified information before announcing a real event.
import hall from "./assets/hall.jpg";
import venuePhoto from "./assets/venue.jpg";
import type { Session } from "./lib/agenda";

export const event = {
  name: "Assembly", edition: "2027", slug: "assembly-2027", sampleLabel: "Sample event",
  category: "An independent design & technology gathering",
  date: "2027-05-14", dateLabel: "14 May 2027", shortDate: "14.05.27", day: "Friday", month: "May", dateNumber: "14",
  city: "Rotterdam, NL", timeZone: "Europe/Amsterdam", timeZoneLabel: "Rotterdam time · CEST",
  email: "hello@assembly.example", calendarDomain: "assembly.example",
  storageKey: "assembly:2027:agenda:v1", calendarFile: "assembly-2027-agenda.ics",
};
export const navigation = {
  links: [{ label: "Programme", href: "#programme" }, { label: "People", href: "#people" }, { label: "The place", href: "#venue" }],
  agenda: "Your agenda", menuOpen: "Open navigation", menuClose: "Close navigation", skip: "Skip to programme",
};
export const hero = {
  headline: ["Good work.", "Better company."],
  description: "One day for people who make digital things. Talks, small rooms, and conversations you’ll still be having on the way home.",
  cta: "Build your agenda", ctaHref: "#programme",
  detail: "Eight sessions. Two rooms. A day to make your own.",
  venue: "Harbor Hall", dateNote: "One day. In good company.",
  image: { src: hall, alt: "People gathering around communal tables in a sunlit brick conference hall with orange chairs", position: "50% 58%" },
  imageCaption: "A room for a different kind of day.", imageCredit: "Harbor Hall / Rotterdam",
  marquee: "Independent minds. Shared ideas. Good company.",
};
export const programme = {
  label: "The programme", title: "Follow your curiosity.",
  description: "A little design. A little code. Plenty to talk about. Find your sessions and leave some space between them.",
  tracks: ["All", "Design", "Engineering"] as const,
  timeHeading: "Time / room", sessionHeading: "Something to take away", selectionHeading: "Your day",
  filtersLabel: "Filter programme by track", sharedTrack: "Everyone", sessionsLabel: "sessions",
  about: "About this session", biography: "Meet the speaker", add: "Add to agenda", remove: "Remove from agenda", added: "Added",
  duration: "min", roomLabel: "Room", allTimes: "All times are local to Rotterdam.",
  breaks: [
    { after: "11:00", time: "11:00 — 11:15", label: "Coffee. And the conversation you just started." },
    { after: "12:15", time: "12:15 — 13:30", label: "Lunch / take it outside." },
    { after: "14:30", time: "14:30 — 14:45", label: "A little breathing room." },
    { after: "15:45", time: "15:45 — 16:00", label: "One last coffee." },
  ],
};
export const sessions: Session[] = [
  { id: "opening", start: "2027-05-14T09:30:00+02:00", end: "2027-05-14T10:00:00+02:00", room: "Main room", title: "Opening the room", speaker: "The Assembly hosts", speakerId: null, track: "All", takeaway: "Meet the themes of the day and find your route through the two rooms.", description: "Get to know the programme, the people around you, and the spaces for conversation and quiet breaks. There’s more than one way to spend this day." },
  { id: "interface-voice", start: "2027-05-14T10:00:00+02:00", end: "2027-05-14T11:00:00+02:00", room: "Main room", title: "Interfaces with a point of view", speaker: "Mara Velez", speakerId: "mara", track: "Design", takeaway: "Make hierarchy, language and interaction express the same product idea.", description: "Mara walks through contrasting approaches to the same interface. See how small choices create a recognisable voice without making everyday tasks harder." },
  { id: "between-components", start: "2027-05-14T10:00:00+02:00", end: "2027-05-14T11:00:00+02:00", room: "Studio", title: "The work between the components", speaker: "Dev Mehta", speakerId: "dev", track: "Engineering", takeaway: "Decide what belongs inside a component and what belongs between components.", description: "Follow a shared interaction across component boundaries: state ownership, keyboard behaviour, and the decisions that need to travel with the code." },
  { id: "slower-decisions", start: "2027-05-14T11:15:00+02:00", end: "2027-05-14T12:15:00+02:00", room: "Main room", title: "Making room for a slower decision", speaker: "Noa Laurent", speakerId: "noa", track: "Design", takeaway: "Separate decisions that need evidence from the ones you can safely reverse.", description: "Work through a product scenario using a practical decision record. Explore assumptions, missing evidence, and the moment to stop debating and test." },
  { id: "systems-handoff", start: "2027-05-14T11:15:00+02:00", end: "2027-05-14T12:15:00+02:00", room: "Studio", title: "Small systems that survive handoff", speaker: "Ada Okafor", speakerId: "ada", track: "Engineering", takeaway: "Document the decisions another team needs to extend your system.", description: "Connect component examples, usage guidance and ownership notes into a small handoff package. Make space for exceptions and the changes you can’t predict yet." },
  { id: "prototype-proof", start: "2027-05-14T13:30:00+02:00", end: "2027-05-14T14:30:00+02:00", room: "Main room", title: "What a prototype can prove", speaker: "Jun Park", speakerId: "jun", track: "Design", takeaway: "Choose a prototype that answers one useful question before building more.", description: "Compare sketches, interactive flows and browser prototypes. Find out what each can test, and where apparent fidelity can give a team false confidence." },
  { id: "browser-brief", start: "2027-05-14T14:45:00+02:00", end: "2027-05-14T15:45:00+02:00", room: "Studio", title: "The browser is part of the brief", speaker: "Ines Rocha", speakerId: "ines", track: "Engineering", takeaway: "Use real layout, input and accessibility constraints to improve the design.", description: "Take an interface from a fixed composition into the browser. Work with growing content, narrow screens and focus order, and see what emerges during implementation." },
  { id: "closing", start: "2027-05-14T16:00:00+02:00", end: "2027-05-14T16:45:00+02:00", room: "Main room", title: "A conversation worth continuing", speaker: "The Assembly hosts", speakerId: null, track: "All", takeaway: "Turn the day’s questions into a next step for your own work.", description: "Bring the themes from both rooms together. Share an unresolved question or a small experiment you want to take back to your team." },
];
export const people = {
  label: "The people", title: ["Different minds.", "Common ground."],
  description: "People who care about the work, and the way we do it. Six perspectives on making things that matter to someone.",
  bioLabel: "Read biography", sessionLink: "Find their session", sampleNote: "Fictional speakers for this sample event.",
  speakers: [
    { id: "mara", name: "Mara Velez", role: "Product designer", topic: "Interface voice", sessionId: "interface-voice", bio: "Mara explores how language, hierarchy and everyday interactions give digital products a distinct character. Her session makes those choices legible to a whole team." },
    { id: "dev", name: "Dev Mehta", role: "Frontend engineer", topic: "Component boundaries", sessionId: "between-components", bio: "Dev works on the state and interaction patterns connecting reusable components. His focus is making behaviour understandable across design and engineering." },
    { id: "noa", name: "Noa Laurent", role: "Design facilitator", topic: "Product decisions", sessionId: "slower-decisions", bio: "Noa helps small teams turn uncertain questions into decisions they can explain and revisit. Their session asks when discussion needs a test or a clearer record." },
    { id: "ada", name: "Ada Okafor", role: "Design systems engineer", topic: "Handoff", sessionId: "systems-handoff", bio: "Ada connects component implementation with the guidance teams need to use it. She focuses on ownership and the decisions that often disappear during handoff." },
    { id: "jun", name: "Jun Park", role: "Interaction designer", topic: "Prototyping", sessionId: "prototype-proof", bio: "Jun uses prototypes to investigate specific questions about flows and behaviour. Their work matches the prototype’s level of detail to the evidence a team needs." },
    { id: "ines", name: "Ines Rocha", role: "Creative developer", topic: "Design in the browser", sessionId: "browser-brief", bio: "Ines explores visual ideas through working browser interfaces. She treats responsive layout, keyboard use and content variation as part of the design process." },
  ],
};
export const why = { label: "More than a programme", lines: ["Come for the work.", "Stay for the conversations."], note: "The space between sessions is part of the point." };
export const venue = {
  label: "The place", name: "Harbor Hall", title: ["A change", "of scenery."],
  description: "An old waterfront hall. Big windows, long tables, and enough room to find your people. A little away from the everyday.",
  city: "Rotterdam, Netherlands", image: { src: venuePhoto, alt: "A fictional converted brick warehouse venue beside the water, with tall black windows and an open orange entrance" },
  details: [{ label: "Arrive", text: "Doors at 09:00. Opening session at 09:30." }, { label: "Find your way", text: "Main room for the big conversations. Studio for a closer look." }, { label: "Make yourself comfortable", text: "A quiet space and seating between sessions. Contact the event owner for verified access and transport details." }],
  sampleNote: "Harbor Hall is a fictional venue for this sample event.",
};
export const faq = {
  label: "Good to know", title: "A few practical things.",
  items: [
    { question: "Who is this for?", answer: "People who design and build digital products. Independent makers, frontend engineers, designers and small teams are all in the right room." },
    { question: "Can I switch rooms?", answer: "Absolutely. Pick sessions from either track. The programme lists each room and gives you time to move between them." },
    { question: "What if two sessions overlap?", answer: "We’ll flag the clash before changing your plan. Keep the session you already chose, or swap it for the new one." },
    { question: "Do I need an account?", answer: "No. Your agenda lives in this browser. Download a calendar file to keep it with you or move it to another device." },
    { question: "Is the venue accessible?", answer: "This is a fictional sample event. A real event owner should provide verified information about step free access, seating, quiet space and travel before announcing the venue." },
    { question: "Is this a ticket?", answer: "Your downloaded agenda is a personal plan, not an admission ticket. Assembly is a sample event. Real organisers can add their own ticket provider." },
  ],
};
export const agendaCopy = {
  label: "Your agenda", title: ["A day", "that fits you."], description: "Keep what caught your eye. Leave room for the unexpected.",
  count: "sessions saved", emptyTitle: "Your day is still open.", emptyText: "Find a session that speaks to you. We’ll keep it here.",
  browse: "Explore the programme", download: "Download your agenda", downloaded: "Calendar downloaded", downloadError: "The calendar couldn’t be created. Please try again.",
  note: "A personal plan. No account. No booking.", loading: "Loading your saved agenda…", remove: "Remove", clear: "Clear agenda",
  storageError: "Your browser couldn’t save this plan. You can still choose sessions and download your calendar.",
  restoredError: "The saved plan couldn’t be read. Start a new agenda below.",
  conflictTitle: "Two good things. One time slot.", conflictText: "This session overlaps with your current plan. Which one would you like to keep?",
  current: "Already in your day", proposed: "Caught your eye", keep: "Keep my plan", replace: "Use this session", close: "Close dialog",
  privacy: "Only your selected sessions are saved in this browser.",
};
export const footer = {
  phrase: "See you in the room.", back: "Back to the programme", copyright: "Assembly 2027", emailLabel: "Say hello", privacyLabel: "Privacy", termsLabel: "About this demo", close: "Close",
  privacyTitle: "Your plan stays with you.", privacyText: "The agenda stores your selected session IDs in this browser’s local storage. No account is created. Clearing your agenda removes those saved choices. The calendar is generated on your device.",
  termsTitle: "A sample event, a working agenda.", termsText: "Assembly, its speakers and Harbor Hall are fictional sample content. The programme planner and calendar download work. They do not reserve admission, create a booking or issue a ticket.",
};
