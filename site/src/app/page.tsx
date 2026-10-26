import SennHome from "@/senn/page";
import { liveTemplates } from "@/templates/catalog";
import { JsonLd, homeJsonLd } from "@/senn/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd(liveTemplates)} />
      <SennHome />
    </>
  );
}
