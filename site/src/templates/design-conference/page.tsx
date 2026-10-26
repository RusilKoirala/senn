import { Geist_Mono, Manrope } from "next/font/google";
import { AgendaProvider } from "./components/agenda-provider";
import { Header } from "./sections/header";
import { Hero } from "./sections/hero";
import { Programme } from "./sections/programme";
import { People } from "./sections/people";
import { Why } from "./sections/why";
import { Venue } from "./sections/venue";
import { Faq } from "./sections/faq";
import { Agenda } from "./sections/agenda";
import { Footer } from "./sections/footer";
import { navigation } from "./content";
import "./theme.css";
const sans = Manrope({ subsets: ["latin"], variable: "--font-assembly-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-assembly-mono" });
export default function AssemblyPage() {
  return <div className={`assembly ${sans.variable} ${mono.variable} min-h-svh antialiased`}><AgendaProvider><a href="#programme" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-(--assembly-paper) focus:p-3">{navigation.skip}</a><Header /><main><Hero /><Programme /><People /><Why /><Venue /><Faq /><Agenda /></main><Footer /></AgendaProvider></div>;
}
