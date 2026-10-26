import { Footer } from "./sections/footer";
import { Gallery } from "./sections/gallery";
import { Nav } from "./sections/nav";
import { OpenSource } from "./sections/open-source";
import { site } from "./seo";
import "./theme.css";

export default function SennHome() {
  return (
    <div className="senn flex min-h-svh flex-col">
      <Nav />
      <main className="flex-1">
        {/* The site stays visually minimal; the heading is for search engines and screen readers. */}
        <h1 className="sr-only">{site.title}</h1>
        <Gallery />
        <OpenSource />
      </main>
      <Footer />
    </div>
  );
}
