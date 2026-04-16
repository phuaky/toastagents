# Facilitation Guide

How to run a ToastAgents event end-to-end.

## 2 Weeks Before

- [ ] Pick a date and venue (need: screen/TV, WiFi, power outlets)
- [ ] Create the Luma event (`bun run luma create-event`)
- [ ] Choose a theme (`bun run query openings --type theme-setter`)
- [ ] Recruit 4-5 speakers via DM. Look for people posting AI workflows on X/Twitter.
- [ ] Tell speakers the theme and the opening line format: "I was X when Claude Code Y"
- [ ] Generate a draft agenda (`bun run agenda --theme "Your Theme"`)

## 1 Week Before

- [ ] Confirm speakers. Get their talk titles and types.
- [ ] Select table topics questions (`bun run query topics --count 8`)
- [ ] Create the event plan (`cp templates/event-plan.json events/YYYY-MM-DD-city/plan.json`)
- [ ] Fill in the plan with speakers, questions, and opening details
- [ ] Send a reminder to attendees via Luma

## Day Of

- [ ] Arrive 30 min early. Set up laptop, screen, and agent sessions.
- [ ] Test Timer Agent display on the venue screen
- [ ] Load the event plan so agents know the night's speakers and theme
- [ ] Have backup table topics questions ready
- [ ] Welcome people as they arrive. No formality needed.

## Running the Event

### Opening (5 min)
1. Host welcomes everyone. Quick intro: "This is ToastAgents. Power users exchanging what they know."
2. Run the opening format (Term of the Day, Quote, Poll, or Theme Setter)
3. Introduce the agent roles briefly: "Our Timer, Feedback, Ah Counter, and Recap are all run by Claude tonight."

### Lightning Talks (30-40 min)
1. Introduce each speaker by name and talk type
2. Timer Agent starts the countdown
3. Speaker delivers their talk
4. Feedback Agent gives 30-second evaluation
5. Brief applause, next speaker

### Table Topics (15-20 min)
1. Host explains the format: "You'll get a question. You speak for 60-120 seconds. No prep."
2. Hot Seat Agent picks someone and asks a question
3. Timer Agent tracks their time
4. Repeat for 6-8 people

### Closing (2 min)
1. Ah Counter Agent gives the filler word report
2. Recap Agent summarizes the night
3. Host thanks everyone and mentions the next event date

## After the Event

- [ ] Write the recap (`cp templates/recap.md events/YYYY-MM-DD-city/recap.md`)
- [ ] Collect feedback (informal conversations or `templates/feedback.json`)
- [ ] Write the retro (`cp templates/retro.md events/YYYY-MM-DD-city/retro.md`)
- [ ] Commit the event folder to the repo
- [ ] Start planning the next one

## Troubleshooting

**"Nobody wants to speak"**
- You invited the wrong people. Power users have things to say. DM people with real workflows.
- If nobody in the room can fill 5 minutes on their AI setup, the room isn't ready for ToastAgents.

**"The demo broke"**
- Speaker should just talk through what would have happened. If they can't describe their workflow without a screen, they didn't know it well enough.

**"The agents aren't working"**
- Phone stopwatch for Timer. Printed question cards for Hot Seat. The event works without agents.

**"Only 5 people showed up"**
- 5 power users in a room is better than 30 normies. Run table topics with everyone. Some of the best sessions are small.

**"Someone is clearly out of their depth"**
- The format handles this. Table Topics will expose it naturally. No need to gatekeep manually - the questions are the gate.

**"Someone is pitching or recruiting"**
- Shut it down immediately. "This is power users sharing workflows, not a sales floor."
