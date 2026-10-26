import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getMeta, liveTemplates } from "@/templates/catalog";
import { TemplateDetail } from "@/senn/detail";
import { Footer } from "@/senn/sections/footer";
import { Nav } from "@/senn/sections/nav";
import { previews } from "@/senn/previews";
import { JsonLd, templateJsonLd, templateTitle } from "@/senn/seo";
import "@/senn/theme.css";

type Params = PageProps<"/templates/[slug]">["params"];

export function generateStaticParams() {
  return liveTemplates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/templates/[slug]">) {
  const { slug } = await params;
  const t = getMeta(slug);
  if (!t) return {};
  const title = templateTitle(t);
  const preview = previews[t.slug];
  const images = preview ? [{ url: preview.src, width: preview.width, height: preview.height, alt: `${t.name} template preview` }] : undefined;
  return {
    title,
    description: t.description,
    keywords: [title, `${t.name} template`, "Next.js", "Tailwind CSS", ...(t.tags ?? [])],
    alternates: { canonical: `/templates/${t.slug}` },
    openGraph: { type: "website", url: `/templates/${t.slug}`, title: `${title} | Senn`, description: t.description, images },
    twitter: { card: "summary_large_image", title: `${title} | Senn`, description: t.description, images },
  };
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
  return (
    <>
      <JsonLd data={templateJsonLd(t, previews[t.slug]?.src)} />
      <TemplateDetail template={t} />
    </>
  );
}
