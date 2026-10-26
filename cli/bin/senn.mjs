#!/usr/bin/env node
// senn: add Senn landing page templates to a Next.js project.
// No dependencies: Node's fetch, fs and child_process only.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { createInterface } from "node:readline/promises";

const VERSION = "0.1.0";
const DEFAULT_REGISTRY = "https://raw.githubusercontent.com/rusilkoirala/senn/main/registry.json";

// For testing against a local checkout:
//   SENN_REGISTRY=/path/to/senn/registry.json SENN_SOURCE=/path/to/senn npx senn add …
const REGISTRY = process.env.SENN_REGISTRY || DEFAULT_REGISTRY;
const SOURCE = process.env.SENN_SOURCE;

const tty = process.stdout.isTTY;
const c = (code) => (s) => (tty ? `\x1b[${code}m${s}\x1b[0m` : String(s));
const bold = c(1);
const dim = c(2);
const green = c(32);
const yellow = c(33);
const red = c(31);

const HELP = `
${bold("senn")} ${dim(`v${VERSION}`)}  Open source landing page templates for Next.js

${bold("Usage")}
  npx senn@latest add <template>     Add a template to this project
  npx senn@latest skill <template>   Add the template's agent skill (.claude/skills)
  npx senn@latest list               List templates

${bold("Options")}
  --dir <path>     Where to put the template (default: src/templates/<template>)
  --force, -f      Overwrite without asking
  --no-install     Don't install packages
  -h, --help       Show this help
  -v, --version    Show the version

${dim("https://github.com/rusilkoirala/senn")}
`;

function parseArgs(argv) {
  const args = { _: [], force: false, install: true, dir: undefined, help: false, version: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--force" || a === "-f") args.force = true;
    else if (a === "--no-install") args.install = false;
    else if (a === "--dir") args.dir = argv[++i];
    else if (a === "-h" || a === "--help") args.help = true;
    else if (a === "-v" || a === "--version") args.version = true;
    else args._.push(a);
  }
  return args;
}

function fail(message) {
  console.error(`${red("✖")} ${message}`);
  process.exit(1);
}

async function readText(location) {
  if (/^https?:\/\//.test(location)) {
    const res = await fetch(location);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${location}`);
    return res.text();
  }
  return readFileSync(location, "utf8");
}

async function readBytes(location) {
  if (/^https?:\/\//.test(location)) {
    const res = await fetch(location);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${location}`);
    return Buffer.from(await res.arrayBuffer());
  }
  return readFileSync(location);
}

async function loadRegistry() {
  try {
    return JSON.parse(await readText(REGISTRY));
  } catch (err) {
    fail(`Couldn't load the template list (${err.message}). Check your connection and try again.`);
  }
}

function findTemplate(registry, slug) {
  if (!slug) fail(`Name a template, for example ${bold("npx senn@latest add modern-saas")}. See ${bold("npx senn@latest list")}.`);
  const t = registry.templates.find((x) => x.slug === slug);
  if (!t) fail(`No template called "${slug}". See ${bold("npx senn@latest list")}.`);
  if (t.status !== "live") fail(`"${t.name}" isn't released yet. Follow the repo for updates.`);
  return t;
}

