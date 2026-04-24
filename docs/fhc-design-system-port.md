# FHC Port — Oney & Co. Global Design System Handoff

**Purpose.** Port the Phase A + B design system work from the main site
(`oneyco.com.au`, repo `tianshizhimao-sudo/oney-website`) to the FHC
sub-site (`fhc.oneyco.com.au`). Tech stack confirmed identical: static
HTML with inline `<style>` blocks; visual style identical dark-luxury
shell (`#1A1A2E` / purple `#6B4C9A` / green `#2ECC85`).

This document is self-contained. The receiving session does **not**
need to pull anything from the main site repo — every asset, CSS
snippet, SVG, and script is embedded below.

---

## 1. Scope — what to change, what to leave

### Change

- **Favicon** on every HTML page → point to new SVG
- **Logo mark** in nav + footer → new open-ring + inner-dot SVG
- **Wordmark** `Oney & Co` → `Oney & Co.` with a purple `#6D5EF5` full stop
- **Add design tokens** as a new `assets/css/tokens.css` layer
- **Add motion utilities** as a new `assets/css/motion.css` layer

### Do NOT change

- Primary brand purple family `#6B4C9A` / `#9B59B6` / `#B59BD6` —
  preserve in all existing styling
- Primary brand green family `#2ECC85` / `#1FAD73` — preserve
- Dark-luxury shell `#1A1A2E` / `#1A1228` / `#0A0A0A` — preserve
- Any CTA styling beyond adding the dot (see §8 for CTA dot system,
  which is defined but not applied yet — treat as deferred)
- Existing page content, copy, layout, component structure
- Hero sizes, typography scales elsewhere

---

## 2. Discovery first (critical — run before editing)

The FHC repo may have a different layout. Before applying any patches,
the receiving agent should run these greps to classify the surfaces:

```bash
# Where are favicons defined?
grep -lE 'rel="icon"' $(find . -name "*.html") 2>/dev/null

# Pattern 1 signature: div-based logo with conic-gradient in CSS
grep -lE "conic-gradient.*#2ECC85|nav-logo-icon" $(find . -name "*.html") 2>/dev/null

# Pattern 2 signature: inline SVG lockup with old brand green stops
grep -lE "stop-color:#2ECC85|stop-color.#2ECC85" $(find . -name "*.html") 2>/dev/null

# Existing shared CSS files?
find . -name "brand.css" -o -name "tokens.css" -o -name "global.css"

# Current wordmark usages (to confirm text layout)
grep -nE "nav-logo-text|footer-logo-text|Oney.*Co" $(find . -name "*.html") 2>/dev/null | head -30
```

If the FHC repo has **neither Pattern 1 nor Pattern 2**, check for an
entirely different logo markup (e.g., a React-like component inlined
as an `<img>` or a CSS sprite). In that case, follow the intent rules
in §1 and adapt the patches below.

---

## 3. Assets to drop in

Create exactly these files in the FHC repo (adjust root path if FHC
uses a different assets directory, e.g., `public/assets/...`):

- `assets/css/tokens.css` — §3.1
- `assets/css/motion.css` — §3.2
- `assets/svg/oney-icon.svg` — §3.3
- `assets/svg/oney-icon-16.svg` — §3.4

### 3.1 `assets/css/tokens.css`

