import assert from "node:assert/strict";
import { test } from "node:test";
import { createSpecification, finishFromSearch, shareUrl } from "../src/templates/product-design/lib/spec.ts";

const finishes = [{ id: "cobalt" }, { id: "graphite" }];

test("the finish restores from the link and falls back to the first finish", () => {
  assert.equal(finishFromSearch("?finish=graphite", finishes), "graphite");
  assert.equal(finishFromSearch("?ref=mail&finish=cobalt", finishes), "cobalt");
  assert.equal(finishFromSearch("", finishes), "cobalt");
  assert.equal(finishFromSearch("?finish=brass", finishes), "cobalt");
});

test("share links keep other parameters and the hash", () => {
  assert.equal(shareUrl("https://contour.example/c01?ref=mail#configure", "graphite"), "https://contour.example/c01?ref=mail&finish=graphite#configure");
  assert.equal(shareUrl("https://contour.example/c01?finish=graphite", "cobalt"), "https://contour.example/c01?finish=cobalt");
});

test("the specification names the finish, aligns rows and carries the saved link", () => {
  const text = createSpecification(
    { name: "contour", model: "C01", product: "The desk light", sampleLabel: "Design concept" },
    { name: "Graphite", code: "C01 / GR" },
    [{ label: "Weight", value: "1.9 kg" }, { label: "Dimensions", value: "376 mm tall" }],
    "https://contour.example/c01?finish=graphite",
  );
  const lines = text.split("\n");
  assert.equal(lines[0], "contour C01 / The desk light");
  assert.equal(lines[1], "Finish: Graphite (C01 / GR)");
  assert.equal(lines[3].indexOf("1.9 kg"), lines[4].indexOf("376 mm tall"));
  assert(text.includes("Saved configuration: https://contour.example/c01?finish=graphite"));
  assert(text.endsWith("not an offer for sale.\n"));
});
