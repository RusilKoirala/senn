import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { catalog } from "@/templates/catalog";
import modernSaas from "../previews/modern-saas.jpg";

// Screenshots of live templates, by slug. Templates without one show as "soon".
const PREVIEWS: Record<string, StaticImageData> = {
  "modern-saas": modernSaas,
};

const TILE = "block overflow-hidden rounded-2xl border border-(--senn-line) bg-(--senn-surface)";

export function Gallery() {
  return (
    <section aria-label="Templates" className="px-4 py-10 md:py-16">
      <ul className="mx-auto grid max-w-6xl gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map((t, i) => {
          const preview = PREVIEWS[t.slug];
          const live = t.status === "live" && preview;
          return (
            <li key={t.slug} className="senn-rise" style={{ animationDelay: `${i * 80}ms` }}>
              {live ? (
                <Link href={`/templates/${t.slug}`} className="group flex flex-col gap-3">
                  <span className={TILE}>
                    <Image
                      src={preview}
                      alt={`${t.name} template`}
                      placeholder="blur"
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="text-sm font-medium">{t.name}</span>
                </Link>
              ) : (
                <div className="flex flex-col gap-3" aria-disabled>
                  <span className={`${TILE} flex aspect-[16/10] items-center justify-center border-dashed`}>
                    <span className="font-mono text-xs text-(--senn-muted)">Soon</span>
                  </span>
                  <span className="text-sm text-(--senn-muted)">{t.name}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