```css
/* =============================================================
   Oney & Co. — Global Design Tokens
   Non-breaking additions using --oney-* namespace. Coexists with
   any existing `--purple` / `--green` / `--bg` brand vars.
   ============================================================= */

:root {
  /* ---------- Brand: preserved existing values ---------- */
  --oney-purple:          #6B4C9A;
  --oney-purple-light:    #9B59B6;
  --oney-purple-soft:     #B59BD6;
  --oney-purple-lighter:  #B08AE0;
  --oney-purple-pale:     #C4A3F0;
  --oney-purple-glow:     rgba(107, 76, 154, 0.18);

  --oney-green:           #2ECC85;
  --oney-green-dark:      #1FAD73;
  --oney-green-deep:      #178A5C;
  --oney-green-soft:      #7AD9A8;
  --oney-green-glow:      rgba(46, 204, 133, 0.15);

  --oney-bg-dark:         #0A0A0A;
  --oney-bg-dark-navy:    #1A1A2E;
  --oney-bg-dark-purple:  #1A1228;
  --oney-bg-dark-deep:    #0D0D1A;
  --oney-bg-dark-deeper:  #0A0A15;
  --oney-surface-dark:    #252540;
  --oney-surface-dark-alt:#16162A;

  --oney-text-on-dark:          #FFFFFF;
  --oney-text-on-dark-strong:   rgba(255, 255, 255, 0.85);
  --oney-text-on-dark-muted:    rgba(255, 255, 255, 0.55);
  --oney-text-on-dark-faint:    rgba(255, 255, 255, 0.40);

  /* ---------- Logo system ---------- */
  --oney-logo-grad-start: #10B981;
  --oney-logo-grad-mid:   #2563EB;
  --oney-logo-grad-end:   #7C3AED;
  --oney-logo-gradient:   linear-gradient(135deg,
                            var(--oney-logo-grad-start) 0%,
                            var(--oney-logo-grad-mid)   50%,
                            var(--oney-logo-grad-end)   100%);
  --oney-wordmark-dot:    #6D5EF5;

  /* ---------- Gray scale ---------- */
  --oney-gray-50:   #F9FAFB;
  --oney-gray-100:  #F3F4F6;
  --oney-gray-200:  #E5E7EB;
  --oney-gray-400:  #9CA3AF;
  --oney-gray-600:  #4B5563;
  --oney-gray-800:  #1F2937;
  --oney-gray-900:  #0B0F14;

  /* ---------- Semantic states ---------- */
  --oney-state-success:    #22C55E;
  --oney-state-warn-soft:  #FBBF24;
  --oney-state-warn:       #F59E0B;
  --oney-state-error:      #EF4444;
  --oney-state-info:       #3B82F6;

  /* ---------- Typography ---------- */
  --oney-font-sans: "Inter Tight", Inter, "Helvetica Neue", Arial, sans-serif;
  --oney-weight-body:        400;
  --oney-weight-body-med:    500;
  --oney-weight-cta:         600;
  --oney-weight-section:     600;
  --oney-weight-section-alt: 650;
  --oney-weight-page-title:  700;
  --oney-weight-hero:        700;
  --oney-weight-metric:      700;
  --oney-tracking-tight:     -0.015em;
  --oney-tracking-hero:      -0.02em;
  --oney-line-body:          1.6;
  --oney-line-heading:       1.15;

  /* ---------- Motion ---------- */
  --oney-ease-out:           cubic-bezier(0.16, 1, 0.3, 1);
  --oney-ease-in-out:        cubic-bezier(0.4, 0, 0.2, 1);
  --oney-dur-cta:            160ms;
  --oney-dur-card:           200ms;
  --oney-dur-progress:       1100ms;
  --oney-dur-decision-dot:   300ms;
  --oney-dur-ring-rotate:    7s;
  --oney-dur-dot-pulse:      2s;

  /* ---------- Radius + shadow ---------- */
  --oney-radius-card:        18px;
  --oney-radius-card-lg:     20px;
  --oney-radius-button:      12px;
  --oney-radius-pill:        100px;
  --oney-shadow-card:        0 1px 2px rgba(0, 0, 0, 0.05),
                             0 1px 3px rgba(0, 0, 0, 0.08);
  --oney-shadow-cta-hover:   0 6px 20px rgba(0, 0, 0, 0.18);
  --oney-shadow-lift:        0 12px 30px rgba(0, 0, 0, 0.15);
}
```

### 3.2 `assets/css/motion.css`

