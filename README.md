# ToastAgents

**Power users only. The format does the filtering.**

A meetup format for AI power users who ship real things. Borrows structure from Toastmasters, energy from [Claude Code Anonymous](https://steipete.com/blog/2025/claude-code-anonymous/), and adds AI agents to run the room. No community building. No hand-holding. Just power users exchanging signal with other power users.

---

## Origin

ToastAgents was created by [Kuan](https://x.com/phuakuanyu) in Singapore, April 2026.

The insight: Claude Code Anonymous nailed the vibe (builders talking candidly about AI workflows) but lacked structure. Toastmasters nails the structure (timed talks, feedback, roles) but doesn't speak to builders. Neither format alone solves the real problem.

**The real problem:** AI tooling moves so fast that blog posts and Twitter threads can't keep up. The people with the most interesting workflows don't write about them - they just build. There's no format for power users to exchange what they know with other power users, without the noise of beginners, vendor pitches, or community management overhead.

ToastAgents is an independent gathering. No organizer logistics. No community building. No welcoming newcomers. The format itself self-selects who speaks and who doesn't. If you can't answer a table topics question about your AI workflow off the cuff, you're not ready. That's the filter.

## The Name

**Toast** - from Toastmasters. The tradition of raising a glass and speaking.
**Agents** - double meaning. The AI agents that run the room (timer, feedback, hot seat caller). And the humans in it - agentic builders who ship with AI.

---

## Who Is This For

Power users. People who:
- Have a non-trivial AI development setup they use daily (harnesses, MCP servers, custom workflows)
- Have shipped real things with AI tools, not just experimented
- Can talk about their workflow off the cuff without preparation
- Want to hear what other power users are doing, not explain basics to beginners

**Not for:**
- People who just installed Claude Code last week
- "I'm curious about AI" attendees
- Pitching products, recruiting, vendor demos
- Community builders looking for a format to grow a Discord

The format handles this naturally. Lightning talks require real experience. Table Topics questions expose whether you actually use these tools daily. You can't fake it for 60 seconds on the spot.

---

## Format

~60 minutes of structured content. Social time after is optional and organic.

### 1. Opening (5 min)

The host sets the theme of the night. Examples:
- "Workflows that saved you hours"
- "The worst thing Claude ever did to your codebase"
- "Before and after: how your process changed"

The theme gives speakers a loose frame and gives the audience something to listen for.

### 2. Lightning Talks (30-40 min)

4-5 speakers. 5 minutes each. The format:

> "I was [emotion] when Claude Code [thing that happened]..."

This is the Claude Code Anonymous DNA. Every talk starts with that sentence. It keeps things personal, honest, and story-driven.

**On demos:** Demos are welcome but optional. The demo serves the story, not the other way around. If your terminal freezes, just talk. A well-told 5-minute story about a workflow beats a 5-minute screen share of scrolling logs every time.

**On preparation:** Speakers should prepare lightly. Know your story, know your one takeaway. You don't need slides. You don't need a script. You need a point.

### 3. Table Topics / Hot Seat (15-20 min)

This is the self-selection mechanism.

Audience members get called up. They get a question. They speak for 60-120 seconds. No preparation.

Example questions:
- "What's one thing you automated this week that you probably shouldn't have?"
- "Describe your Claude Code setup in 60 seconds"
- "What's a workflow you saw on Twitter that actually worked?"
- "What's the weirdest thing you've used an LLM for?"

**Why this matters:** Table Topics is the format's natural filter. If you're a power user, you can answer these without thinking - you live this stuff daily. If you can't, the room knows. Nobody decides who's worthy. The format does it. The strongest and most mysterious person in the room gets surfaced here.

---

## Agent Roles (The Meta Twist)

Here's what makes ToastAgents different from just "themed Toastmasters."

Traditional Toastmasters has human volunteers for Timer, Evaluator, Grammarian, etc. ToastAgents replaces these with live Claude agents running on a laptop:

| Role | What It Does |
|------|-------------|
| **Timer Agent** | Tracks each speaker. Announces 1-min warning, time's up. Visual display on screen. |
| **Feedback Agent** | After each lightning talk, generates a brief (30-second) spoken evaluation: what landed, what could improve, one specific suggestion. |
| **Hot Seat Agent** | Picks random audience members for Table Topics. Generates questions based on the night's theme. |
| **Ah Counter Agent** | Tracks filler words (um, ah, like, basically, you know). Reports at the end of the night. |
| **Recap Agent** | At the end, summarizes the night's key moments and takeaways in 60 seconds. |

Humans just show up, talk, listen, and enjoy. The agents handle the facilitation. It's a Claude meetup run by Claude.

---

## How to Start a Chapter

1. Find a venue. Anywhere with a screen and WiFi. Don't overthink it.
2. Set a date. Don't build a community around it. Just pick a date.
3. Get 4-5 power users to speak. DM the people posting real AI workflows on X. They'll say yes.
4. Laptop with agents connected to the venue screen. That's your entire production setup.
5. Run the format. Opening, talks, hot seat. One hour. Done.
6. No recording. No livestream. This keeps it candid.
7. Add your chapter to this repo.

---

## Chapters

| City | Organizer | Cadence | Started |
|------|-----------|---------|---------|
| Singapore | [@phuakuanyu](https://x.com/phuakuanyu) | TBD | April 2026 |

*Want to start a chapter? Open a PR or reach out.*

---

## What This Is NOT

If you're coming from Toastmasters, recalibrate. This is not Toastmasters with an AI theme.

| Toastmasters assumes | ToastAgents assumes |
|----------------------|---------------------|
| Everyone should get a chance to speak | Only power users speak. The format filters. |
| The goal is to practice speaking | The goal is to exchange high-signal information |
| You build a supportive community over time | It's an independent gathering. No community management. |
| Organizers prep logistics, roles, evaluations | Agents handle roles. Organizers just pick a date and venue. |
| Table Topics is for practicing impromptu speaking | Table Topics is the filter that reveals who's real |
| New members are welcomed and mentored | New members either keep up or stay quiet |
| Meetings have structured curricula and pathways | No curriculum. No progression. Just raw knowledge exchange. |

The format borrows Toastmasters' timed structure and table topics mechanic because they work. Everything else - the community building, the mentorship, the welcoming newcomers, the logistics overhead - is deliberately absent.

---

## Content Database

The `database/` folder contains JSON files that power the event planning:

| File | What | Count |
|------|------|-------|
| `openings.json` | Opening formats (Term of Day, Quote, Demo, Theme, Poll) | 5 types |
| `talk-types.json` | Lightning talk archetypes (Icebreaker, Workflow, Horror Story, etc.) | 9 types |
| `table-topics.json` | Hot seat questions across 9 categories | 102 questions |

### Query CLI

```bash
# Stats
bun run query stats

# Random table topics
bun run query topics --category debates --count 5
bun run query topics --difficulty easy --format completion

# Browse talk types
bun run query talks --difficulty beginner

# All opening formats
bun run query openings

# Generate a random full event agenda
bun run agenda
bun run agenda --theme "Speed Runs" --speakers 5 --topics 8
```

### Categories

**Table Topics:** workflows, wins-and-failures, hot-takes, show-and-tell, hypotheticals, debates, completions, word-prompts, rapid-fire, audience-challenge

**Talk Types:** icebreaker, workflow-walkthrough, horror-story, before-after, tool-review, live-build, setup-tour, discovery, challenge-accepted

**Openings:** term-of-the-day, quote-of-the-day, demo-of-the-day, theme-setter, icebreaker-poll

---

## Event Lifecycle

Every event follows: **Plan > Run > Recap > Retro > Plan Next**

```
events/YYYY-MM-DD-city/
  plan.json       # Pre-event: theme, speakers, selected content
  recap.md        # Post-event: what happened
  feedback.json   # Attendee feedback
  retro.md        # What worked, what to change
```

Templates in `templates/`. Copy them to start a new event folder.

---

## Knowledge Base

The `knowledge/` folder contains reference material for agents and organizers:

- `toastmasters-basics.md` - Core Toastmasters concepts adapted for ToastAgents
- `claude-code-anonymous.md` - Origin and DNA of Claude Code Anonymous
- `speaking-tips.md` - Practical speaking advice for developer audiences
- `facilitation-guide.md` - How to run a ToastAgents event end-to-end

Agents should read relevant files before each event for context.

---

## Luma Integration

Manage events via Luma API (requires Luma Plus):

```bash
# Set up
cp .env.example .env  # Add your LUMA_API_KEY

# Create event
bun run luma create-event --name "ToastAgents SG #1" --date 2026-05-15T19:00:00

# Manage guests
bun run luma list-events
bun run luma list-guests --event-id <id>
bun run luma invite --event-id <id> --emails "a@b.com,c@d.com"
```

**Note:** Message blasting and feedback collection are Luma UI-only features, not available via API.

---

## Contributing

This repo is a living document. Add:
- Your chapter info
- Talk formats that worked
- Table Topics questions that got good responses
- Agent role configs and prompts
- Event recaps (no recordings, but written summaries are fine)

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

[MIT](LICENSE)
