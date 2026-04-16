#!/usr/bin/env bun

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DB = join(ROOT, "database");

function loadJSON<T>(file: string): T[] {
  return JSON.parse(readFileSync(join(DB, file), "utf-8"));
}

function pick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const openings = loadJSON<any>("openings.json");
const talks = loadJSON<any>("talk-types.json");
const topics = loadJSON<any>("table-topics.json");

const theme = getFlag("--theme");
const speakerCount = parseInt(getFlag("--speakers") || "4");
const topicCount = parseInt(getFlag("--topics") || "6");

// Pick opening
const opening = pick(openings, 1)[0];

// Pick talk types for speakers
const talkSlots = pick(talks, speakerCount);

// Pick table topics
const selectedTopics = pick(topics, topicCount);

// Pick a random theme if not provided
const themes = openings
  .find((o: any) => o.type === "theme-setter")
  ?.examples?.map((e: any) => e.theme) || ["AI Workflows"];
const eventTheme = theme || pick(themes, 1)[0];

console.log(`
╔══════════════════════════════════════════════════╗
║           TOASTAGENTS EVENT AGENDA               ║
╚══════════════════════════════════════════════════╝

🎯 Theme: ${eventTheme}

━━━ OPENING (5 min) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Format: ${opening.title}
  ${opening.description}
  ${opening.examples ? `Example: ${JSON.stringify(opening.examples[Math.floor(Math.random() * opening.examples.length)])}` : ""}

━━━ LIGHTNING TALKS (${speakerCount * 5} min) ━━━━━━━━━━━━━━━━━━━━

${talkSlots
  .map(
    (t: any, i: number) => `  ${i + 1}. [${t.title}] (${t.difficulty}, ${t.prep_needed} prep)
     "${t.prompt_template}"
     Tips: ${t.tips[0]}`
  )
  .join("\n\n")}

━━━ TABLE TOPICS / HOT SEAT (${Math.ceil(topicCount * 1.5)} min) ━━━━━━━━━━

${selectedTopics
  .map(
    (t: any, i: number) =>
      `  ${i + 1}. [${t.category}] ${t.question} (${t.duration_sec}s)`
  )
  .join("\n")}

━━━ RECAP (2 min) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Recap Agent summarizes the night's key moments.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Total: ~${5 + speakerCount * 5 + Math.ceil(topicCount * 1.5) + 2} min
  Speakers needed: ${speakerCount}
  Table topics participants: ${topicCount}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

function getFlag(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  if (idx === -1 || idx + 1 >= process.argv.length) return undefined;
  return process.argv[idx + 1];
}