```css
/* =============================================================
   Oney & Co. — Motion System. Restrained motion only.
   ============================================================= */

@keyframes oney-ring-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes oney-dot-pulse {
  0%, 100% { opacity: 1;   transform: scale(1); }
  50%      { opacity: 0.7; transform: scale(0.96); }
}

@keyframes oney-progress-fill {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

@keyframes oney-decision-dot-in {
  from { opacity: 0; transform: scale(0.6); }
  to   { opacity: 1; transform: scale(1); }
}

.oney-ring--spin {
  transform-origin: center;
  animation: oney-ring-rotate var(--oney-dur-ring-rotate, 7s) linear infinite;
}
.oney-dot--pulse {
  transform-origin: center;
  animation: oney-dot-pulse var(--oney-dur-dot-pulse, 2s) ease-in-out infinite;
}
.oney-progress-fill {
  transform-origin: left center;
  animation: oney-progress-fill
             var(--oney-dur-progress, 1100ms)
             var(--oney-ease-out, cubic-bezier(0.16, 1, 0.3, 1)) both;
}
.oney-decision-dot--in {
  animation: oney-decision-dot-in
             var(--oney-dur-decision-dot, 300ms)
             var(--oney-ease-out, cubic-bezier(0.16, 1, 0.3, 1)) both;
}

.oney-cta {
  transition:
    transform  var(--oney-dur-cta, 160ms) var(--oney-ease-out, ease-out),
    box-shadow var(--oney-dur-cta, 160ms) var(--oney-ease-out, ease-out);
}
.oney-cta:hover {
  transform: translateY(-1px);
  box-shadow: var(--oney-shadow-cta-hover, 0 6px 20px rgba(0, 0, 0, 0.18));
}
.oney-cta__dot {
  display: inline-block;
  margin-left: 1px;
  color: var(--oney-wordmark-dot, #6D5EF5);
  transition: transform var(--oney-dur-cta, 160ms)
                        var(--oney-ease-out, ease-out);
}
.oney-cta:hover .oney-cta__dot { transform: translateX(2px); }

.oney-card {
  transition:
    transform  var(--oney-dur-card, 200ms) var(--oney-ease-out, ease-out),
    box-shadow var(--oney-dur-card, 200ms) var(--oney-ease-out, ease-out);
}
.oney-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--oney-shadow-lift, 0 12px 30px rgba(0, 0, 0, 0.15));
}

/* Soft glow for the icon on dark backgrounds */
.oney-icon--glow {
  filter:
    drop-shadow(0 0 8px  rgba(109, 94, 245, 0.30))
    drop-shadow(0 0 18px rgba(37, 99, 235, 0.14));
}

@media (prefers-reduced-motion: reduce) {
  .oney-ring--spin,
  .oney-dot--pulse,
  .oney-progress-fill,
  .oney-decision-dot--in { animation: none !important; }

  .oney-cta,
  .oney-cta__dot,
  .oney-card { transition: none !important; }
}
```

### 3.3 `assets/svg/oney-icon.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" fill="none" role="img" aria-label="Oney">
  <defs>
    <linearGradient id="oneyIconGradient" x1="30" y1="150" x2="150" y2="30" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="50%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
  </defs>
  <path d="M 126 34 A 62 62 0 1 0 142 118"
        stroke="url(#oneyIconGradient)"
        stroke-width="22"
        stroke-linecap="round"
        fill="none"/>
  <circle cx="96" cy="90" r="16" fill="url(#oneyIconGradient)"/>
</svg>
```

### 3.4 `assets/svg/oney-icon-16.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" fill="none" role="img" aria-label="Oney">
  <defs>
    <linearGradient id="oneyIconGradient16" x1="30" y1="150" x2="150" y2="30" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="50%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
  </defs>
  <path d="M 126 34 A 62 62 0 1 0 142 118"
        stroke="url(#oneyIconGradient16)"
        stroke-width="34"
        stroke-linecap="round"
        fill="none"/>
  <circle cx="96" cy="90" r="24" fill="url(#oneyIconGradient16)"/>
</svg>
```

---

## 4. Step 1 — Bulk favicon replacement

The main site had an identical inline data-URI SVG favicon across every
HTML file. FHC likely has the same or a similar old mark. Replace it
with a `<link>` to the new SVG file.

### Target form

```html
<link rel="icon" type="image/svg+xml" href="/assets/svg/oney-icon.svg">
```

### Python script (drop into `/tmp/fav.py` and run)

```python
import re, sys
from pathlib import Path

