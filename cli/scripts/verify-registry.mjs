// Exercises the public CLI against this checkout without network or dependency installs.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const registryPath = join(root, "registry.json");
const registry = JSON.parse(readFileSync(registryPath, "utf8"));
const cli = join(root, "cli/bin/senn-ui.mjs");
const scratch = mkdtempSync(join(tmpdir(), "senn-registry-"));
const env = { ...process.env, SENN_REGISTRY: registryPath, SENN_SOURCE: root };
const digest = path => createHash("sha256").update(readFileSync(path)).digest("hex");

function run(cwd, args, status = 0) {
  const result = spawnSync(process.execPath, [cli, ...args], { cwd, env, encoding: "utf8" });
  assert.equal(result.status, status, `${args.join(" ")}\n${result.stdout}\n${result.stderr}`);
  return result.stdout + result.stderr;
}

try {
  const live = registry.templates.filter(t => t.status === "live");
  assert.equal(new Set(registry.templates.map(t => t.slug)).size, registry.templates.length, "Duplicate template slug");
  const listing = run(scratch, ["list"]);
  for (const retired of ["creative-agency", "ai-startup", "product-launch"]) {
    assert(!registry.templates.some(t => t.slug === retired), `Retired template ${retired} is still registered`);
  }

  for (const template of live) {
    assert(listing.includes(template.slug), `${template.slug} is absent from CLI list`);
    assert(existsSync(join(root, "site/src/senn/previews", `${template.slug}.jpg`)), `Missing preview for ${template.slug}`);
    for (const required of ["page.tsx", "content.ts", "theme.css"]) assert(template.files.includes(required));

    if (template.slug === "minimal-portfolio") {
      assert(template.files.includes("LICENSE"), "Margin license missing");
      assert(template.files.includes("assets/tech/LICENSE"), "Icon license missing");
    }

    for (const layout of ["src", "root"]) {
      const fixture = join(scratch, `${template.slug}-${layout}`);
      const base = layout === "src" ? join(fixture, "src") : fixture;
      mkdirSync(join(base, "app"), { recursive: true });
      writeFileSync(join(fixture, "package.json"), JSON.stringify({ private: true, dependencies: { next: "*", react: "*", "react-dom": "*" } }));
      writeFileSync(join(fixture, "tsconfig.json"), JSON.stringify({ compilerOptions: { paths: { "@/*": [layout === "src" ? "./src/*" : "./*"] } } }));
      run(fixture, ["add", template.slug, "--no-install"]);
      const target = join(base, "templates", template.slug);
      for (const file of template.files) {
        assert.equal(digest(join(target, file)), digest(join(root, template.source, file)), `${template.slug}/${file} was altered during install`);
      }
      assert(existsSync(join(base, "lib/utils.ts")), "Shared helper missing");
      run(fixture, ["skill", template.slug]);
      assert.equal(readFileSync(join(fixture, ".claude/skills", `senn-${template.slug}`, "SKILL.md"), "utf8"), template.skill);
      if (template.slug.endsWith("portfolio")) assert(template.skill.includes("real projects with URLs and outcomes"), "Portfolio skill asks for the wrong content");
      const existingHelper = "// Preserve the host project's helper\n";
      writeFileSync(join(base, "lib/utils.ts"), existingHelper);
      run(fixture, ["add", template.slug, "--no-install"], 1);
      run(fixture, ["add", template.slug, "--no-install", "--force"]);
      assert.equal(readFileSync(join(base, "lib/utils.ts"), "utf8"), existingHelper, "Host helper was overwritten");
      console.log(`✓ ${template.slug}: ${layout}/app install, ${template.files.length} intact files, skill, overwrite protection`);
    }
  }
  console.log(`Registry verified: ${live.length} live templates, both project layouts.`);
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
