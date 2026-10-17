import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { LAYERLING_VIDEOS } from "@/lib/layerlingVideos";

const guideRoot = join(process.cwd(), "docs", "guide");
const languages = readdirSync(guideRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^[a-z]{2}$/.test(entry.name))
  .map((entry) => entry.name);

/** The links of the video chapter (16-*.md) of a language, in the order they stand. */
function chapterVideoLinks(language: string) {
  const file = readdirSync(join(guideRoot, language)).find((name) => name.startsWith("16-"));
  if (!file) return null;
  const text = readFileSync(join(guideRoot, language, file), "utf8");
  return [...text.matchAll(/^- \[[^\]]+\]\((https:\/\/[^)\s]+)\)/gm)].map((match) => match[1]);
}

describe("the video list in the guide", () => {
  it("names the same videos, in the same order, as the list in the app, in every language", () => {
    const expected = LAYERLING_VIDEOS.map((video) => video.url);
    for (const language of languages) {
      const links = chapterVideoLinks(language);
      // A language that has no video chapter yet shows the English one.
      if (links === null) continue;
      expect(links, `docs/guide/${language}: the video chapter must list exactly the videos of layerlingVideos.ts - add or change the line in every language`).toEqual(expected);
    }
  });

  it("is checked in the languages that have the chapter", () => {
    expect(languages.filter((language) => chapterVideoLinks(language) !== null).length).toBeGreaterThanOrEqual(10);
  });
});