NEW = '<link rel="icon" type="image/svg+xml" href="/assets/svg/oney-icon.svg">'
PAT = re.compile(r'<link\s+rel="icon"(?:\s+type="[^"]*")?\s+href="[^"]*">')

for arg in sys.argv[1:]:
    p = Path(arg)
    if not p.is_file():
        print(f'skip: {arg}'); continue
    c = p.read_text(encoding='utf-8')
    new = PAT.sub(NEW, c, count=1)
    if new != c:
        p.write_text(new, encoding='utf-8')
        print(f'updated: {arg}')
    else:
        print(f'no match: {arg}')
```

Run with the list of HTML files:

```bash
python3 /tmp/fav.py $(find . -name "*.html" -not -path "./node_modules/*")
```

### Pitfall

The old favicon was a long data URI containing `<svg>…</svg>`. A naive
regex like `<link ... [^>]*>` will truncate at the first `>` *inside*
the SVG. The script above uses a quote-aware pattern that matches the
full `href="..."` value. **Do not simplify.**

---

## 5. Step 2 — Pattern 1 logo mark + wordmark dot (CSS-only)

Use this if FHC's nav/footer logo looks like the main site's
`index.html` pattern:

```html
<a class="nav-logo">
  <div class="nav-logo-icon">
    <div class="nav-logo-icon-inner"></div>
  </div>
  <span class="nav-logo-text">Oney <span class="amp">&amp;</span> Co</span>
</a>
```

…and the CSS defines `.nav-logo-icon` with a `conic-gradient` circle.

### CSS patch — nav

Replace the existing `.nav-logo-icon`, `.nav-logo-icon-inner`, and
`.nav-logo-text` rules with:

```css
.oney-nav .nav-logo-icon {
  width: 32px; height: 32px; padding: 0; border-radius: 0;
  background: url('/assets/svg/oney-icon.svg') center/contain no-repeat;
  filter: drop-shadow(0 0 8px rgba(109,94,245,0.30)) drop-shadow(0 0 18px rgba(37,99,235,0.14));
}
.oney-nav .nav-logo-icon-inner { display: none; }
.oney-nav .nav-logo-text {
  font-size: 20px; font-weight: 600; color: #fff; letter-spacing: -0.5px;
}
.oney-nav .nav-logo-text::after {
  content: '.'; color: #6D5EF5; font-weight: 700; margin-left: 1px;
}
/* Keep existing .amp gradient rule if present */
```

### CSS patch — footer

Mirror the nav changes on `.footer-logo-icon` / `.footer-logo-icon-inner`
/ `.footer-logo-text`. The footer icon is typically 28 px:

```css
.oney-footer .footer-logo-icon {
  width: 28px; height: 28px; padding: 0; border-radius: 0;
  background: url('/assets/svg/oney-icon.svg') center/contain no-repeat;
  filter: drop-shadow(0 0 8px rgba(109,94,245,0.28)) drop-shadow(0 0 16px rgba(37,99,235,0.12));
}
.oney-footer .footer-logo-icon-inner { display: none; }
.oney-footer .footer-logo-text {
  font-size: 18px; font-weight: 600; color: #fff; letter-spacing: -0.5px;
}
.oney-footer .footer-logo-text::after {
  content: '.'; color: #6D5EF5; font-weight: 700; margin-left: 1px;
}
```

### Rationale

- `background: url(...) center/contain` displays the new SVG at the
  container's size without any HTML change.
- `display: none` on `.nav-logo-icon-inner` hides the leftover inner
  div (which used to be the hole in the old "target" mark). Preserves
  existing markup verbatim.
- `::after` pseudo-element on `.nav-logo-text` adds the purple period
  without touching HTML — so every existing `Oney & Co` wordmark
  instantly becomes `Oney & Co.`
- The `filter: drop-shadow(...)` stack creates the soft glow that
  reads against the dark-luxury shell. Two layers: purple close,
  blue wide, mimicking the logo gradient.

### If FHC's shared CSS is a separate file

If FHC has a `brand.css` or equivalent global stylesheet, edit it
once and every page inherits the change. Otherwise edit each page's
inline `<style>` block. Search for `conic-gradient` occurrences —
that's the old mark.

---

## 6. Step 3 — Pattern 2 inline SVG lockup (bulk SVG replacement)

Use this if FHC's nav/footer logo is an inline SVG like:

```html
<a class="nav-logo">
  <svg viewBox="0 0 195 80">
    <defs>
      <linearGradient id="fillGradL1">...stop-color:#2ECC85...</linearGradient>
      <linearGradient id="strokeGradL1">...</linearGradient>
    </defs>
    <g transform="translate(40, 45)">
      <circle r="32" stroke="..."/>
      <circle r="24" fill="..."/>
    </g>
    <text>ney</text> <text>&amp;</text> <text>co</text>
    <circle cx="182" cy="48" r="4" fill="#6B4C9A"/>
  </svg>
