import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTemplate, templates } from "@/templates";

type Params = PageProps<"/t/[slug]">["params"];

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/t/[slug]">) {
  const { slug } = await params;
  const template = getTemplate(slug);
  return template
    ? { title: `${template.name} demo`, description: template.description, alternates: { canonical: `/templates/${template.slug}` }, ...(template.noindex ? { robots: { index: false, follow: false } } : {}) }
    : {};
}

// params is read inside Suspense so client navigations stay instant.
export default function TemplatePreviewPage({ params }: PageProps<"/t/[slug]">) {
  return (
    <Suspense>
      <TemplatePreview params={params} />
    </Suspense>
  );
}

async function TemplatePreview({ params }: { params: Params }) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();
  return <template.Page />;
}
