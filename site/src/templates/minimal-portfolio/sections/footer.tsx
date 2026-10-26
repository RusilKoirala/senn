import { GithubLogoIcon, LinkedinLogoIcon, XLogoIcon } from "@phosphor-icons/react/ssr";
import { ShimmerLabel } from "../components/shimmer-label";
import { footer, person } from "../content";

const ICONS = { github: GithubLogoIcon, linkedin: LinkedinLogoIcon, x: XLogoIcon };

export function Footer() {
  return (
    <footer className="mt-24 border-t border-(--margin-line) pb-24 sm:pb-0">
      <div className="margin-container flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between">
        <div className="margin-mono text-center text-sm text-(--margin-secondary) sm:text-left">
          <p>© 2026 {person.name}</p>
          <p className="mt-1"><ShimmerLabel text={footer.note} tone="muted" /></p>
        </div>
        <ul className="flex items-center gap-2">
          {footer.socials.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex size-9 items-center justify-center rounded-lg border border-(--margin-line) text-(--margin-secondary) transition-colors duration-500 hover:bg-(--margin-muted) hover:text-(--margin-fg)"
                >
                  <Icon size={20} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
