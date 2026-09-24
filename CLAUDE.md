# Loyalty Club — interactive prototype

## What this is

A high-fidelity, clickable prototype of the BetKing Loyalty Club home for Nigeria. It exists to test the concept with stakeholders and users before the real build. It is not production code, but it must look identical to the Figma designs.

## Source of truth

Figma is the single source of truth for every visual decision. When Figma and this code disagree, Figma is right.

- File: `<PASTE FIGMA FILE URL>`
- Screens page: `<PAGE NAME>`
- Node IDs:
  - Home: `<node-id>`
  - Mission list: `<node-id>`
  - Reward modal (3 states): `<node-id>`
  - Unlock modal: `<node-id>`
  - Collection: `<node-id>`

Use the Figma MCP tools (`get_design_context`, `get_variable_defs`, `get_screenshot`) to read designs. Never guess a colour, size, spacing or radius — read it from Figma.

## Fidelity rules

1. **Tokens first.** Before any component, extract all Figma variables to `src/styles/tokens.css` as CSS custom properties. Use the Figma variable names, kebab-cased. Every colour, spacing, radius, font size and line height in the codebase references a token. No magic numbers.
2. **Assets are the Figma assets.** Export icons and illustrations from Figma via the MCP tools into `src/assets/`. Do not substitute icons from an icon library. Do not redraw anything. If an asset cannot be exported, stop and tell me.
3. **One component per Figma component.** Same name, same variants as props. A Figma component with variants `state=locked|active|completed` becomes a React component with a `state` prop of the same values.
4. **Verify visually.** After building each component, call `get_screenshot` on the Figma node and compare against the rendered component at the same width. Fix differences before moving on.
5. **Match, then stop.** Do not "improve" the design. If something in Figma looks like a mistake, tell me — do not fix it in code.

## Stack

- Vite + React + TypeScript
- Plain CSS with custom properties (no Tailwind — its scale fights exact Figma values)
- No component library
- Mobile viewport: 390px wide. Desktop is out of scope.
- Fonts: `<TYPEFACE NAME>` — served from `public/fonts/` as woff2. Fallback stack: `system-ui, sans-serif`.

## Structure

```
src/
  assets/          exported from Figma, never edited by hand
    icons/
    illustrations/
  components/      one folder per Figma component
    MissionCard/
      MissionCard.tsx
      MissionCard.css
  screens/         one file per Figma screen frame
  styles/
    tokens.css     generated from Figma variables
    base.css       reset + font-face
  data/
    mock.ts        static data that drives the screens
```

## Interaction scope

Clickable flow only. State lives in React, nothing persists.

- Unlock modal → Home
- Home → tap active mission → mission detail
- Claim CTA → reward modal (correct shirt state)
- Reward modal → back to Home with progress advanced
- Shirt tiles reflect claimed state
- Everything else is visual only

## Workflow

1. Plan before building. Show me the plan and wait.
2. Build in order: tokens → components → screens → interactions.
3. Commit after every component with a message naming the Figma node.
4. Run `npm run dev` and keep it running so I can check in the browser.
5. When unsure, ask. Do not guess at design intent.

## Out of scope

- Backend, API calls, real data
- Analytics events
- Authentication
- Anything not on the Figma screens page
- Accessibility beyond semantic HTML and alt text (prototype only)
