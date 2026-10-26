import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getMeta, liveTemplates } from "@/templates/catalog";
import { TemplateDetail } from "@/senn/detail";
import { Footer } from "@/senn/sections/footer";
import { Nav } from "@/senn/sections/nav";
import "@/senn/theme.css";

type Params = PageProps<"/templates/[slug]">["params"];

export function generateStaticParams() {
  return liveTemplates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/templates/[slug]">) {
  const { slug } = await params;
  const t = getMeta(slug);
  return t ? { description: t.description } : {};
}

export default function TemplateDetailPage({ params }: PageProps<"/templates/[slug]">) {
  return (
    <div className="senn flex min-h-svh flex-col">
      <Nav />
      <main className="flex-1">
        {/* params is read inside Suspense so client navigations stay instant. */}
        <Suspense>
          <Detail params={params} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

async function Detail({ params }: { params: Params }) {
  const { slug } = await params;
  const t = getMeta(slug);
  if (!t || t.status !== "live") notFound();
  return <TemplateDetail template={t} />;
}
