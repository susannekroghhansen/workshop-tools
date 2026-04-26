# Workshop Tools — refactor plan

**Context:** This repo currently has seven HTML files (the launcher `index.html` plus six tool folders), each with its own `<style>` block and duplicated design tokens. The tokens (sage-green palette, 14px radius, system-ui font, soft shadow) are identical across all files but stored six-plus times. The tools are also about to be re-hosted at `tools.unruledplay.dk` and need to match the refreshed Unruled Play brand — aubergine and blush instead of sage green, origami SVG icons instead of OS emoji.

**This refactor is in two phases:**

- **Phase A — infrastructure.** Extract shared CSS and icons to repo-level files. Each tool imports them instead of duplicating. No visible change.
- **Phase B — restyle.** Swap the values in the shared files to the new palette and icons. Visible change everywhere at once.

**Do phase A first, commit, verify all six tools still look identical. Then phase B, commit, verify all six tools now look aubergine.**

Do not do them simultaneously. The whole point of refactor-first is being able to tell whether a visual change was caused by the refactor or by the restyle.

---

## Phase A — extract shared infrastructure

### A1. Create `/shared/tokens.css`

At the repo root, create a `shared/` folder, and inside it create `tokens.css`. Populate it with the existing sage-green values from the current launcher `index.html` plus anything else that's duplicated across the tools. Exact starting content:

```css
/* ──────────────────────────────────────────────────────────────
   Workshop Tools — shared design tokens
   Single source of truth. Do not duplicate these in individual tools.
   ────────────────────────────────────────────────────────────── */

:root {
  /* Surfaces */
  --bg:         #f4f7f6;
  --card:       #ffffff;

  /* Primary — currently sage green, will change in phase B */
  --primary:    #5e9977;
  --primary-dk: #4a7d61;
  --primary-lt: #e8f0ec;

  /* Foreground */
  --text:       #2e3d38;
  --muted:      #7a9990;
  --border:     #cdd9d5;

  /* Destructive / warnings */
  --red-txt:    #5a2020;
  --red-bg:     #fdecea;
  --red-border: #f0cfd9;

  /* Elevation */
  --shadow:      0 2px 14px rgba(0,0,0,0.06);
  --shadow-lift: 0 6px 20px rgba(0,0,0,0.10);

  /* Geometry */
  --radius:     14px;
  --radius-sm:  10px;
  --radius-pill: 999px;

  /* Timer-specific colour states (used by the Timer tool's green/yellow/red transitions) */
  --timer-green:    #5e9977;
  --timer-green-bg: #eaf4ef;
  --timer-yellow:   #b8860b;
  --timer-yellow-bg:#fdf6d8;
  --timer-red:      #c0392b;
  --timer-red-bg:   #fdecea;

  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Menlo', 'Consolas', monospace;
}

/* ──────────────────────────────────────────────────────────────
   Base resets (duplicated in every tool currently — consolidate)
   ────────────────────────────────────────────────────────────── */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
  min-height: 100dvh;
}
```

Nothing else goes in this file yet. Component styles stay inside each tool's own file for now — the goal is a single source of truth for tokens, not a full CSS consolidation.

### A2. Create `/shared/icons.svg`

An SVG sprite file at `shared/icons.svg`, containing the six origami tool icons as `<symbol>` definitions. Paths are provided below — these exactly match the ones used on the unruledplay.dk homepage.

