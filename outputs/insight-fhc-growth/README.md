# Insight → FHC Growth Engine

**Status**: Active  
**Routine ID**: `insight_to_fhc_growth_v1`  
**Schedule**: Twice weekly (Tuesday & Friday, 9:57 AM)  
**Auto-expires**: 7 days from creation

---

## 🎯 Purpose

Transform Insight content from "information output" into **quantifiable traffic assets** that systematically drive users into FHC (Financial Health Check).

### Core Principle

> Every Insight must have a clear reason to bring users into FHC.

---

## ⚙️ How It Works

### Trigger Conditions
1. **Scheduled**: Twice weekly (synced with Insight Generator)
2. **Event-driven**:
   - New policy updates (Policy Radar)
   - FHC product launches
   - Market shifts (rates, lending environment)

### Input Sources
- `/outputs/insights/` — Generated Insight articles
- `/outputs/policy-radar/` — Policy-triggered content
- FHC product positioning docs
- Historical performance data

---

## 🔄 Processing Pipeline

### Step 1: Audience Mapping
- Identify target user type:
  - First home buyer
  - Investor
  - Refinancer
- Map pain points
- Score intent level (low/medium/high)

### Step 2: Conversion Strategy Design
```
High Intent   → Direct CTA to FHC
Medium Intent → Educational CTA
Low Intent    → Soft guidance
```

### Step 3: Content Enhancement
- **Mid-article CTA**: Educational, value-focused
- **End-article CTA**: Conversion-focused
- **FHC Integration**: Natural explanation of why FHC solves their problem
- **Tone**: Organic, not promotional

### Step 4: Multi-Channel Repurpose
1. **小红书 Version**
   - Strong hook
   - Result-oriented
   - Simplified CTA
   
2. **LinkedIn Version**
   - Professional tone
   - Trend analysis
   - Soft CTA
   
3. **SEO Metadata**
   - Optimized title
   - Meta description
   - Target keywords

### Step 5: Funnel Design
```
Article → CTA → FHC Landing → Expected Action
```

---

## 📤 Output Format

Each processed Insight generates:

```
YYYY-MM-DD-{topic}.md
├── Metadata (JSON)
│   ├── Target user
│   ├── Intent level
│   ├── CTA strategy
│   └── Conversion hypothesis
├── Enhanced Article
│   ├── Original content
│   ├── Mid-article CTA
│   └── End-article CTA
├── Repurposed Versions
│   ├── 小红书
│   ├── LinkedIn
│   └── SEO meta
└── Validation Report
    ├── CTA naturalness check
    ├── User scenario clarity
    └── Human review flags
```

---

## ✅ Validation Checklist

Before output, every article is checked for:

- [ ] CTA feels natural and contextual
- [ ] User scenario is clearly defined
- [ ] CTA aligns with article logic
- [ ] No "hard sell" or spam feel
- [ ] Clear conversion path exists
- [ ] FHC value is explained, not just promoted

---

## 🎯 User Journey Design

### Three User Types

| User Type | Behavior | CTA Type |
|-----------|----------|----------|
| **Informational** | Just learning | Educational CTA |
| **Evaluating** | Comparing options | FHC explainer |
| **Decision-ready** | Ready to act | Direct FHC entry |

### Conversion Mechanism

```
Pain Point → Explanation → Anxiety → Solution → FHC Entry
```

---

## 📊 Success Metrics (Future Tracking)

- **CTR**: Article → FHC click rate
- **FHC Completion**: Users who finish FHC
- **Drop-off Rate**: Where users abandon
- **Time on Page**: Engagement indicator

---

## 🚨 Review Policy

- **Auto-generate**: Content processing is automated
- **Human review**: All CTAs must be reviewed before publishing (initial phase)
- **No auto-publish**: System generates, humans approve

---

## 🔗 Integration

### Upstream Dependencies
1. `insight_generator_v1` — Provides base content
2. `policy_radar_monitor_v1` — Triggers policy-based content

### Workflow
```
Policy Change → Insight Generation → FHC Enhancement → Multi-channel Distribution
```

---

## 📁 File Naming Convention

```
YYYY-MM-DD-{topic-slug}.md

Examples:
- 2026-07-10-first-home-buyer-grant-changes.md
- 2026-07-15-interest-rate-impact-affordability.md
```

---

## 💡 Strategic Insight

### What Makes This Powerful

Most content strategies:
- Create content ✓
- Hope people read it ✓
- Pray they convert 🤞

This system:
- Creates content ✓
- **Maps user intent** ✓
- **Designs conversion paths** ✓
- **Measures effectiveness** ✓

### The Shift

```
Old: Insight = Reading
New: Insight = Conversion Entry Point
```

---

## 🛠️ Maintenance

### If Routine Needs Updates
1. Stop current job: `CronDelete f352d8ca`
2. Modify prompt
3. Recreate with `CronCreate`

### If Output Quality Degrades
1. Review validation checklist
2. Adjust CTA injection logic
3. Refine user mapping criteria

---

## 📝 Notes

- Routine is **session-only** (lives in Claude Code session)
- Auto-expires after 7 days
- Recreate if needed for ongoing use
- Consider converting to durable cron if proven effective

---

**Last Updated**: 2026-07-10  
**Status**: Active (Testing Phase)
