"use client";

import {
  BicycleIcon,
  CoffeeIcon,
  FeatherIcon,
  LeafIcon,
  MountainsIcon,
  ToothIcon,
  TreeIcon,
  WavesIcon,
} from "@phosphor-icons/react";
import { LogoLoop } from "../components/LogoLoop";
import { logos } from "../content";

const ICONS = {
  leaf: LeafIcon,
  feather: FeatherIcon,
  tooth: ToothIcon,
  coffee: CoffeeIcon,
  waves: WavesIcon,
  bicycle: BicycleIcon,
  tree: TreeIcon,
  mountains: MountainsIcon,
};

export function Logos() {
  const items = logos.items.map(({ name, icon }) => {
    const Icon = ICONS[icon];
    return {
      title: name,
      ariaLabel: name,
      node: (
        <span className="flex items-center gap-2 text-xl font-semibold tracking-tight whitespace-nowrap">
          <Icon size={24} weight="duotone" />
          {name}
        </span>
      ),
    };
  });

  return (
    <section aria-label="Customers" className="py-16 md:py-24">
      <p className="mx-auto mb-8 max-w-[680px] px-4 text-center text-sm text-balance text-(--cove-muted)">
        {logos.label}
      </p>
      <LogoLoop
        logos={items}
        speed={48}
        gap={64}
        logoHeight={32}
        pauseOnHover
        muted={0.55}
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Companies using Cove"
        className="text-(--cove-ink)"
      />
    </section>
  );
}
