import { Geist, Geist_Mono } from "next/font/google";
import { Contact } from "./sections/contact";
import { Experience } from "./sections/experience";
import { Faq } from "./sections/faq";
import { Footer } from "./sections/footer";
import { Hero } from "./sections/hero";
import { KindWords } from "./sections/kind-words";
import { MoreWork } from "./sections/more-work";
import { Nav } from "./sections/nav";
import { Tagline } from "./sections/tagline";
import { Toolbox } from "./sections/toolbox";
import { Work } from "./sections/work";
import "./theme.css";

// The template loads its own fonts so it looks the same in any project.
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-summit-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-summit-mono",
});

export default function SummitPage() {
  return (
    <div className={`summit ${sans.variable} ${mono.variable} min-h-svh`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-(--summit-cream) focus:px-3 focus:py-2 focus:text-(--summit-ink)"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Tagline />
        <Work />
        <MoreWork />
        <Experience />
        <Toolbox />
        <KindWords />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
