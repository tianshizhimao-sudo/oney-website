# Oney & Co — Routine System

This directory contains the automated routine system for transforming Insight content into FHC conversion assets.

## Overview

The Routine System enables systematic, repeatable content workflows that:
- Transform educational content into conversion assets
- Maintain consistent quality and structure
- Track conversion paths and performance
- Generate multi-channel content variations

## Directory Structure

```
.routines/
├── README.md                          # This file
├── active/                            # Active routine definitions
│   └── insight_to_fhc_growth_v1.md   # Insight → FHC Growth Engine
├── templates/                         # Content templates
│   ├── cta-blocks.md                 # CTA templates for different intents
│   ├── xiaohongshu-template.md       # 小红书 content templates
│   ├── linkedin-template.md          # LinkedIn content templates
│   └── output-example.json           # Example output structure
└── run-insight-to-fhc.sh             # Execution script

outputs/
└── insight-fhc-growth/               # Generated content outputs
    └── YYYY-MM-DD-{article-id}/      # Per-article outputs
        ├── enhanced-article.md
        ├── xiaohongshu.md
        ├── linkedin.md
        ├── seo-meta.json
        ├── funnel-design.json
        └── execution-report.json
```

---

## Active Routines

### 1. Insight → FHC Growth Engine (`insight_to_fhc_growth_v1`)

**Purpose:** Transform Insight articles into multi-channel content with embedded FHC conversion paths.

**Inputs:**
- Article content from `data/insights.json`
- Article ID
- User context (target audience, intent level)

**Outputs:**
- Enhanced article with CTA injections
- 小红书 version
- LinkedIn version
- SEO metadata
- Conversion funnel design
- Execution report

**Triggers:**
- Manual: `./run-insight-to-fhc.sh --article-id=<id>`
- Automatic: Weekly (2x), or on policy/product updates

**Status:** ✅ Active  
**Version:** 1.0.0  
**Documentation:** [insight_to_fhc_growth_v1.md](./active/insight_to_fhc_growth_v1.md)

---

## Quick Start

### 1. Run the Routine Manually

```bash
cd .routines
./run-insight-to-fhc.sh --article-id="two-rate-rises-first-home-buyers-2026"
```

### 2. Execute with Claude Code

The script will provide a prompt to use with Claude Code:

```
Execute the insight_to_fhc_growth_v1 routine for article: <article-id>

Steps:
1. Read article content from data/insights.json
2. Follow .routines/active/insight_to_fhc_growth_v1.md
3. Generate all outputs per the schema
4. Save to: outputs/insight-fhc-growth/<date>-<article-id>/
```

### 3. Review Outputs

Check the generated files in `outputs/insight-fhc-growth/<date>-<article-id>/`:
- ✅ Enhanced article with natural CTA placement
- ✅ Multi-channel variations (小红书, LinkedIn)
- ✅ SEO metadata
- ✅ Conversion funnel design
- ✅ Full execution report

### 4. Publish

After human review:
1. Copy enhanced article to website
2. Post 小红书 version to platform
3. Share LinkedIn version
4. Update SEO tags
5. Monitor conversion metrics

---

## Workflow Integration

### Full Content Flow

```
Policy Update (Policy Radar)
    ↓
Insight Generation (insight_generator_v1)
    ↓
FHC Growth Enhancement (insight_to_fhc_growth_v1) ← YOU ARE HERE
    ↓
Human Review
    ↓
Multi-Channel Publishing
    ↓
Conversion Tracking
```

### Dependencies

**Upstream (Future):**
- `policy_radar_monitor_v1` → Triggers on policy changes
- `insight_generator_v1` → Generates initial Insight articles

**Downstream (Future):**
- `content_publisher_v1` → Publishes to platforms
- `analytics_tracker_v1` → Tracks conversions

**Current State:**
- ✅ `insight_to_fhc_growth_v1` → Fully implemented
- ⏳ Other routines → Planned

---

## Using the Templates

### CTA Blocks

Location: [templates/cta-blocks.md](./templates/cta-blocks.md)

