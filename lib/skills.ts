/**
 * The three free skills on the Skills Library page. The `text` blocks are the
 * finished skill copy — what visitors copy to their clipboard — so edit them
 * only deliberately.
 */

export type Skill = {
  id: string;
  number: string;
  name: string;
  intro: string;
  text: string;
};

export const skills: Skill[] = [
  {
    id: "skill-humanizer",
    number: "Skill 01",
    name: "The Humanizer",
    intro:
      "AI writing has an accent — the em-dash pileups, the “delve” and “seamless,” the everything-in-threes. This skill teaches your AI to catch its own tells, so your emails and proposals sound like you wrote them.",
    text: `SKILL: Humanizer
PURPOSE: Remove the "AI accent" from writing so it reads like a person
wrote it.

WHEN TO USE
Any time you ask your AI to write or edit something a real human will
read: emails, proposals, web copy, social posts. Trigger it by saying
"humanize this" followed by the text.

INSTRUCTIONS FOR THE AI
When asked to humanize text, rewrite it while preserving its meaning:
1. Cut inflated openers and closers ("In today's fast-paced world...",
   "In conclusion..."). Start where the point starts.
2. Break the rule of three. AI defaults to triplets ("faster, smarter,
   better"). Use one strong item, or two. Three only if it truly earns it.
3. Kill the AI vocabulary: delve, robust, seamless, leverage, elevate,
   landscape, tapestry, unlock, empower, game-changer, "it's important
   to note." Use plain words instead.
4. Vary sentence length. Mix short punches with longer thoughts. If every
   sentence runs 15-20 words, it reads like a machine.
5. Remove negative parallelisms ("It's not just X, it's Y") unless one
   genuinely earns its place.
6. Limit em dashes to one per paragraph, maximum.
7. Prefer active voice with a named actor ("We ship on Tuesdays," not
   "Shipments are made on Tuesdays").
8. Cut hedging and filler: "arguably," "essentially," "in order to,"
   "serves as," "plays a vital role in."
9. Keep the writer's quirks. If the original has personality, protect it.
10. Read it back. If a sentence sounds like a press release, rewrite it
    the way you'd say it across a table.

OUTPUT
The rewritten text only, followed by a one-line note listing the biggest
tells you removed.`,
  },
  {
    id: "skill-done",
    number: "Skill 02",
    name: "Done for the Day",
    intro:
      "The workday deserves a clean ending. This skill turns “done for the day” into a wind-down ritual — a recap, a sorted to-do list, and a bookmark so tomorrow starts with “let’s go!” instead of “where was I?”",
    text: `SKILL: Done for the Day
PURPOSE: End the workday with a clean recap, a sorted to-do list, and an
easy way to pick the work back up tomorrow.

HOW TO USE
Paste this into the AI chat where you've been working. From then on,
typing "done for the day" wraps things up, and "let's go!" resumes.

INSTRUCTIONS FOR THE AI
When I say "done for the day" (or "wrapping up," "calling it"):
1. Recap, in plain language, what we accomplished in this conversation
   today. Short bullets. No fluff.
2. List my to-dos in two groups: URGENT (deadline, or blocking someone
   else) and REGULAR (everything else).
3. List the open threads — things we started but didn't finish — with
   enough detail that future-me understands each one instantly.
4. Ask me one question: "Which of these should we hit first tomorrow?"
5. After I answer, print a clearly marked block titled RESUME HERE
   containing: tomorrow's #1 priority, the open threads, and any context
   I'd otherwise forget.

When I say "let's go!":
1. Find the most recent RESUME HERE block in this conversation.
2. Give me a three-line refresher of where we left off.
3. Start immediately on the chosen priority. No warm-up questions.

RULES
- Only summarize THIS conversation. Never invent work I didn't mention.
- Keep the whole wrap-up under 250 words. It's a wind-down, not a report.`,
  },
  {
    id: "skill-prompt",
    number: "Skill 03",
    name: "Prompt Foundations",
    intro:
      "Most “bad AI answers” are really just missing context. This is the briefing template we set up for every client — fill in the brackets once, and your AI finally knows who it’s working for.",
    text: `SKILL: Prompt Foundations
PURPOSE: A standing briefing that gets you a better answer on the first
try — because the AI finally has the context a new employee would need.

HOW TO USE
Fill in the brackets once, then paste this at the start of a new chat or
into your AI's custom instructions / project settings. Reuse it forever.

MY STANDING CONTEXT
- Who I am: [name, role, company — e.g. "co-owner of a 12-person
  plumbing company in Denver"]
- Who we serve: [your customers, in one line]
- How we sound: [e.g. "friendly, plain-spoken, no corporate buzzwords"]
- Tools we use: [e.g. "Gmail, QuickBooks, Jobber"]

HOW I WANT YOU TO WORK
1. If my request is missing something you need, ask up to three short
   questions BEFORE answering. Don't guess at facts about my business.
2. When I ask for writing, match "how we sound" above.
3. Give me the answer first, the explanation second. I'll ask for more.
4. When a task has steps, number them so I can delegate or follow along.
5. If you're not sure about something, say so plainly. Never make up
   numbers, names, or policies.
6. At the end of a big task, tell me the ONE thing you'd do next.

WHEN I GIVE YOU A TASK, I'LL TRY TO INCLUDE
- The goal (what "done" looks like)
- The audience (who will read or use it)
- An example I like, if I have one
- Constraints (length, format, deadline, things to avoid)
If I forget one, ask me for the missing piece — that's your job.`,
  },
];
