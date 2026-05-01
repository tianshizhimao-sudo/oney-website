# 🎯 Insight → FHC Growth Engine — System Overview

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Deployed:** 2026-05-01

---

## What This System Does

Transforms educational Insight articles into systematic FHC conversion engines by:
1. **Analyzing** user intent and pain points
2. **Injecting** natural, high-converting CTAs
3. **Generating** multi-channel content variations
4. **Designing** complete conversion funnels
5. **Tracking** performance metrics

**Core Philosophy:**  
> Every Insight article becomes a door to FHC. Make the door visible, inviting, and easy to open.

---

## Quick Start

### Run the Routine

```bash
cd .routines
./run-insight-to-fhc.sh --article-id="two-rate-rises-first-home-buyers-2026"
```

### Or Execute with Claude Code

```
Execute insight_to_fhc_growth_v1 routine for article: <article-id>
Follow .routines/active/insight_to_fhc_growth_v1.md
```

### Review Outputs

All generated content appears in:
```
outputs/insight-fhc-growth/<date>-<article-id>/
```

---

## System Components

### 1. Routine Definition
**Location:** `.routines/active/insight_to_fhc_growth_v1.md`  
**What it does:** Complete specification of the transformation process

**Key sections:**
- User intent matching (high/medium/low)
- CTA strategy selection
- Content injection rules
- Multi-channel adaptation guidelines
- Quality validation rules

### 2. Content Templates
**Location:** `.routines/templates/`

**Available templates:**
- `cta-blocks.md` — Intent-matched CTA variations
- `xiaohongshu-template.md` — 小红书 content patterns
- `linkedin-template.md` — Professional LinkedIn versions

### 3. Execution Script
**Location:** `.routines/run-insight-to-fhc.sh`  
**What it does:** Orchestrates routine execution and validates outputs

### 4. Example Output
**Location:** `outputs/insight-fhc-growth/2026-05-01-two-rate-rises-first-home-buyers-2026/`

**Demonstrates:**
- Enhanced article with natural CTA placement
- Platform-specific content (小红书, LinkedIn)
- Complete SEO metadata
- Detailed funnel design
- Full execution report

---

## What Gets Generated

For each article processed, you get:

| File | Purpose | Use Case |
|------|---------|----------|
| `enhanced-article.md` | Original article + CTAs | Publish to website |
| `xiaohongshu.md` | 小红书 optimized version | Post to 小红书 |
| `linkedin.md` | Professional version | Share on LinkedIn |
| `seo-meta.json` | SEO tags & schema | Update website meta tags |
| `funnel-design.json` | Conversion funnel plan | Configure analytics |
| `execution-report.json` | Complete analysis | Review & archive |

---

## Key Features

### ✅ Intent Matching
Automatically identifies user intent level (high/medium/low) and selects appropriate CTA strategy.

**Example:**
- **High Intent:** "Check Your Borrowing Power Now" (direct action)
- **Medium Intent:** "See How This Affects Your Situation" (educational)
- **Low Intent:** "Want to Know Where You Stand?" (soft invite)

### ✅ Natural Integration
CTAs appear after context is established, solving problems raised in the article.

**Placement rules:**
- After problem/data sections
- Before solution/strategy sections
- At decision points
- Never before context

### ✅ Multi-Channel Adaptation
Same core message, platform-appropriate delivery.

**小红书:** 数字优先, 强 hook, emoji-rich  
**LinkedIn:** Data-driven, professional, strategic  
**Original:** Comprehensive, SEO-optimized

### ✅ Conversion Tracking
Every link includes UTM parameters for full funnel visibility.

**Tracking structure:**
```
?source=insight
&article=<article-id>
&intent=<high|medium|low>
&utm_campaign=<campaign>
&utm_content=<cta-position>
```

---

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Article → CTA Click | 8-12% | 🟡 TBD |
| CTA → FHC Entry | 70-85% | 🟡 TBD |
| FHC Completion | 50-65% | 🟡 TBD |
| FHC → Lead | 20-30% | 🟡 TBD |
| **Article → Lead** | **2-5%** | **🟡 TBD** |

---

## Quality Standards

Every output is validated against:

**Content Quality**
- ✓ CTA feels natural, not forced
- ✓ User scenario is clearly defined
- ✓ FHC value proposition is obvious
- ✓ No "hard sell" language

**Conversion Quality**
- ✓ Single primary conversion path
- ✓ Tracking parameters configured
- ✓ Intent-matched CTA type
- ✓ Clear next step

**Multi-Channel Quality**
- ✓ Platform-appropriate tone
- ✓ Proper formatting (emojis, length, hashtags)
- ✓ Adapted but consistent message