```svg
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">

  <symbol id="icon-energy" viewBox="0 0 48 48">
    <path d="M 26 7 L 13 27 L 22 27 L 19 41 L 35 21 L 25 21 Z"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linejoin="miter" stroke-linecap="square"/>
    <path d="M 22 27 L 25 21 M 26 7 L 22 27"
          fill="none" stroke="currentColor" stroke-width="1"
          stroke-linejoin="miter" stroke-linecap="square" opacity="0.45"/>
  </symbol>

  <symbol id="icon-temperature" viewBox="0 0 48 48">
    <path d="M 22 8 L 22 30 L 17 33 L 17 39 L 24 43 L 31 39 L 31 33 L 26 30 L 26 8 Z"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linejoin="miter" stroke-linecap="square"/>
    <path d="M 24 8 L 24 43 M 17 33 L 31 33"
          fill="none" stroke="currentColor" stroke-width="1"
          stroke-linejoin="miter" stroke-linecap="square" opacity="0.45"/>
  </symbol>

  <symbol id="icon-parking" viewBox="0 0 48 48">
    <path d="M 8 10 L 32 10 L 38 16 L 38 40 L 8 40 Z"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linejoin="miter" stroke-linecap="square"/>
    <path d="M 32 10 L 32 16 L 38 16"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linejoin="miter" stroke-linecap="square"/>
    <path d="M 16 34 L 16 18 L 26 18 L 26 26 L 16 26"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linejoin="miter" stroke-linecap="square"/>
  </symbol>

  <symbol id="icon-wordcloud" viewBox="0 0 48 48">
    <path d="M 12 32 L 8 26 L 12 18 L 20 14 L 30 16 L 36 14 L 42 22 L 38 32 L 30 36 L 18 36 Z"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linejoin="miter" stroke-linecap="square"/>
    <path d="M 20 14 L 18 36 M 30 16 L 30 36 M 12 18 L 36 14"
          fill="none" stroke="currentColor" stroke-width="1"
          stroke-linejoin="miter" stroke-linecap="square" opacity="0.45"/>
  </symbol>

  <symbol id="icon-timer" viewBox="0 0 48 48">
    <path d="M 14 10 L 34 10 L 40 20 L 40 34 L 34 40 L 14 40 L 8 34 L 8 20 Z"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linejoin="miter" stroke-linecap="square"/>
    <path d="M 14 10 L 8 20 M 34 10 L 40 20"
          fill="none" stroke="currentColor" stroke-width="1"
          stroke-linejoin="miter" stroke-linecap="square" opacity="0.45"/>
    <path d="M 24 18 L 24 26 L 30 30"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linejoin="miter" stroke-linecap="square"/>
  </symbol>

  <symbol id="icon-synthesis" viewBox="0 0 48 48">
    <path d="M 10 10 L 28 10 L 34 16 L 34 32 L 10 32 Z"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linejoin="miter" stroke-linecap="square"/>
    <path d="M 28 10 L 28 16 L 34 16"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linejoin="miter" stroke-linecap="square"/>
    <path d="M 10 22 L 34 22"
          fill="none" stroke="currentColor" stroke-width="1"
          stroke-linejoin="miter" stroke-linecap="square" opacity="0.45"/>
    <path d="M 26 32 L 30 38 L 36 40 L 40 36 L 38 30 L 32 28 Z"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linejoin="miter" stroke-linecap="square"/>
    <path d="M 32 28 L 36 36"
          fill="none" stroke="currentColor" stroke-width="1"
          stroke-linejoin="miter" stroke-linecap="square" opacity="0.45"/>
  </symbol>

</svg>
```

### A3. Update every tool to import the shared files

For each file — the root `index.html` and every `<tool>/index.html` — do the following:

1. **Add a `<link>` to tokens.css** in the `<head>`, before the `<style>` block. Path is relative:
   - From root `index.html`: `<link rel="stylesheet" href="./shared/tokens.css">`
   - From any `<tool>/index.html`: `<link rel="stylesheet" href="../shared/tokens.css">`

2. **Delete the `:root { ... }` block** from each tool's own `<style>` block. The variables now live in `tokens.css` and are available globally. Leave the tool's component-specific styles alone.

3. **Delete the duplicated `*, *::before, *::after` reset** and `body` base styles at the top of each tool's own `<style>` — those are now in `tokens.css` too. If a tool has additional body rules (e.g. `display: flex`), keep those, just don't redeclare the baseline.

