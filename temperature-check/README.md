# Temperature Check

## What this is

Temperature Check is a lightweight facilitation tool for reading the room on a specific topic or decision. The facilitator types a question, participants respond on a scale of 1 to 5, and everyone can add a single word that captures why they scored the way they did.

The results surface immediately — a live score distribution, an average, and a word cloud built from what participants wrote. When the group scores low or comes back polarised, the tool uses AI to suggest three concrete facilitation moves the facilitator can try in the next five to ten minutes.

It's designed for the moments where you need honest signal fast, without breaking the flow of a session.

---

## The tools

**Facilitator view**
Type a question and activate it. You'll see responses come in live — the count updates as people submit. When you're ready to look at results, switch to the Results tab. You can clear the question and all responses at any time to run a fresh check.

**Respond view**
Participants see the active question and pick a number from 1 (not at all) to 5 (completely). After submitting their score, they're prompted to add one word — optional, but often where the useful signal lives. Once submitted, they're done.

**Results view**
Shows the average score, a bar chart of the full distribution, and a word cloud assembled from participant words (sized by frequency — the words people reached for most appear largest). If results come back low or polarised, an AI-powered suggestions panel appears with three facilitation routes to consider. This requires an Anthropic API key, which is entered directly in the tool and never stored anywhere.

---

## How to use

Open `index.html` in a browser. The tool has three tabs — Facilitator, Respond, and Results — visible at the bottom of the screen.

The facilitator runs the session from their own device on the Facilitator and Results tabs. Participants open the same file on their own devices and stay on the Respond tab. Because the tool uses browser local storage, everyone needs to be on the same device or the same shared network filesystem for responses to sync in real time. For most workshop setups, the simplest approach is to run it on a shared machine or project it from the facilitator's screen while participants respond on their own.

To get AI-suggested facilitation moves, you'll need an Anthropic API key. Enter it in the field that appears in the Results view when results are low or polarised. The key is used for that request only and is not saved.

There's also a test mode for checking how the tool behaves with polarised data. Add `?test` to the URL and a dev button will appear to inject a sample set of responses.

---

## How to contribute

New tools are welcome, but every addition starts with a completed vibe coding brief before any building begins. The brief captures the facilitation moment the tool is designed for, what the facilitator needs to do or see, what participants experience, and any constraints worth knowing upfront. This keeps the toolkit coherent and makes the actual build faster.

If you have an idea for a tool, write the brief first. Then build.

Follow the existing file structure — each tool lives in its own folder with an `index.html` as the entry point. Keep the visual style consistent with the rest of the toolkit (see the root `index.html` for the design tokens in use across tools).

---

## Ownership

Built and maintained by a lead digital product designer and expert facilitator as part of an ongoing exploration into AI-assisted design and development.

If something is broken or you have a question, raise it directly with the project owner.
