# Synthesis Accelerator

## What this is

The Synthesis Accelerator is a facilitation tool for making sense of a wall full of sticky notes — fast. You paste in the raw text from a brainstorm or research session, hit a button, and the tool clusters the notes into named themes, each with a plain-language summary and a list of the sticky notes that belong to it.

It's designed for the moment after the sticky-note storm, when you have a room full of ideas and need to find the shape of them quickly. Instead of spending twenty minutes physically moving notes around a wall or whiteboard, you get a structured view in seconds — something you can read aloud, screenshot, or use as the starting point for a deeper discussion.

Built by a lead digital product designer and expert facilitator as part of a broader workshop tools project.

---

## The tools

This folder contains a single HTML file that does everything.

**`index.html`**
The full tool — no build step, no dependencies, no installation. Open it in a browser and it's ready to use. It calls the Anthropic API directly from the browser using a key you provide, which means nothing is stored or sent anywhere other than to Anthropic to process your request.

The interface has two steps:

1. **Paste your sticky notes** — one idea per line in the text area
2. **Find themes** — Claude clusters the notes and returns a set of theme cards, each showing a theme name, a one-sentence summary, and the sticky notes that belong to it

---

## How to use

1. Open `index.html` in any modern browser
2. Enter your Anthropic API key in the field at the top — it isn't stored anywhere, so you'll need it each time
3. Paste your sticky note text into the input area, one idea per line
4. Click **Find themes**
5. Review the theme cards that appear — each one has a name, a summary, and the notes that contributed to it
6. Use **Start over** to clear everything and run another batch

The more specific your sticky notes are, the more useful the clustering will be. Vague or very short notes (single words, abbreviations) may cluster unpredictably — a quick clean-up of the input before running it tends to get better results.

You'll need an Anthropic API key to use the tool. If you don't have one, you can create an account at [console.anthropic.com](https://console.anthropic.com).

---

## How to contribute

New features are welcome, but every change starts with a completed vibe coding brief before any building begins. The brief captures what the facilitator needs, what participants experience (if applicable), and any constraints worth knowing up front. This keeps the work focused and makes the build itself faster and cleaner.

If you want to add something — a new output format, a "How Might We" generator, export functionality — write the brief first. Then build.

Follow the existing structure and keep the visual style consistent with the rest of the workshop tools. The design tokens are defined in the `<style>` block at the top of `index.html`.

---

## Ownership

Built and maintained by a lead digital product designer and expert facilitator as part of an ongoing exploration into AI-assisted design and development.

If something isn't working or you have a question, raise it directly with the project owner.