**Usage:**
1. Identify user intent level (high/medium/low)
2. Select appropriate CTA template
3. Replace `{{FHC_LINK}}` with tracking URL
4. Inject at specified positions

**Example:**
```markdown
{{FHC_LINK}} → https://oney.co/fhc?source=insight&article=rate-rises-2026&intent=high
```

### 小红书 Template

Location: [templates/xiaohongshu-template.md](./templates/xiaohongshu-template.md)

**Usage:**
1. Choose template based on article topic
2. Fill in data points and content
3. Apply emoji strategy (10 max)
4. Select 5-8 relevant hashtags
5. Keep to 800-1200 characters

**Key Principles:**
- 数字优先 (Numbers first)
- 简短有力 (Short and powerful)
- 强调免费 (Emphasize free)

### LinkedIn Template

Location: [templates/linkedin-template.md](./templates/linkedin-template.md)

**Usage:**
1. Lead with data or insight
2. Structure with clear headers
3. Maintain professional tone
4. Position FHC as "resource" not "ad"
5. Keep to 1200-1500 characters

**Key Principles:**
- Data-driven
- Professional framing
- Strategic focus

---

## Output Schema

Every routine execution generates a complete JSON report. See [templates/output-example.json](./templates/output-example.json) for structure.

**Key Sections:**
- `meta` → Execution metadata
- `analysis` → User intent and pain point analysis
- `conversion_strategy` → CTA strategy and placement
- `enhanced_content` → Article with injected CTAs
- `fhc_integration` → FHC value proposition and triggers
- `multi_channel` → 小红书, LinkedIn, SEO versions
- `funnel_design` → Full conversion path
- `quality_checks` → Validation results
- `confidence_score` → 1-10 confidence rating

---

## Quality Standards

### Content Quality
- ✅ CTA flows naturally from content
- ✅ User scenario is clearly defined
- ✅ FHC value proposition is clear
- ✅ No "hard sell" language
- ✅ Conversion path is obvious

### Multi-Channel Quality
- ✅ 小红书: Platform-appropriate tone, emoji usage, hashtags
- ✅ LinkedIn: Professional language, data-driven, strategic framing
- ✅ SEO: Keyword-optimized, clear meta descriptions

### Conversion Quality
- ✅ Single primary CTA per section
- ✅ Tracking parameters included
- ✅ Intent-matched CTA type
- ✅ Clear next step

---

## Review Checklist

Before publishing any generated content:

### Content Review
- [ ] CTA placement feels natural (not forced)
- [ ] FHC value is clearly explained
- [ ] User scenario matches article topic
- [ ] No overly promotional language
- [ ] Statistics and numbers are accurate

### Technical Review
- [ ] All tracking URLs are correct
- [ ] UTM parameters are set properly
- [ ] Links point to correct FHC page
- [ ] SEO metadata is complete
- [ ] JSON schema is valid

### Multi-Channel Review
- [ ] 小红书 version matches platform style
- [ ] LinkedIn version is professional
- [ ] Hashtags are relevant
- [ ] Character counts are within limits
- [ ] Emojis are appropriate (not overused)

---

## Conversion Metrics (Future)

### Article-Level Metrics
- `article_views` → Total page views
- `cta_clicks` → CTA click rate
- `cta_to_fhc_entry` → Entry rate to FHC

### FHC-Level Metrics
- `fhc_starts` → Users who entered FHC
- `fhc_completions` → Completion rate
- `fhc_to_lead` → Lead conversion rate

### Funnel Metrics
- `article_to_lead` → End-to-end conversion
- `time_to_conversion` → Days from read to action
- `multi_touch` → Multiple article reads before conversion

---

## Performance Targets

Based on routine definition:

| Metric | Target | Status |
|--------|--------|--------|
| Article → CTA Click | 5-10% | 🟡 To measure |
| CTA → FHC Entry | 60-80% | 🟡 To measure |
| FHC Completion | 40-60% | 🟡 To measure |
| FHC → Action | 15-25% | 🟡 To measure |
| Article → Lead | 2-5% | 🟡 To measure |

