import { footer } from "../content";

export function Footer() {
  return (
    <footer className="px-4 pb-8">
      <p className="mx-auto max-w-6xl border-t border-(--senn-line) pt-6 text-xs text-(--senn-muted)">{footer}</p>
    </footer>
  );
}
