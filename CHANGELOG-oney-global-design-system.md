# Oney & Co. Global Design System — Changelog

This file tracks rollout of the Oney & Co. global design system across the
website ecosystem. Work is phased so each change is reviewable and reversible.

---

## Phase A — Skeleton (this commit)

**Goal:** introduce the design system as raw materials without changing any
user-facing page. Nothing here is loaded by any `.html` file yet.

### Files added

| Path | Purpose |
|---|---|
| `assets/css/tokens.css` | Global CSS custom properties (`--oney-*` namespace) |
| `assets/css/motion.css` | Restrained motion utilities (`.oney-*` classes) |
| `assets/svg/oney-icon.svg` | New logo mark: open gradient ring + inner dot |
| `CHANGELOG-oney-global-design-system.md` | This file |

### Design decisions

- **Namespace.** All new tokens use `--oney-*` so they coexist with the
  existing `assets/css/brand.css` vars (`--purple`, `--green`, `--bg`). No
  redefinition, no collision. Phase B will decide whether to merge.
- **Brand values preserved.** Current brand hexes are encoded as tokens
  unchanged — purple `#6B4C9A` / `#9B59B6` / `#B59BD6`, green `#2ECC85` /
  `#1FAD73`, dark-luxury backgrounds `#1A1A2E` / `#1A1228`. Per direction,
  the dark-luxury visual surface stays as-is.
- **New supplementary tokens added** where they do not conflict:
  gray scale (50/100/200/400/600/800/900), tiered warning states
  (soft `#FBBF24`, warn `#F59E0B`, error `#EF4444`, info `#3B82F6`),
  success `#22C55E`, typography scale, motion durations + easing,
  radius + shadow.
- **Logo mark.** The new `oney-icon.svg` uses the exact geometry and
  tri-color gradient (`#10B981 → #2563EB → #7C3AED`) from the design
  system spec. The open-ring arc starts at the upper-right opening;
  the inner dot sits slightly right of center (cx=96, cy=90, r=16).
  The gradient is reserved for the logo mark and meaningful progress /
  data viz only — never decoration.
- **Wordmark full stop.** A dedicated token `--oney-wordmark-dot: #6D5EF5`
  is reserved for the purple period in "Oney & Co." Not applied in any
  page yet; see Phase B for markup.

### Brand rules captured

- Gradient only for the logo mark and meaningful progress / data viz.
- Decision-purple `#6D5EF5` only for: CTA, decision dot, logo full stop,
  limited active states.
- Success state color = `#22C55E`. Brand green `#10B981` stays inside
  the logo gradient only.
- Dot = decision / completion / finality. Never decoration.
- Restrained motion: ring rotation 6–8s, dot pulse 1.8–2.2s, CTA hover
  shifts 1px up / dot 2px right, card lift 2px.

### Known limitations

- Nothing is loaded by `.html` pages yet — the favicon inline SVG in each
  page still uses the old full-circle mark.
- `brand.css` is untouched and still authoritative for rendered pages.
- No lockup (icon + wordmark) SVG shipped; see Phase B below for the
  HTML pattern.

### Not in scope for Phase A

- Replacing any existing logo render in `.html` files.
- Changing primary purple / green / dark-bg visuals.
- Updating CTAs to the dot system.
- Score-card / onboarding patterns.

---

## Phase A.1 — Follow-up (this commit)

Finishing touches requested after Phase A review:

### Files added

| Path | Purpose |
|---|---|
| `assets/svg/oney-icon-16.svg` | Simplified 16 px variant — thicker stroke (34 vs 22), larger inner dot (r=24 vs 16) for favicons and small UI |

### Files updated

- `assets/css/motion.css` — added `.oney-icon--glow` utility: layered
  `drop-shadow` (purple close + blue wide) for the icon on dark brand
  surfaces. Mirrors the tri-color gradient identity without flooding
  the UI with purple decoration.
- `preview/oney-icon.html` — added two sections: soft-glow demo on
  brand-dark tiles, and size ladder comparing the 16 px simplified
  variant vs. the standard icon at 16 px.

---

## Phase B — Applied across the full site (this commit)

**Scope per direction from @maodong:**
- Logo mark and wordmark switched to the new system
- Purple / green / dark-luxury brand palette preserved unchanged
- All pages updated in a single pass

### 1. Favicons replaced — 14 files

The old inline data-URI SVG (full-circle mark in brand green) was
replaced with a reference to the canonical file:
`<link rel="icon" type="image/svg+xml" href="/assets/svg/oney-icon.svg">`

