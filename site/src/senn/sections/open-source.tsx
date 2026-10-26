import { GithubLogoIcon, StarIcon } from "@phosphor-icons/react/ssr";
import { openSource, repo } from "../content";

export function OpenSource() {
  return (
    <section aria-label={openSource.title} className="px-4 py-16 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 border-t border-(--senn-line) pt-16 md:pt-24">
        <h2 className="text-2xl font-semibold tracking-tight">{openSource.title}</h2>
        <p className="text-base text-(--senn-muted)">{openSource.body}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {openSource.actions.map((a) => (
            <a
              key={a.label}
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className={
                a.primary
                  ? "flex items-center gap-2 rounded-full bg-(--senn-ink) px-4 py-2 text-sm font-semibold text-(--senn-bg) transition-transform duration-500 hover:scale-[1.03] active:scale-[0.98]"
                  : "flex items-center gap-2 rounded-full border border-(--senn-line) px-4 py-2 text-sm font-semibold transition-colors duration-500 hover:bg-(--senn-surface)"
              }
            >
              {a.primary && <StarIcon size={14} weight="fill" />}
              {a.label}
            </a>
          ))}
        </div>
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center gap-2 font-mono text-xs text-(--senn-muted) transition-colors duration-500 hover:text-(--senn-ink)"
        >
          <GithubLogoIcon size={14} />
          {repo.replace(/^https:\/\//, "")}
        </a>
      </div>
    </section>
  );
}
