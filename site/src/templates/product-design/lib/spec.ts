import type { StaticImageData } from "next/image";

export type Finish = {
  id: string;
  name: string;
  code: string;
  swatch: string;
  note: string;
  image: { src: StaticImageData; alt: string };
};

export type SpecRow = { label: string; value: string };

// Reads ?finish= from a URL search string, falling back to the first finish.
export function finishFromSearch(search: string, finishes: Pick<Finish, "id">[]) {
  const id = new URLSearchParams(search).get("finish");
  return finishes.some(finish => finish.id === id) ? id! : finishes[0].id;
}

// Returns the same URL with ?finish= set, keeping every other parameter and the hash.
export function shareUrl(href: string, finishId: string) {
  const url = new URL(href);
  url.searchParams.set("finish", finishId);
  return url.toString();
}

export function createSpecification(
  product: { name: string; model: string; product: string; sampleLabel: string },
  finish: Pick<Finish, "name" | "code">,
  rows: SpecRow[],
  link: string,
) {
  const width = Math.max(...rows.map(row => row.label.length)) + 4;
  return [
    `${product.name} ${product.model} / ${product.product}`,
    `Finish: ${finish.name} (${finish.code})`,
    "",
    ...rows.map(row => `${row.label.padEnd(width)}${row.value}`),
    "",
    `Saved configuration: ${link}`,
    `${product.sampleLabel}. Illustrative specifications, not an offer for sale.`,
    "",
  ].join("\n");
}