Files: `index.html`, `about.html`, `insights.html`, `fhc.html`,
`broker.html`, `vision.html`, `article.html`, `tools-landing.html`,
`tools-index-fixed.html`, `tools-index-public.html`,
`index-green-lavender.html`, `index-green-purple.html`,
`tools/commercial-investment.html`, `tools/index.html`.

### 2. Pattern 1 pages (nav/footer div-based logo mark)

Affected: `index.html`, `about.html`, `insights.html`
  (`insights.html` picks up changes via `assets/css/brand.css`.)

Inline CSS for `.nav-logo-icon` and `.footer-logo-icon` was rewritten:

- Removed the old `conic-gradient(#2ECC85 → #6B4C9A)` circle
- New `background: url('/assets/svg/oney-icon.svg') center/contain no-repeat`
- Soft glow added via layered `drop-shadow` filter (matches `.oney-icon--glow`)
- `.nav-logo-icon-inner` / `.footer-logo-icon-inner` set to `display: none`
  (preserves the existing HTML markup without edits)
- Wordmark purple full stop added via `::after` pseudo-element on
  `.nav-logo-text` and `.footer-logo-text` — so every "Oney & Co" now
  renders as `Oney & Co.` with a purple `#6D5EF5` period. No HTML edits
  required; the dot is a pure CSS overlay.

### 3. Pattern 2 pages (inline SVG lockups)

Affected: `fhc.html`, `broker.html`, `vision.html`, `article.html`,
`pitch-deck-bilingual.html`, `tools-landing.html`,
`tools-index-fixed.html`, `tools-index-public.html`,
`tools/commercial-investment.html`, `index-green-lavender.html`,
`index-green-purple.html`.

Total **19 inline `<svg>` lockups** across nav, footer, slide covers,
and watermarks were replaced with a new lockup generated to fit each
source viewBox (seen sizes: `195×80`, `210×90`, `190×90`).

New lockup structure:
- Mark: new open-ring path + inner dot in the tri-color gradient
- Wordmark: `Oney & Co.` with the "&" at reduced weight/opacity and
  the trailing period in `#6D5EF5`
- Text uses `fill="currentColor"` so it picks up the surrounding CSS
  text color (white on dark brand shell; dark in light-theme variants)
- Gradient IDs namespaced per-occurrence (`oneyGrad1`, `oneyGrad2`, ...)
  to avoid ID collisions when a file holds multiple lockups

### 4. `assets/css/brand.css`

Mirrors the Pattern 1 CSS changes so `insights.html` (the only page
that links this file) picks them up automatically. No HTML edit needed.

### Brand rules applied

- New open-ring + inner-dot mark across every surface; no old
  full-circle mark remains
- `Oney & Co.` wordmark with purple full stop (#6D5EF5) applied everywhere
- Gradient reserved to the logo mark only
- Soft glow applied only on dark brand shells (`#1A1A2E`, `#1A1228`,
  `#0A0A0A`)
- Existing brand purple / green / dark-luxury visual style untouched
  per direction

### Known limitations

- CTA dot system (`.oney-cta` + `.oney-cta__dot` with hover animation)
  is defined in `motion.css` but **not yet applied** to any button.
  Primary CTAs across the site still use the existing purple-gradient
  button styling. Upgrade to the dot system is deferred — revisit
  whether to add a trailing dot to `Get Started`-style CTAs on a
  per-page basis.
- Pattern 2 new lockup SVGs use `currentColor` for the wordmark text,
  which inherits from surrounding CSS. On pages with theme switchers
  (`data-theme="light"`), the text color should auto-adapt. Verify
  live.
- 16 px simplified favicon (`oney-icon-16.svg`) is shipped but not
  yet wired as a `sizes` hint — modern browsers will scale the
  full-resolution SVG, which is acceptable for vector but tiny
  bitmap previews may look heavy. Consider adding:
  `<link rel="icon" type="image/svg+xml" sizes="16x16" href="/assets/svg/oney-icon-16.svg">`
  if in-browser favicon rendering at 16 px looks muddy.
- Score / decision display conventions from spec §9 not applied —
  no dedicated score surface exists yet in this repo.
- Onboarding flow patterns from spec §8 not applied — `fhc.html` is
  closest candidate but existing flow is intact.

### Preview / reference page

`preview/oney-icon.html` — non-indexed standalone preview that renders
the mark at 7 sizes on all approved backgrounds, the lockup on light
and dark surfaces, motion demos, the 16 px simplified variant, and
soft-glow examples. Access locally after pull, or at
`/preview/oney-icon.html` once merged to `main`.

---

## Phase C — Score / decision surfaces (future)

Only relevant once a dedicated score or assessment page exists in this
repo. `fhc.html` is a health-check input flow, not a score surface.
Dashboard / score cards are deferred until the surface exists.
