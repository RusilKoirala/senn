import type { TemplateMeta } from "@/templates/catalog";

// Full screen live preview: the real page in an iframe, edge to edge, no chrome.
export function TemplateViewer({ template }: { template: TemplateMeta }) {
  return (
    <iframe
      src={`/t/${template.slug}`}
      title={`${template.name} template`}
      className="fixed inset-0 block h-svh w-screen border-0 bg-white"
    />
  );
}