---

## Iteration Roadmap

### v1.0.0 (Current)
- ✅ Manual execution
- ✅ Template-based content generation
- ✅ Multi-channel output
- ✅ Quality validation
- ⚠️ Requires human review

### v1.1.0 (Planned)
- [ ] Auto-trigger on new insights
- [ ] A/B test CTA variations
- [ ] Automated SEO optimization
- [ ] Performance analytics integration

### v2.0.0 (Future)
- [ ] AI-optimized CTAs (based on data)
- [ ] Auto-publish (with approval)
- [ ] Real-time conversion tracking
- [ ] Predictive performance modeling

---

## Troubleshooting

### Script Issues

**Problem:** Script fails to find insights.json  
**Solution:** Ensure you're running from project root or `.routines/` directory

**Problem:** Output directory already exists  
**Solution:** Script will prompt to overwrite, or manually delete old outputs

### Content Quality Issues

**Problem:** CTA feels forced  
**Solution:** Review CTA selection guide, choose lower-intent version

**Problem:** Multi-channel content too similar  
**Solution:** Apply platform-specific templates more strictly

### Conversion Issues

**Problem:** Low click-through rates  
**Solution:** 
1. Check CTA placement (should be after problem/data section)
2. Verify intent level matching
3. Test alternative CTA wording

---

## Best Practices

### 1. Intent Matching
Always match CTA type to user intent:
- **High Intent** (ready to act) → Direct CTA
- **Medium Intent** (evaluating) → Educational CTA
- **Low Intent** (browsing) → Soft CTA

### 2. Value-First
FHC should solve a problem mentioned in the article:
- Article about rates → FHC shows capacity impact
- Article about policy → FHC shows eligibility
- Article about refinance → FHC shows potential savings

### 3. Natural Integration
CTA should appear after:
- Problem explanation
- Data presentation
- "What this means" section

Never before context is established.

### 4. Single Path
One primary conversion path per article:
- ✅ Article → FHC
- ❌ Article → FHC + Broker + Tool + Newsletter

### 5. Platform Adaptation
Don't just copy/paste:
- 小红书 needs shorter, punchier, emoji-rich
- LinkedIn needs data-driven, professional, strategic
- Original article can be longer, more comprehensive

---

## Contributing

### Adding New Templates

1. Create template in `templates/` directory
2. Follow existing naming convention
3. Include usage guidelines
4. Add example with placeholders
5. Update this README

### Adding New Routines

1. Create definition in `active/` directory
2. Follow schema from `insight_to_fhc_growth_v1.md`
3. Include clear execution instructions
4. Define input/output schemas
5. Add to "Active Routines" section above

### Improving Existing Routines

1. Update version number
2. Document changes in routine definition
3. Update templates if needed
4. Test with existing articles
5. Update this README

---

## Support

### Questions?
- Check routine definition: `.routines/active/insight_to_fhc_growth_v1.md`
- Review templates: `.routines/templates/`
- See example output: `.routines/templates/output-example.json`

### Issues?
- Verify input data exists (`data/insights.json`)
- Check execution script permissions
- Review quality checklist
- Ensure templates are up-to-date

### Feature Requests?
- Document desired workflow
- Identify inputs/outputs
- Describe integration points
- Estimate complexity

---

## Core Philosophy

### Every Insight Must Answer:
1. **Why FHC?** What problem does it solve for THIS reader?
2. **Why Now?** What urgency or relevance exists?
3. **What Next?** What specific action should they take?

### Remember:
> **Insight ≠ Reading**  
> **Insight = Conversion Entry Point**

Every article is a door to FHC. Make sure the door is:
- **Visible** (CTA is clear)
- **Inviting** (Value is obvious)
- **Easy to Open** (One click, no friction)

---

**System Version:** 1.0.0  
**Last Updated:** 2026-05-01  
**Maintained By:** Claude Code Agent  
**Status:** ✅ Production Ready
