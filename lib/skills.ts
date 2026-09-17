/**
 * The three free skills on the Skills Library page. The `text` blocks are the
 * finished skill copy — exactly what visitors copy to their clipboard — so
 * edit them only deliberately. Lifted verbatim from the design handoff.
 */

export type SkillAccent = "gold" | "sage" | "terra";

export type Skill = {
  /** Anchor id on the Skills Library page (#skill-1 …) */
  id: string;
  /** "Skill 01" tag shown beside the title */
  number: string;
  /** "01" marker used in the home page teaser list */
  marker: string;
  name: string;
  /** Short name used in the home page teaser list */
  teaser: string;
  /** One-line description used in the home page teaser list */
  blurb: string;
  /** Intro paragraph above the skill text */
  intro: string;
  /** Which accent colour the skill uses for its tag and number */
  accent: SkillAccent;
  /** The skill itself, verbatim */
  text: string;
};

export const skills: Skill[] = [
  {
    id: "skill-1",
    number: "Skill 01",
    marker: "01",
    name: "The Humanizer",
    teaser: "Humanizer",
    blurb: "Strip the “AI accent” from anything you write.",
    intro: "AI writing has an accent — the em-dash pileups, the “delve” and “seamless,” the everything-in-threes. This skill teaches your AI to catch its own tells, so your emails and proposals sound like you wrote them.",
    accent: "gold",
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
    id: "skill-2",
    number: "Skill 02",
    marker: "02",
    name: "Done for the Day",
    teaser: "Done for the Day",
    blurb: "End each workday with a clean recap and tomorrow’s plan.",
    intro: "The workday deserves a clean ending. This skill turns “done for the day” into a wind-down ritual — a recap, a sorted to-do list, and a bookmark so tomorrow starts with “let’s go!” instead of “where was I?”",
    accent: "sage",
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
    id: "skill-3",
    number: "Skill 03",
    marker: "03",
    name: "Save Template",
    teaser: "Save Template",
    blurb: "Type /save-template and any finished result becomes a reusable skill.",
    intro: "You finally got the proposal layout, the font pairing, the email tone exactly right — and next week you’ll rebuild it from scratch. Not anymore. Type /save-template and your AI captures the finished result as a new named skill you can call up forever.",
    accent: "terra",
    text: `SKILL: Save Template
PURPOSE: Turn any finished result — a design, a document layout, a font
and color combo, an email format, a report structure, a workflow — into
a reusable skill with a custom name, so you never rebuild it again.

HOW TO INSTALL
Paste this into your AI's custom instructions, a Claude Project's
instructions, or the top of a working chat. From then on, the command
"/save-template" is live.

TRIGGER
When I type "/save-template" (or say "save this as a template"),
run the SAVE FLOW below. When I type "/use-template" or mention a saved
template by name, run the USE FLOW.

SAVE FLOW
1. Identify what to capture. Look at the most recent result we landed on
   together in this conversation (a design, a document, a piece of
   writing, a process, a set of settings). If it's unclear which result I
   mean, ask ONE question: "Save the [X] we just finished, or something
   earlier?"
2. Ask me for a name: "What should this template be called?" Suggest one
   short kebab-case option based on the content (e.g. "client-proposal",
   "weekly-crew-update", "brand-fonts"). Wait for my answer.
3. Extract the reusable DNA — not the one-off content. Capture:
   - Structure: sections, order, headings, length of each part
   - Style: fonts, colors (exact hex codes), spacing, sizes, tone of
     voice, formatting rules, anything I corrected you on along the way
   - Fixed parts: text or elements that should appear every time
   - Variable parts: the slots that change per use, written as
     [BRACKETED PLACEHOLDERS] with a one-line note on what goes there
   - Rules: the do's and don'ts I stated or implied while we iterated
4. Write the new skill in exactly this format:

   SKILL: [template-name]
   PURPOSE: [one sentence — what this produces and when to use it]
   TRIGGER: When I say "/use-template [template-name]" or "make me a
   [template-name]".
   INPUTS TO ASK FOR: [the variable slots, as a short numbered list]
   INSTRUCTIONS: [step-by-step: how to build the result so it matches
   the original exactly — structure, style rules, fixed parts]
   REFERENCE EXAMPLE: [the finished result we just made, trimmed to the
   essential shape, with variable parts bracketed]
   RULES: [the do's and don'ts]

5. Show me the finished skill in one copyable code block and say:
   "Saved. Paste this into your custom instructions or Project to keep
   it permanently. Call it any time with /use-template [name]."
6. Keep the skill active for the rest of this conversation so I can
   test it immediately.

USE FLOW
1. Find the named template (in this conversation or in my instructions).
2. Ask ONLY for the inputs listed under INPUTS TO ASK FOR — in one
   message, as a short numbered list. Don't ask for anything the
   template already fixes.
3. Build the result following the INSTRUCTIONS and RULES exactly. Match
   the REFERENCE EXAMPLE's shape. Don't "improve" the template unless I
   ask.
4. If I make a correction while using it, offer once: "Want me to update
   the [template-name] template with that change?"

RULES
- Never save one-off facts (a specific client's name, this week's
  numbers) as fixed parts — those are variable slots.
- Never lose exact values. Hex codes, font names, sizes, and word counts
  go in verbatim.
- One template per /save-template. If the result contains several
  reusable pieces, ask whether to split them.
- Keep every saved skill under 400 words so it stays easy to paste.`,
  },
];
