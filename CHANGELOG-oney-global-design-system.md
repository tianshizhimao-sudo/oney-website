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

## Phase B — Apply to pages (planned, not yet executed)

Before starting Phase B, decide with @maodong:

1. Which pages are in scope for Phase B? (Recommended order: `index.html`,
   `about.html`, `fhc.html`, then `insights.html` / `broker.html` /
   `vision.html` / `article.html`.)
2. Should `brand.css` be refactored to reuse `--oney-*` tokens, or stay
   independent?

Phase B checklist (per page):

- [ ] Link `tokens.css` and `motion.css` in `<head>` after `brand.css`.
- [ ] Replace the inline full-circle favicon SVG with `oney-icon.svg`
      (data URI or `<link rel="icon" href="/assets/svg/oney-icon.svg">`).
- [ ] Replace the in-page logo mark (currently a `conic-gradient` circle
      in `.nav-logo-icon` and `.footer-logo-icon` within `brand.css`)
      with an `<img src="/assets/svg/oney-icon.svg">` — or inline the
      SVG so the gradient animates cleanly on hover.
- [ ] Update the wordmark from `Oney & Co` to `Oney & Co.` with the
      trailing period wrapped in a purple-dot span. Reference markup:

      ```html
      <span class="oney-wordmark">
        Oney &amp; Co<span class="oney-wordmark__dot">.</span>
      </span>

      <style>
        .oney-wordmark__dot {
          color: var(--oney-wordmark-dot);
          font-weight: 700;
        }
      </style>
      ```

- [ ] Audit primary CTAs and add exactly one trailing dot per button
      using the `.oney-cta` + `.oney-cta__dot` pattern from `motion.css`.
      Never add the dot to secondary CTAs unless the action is a final
      decision (Submit, Approve, Decline).
- [ ] Replace any generic `Good` / `+12%` score labels with the points +
      tier range format: `742 · +80 pts (662→742) · Tier: Good (700–800)`.
- [ ] Remove decorative purple uses that are not CTA / dot / logo /
      active state.
- [ ] Verify mobile layout still works at ≤768px.
- [ ] Verify `prefers-reduced-motion` still disables animations.

---

## Phase C — Score / decision surfaces (future)

Only relevant once a dedicated score or assessment page exists in this
repo. `fhc.html` is a health-check input flow, not a score surface.
Dashboard / score cards are deferred until the surface exists.
