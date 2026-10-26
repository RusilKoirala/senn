import { ArrowUpIcon } from "@phosphor-icons/react/ssr";
import ShinyText from "../components/ShinyText";
import { LocalTime } from "../components/local-time";
import { footer, person } from "../content";

export function Footer() {
  const year = 2026;
  return (
    <footer className="px-4 pt-24 pb-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="summit-display text-4xl leading-none min-[400px]:text-5xl md:text-8xl lg:text-9xl">
            <ShinyText text={person.name} color="#a39c90" shineColor="#f3ede4" speed={4} delay={2} />
          </p>
          <a
            href="#top"
            className="group inline-flex w-max items-center gap-2 text-sm font-semibold text-(--summit-cream-muted) transition-colors duration-700 hover:text-(--summit-cream)"
          >
            Back to top
            <span className="flex size-8 items-center justify-center rounded-full border border-(--summit-line) transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
              <ArrowUpIcon size={14} weight="bold" />
            </span>
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-(--summit-line) pt-6 text-sm text-(--summit-cream-muted) md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href={`mailto:${person.email}`} className="transition-colors duration-700 hover:text-(--summit-cream)">
                {person.email}
              </a>
            </li>
            {footer.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="transition-colors duration-700 hover:text-(--summit-cream)">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="summit-mono flex items-center gap-3 text-xs">
            <span>{person.city}</span>
            <span aria-hidden>·</span>
            <LocalTime timeZone={person.timeZone} className="text-(--summit-cream) tabular-nums" />
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs text-(--summit-cream-muted) md:flex-row md:justify-between">
          <p>
            © {year} {person.name}. {footer.note}.
          </p>
          <ul className="flex gap-6">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors duration-700 hover:text-(--summit-cream)">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
