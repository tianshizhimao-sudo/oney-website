# Oney Ecosystem Architecture — v1.0

**Status:** Draft release architecture  
**Date:** 28 September 2026  
**Purpose:** Canonical public/product architecture for Oney & Co.

## 1. Brand boundary

Oney & Co is **not a mortgage brokerage brand**.

Oney is a lending education, decision-support, tools and intelligence platform.

Allowed public positioning:
- lending education
- financial readiness
- decision support
- calculators and analysis
- policy intelligence
- professional workflow tools

Not allowed as Oney public positioning:
- Oney as mortgage broker / brokerage
- Oney as lender
- promises of approval, financeability or lender acceptance
- personalised credit advice presented as Oney service

Professional users such as brokers may use Oney tools. That does not make Oney a brokerage.

## 2. Canonical user journey

```
Learn / Understand
      ↓
Assess
      ↓
Calculate
      ↓
Analyse
      ↓
Act / Pro
```

### Learn / Understand
- Oney Insights
- Policy Radar
- Lender Rate Radar

### Assess
- Financial Health Check
- Bank-Ready Score
- readiness diagnostics

### Calculate
- repayment
- borrowing / capacity indicators
- refinance / LMI / duty / offset calculations

### Analyse
- investment analysis
- servicing
- security
- structure / flow analysis

### Act / Pro
- professional case workspace
- credit-framework workflows
- evidence and export workflows

## 3. Repository roles

### Public Brand / Discovery
- `oney-website`
  - canonical brand shell
  - discovery and education
  - routes users into public products
  - source-of-truth for brand design tokens

### Public Assessment
- `oney-fhc`
- `oney-score`

### Public Intelligence
- `oney-policy`
- `lender-rate-radar`

### Public Tools
- `oney-tools`
  - canonical tool navigation
  - Assess → Calculate → Analyse → Pro
  - general information and decision support

### Professional / Restricted
- `oney-pro-suite`
- `credit-paper-pro` (candidate for restricted/professional placement)
- `servicing-calculator` (candidate for consolidation into Oney Tools)

### Education / Mentoring
- `oney-mentor`
  - review separately for fit with Oney education boundary

## 4. Broker-brand migration rule

Any historic Oney content that sells or represents mortgage broking services must:
1. be removed from Oney public navigation;
2. be removed from current sitemap / indexed discovery;
3. be retained in a hidden archive for future migration to a separate broker brand;
4. not be silently deleted if it contains reusable copy or product strategy.

Neutral references to a broker, lender, adviser or accountant as an external professional may remain where contextually necessary.

Professional tools may explicitly serve brokers, bankers or credit professionals, provided the product does not represent Oney itself as the broking service provider.

## 5. Design system hierarchy

Canonical design foundation:
- open-ring Oney mark
- Oney wordmark with purple full stop
- green + purple brand family
- semantic state colours independent from brand colours
- restrained motion
- shared typography, radius, shadow and spacing contracts

Brand site and product workspace should share identity, not identical layouts.

`oneyco.com.au` = brand / discovery / learning  
`tools.oneyco.com.au` = product / workspace

## 6. Change governance

- Shared design-token changes originate from the canonical Oney design system and are ported to public repos.
- Product logic is not changed as part of visual consolidation unless explicitly scoped and tested.
- Public irreversible changes require release validation before merge.
- Legacy broker content is archived before public retirement.
- Each repo migration should use its own branch and PR.

## 7. Policy Radar publishing governance

Policy Radar has a separate content-governance boundary from the rest of the public ecosystem.

**Obsidian owns policy truth. GitHub owns delivery. The Oney Design System owns presentation.**

Canonical publishing flow:

```
Obsidian / 60-policy-publish
  → policy research and source evidence
  → accuracy / freshness validation
  → human review
  → manual publish
  → oney-policy public delivery
  → policy.oneyco.com.au
```

Rules:
- Policy content, lender facts, source metadata, freshness and verification logic are not to be re-authored by presentation/design migrations.
- Broker-channel, broker-guide or accreditation references may remain when they are factual lender/source metadata.
- Public shell changes may alter navigation, design tokens, SEO, audience framing, explanatory copy and disclaimers without changing policy truth.
- Any PR that touches `data/`, lender JSON, source metadata, freshness/verification fields, policy generation scripts or the Obsidian publishing contract requires a dedicated Policy Publishing Integrity review before release.
- Routine policy updates continue to originate from the Obsidian workflow and remain subject to manual publish approval.
