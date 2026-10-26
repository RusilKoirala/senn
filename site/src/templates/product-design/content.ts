// Contour C01 is a fictional product concept. Replace every specification,
// finish, contact and legal detail with verified information before selling a
// real product, and add pricing and a purchase destination of your own.
import cobalt from "./assets/cobalt.jpg";
import graphite from "./assets/graphite.jpg";
import room from "./assets/room.jpg";
import type { Finish } from "./lib/spec";

export const brand = {
  name: "contour", model: "C01", product: "The desk light", sampleLabel: "Design concept",
  email: "studio@contour.example", fileName: "contour-c01-specification.txt",
};

export const navigation = {
  links: [{ label: "Details", href: "#details" }, { label: "In the room", href: "#room" }, { label: "Finishes", href: "#configure" }, { label: "Specifications", href: "#specifications" }],
  cta: "Choose your finish", ctaHref: "#configure",
  menuOpen: "Open navigation", menuClose: "Close navigation", skip: "Skip to the finishes",
};

export const finishes: Finish[] = [
  { id: "cobalt", name: "Cobalt", code: "C01 / CB", swatch: "#1645ed", note: "A saturated blue that stays bright in daylight and deepens in the evening.", image: { src: cobalt, alt: "Contour C01 desk light in matte cobalt blue on a pale studio background, its round head lit from below" } },
  { id: "graphite", name: "Graphite", code: "C01 / GR", swatch: "#3a3d42", note: "A soft charcoal that settles into oak, walnut and dark steel.", image: { src: graphite, alt: "Contour C01 desk light in matte graphite on a pale studio background, its round head lit from below" } },
];

export const hero = {
  index: "C01 / The desk light",
  headline: ["A little light.", "A better place."],
  description: "For the desk, the late page, and the corner that becomes your own. A considered task light with a simple turn of the dial.",
  cta: "Choose your finish", ctaHref: "#configure", secondary: "See the details", secondaryHref: "#details",
  details: [
    { label: "Head", text: "Adjustable" },
    { label: "Base", text: "Weighted" },
    { label: "Control", text: "Just one dial" },
  ],
};

export const details = {
  label: "Design details", title: ["Three parts.", "One quiet gesture."],
  description: "Nothing to learn and nothing to hide. Every part of C01 has one job, and you can see how it does it.",
  steps: [
    { title: "Place the base beside the task.", text: "A 148 mm disc of solid aluminium holds the light steady and keeps the rest of the desk clear." },
    { title: "Aim the head toward the page.", text: "The flat round head tilts on its arm so the light lands on your work instead of in your eyes." },
    { title: "Turn the dial to set the light.", text: "One turn switches it on. Keep turning to bring the brightness up or down, the way a real dial should." },
  ],
  figures: [{ value: 376, unit: "mm", label: "Overall height" }, { value: 262, unit: "mm", label: "Reach from the stem" }],
  imageCaption: "The dial sits where your hand already rests.",
};

export const tagline = { label: "C01", lines: ["Light where you need it.", "Quiet everywhere else."] };

export const roomSection = {
  label: "In the room",
  title: ["Made for the hours", "after the day ends."],
  description: "Set beside a notebook or a reading chair, C01 makes a small, warm place inside a bigger room. The rest of the evening stays dim and calm.",
  image: { src: room, alt: "A cobalt desk light glowing over an open notebook and ceramic cup on an oak desk against a pale wall at dusk" },
  caption: "Evening / oak desk / Cobalt",
};

export const configure = {
  label: "Finishes", title: ["Choose the one", "that belongs."],
  description: "Compare both finishes on the same light. Your choice is saved in the link, so you can send it to someone or come back to it later.",
  legend: "Finish", summary: "Your C01", rows: { model: "Model", finish: "Finish", code: "Finish code", size: "Size" },
  share: "Copy link", shared: "Link copied", shareError: "The link couldn’t be copied. Copy it from the address bar instead.",
  download: "Download specification", downloaded: "Specification downloaded", downloadError: "The specification couldn’t be created. Please try again.",
  note: "A design concept. Nothing is ordered or charged.",
};

export const specs = {
  label: "Specifications", title: ["Measured for", "a real desk."],
  note: "Concept specifications for this sample product. A real maker should publish verified figures and safety certification.",
  drawing: { height: 376, reach: 262, base: 148, head: 162, unit: "mm", labels: { height: "Height", reach: "Reach", base: "Base", head: "Head" } },
  rows: [
    { label: "Dimensions", value: "376 mm tall, 262 mm reach" },
    { label: "Base", value: "148 mm diameter, solid aluminium" },
    { label: "Head", value: "162 mm diameter, tilts 35°" },
    { label: "Weight", value: "1.9 kg" },
    { label: "Light", value: "Up to 640 lm, 2700 K warm white" },
    { label: "Control", value: "One dial for power and brightness" },
    { label: "Power", value: "USB C, 12 W adapter included" },
    { label: "Material", value: "Powder coated aluminium in Cobalt or Graphite" },
  ],
};

export const faq = {
  label: "Questions", title: "Good to know before it’s on your desk.",
  items: [
    { question: "Where does C01 fit?", answer: "Beside a notebook, a screen or a reading chair. The base takes a 148 mm circle and the head reaches 262 mm from the stem, so you can measure it against your own space." },
    { question: "How do the controls work?", answer: "The dial on the base does everything. Turn it to switch on, keep turning to adjust the brightness, and turn it back to switch off. The head tilts by hand." },
    { question: "Which finishes can I compare?", answer: "Cobalt and Graphite. The selector swaps the actual product photograph and updates the specification you can download." },
    { question: "Can I save my choice?", answer: "Copy the link with your finish already selected, or download the specification as a text file. No account is needed." },
    { question: "How would I care for it?", answer: "For this illustrative aluminium design, a soft dry cloth is the proposed care direction. A real maker should supply verified care and safety guidance." },
    { question: "Can I order this light?", answer: "C01 is a fictional product concept made for this template. This page does not take orders or payment." },
  ],
};

export const closing = {
  headline: ["Find the one", "for your desk."], cta: "Choose your finish", ctaHref: "#configure",
  description: "Two finishes, one dial, and a light that knows where to stop.",
};

export const footer = {
  marquee: "contour C01", back: "Back to the top", copyright: "Contour studio", emailLabel: "Write to the studio",
  privacyLabel: "Privacy", termsLabel: "About this demo", close: "Close",
  privacyTitle: "Your choice stays in the link.", privacyText: "The selected finish is stored only in this page’s address. Nothing is saved on a server and no account is created. The specification file is generated on your device.",
  termsTitle: "A product concept, not a shop.", termsText: "Contour and the C01 desk light are fictional sample content. The finish selector, share link and specification download work. They do not reserve stock, take payment or create an order.",
};