// The nearest folder with a package.json, starting from the current one.
function findProjectRoot() {
  let dir = process.cwd();
  while (true) {
    if (existsSync(join(dir, "package.json"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

// Next.js projects keep code in src/ or at the root.
function codeBase(root) {
  return existsSync(join(root, "src", "app")) || (existsSync(join(root, "src")) && !existsSync(join(root, "app")))
    ? join(root, "src")
    : root;
}

function packageManager(root) {
  if (existsSync(join(root, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(root, "yarn.lock"))) return "yarn";
  if (existsSync(join(root, "bun.lockb")) || existsSync(join(root, "bun.lock"))) return "bun";
  if (existsSync(join(root, "package-lock.json"))) return "npm";
  const agent = process.env.npm_config_user_agent || "";
  for (const pm of ["pnpm", "yarn", "bun"]) if (agent.startsWith(pm)) return pm;
  return "npm";
}

async function confirm(question) {
  if (!process.stdin.isTTY) return false;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(`${yellow("?")} ${question} ${dim("(y/N)")} `);
  rl.close();
  return /^y(es)?$/i.test(answer.trim());
}

function fileUrl(registry, template, file) {
  const path = `${template.source}/${file}`;
  return SOURCE ? join(SOURCE, path) : `https://raw.githubusercontent.com/${registry.repo}/${registry.branch}/${path}`;
}

async function downloadAll(jobs, limit = 8) {
  let next = 0;
  async function worker() {
    while (next < jobs.length) {
      const job = jobs[next++];
      const bytes = await readBytes(job.from);
      mkdirSync(dirname(job.to), { recursive: true });
      writeFileSync(job.to, bytes);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, jobs.length) }, worker));
}

function install(root, deps) {
  if (deps.length === 0) return true;
  const pm = packageManager(root);
  const cmd = pm === "npm" ? ["install", ...deps] : ["add", ...deps];
  console.log(`${dim("›")} ${pm} ${cmd.join(" ")}`);
  const res = spawnSync(pm, cmd, { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
  return res.status === 0;
}

async function add(args) {
  const registry = await loadRegistry();
  const t = findTemplate(registry, args._[1]);

  const root = findProjectRoot();
  if (!root) fail("Run this inside your Next.js project (no package.json found).");
  const pkg = readJson(join(root, "package.json")) || {};
  const installed = { ...pkg.dependencies, ...pkg.devDependencies };
  if (!installed.next) console.log(`${yellow("!")} This doesn't look like a Next.js project. The template needs Next.js 15+ and Tailwind CSS v4.`);

  const base = codeBase(root);
  const target = args.dir ? resolve(process.cwd(), args.dir) : join(base, "templates", t.slug);
  if (existsSync(target) && !args.force) {
    const ok = await confirm(`${relative(root, target)} already exists. Overwrite it?`);
    if (!ok) fail("Stopped. Nothing was changed. Use --force to overwrite.");
  }

  console.log(`${dim("›")} Downloading ${bold(t.name)} (${t.files.length} files)`);
  try {
    await downloadAll(t.files.map((f) => ({ from: fileUrl(registry, t, f), to: join(target, f) })));
  } catch (err) {
    fail(`Download failed: ${err.message}`);
  }
  console.log(`${green("✓")} Added ${relative(root, target) || "."}`);

  // Shared helpers (like lib/utils.ts) only when the project doesn't have them yet.
  const deps = [...t.dependencies];
  for (const shared of registry.shared || []) {
    const path = join(base, shared.path);
    const variants = [path, path.replace(/\.ts$/, ".tsx"), path.replace(/\.ts$/, ".js")];
    if (variants.some((p) => existsSync(p))) continue;
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, shared.content);
    deps.push(...shared.dependencies);
    console.log(`${green("✓")} Created ${relative(root, path)}`);
  }

  const tsconfig = existsSync(join(root, "tsconfig.json")) ? readFileSync(join(root, "tsconfig.json"), "utf8") : "";
  if (!tsconfig.includes('"@/*"')) {
    console.log(`${yellow("!")} The template imports with the ${bold("@/")} alias. Add "paths": { "@/*": ["./src/*"] } to tsconfig.json.`);
  }

  // Registry entries can carry a version range ("gsap@^3.15.0"); compare by name.
  const nameOf = (d) => (d.lastIndexOf("@") > 0 ? d.slice(0, d.lastIndexOf("@")) : d);
  const missing = [...new Set(deps)].filter((d) => !installed[nameOf(d)]);
  if (args.install && missing.length) {
    if (!install(root, missing)) console.log(`${yellow("!")} Install failed. Run it yourself: npm install ${missing.join(" ")}`);
  } else if (missing.length) {
    console.log(`${dim("›")} Skipped installing: ${missing.join(" ")}`);
  }

  const importPath = `@/${relative(base, target).split("\\").join("/")}/page`;
  console.log(`
${green("Done.")} Render it on a route, for example app/page.tsx:

  ${dim('import Template from "' + importPath + '";')}
  ${dim("export default function Home() {")}
  ${dim("  return <Template />;")}
  ${dim("}")}

Make it yours: edit ${bold(relative(root, join(target, "content.ts")))}, or let your coding agent do it:
  ${bold(`npx senn@latest skill ${t.slug}`)}
`);
}

async function skill(args) {
  const registry = await loadRegistry();
  const t = findTemplate(registry, args._[1]);
  const root = findProjectRoot() || process.cwd();
  const path = join(root, ".claude", "skills", `senn-${t.slug}`, "SKILL.md");

  if (existsSync(path) && !args.force) {
    const ok = await confirm(`${relative(root, path)} already exists. Overwrite it?`);
    if (!ok) fail("Stopped. Nothing was changed. Use --force to overwrite.");
  }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, t.skill);
  console.log(`${green("✓")} Added ${relative(root, path)}

Ask your coding agent to "make the ${t.name} template mine". It will ask about your
product, then rewrite the copy, colors and images.`);
}

async function list() {
  const registry = await loadRegistry();
  console.log("");
  for (const t of registry.templates) {
    const status = t.status === "live" ? green("live") : dim("soon");
    console.log(`  ${t.status === "live" ? bold(t.slug.padEnd(22)) : dim(t.slug.padEnd(22))} ${status}  ${dim(t.name)}`);
  }
  console.log(`\n  ${dim("npx senn@latest add <template>")}\n`);
}

const args = parseArgs(process.argv.slice(2));
const command = args._[0];

if (args.version) console.log(VERSION);
else if (args.help || !command) console.log(HELP);
else if (command === "add") await add(args);
else if (command === "skill") await skill(args);
else if (command === "list" || command === "ls") await list();
else fail(`Unknown command "${command}". Run ${bold("npx senn@latest --help")}.`);