4. **For the launcher `index.html` only:** also add an inline SVG sprite at the start of the `<body>` so the tool-card icons can reference symbols via `<use>`. The simplest pattern:

   ```html
   <body>
     <svg width="0" height="0" style="position:absolute" aria-hidden="true">
       <use href="./shared/icons.svg#icon-energy"></use>
     </svg>
     <!-- rest of body -->
   </body>
   ```

   Actually, the cleaner way: leave the sprite file external and reference it from the `<use>` directly. See A4.

### A4. Update the launcher `index.html` to use origami icons

In the launcher's tool cards, replace each emoji `<div class="tool-icon">⚡</div>` with an SVG using `<use>`:

```html
<div class="tool-icon">
  <svg viewBox="0 0 48 48" width="32" height="32" aria-hidden="true">
    <use href="./shared/icons.svg#icon-energy"></use>
  </svg>
</div>
```

Repeat for each tool:
- Energy Check-In → `#icon-energy`
- Temperature Check → `#icon-temperature`
- Parking Lot → `#icon-parking`
- Word Cloud → `#icon-wordcloud`
- Timer → `#icon-timer`
- Synthesis Accelerator → `#icon-synthesis`

Update the `.tool-icon` CSS in the launcher to size the SVG correctly and colour it via `currentColor`. Something like:

```css
.tool-icon {
  width: 2.5rem;
  flex-shrink: 0;
  color: var(--primary);
  display: grid;
  place-items: center;
}
.tool-icon svg {
  width: 32px;
  height: 32px;
}
```

Delete the old `font-size: 2rem` since that was for emoji rendering.

### A5. Update every tool's own emoji to the SVG sprite

Each individual tool file also has emoji inline — the `.logo` at the top of each tool showing the tool's own glyph. Same replacement pattern:

- Energy Check-In `index.html`: find the `⚡` in the header, replace with `<svg viewBox="0 0 48 48" width="32" height="32"><use href="../shared/icons.svg#icon-energy"></use></svg>`
- Temperature Check `index.html`: `🌡️` → `#icon-temperature`
- Parking Lot `index.html`: `🅿️` → `#icon-parking`
- Word Cloud `index.html`: `☁️` → `#icon-wordcloud`
- Timer `index.html`: `⏱️` → `#icon-timer`
- Synthesis Accelerator `index.html`: `🔍` → `#icon-synthesis`

Important: there are **other** emoji uses in the tool files beyond the main logo — empty-state markers (🅿️ for "nothing parked"), confirmation ticks (✓), status glyphs (⏳, 🔗, ⏰, 📊). **Leave those alone for now.** Phase A is about the primary tool identity icon only. We'll decide case-by-case in phase C what stays as emoji and what becomes SVG.

### A6. Verify

Open every tool in a browser. **Each one should look exactly the same as before** — still sage green, still identical to what's on the live GitHub Pages site. The only visible change is that the six primary tool-identity emoji are now SVG versions of themselves (which means they render consistently across every browser/OS instead of looking slightly different on iOS vs Android vs desktop Chrome).

If anything else has changed visually, something went wrong in the token extraction — most likely a variable name mismatch. Check the browser's developer tools for CSS variables that resolve to nothing.

Commit: `Refactor: extract shared tokens and icons to repo root`

---

## Phase B — restyle to aubergine

Only start this once phase A is committed and every tool verifies visually identical to before.

### B1. Replace token values in `shared/tokens.css`

Swap the `:root` block in `shared/tokens.css` with the aubergine palette. This is the single change that cascades across all six tools plus the launcher.

