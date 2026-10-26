import { Poppins } from "next/font/google";
import { Header } from "./sections/header";
import { Hero } from "./sections/hero";
import { Details } from "./sections/details";
import { Tagline } from "./sections/tagline";
import { Room } from "./sections/room";
import { Configure } from "./sections/configure";
import { Specs } from "./sections/specs";
import { Faq } from "./sections/faq";
import { Closing } from "./sections/closing";
import { Footer } from "./sections/footer";
import { navigation } from "./content";
import "./theme.css";

const sans = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-contour-sans" });

export default function ContourPage() {
  return <div className={`contour ${sans.variable} min-h-svh antialiased`}><a href="#configure" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-(--contour-white) focus:px-4 focus:py-2">{navigation.skip}</a><Header /><main><Hero /><Details /><Tagline /><Room /><Configure /><Specs /><Faq /><Closing /></main><Footer /></div>;
}
