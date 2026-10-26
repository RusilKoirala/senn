import { GithubLogoIcon } from "@phosphor-icons/react/ssr";
import { nav } from "../content";

export function Nav() {
  return (
    <header className="senn-rise fixed inset-x-0 top-0 z-50 border-b border-(--senn-line) bg-black/60 backdrop-blur-xl">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
        <a href="#top" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span aria-hidden className="size-2 rounded-full bg-white" />
          senn
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {nav.items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-(--senn-muted) transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={nav.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-(--senn-line) px-3 py-1.5 text-sm font-semibold transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white hover:text-black"
        >
          <GithubLogoIcon size={16} weight="fill" />
          {nav.cta.label}
        </a>
      </nav>
    </header>
  );
}
