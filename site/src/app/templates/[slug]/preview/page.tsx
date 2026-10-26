import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getMeta, liveTemplates } from "@/templates/catalog";
import { TemplateViewer } from "@/senn/viewer";

type Params = PageProps<"/templates/[slug]/preview">["params"];

export function generateStaticParams() {
  return liveTemplates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/templates/[slug]/preview">) {
  const { slug } = await params;
  const t = getMeta(slug);
  return t ? { title: `${t.name} preview — Senn`, description: t.description } : {};
}

// params is read inside Suspense so client navigations stay instant.
export default function TemplateViewerPage({ params }: PageProps<"/templates/[slug]/preview">) {
  return (
    <Suspense>
      <Viewer params={params} />
    </Suspense>
  );
}

async function Viewer({ params }: { params: Params }) {
  const { slug } = await params;
  const t = getMeta(slug);
  if (!t || t.status !== "live") notFound();
  return <TemplateViewer template={t} />;
}