```css
:root {
  /* Surfaces */
  --bg:         #fbf4f4;   /* warm pink off-white (was #f4f7f6 sage) */
  --card:       #ffffff;

  /* Primary — aubergine */
  --primary:    #6a2a4e;   /* was #5e9977 sage */
  --primary-dk: #4e1d3a;
  --primary-lt: #f5e3ec;   /* blush */

  /* Foreground */
  --text:       #3a1e30;   /* near-black aubergine */
  --muted:      #9c7a8a;   /* dusty mauve */
  --border:     #e8d6dd;   /* pink stone */

  /* Destructive / warm berry */
  --red-txt:    #6b1f38;
  --red-bg:     #f9e8ee;
  --red-border: #f0cfd9;

  /* Elevation — slightly warmer shadow to match aubergine page */
  --shadow:      0 2px 14px rgba(64,20,40,0.06);
  --shadow-lift: 0 6px 20px rgba(64,20,40,0.10);

  /* Geometry — unchanged */
  --radius:     14px;
  --radius-sm:  10px;
  --radius-pill: 999px;

  /* Timer state colours — keep green/yellow/red semantics for now (phase C may revisit) */
  --timer-green:    #5e9977;
  --timer-green-bg: #eaf4ef;
  --timer-yellow:   #b8860b;
  --timer-yellow-bg:#fdf6d8;
  --timer-red:      #c0392b;
  --timer-red-bg:   #fdecea;

  /* Typography — unchanged */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Menlo', 'Consolas', monospace;
}
```

**Specifically not changing in phase B:**
- The timer's green/yellow/red state colours. Those carry semantic meaning (time remaining is fine / warning / out) and shifting them to aubergine variants is a design decision that deserves phase C attention.
- Component-specific styles inside each tool. Cards, buttons, inputs, chips — they all reference the tokens above, so they'll naturally pick up the new colours. If a specific component has a hardcoded `#5e9977` still floating around, find-replace it to `var(--primary)`.

### B2. Find and replace any lingering hardcoded sage values

Search the entire codebase for these strings and replace with tokens where they appear:

- `#5e9977` → `var(--primary)`
- `#4a7d61` → `var(--primary-dk)`
- `#e8f0ec` → `var(--primary-lt)`
- `#2e3d38` → `var(--text)`
- `#7a9990` → `var(--muted)`
- `#cdd9d5` → `var(--border)`
- `#f4f7f6` → `var(--bg)`

In a well-refactored codebase these would all already be tokens — but the current state has some hardcoded values scattered around (especially in the temperature-check tool, which is the longest file). The tokens file won't propagate to those until they're switched to `var()` references.

### B3. Verify

Open every tool. This time **every tool should now be aubergine**, consistently. The primary buttons, the active-state pills, the header wordmark area, the bar-chart fills, the checkmark circles — all should have moved from sage green to `#6a2a4e`.

If any component is stubbornly sage, it's a hardcoded value that escaped B2. Search for the specific colour and convert.

The origami icons in each tool's header will now also be picking up `var(--primary)` via `currentColor`, so they render in aubergine too. That's the desired behaviour — one palette change touches every surface.

Commit: `Restyle: aubergine palette replaces sage green across all tools`

---

## What phase A + B deliberately does NOT do

- **No changes to component structure.** Cards, buttons, inputs are visually recoloured but their shape/padding/behaviour stays identical.
- **No typography changes.** System-ui stays, sizes stay, weights stay.
- **No layout changes.** Every tool's facilitator and participant views stay in the same arrangement.
- **No Unruled Play branding on the launcher hub.** The `<h1>Workshop Tools</h1>` stays as-is for now.
- **No per-tool polish.** The temperature-check AI-suggestions card, the synthesis-accelerator API-key input, the timer's full-screen projection view — all of these have specific treatments that may or may not land well in aubergine and deserve individual attention. That's phase C.

This is deliberate restraint. The point of phase A+B is to establish a clean, consistent, on-brand baseline across all six tools with the minimum number of decisions. Once that's in place and shipped, phase C can be tackled one tool at a time with fresh eyes.

---

## After B ships

Three things become easier:

1. **Moving to `tools.unruledplay.dk`** — once Aze is unblocked, the DNS change points at this repo's GitHub Pages deployment, and the tools are now on-brand from the first moment a visitor arrives.
2. **Updating the main site's Tools section links** — the six `href` values in `unruledplay.net/src/pages/index.astro` change from `susannekroghhansen.github.io/workshop-tools/` to `tools.unruledplay.dk`.
3. **Phase C, one tool at a time** — Timer first (smallest, cleanest), then Energy Check-In, Temperature Check, Parking Lot, Word Cloud, Synthesis Accelerator. Or whichever order feels right.
