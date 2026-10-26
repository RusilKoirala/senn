import { Footer } from "./sections/footer";
import { Gallery } from "./sections/gallery";
import { Nav } from "./sections/nav";
import { OpenSource } from "./sections/open-source";
import "./theme.css";

export default function SennHome() {
  return (
    <div className="senn flex min-h-svh flex-col">
      <Nav />
      <main className="flex-1">
        <Gallery />
        <OpenSource />
      </main>
      <Footer />
    </div>
  );
}
