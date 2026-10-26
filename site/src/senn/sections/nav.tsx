import Link from "next/link";
import { GithubLogoIcon } from "@phosphor-icons/react/ssr";
import { ThemeToggle } from "../components/theme-toggle";
import { repo } from "../content";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-(--senn-line) bg-(--senn-bg)/80 backdrop-blur-xl">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span aria-hidden className="size-2 rounded-full bg-(--senn-ink)" />
          senn
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Senn on GitHub"
            className="flex size-9 items-center justify-center rounded-full border border-(--senn-line) transition-colors duration-500 hover:bg-(--senn-surface)"
          >
            <GithubLogoIcon size={16} weight="fill" />
          </a>
        </div>
      </nav>
    </header>
  );
}
