import { Geist, Instrument_Serif } from "next/font/google";
import { Benefits } from "./sections/benefits";
import { Faq } from "./sections/faq";
import { FinalCta } from "./sections/final-cta";
import { Footer } from "./sections/footer";
import { Hero } from "./sections/hero";
import { HowItWorks } from "./sections/how-it-works";
import { Logos } from "./sections/logos";
import { Nav } from "./sections/nav";
import { Proof } from "./sections/proof";
import { Tagline } from "./sections/tagline";
import "./theme.css";

// The template loads its own fonts so it looks the same in any project.
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-cove-sans",
});

const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cove-display",
});

export default function CovePage() {
  return (
    <div className={`cove ${sans.variable} ${display.variable} min-h-svh`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Logos />
        <Tagline />
        <Benefits />
        <HowItWorks />
        <Proof />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
