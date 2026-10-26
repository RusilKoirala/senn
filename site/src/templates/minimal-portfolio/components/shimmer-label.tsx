"use client";

import ShinyText from "./ShinyText";
import { useMarginTheme } from "./theme-shell";

// ShinyText parses colors on a canvas, where currentColor loses the parent theme.
export function ShimmerLabel({ text, tone = "foreground" }: { text: string; tone?: "foreground" | "muted" | "inverse" }) {
  const { theme } = useMarginTheme();
  const dark = theme === "dark";
  const color = tone === "inverse" ? (dark ? "#181818" : "#ffffff")
    : tone === "muted" ? (dark ? "#a7aca9" : "#59615c")
      : dark ? "#f3f4f3" : "#1b201d";

  return <ShinyText text={text} color={color} shineColor={dark ? "#70927d" : "#86b39a"} speed={4} delay={3} />;
}
