#!/usr/bin/env bun

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DB = join(ROOT, "database");

type Opening = {
  id: string;
  type: string;
  title: string;
  description: string;
  examples: any[];
  difficulty: string;
  duration_min: number;
};

type TalkType = {
  id: string;
  type: string;
  title: string;
  description: string;
  prompt_template: string;
  tips: string[];
  difficulty: string;
  prep_needed: string;
  duration_min: number;
};

type TableTopic = {
  id: number;
  category: string;
  question: string;
  format_type: string;
  difficulty: string;
  duration_sec: number;
};

function loadJSON<T>(file: string): T[] {
  return JSON.parse(readFileSync(join(DB, file), "utf-8"));
}

function pick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function queryOpenings(args: string[]) {
  const openings = loadJSON<Opening>("openings.json");
  const typeFilter = getFlag(args, "--type");

  let results = openings;
  if (typeFilter) {
    results = results.filter((o) => o.type === typeFilter);
  }

  if (results.length === 0) {
    console.log("No openings found matching criteria.");
    console.log(
      "Available types:",
      openings.map((o) => o.type).join(", ")
    );
    return;
  }

  for (const o of results) {
    console.log(`\n--- ${o.title} (${o.type}) ---`);
    console.log(`Duration: ${o.duration_min} min | Difficulty: ${o.difficulty}`);
    console.log(o.description);
    if (o.examples?.length > 0) {
      const example = o.examples[Math.floor(Math.random() * o.examples.length)];
      console.log(`Example:`, JSON.stringify(example, null, 2));
    }
  }
}

function queryTopics(args: string[]) {
  const topics = loadJSON<TableTopic>("table-topics.json");
  const category = getFlag(args, "--category");
  const difficulty = getFlag(args, "--difficulty");
  const formatType = getFlag(args, "--format");
  const count = parseInt(getFlag(args, "--count") || "5");

  let results = topics;
  if (category) results = results.filter((t) => t.category === category);
  if (difficulty) results = results.filter((t) => t.difficulty === difficulty);
  if (formatType) results = results.filter((t) => t.format_type === formatType);

  const selected = pick(results, count);

  if (selected.length === 0) {
    console.log("No topics found matching criteria.");
    console.log(
      "Categories:",
      [...new Set(topics.map((t) => t.category))].join(", ")
    );
    console.log(
      "Formats:",
      [...new Set(topics.map((t) => t.format_type))].join(", ")
    );
    return;
  }

  console.log(`\n${selected.length} Table Topics:\n`);
  for (const t of selected) {
    console.log(
      `  [${t.category}/${t.format_type}] ${t.question} (${t.duration_sec}s, ${t.difficulty})`
    );
  }
}

function queryTalks(args: string[]) {
  const talks = loadJSON<TalkType>("talk-types.json");
  const difficulty = getFlag(args, "--difficulty");

  let results = talks;
  if (difficulty) results = results.filter((t) => t.difficulty === difficulty);

  if (results.length === 0) {
    console.log("No talk types found.");
    return;
  }

  for (const t of results) {
    console.log(`\n--- ${t.title} (${t.type}) ---`);
    console.log(
      `Difficulty: ${t.difficulty} | Prep: ${t.prep_needed} | Duration: ${t.duration_min} min`
    );
    console.log(t.description);
    console.log(`Prompt: ${t.prompt_template}`);
    console.log(`Tips:`);
    for (const tip of t.tips) {
      console.log(`  - ${tip}`);
    }
  }
}

function queryStats() {
  const openings = loadJSON<Opening>("openings.json");
  const talks = loadJSON<TalkType>("talk-types.json");
  const topics = loadJSON<TableTopic>("table-topics.json");

  console.log("\nToastAgents Database Stats");
  console.log("=========================");
  console.log(`Opening formats: ${openings.length}`);
  console.log(`Talk types: ${talks.length}`);
  console.log(`Table topics: ${topics.length}`);
  console.log(
    `\nTopic categories:`,
    [...new Set(topics.map((t) => t.category))].join(", ")
  );
  console.log(
    `Topic formats:`,
    [...new Set(topics.map((t) => t.format_type))].join(", ")
  );
}

function getFlag(args: string[], flag: string): string | undefined {
  const idx = args.indexOf(flag);
  if (idx === -1 || idx + 1 >= args.length) return undefined;
  return args[idx + 1];
}

// --- Main ---
const [command, ...args] = process.argv.slice(2);

switch (command) {
  case "openings":
    queryOpenings(args);
    break;
  case "topics":
    queryTopics(args);
    break;
  case "talks":
    queryTalks(args);
    break;
  case "stats":
    queryStats();
    break;
  default:
    console.log(`
ToastAgents Query CLI

Usage:
  bun run query openings                         List all opening formats
  bun run query openings --type term-of-the-day   Filter by type
  bun run query topics                            Random 5 table topics
  bun run query topics --category debates         Filter by category
  bun run query topics --count 10                 Get 10 random topics
  bun run query topics --difficulty easy           Filter by difficulty
  bun run query topics --format debate             Filter by format type
  bun run query talks                             List all talk types
  bun run query talks --difficulty beginner         Filter by difficulty
  bun run query stats                             Database statistics
`);
}
