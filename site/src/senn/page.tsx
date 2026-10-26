import { Footer } from "./sections/footer";
import { Gallery } from "./sections/gallery";
import { Hero } from "./sections/hero";
import { HowItWorks } from "./sections/how-it-works";
import { Nav } from "./sections/nav";
import { Principles } from "./sections/principles";
import "./theme.css";

export default function SennHome() {
  return (
    <div className="senn min-h-svh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Gallery />
        <HowItWorks />
        <Principles />
      </main>
      <Footer />
    </div>
  );
}