</a>
```

### Replacement Python script (`/tmp/replace_logos.py`)

```python
#!/usr/bin/env python3
"""Replace old Oney SVG lockups with the new design, fit per viewBox."""
import re, sys
from pathlib import Path

def new_lockup(vb_w, vb_h, grad_id):
    mark_target = vb_h - 8
    mark_scale = mark_target / 180.0
    mark_tx, mark_ty = 4, 4
    mark_w = 180 * mark_scale
    text_x = mark_tx + mark_w + 6
    text_y = vb_h / 2 + 9
    fs_main = 24 if vb_h <= 80 else 26
    fs_amp  = 19 if vb_h <= 80 else 21
    fs_dot  = 28 if vb_h <= 80 else 30
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w} {vb_h}" fill="none">\n'
        f'          <defs>\n'
        f'            <linearGradient id="{grad_id}" x1="30" y1="150" x2="150" y2="30" gradientUnits="userSpaceOnUse">\n'
        f'              <stop offset="0%" stop-color="#10B981"/>\n'
        f'              <stop offset="50%" stop-color="#2563EB"/>\n'
        f'              <stop offset="100%" stop-color="#7C3AED"/>\n'
        f'            </linearGradient>\n'
        f'          </defs>\n'
        f'          <g transform="translate({mark_tx}, {mark_ty}) scale({mark_scale:.3f})">\n'
        f'            <path d="M 126 34 A 62 62 0 1 0 142 118" stroke="url(#{grad_id})" stroke-width="22" stroke-linecap="round" fill="none"/>\n'
        f'            <circle cx="96" cy="90" r="16" fill="url(#{grad_id})"/>\n'
        f'          </g>\n'
        f'          <text x="{text_x:.0f}" y="{text_y:.0f}" font-family="\'Inter Tight\', Inter, system-ui, sans-serif" '
        f'font-size="{fs_main}" font-weight="650" fill="currentColor" letter-spacing="-0.6">'
        f'Oney <tspan font-size="{fs_amp}" font-weight="500" fill-opacity="0.82">&amp;</tspan> Co'
        f'<tspan fill="#6D5EF5" font-weight="700" font-size="{fs_dot}">.</tspan></text>\n'
        f'        </svg>'
    )

OLD = re.compile(
    r'<svg[^>]*viewBox="0 0 (?P<w>\d+) (?P<h>\d+)"[^>]*>'
    r'(?P<body>(?:(?!</svg>).)*?stop-color:#2ECC85(?:(?!</svg>).)*?)'
    r'</svg>',
    re.DOTALL
)

for arg in sys.argv[1:]:
    p = Path(arg)
    if not p.is_file():
        print(f'skip: {arg}'); continue
    c = p.read_text(encoding='utf-8')
    n = {'i': 0}
    def repl(m):
        body = m.group('body')
        if 'ney' not in body and '#6B4C9A' not in body:
            return m.group(0)
        n['i'] += 1
        return new_lockup(int(m.group('w')), int(m.group('h')), f"oneyGrad{n['i']}")
    new = OLD.sub(repl, c)
    if new != c:
        p.write_text(new, encoding='utf-8')
    print(f"{arg}: replaced {n['i']} lockup(s)")
