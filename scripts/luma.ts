#!/usr/bin/env bun

const LUMA_BASE = "https://api.lu.ma/public/v1";
const API_KEY = process.env.LUMA_API_KEY;

if (!API_KEY) {
  console.error(
    "LUMA_API_KEY not set. Copy .env.example to .env and add your key."
  );
  console.error("Get your API key from your Luma dashboard (requires Luma Plus).");
  process.exit(1);
}

const headers = {
  "x-luma-api-key": API_KEY,
  "Content-Type": "application/json",
};

async function lumaFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${LUMA_BASE}${endpoint}`;
  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const body = await res.text();
    console.error(`Luma API error ${res.status}: ${body}`);
    process.exit(1);
  }

  return res.json();
}

// --- Commands ---

async function createEvent(args: string[]) {
  const name = getFlag(args, "--name") || "ToastAgents Singapore";
  const date = getFlag(args, "--date");
  const timezone = getFlag(args, "--timezone") || "Asia/Singapore";
  const venue = getFlag(args, "--venue") || "";
  const description =
    getFlag(args, "--description") ||
    "ToastAgents - Where builders learn to speak and speakers learn to build. AI-themed lightning talks and table topics.";

  if (!date) {
    console.error("--date is required (ISO format, e.g. 2026-05-15T19:00:00)");
    process.exit(1);
  }

  const endDate = new Date(new Date(date).getTime() + 2 * 60 * 60 * 1000).toISOString();

  const data = await lumaFetch("/event/create", {
    method: "POST",
    body: JSON.stringify({
      name,
      start_at: date,
      end_at: endDate,
      timezone,
      geo_address_info: venue ? { place_id: "", city: venue } : undefined,
      description,
      require_rsvp_approval: false,
      visibility: "public",
    }),
  });

  console.log("Event created!");
  console.log(`ID: ${data.event?.api_id || data.api_id || "unknown"}`);
  console.log(`URL: ${data.event?.url || data.url || "check Luma dashboard"}`);
}

async function listGuests(args: string[]) {
  const eventId = getFlag(args, "--event-id");
  if (!eventId) {
    console.error("--event-id is required");
    process.exit(1);
  }

  const data = await lumaFetch(
    `/event/get-guests?event_api_id=${eventId}&approval_status=approved`
  );

  const guests = data.entries || [];
  console.log(`\n${guests.length} approved guests:\n`);
  for (const g of guests) {
    const guest = g.guest || g;
    console.log(`  - ${guest.name || "Unknown"} (${guest.email || "no email"})`);
  }
}

async function inviteGuests(args: string[]) {
  const eventId = getFlag(args, "--event-id");
  const emails = getFlag(args, "--emails");

  if (!eventId || !emails) {
    console.error("--event-id and --emails (comma-separated) are required");
    process.exit(1);
  }

  const emailList = emails.split(",").map((e) => e.trim());

  const data = await lumaFetch("/event/invite-guests", {
    method: "POST",
    body: JSON.stringify({
      event_api_id: eventId,
      emails: emailList,
    }),
  });

  console.log(`Invited ${emailList.length} guests to event ${eventId}`);
}

async function addGuests(args: string[]) {
  const eventId = getFlag(args, "--event-id");
  const emails = getFlag(args, "--emails");

  if (!eventId || !emails) {
    console.error("--event-id and --emails (comma-separated) are required");
    process.exit(1);
  }

  const emailList = emails.split(",").map((e) => e.trim());

  const data = await lumaFetch("/event/add-guests", {
    method: "POST",
    body: JSON.stringify({
      event_api_id: eventId,
      guests: emailList.map((email) => ({ email })),
    }),
  });

  console.log(`Added ${emailList.length} guests (no email sent)`);
}

async function eventInfo(args: string[]) {
  const eventId = getFlag(args, "--event-id");
  if (!eventId) {
    console.error("--event-id is required");
    process.exit(1);
  }

  const data = await lumaFetch(`/event/get?event_api_id=${eventId}`);

  const event = data.event || data;
  console.log(`\nEvent: ${event.name}`);
  console.log(`Date: ${event.start_at} - ${event.end_at}`);
  console.log(`URL: ${event.url || "N/A"}`);
  console.log(`Visibility: ${event.visibility || "N/A"}`);
}

async function listEvents() {
  const data = await lumaFetch("/calendar/list-events");
  const events = data.entries || [];

  console.log(`\n${events.length} events:\n`);
  for (const e of events) {
    const event = e.event || e;
    console.log(
      `  - [${event.api_id}] ${event.name} (${event.start_at || "no date"})`
    );
  }
}

function getFlag(args: string[], flag: string): string | undefined {
  const idx = args.indexOf(flag);
  if (idx === -1 || idx + 1 >= args.length) return undefined;
  return args[idx + 1];
}

// --- Main ---
const [command, ...args] = process.argv.slice(2);

switch (command) {
  case "create-event":
    await createEvent(args);
    break;
  case "list-guests":
    await listGuests(args);
    break;
  case "invite":
    await inviteGuests(args);
    break;
  case "add-guests":
    await addGuests(args);
    break;
  case "event-info":
    await eventInfo(args);
    break;
  case "list-events":
    await listEvents();
    break;
  default:
    console.log(`
ToastAgents Luma CLI

Usage:
  bun run luma create-event --name "ToastAgents SG #1" --date 2026-05-15T19:00:00 --venue "Singapore"
  bun run luma list-events
  bun run luma event-info --event-id <id>
  bun run luma list-guests --event-id <id>
  bun run luma invite --event-id <id> --emails "a@b.com,c@d.com"
  bun run luma add-guests --event-id <id> --emails "a@b.com"

Note: Requires LUMA_API_KEY in .env (Luma Plus subscription needed).
Note: Message blasting and feedback collection are UI-only in Luma.
`);
}
