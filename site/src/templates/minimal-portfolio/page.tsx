import { Geist, Geist_Mono } from "next/font/google";
import { ThemeShell } from "./components/theme-shell";
import { Activity } from "./sections/activity";
import { Experience } from "./sections/experience";
import { Footer } from "./sections/footer";
import { Header } from "./sections/header";
import { Hero } from "./sections/hero";
import { Projects } from "./sections/projects";
import { Quote } from "./sections/quote";
import { Stack } from "./sections/stack";
import "./theme.css";

// The template loads its own fonts so it looks the same in any project.
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-margin-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-margin-mono",
});

export default function MarginPage() {
  return (
    <ThemeShell className={`margin margin-grid ${sans.variable} ${mono.variable} min-h-svh antialiased`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-(--margin-fg) focus:px-3 focus:py-2 focus:text-(--margin-bg)"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex flex-col gap-16 sm:gap-20">
        <Hero />
        <Stack />
        <Projects />
        <Experience />
        <Activity />
        <Quote />
      </main>
      <Footer />
    </ThemeShell>
  );
}