```

Run against all HTML files:

```bash
python3 /tmp/replace_logos.py $(find . -name "*.html" -not -path "./node_modules/*")
```

### Tuning

If the new lockups render with awkward "Oney & Co." spacing, adjust
the font-size deltas in `new_lockup()` (`fs_main`, `fs_amp`, `fs_dot`).
The main site used 24 / 19 / 28 for `vb_h ≤ 80` and 26 / 21 / 30
for taller viewBoxes.

### Gradient ID collision

If a file holds multiple lockups (e.g., nav + footer + watermark),
the script auto-numbers IDs `oneyGrad1`, `oneyGrad2`, `oneyGrad3` per
file. Confirm with:

```bash
grep -oE "oneyGrad[0-9]+" path/to/page.html | sort -u
```

---

## 7. Step 4 — Sanity checks

Run all of these after the port:

```bash
# 1. No old brand-green gradient stops remain in HTML
grep -lE "stop-color:#2ECC85|stop-color:#1FAD73" $(find . -name "*.html")
# Expected: empty

# 2. No old conic-gradient full-circle marks
grep -l "conic-gradient" $(find . -name "*.html") $(find . -name "*.css")
# Expected: empty

# 3. Every page points at the new favicon
grep -cE 'href="/assets/svg/oney-icon.svg"' $(find . -name "*.html") | grep -v ":0"
# Expected: at least one match per page

# 4. Gradient IDs are unique per file
for f in $(find . -name "*.html"); do
  ids=$(grep -oE "oneyGrad[0-9]+" "$f" | sort)
  uniq=$(grep -oE "oneyGrad[0-9]+" "$f" | sort -u)
  if [ "$ids" != "$uniq" ]; then echo "COLLISION in $f"; fi
done
# Expected: silent
```

---

## 8. Explicitly deferred

The receiving session **should not** attempt these in this port:

- CTA dot system applied to buttons (`.oney-cta` + `.oney-cta__dot`
  are defined in `motion.css` but not wired onto any button on the
  main site either — consistent treatment is to defer both sites
  until @maodong reviews).
- Score / decision display conventions (points + tier range). FHC
  is a health check *input* flow, not a score surface.
- Onboarding flow restructure (`Welcome → Context → Inputs →
  Signals → Decision`). Current FHC flow stays as-is.
- Any change to the primary purple / green / dark shell palette.
- Hero typography / layout changes — unless a specific overflow
  issue is visible, leave alone.

---

## 9. Final acceptance checklist

Before declaring done:

- [ ] Every page's favicon is the new open-ring mark (hard-refresh
      the live FHC URL to verify)
- [ ] Every nav logo renders the new mark + `Oney & Co.` wordmark
      with a visible purple full stop
- [ ] Every footer logo same as above
- [ ] Dark shell still feels premium — soft glow on icon reads as
      a subtle halo, not a neon bloom
- [ ] Mobile (≤768 px) nav does not overflow or wrap unexpectedly
- [ ] `prefers-reduced-motion` still suppresses all animation
- [ ] No regression in existing flows (form inputs, progress bars,
      submit actions)

---

## 10. Reference — main-site files to mirror (optional)

If the receiving session wants to cross-check against the executed
main-site work, raw URLs (post-merge):

- Tokens: `https://raw.githubusercontent.com/tianshizhimao-sudo/oney-website/main/assets/css/tokens.css`
- Motion: `https://raw.githubusercontent.com/tianshizhimao-sudo/oney-website/main/assets/css/motion.css`
- Icon:   `https://raw.githubusercontent.com/tianshizhimao-sudo/oney-website/main/assets/svg/oney-icon.svg`
- Icon 16: `https://raw.githubusercontent.com/tianshizhimao-sudo/oney-website/main/assets/svg/oney-icon-16.svg`
- Brand.css: `https://raw.githubusercontent.com/tianshizhimao-sudo/oney-website/main/assets/css/brand.css`
- Changelog: `https://raw.githubusercontent.com/tianshizhimao-sudo/oney-website/main/CHANGELOG-oney-global-design-system.md`
- Preview page: `https://raw.githubusercontent.com/tianshizhimao-sudo/oney-website/main/preview/oney-icon.html`

Everything in this document is the authoritative source. The URLs
above are for optional cross-reference only.