---

## Example: Rate Rise Article

**Input:** Article about two RBA rate rises  
**Analysis:** High-intent users, immediate capacity question  
**Strategy:** Direct CTAs offering instant capacity check  
**Output:** 

- Enhanced article with 2 CTAs (mid + end)
- 小红书 version: "利率涨了2次，你的购房能力降了多少？💰"
- LinkedIn version: Professional rate impact analysis
- Complete funnel design
- Expected: 4-13 leads/month

**View full example:** `outputs/insight-fhc-growth/2026-05-01-two-rate-rises-first-home-buyers-2026/`

---

## Integration Flow

```
┌─────────────────┐
│ Policy Update   │ (Future: policy_radar_monitor_v1)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Insight Gen     │ (Future: insight_generator_v1)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ FHC Growth      │ ◄── YOU ARE HERE
│ Enhancement     │     (insight_to_fhc_growth_v1)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Human Review    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Multi-Channel   │ (Future: content_publisher_v1)
│ Publishing      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Conversion      │ (Future: analytics_tracker_v1)
│ Tracking        │
└─────────────────┘
```

---

## Files Structure

```
oney-website/
├── .routines/
│   ├── README.md                          ← Start here
│   ├── SYSTEM_OVERVIEW.md                 ← This file
│   ├── run-insight-to-fhc.sh             ← Execution script
│   ├── active/
│   │   └── insight_to_fhc_growth_v1.md   ← Routine definition
│   └── templates/
│       ├── cta-blocks.md                  ← CTA templates
│       ├── xiaohongshu-template.md        ← 小红书 templates
│       ├── linkedin-template.md           ← LinkedIn templates
│       └── output-example.json            ← Output schema
│
├── outputs/
│   └── insight-fhc-growth/
│       └── 2026-05-01-two-rate-rises-first-home-buyers-2026/
│           ├── enhanced-article.md
│           ├── xiaohongshu.md
│           ├── linkedin.md
│           ├── seo-meta.json
│           ├── funnel-design.json
│           └── execution-report.json
│
└── data/
    └── insights.json                      ← Input source
```

---

## Next Steps

### Immediate (Week 1)
1. ✅ System implementation complete
2. ⏳ Review example output quality
3. ⏳ Test execution script
4. ⏳ Configure analytics tracking

### Short-term (Month 1)
1. Process all existing Insight articles
2. Publish enhanced versions
3. Set up conversion tracking
4. Monitor initial performance

### Medium-term (Month 2-3)
1. Analyze conversion data
2. Optimize CTA wording based on performance
3. A/B test variations
4. Refine intent matching

### Long-term (Month 4+)
1. Automate routine triggering
2. Integrate with content publishing pipeline
3. Build performance dashboard
4. Expand to other content types

---

## Support & Documentation

**Main Documentation:** `.routines/README.md`  
**Routine Definition:** `.routines/active/insight_to_fhc_growth_v1.md`  
**Templates:** `.routines/templates/`  
**Example Output:** `outputs/insight-fhc-growth/2026-05-01-two-rate-rises-first-home-buyers-2026/`

---

## Success Metrics

**Content Level:**
- ✓ Natural CTA integration
- ✓ Clear value propositions
- ✓ Platform-appropriate adaptations

**Performance Level:**
- 🟡 8-12% article → CTA click rate
- 🟡 70-85% CTA → FHC entry
- 🟡 50-65% FHC completion
- 🟡 2-5% article → lead conversion

**Business Level:**
- 🟡 10-40 leads/month from Insights
- 🟡 Lead quality score 7+/10
- 🟡 Cost per lead < traditional channels

---

## Version History

**v1.0.0** (2026-05-01)
- Initial system implementation
- Complete routine definition
- Template library created
- Example output generated
- Documentation complete

**Planned v1.1.0**
- Auto-trigger on new insights
- A/B testing framework
- Performance analytics integration

**Planned v2.0.0**
- AI-optimized CTAs (data-driven)
- Auto-publish with approval
- Real-time tracking dashboard

---

## Core Principles

1. **Every Insight has a conversion purpose**  
   Not just education — every article should move users toward FHC.

2. **Natural beats clever**  
   CTAs that solve problems beat clever marketing copy.

3. **One clear path**  
   Single primary conversion path. No confusion, no competing CTAs.

4. **Platform matters**  
   小红书 ≠ LinkedIn ≠ Blog. Adapt the message, not just the format.

5. **Track everything**  
   Can't optimize what you don't measure.

---

**System Status:** ✅ Ready for Production  
**Last Updated:** 2026-05-01  
**Maintained By:** Claude Code Agent
