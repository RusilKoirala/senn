import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";

// Small product mockups drawn in code, standing in for project screenshots.
// Swap any of them for a real screenshot with next/image.

function Window({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="absolute inset-x-6 top-6 bottom-0 overflow-hidden rounded-t-xl border border-b-0 border-black/10 bg-white text-[#1b201d] shadow-[0_16px_40px_-16px_rgb(0_0_0_/_0.25)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
      <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2">
        <span className="size-2 rounded-full bg-black/10" />
        <span className="size-2 rounded-full bg-black/10" />
        <span className="size-2 rounded-full bg-black/10" />
        <span className="margin-mono ml-2 text-xs text-black/40">{label}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function SearchCover() {
  return (
    <Window label="lantern">
      <div className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm">
        <MagnifyingGlassIcon size={14} className="text-black/40" />
        <span>where did I write about the oven timer?</span>
      </div>
      <ul className="mt-3 space-y-2 text-xs">
        {[
          ["kitchen/notes.md", "0.91"],
          ["2025/march.md", "0.84"],
          ["ideas/hardware.md", "0.72"],
        ].map(([file, score]) => (
          <li key={file} className="flex items-center justify-between rounded-md bg-[#e9efe9] px-2 py-1.5">
            <span className="margin-mono">{file}</span>
            <span className="margin-mono text-black/50">{score}</span>
          </li>
        ))}
      </ul>
    </Window>
  );
}

function BalancesCover() {
  return (
    <Window label="tally · Lisbon trip">
      <ul className="space-y-2 text-sm">
        {[
          ["Marta owes you", "€42.10", "text-emerald-700"],
          ["You owe Joel", "€18.75", "text-[#b4532a]"],
          ["Ana is settled", "€0.00", "text-black/40"],
        ].map(([who, amount, color]) => (
          <li key={who} className="flex items-center justify-between border-b border-black/5 pb-2">
            <span>{who}</span>
            <span className={`margin-mono font-semibold ${color}`}>{amount}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded-lg bg-[#1b201d] px-3 py-2 text-center text-xs font-semibold text-white">Settle in 2 payments</p>
    </Window>
  );
}

// Heights for the uptime bars, in percent. One dip on purpose.
const UPTIME = [92, 96, 94, 98, 97, 95, 99, 38, 93, 97, 98, 96, 99, 97, 98, 95, 97, 99, 96, 98];

function UptimeCover() {
  return (
    <Window label="pulse · status">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">api.norte.dev</span>
        <span className="margin-mono text-xs text-emerald-700">99.94%</span>
      </div>
      <div className="mt-3 flex h-16 items-end gap-1">
        {UPTIME.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-sm ${h < 60 ? "bg-[#d9774b]" : "bg-emerald-500/80"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <p className="margin-mono mt-2 text-xs text-black/50">1 incident · resolved in 4 min</p>
    </Window>
  );
}

function EditorCover() {
  return (
    <Window label="driftwood · posts/hello.md">
      <div className="margin-mono space-y-1.5 text-xs leading-relaxed">
        <p className="text-black/40">---</p>
        <p>
          <span className="text-[#b4532a]">title:</span> Shipping on Fridays
        </p>
        <p className="text-black/40">---</p>
        <p className="font-semibold"># Why we stopped fearing it</p>
        <p className="text-black/60">Small changes, good logs, and a rollback button.</p>
      </div>
      <p className="mt-3 inline-flex rounded-md bg-emerald-600 px-2 py-1 text-xs font-semibold text-white">Open pull request</p>
    </Window>
  );
}

export const covers = {
  search: SearchCover,
  balances: BalancesCover,
  uptime: UptimeCover,
  editor: EditorCover,
};
