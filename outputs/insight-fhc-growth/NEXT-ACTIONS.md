# Next Actions — FHC Growth Assets Review

**Date:** 2026-08-28
**Status:** ⚠️ Awaiting Manual Review

---

## 🚨 Priority Actions (Before Publication)

### 1. CTA Review (REQUIRED)

Review the CTAs in both generated assets for naturalness:

**Files to Review:**
- `2026-08-28-your-tax-timing-is-now-part-of-your-lending-story.md`
- `2026-08-28-payday-super-is-now-a-cash-flow-readiness-issue.md`

**Check:**
- [ ] Mid-article CTA feels natural, not forced
- [ ] End-article CTA is compelling but not pushy
- [ ] "Built for SME borrowers" positioning is accurate
- [ ] Chinese FHC value propositions are correct

---

### 2. FHC Product Verification

Confirm FHC can handle SME borrower scenarios:

**Questions:**
- [ ] Does FHC collect BAS/PAYG timing data?
- [ ] Does FHC assess super compliance rhythm?
- [ ] Does FHC calculate commercial lending readiness?
- [ ] Is there a separate SME flow or is it integrated?

**If No:** Consider soft-launching content to gauge interest before full FHC SME module.

---

### 3. Content Optimization

**LinkedIn Hashtags:**
Current: `#AustralianProperty #MortgageTips #FinancialPlanning`

Suggested for SME:
- [ ] Replace with: `#SMEFinance #BusinessLending #CommercialLoans #AustralianBusiness`

**小红书 Hook:**
Current: `💼 澳洲 SME 老板必看！`

Consider A/B testing:
- [ ] Variant A: `💼 澳洲 SME 老板必看！` (current)
- [ ] Variant B: `💰 生意贷款必读！`
- [ ] Variant C: `🏢 中小企业融资指南`

---

## 📅 Publishing Workflow

### Step 1: Approve CTAs
- [ ] Review both `.md` files
- [ ] Mark approved CTAs in spreadsheet/tracker
- [ ] Note any required edits

### Step 2: Set Publishing Schedule
- [ ] Website publication date: `__________`
- [ ] 小红书 post date: `__________`
- [ ] LinkedIn post date: `__________`

### Step 3: Configure Tracking
- [ ] Add UTM parameters to all links:
  - `utm_source=insights`
  - `utm_medium=organic`
  - `utm_campaign=sme_tax_timing` / `sme_payday_super`
- [ ] Set up FHC event tracking for SME entries
- [ ] Create dashboard for CTR monitoring

### Step 4: Publish
- [ ] Upload to website CMS
- [ ] Post to 小红书 (copy from `.md` XHS section)
- [ ] Post to LinkedIn (copy from `.md` LinkedIn section)
- [ ] Cross-link between channels

---

## 📊 Post-Publication Monitoring

### Week 1
- [ ] Track CTR daily (Article → FHC)
- [ ] Monitor FHC completion rate for SME segment
- [ ] Check drop-off points in funnel

### Week 2
- [ ] Compare CTR vs. hypothesis (12-18%)
- [ ] Identify top-performing channel (XHS vs LinkedIn vs Web)
- [ ] A/B test CTA variants if needed

### Month 1
- [ ] Full funnel analysis
- [ ] Optimize underperforming CTAs
- [ ] Document learnings for next routine run

---

## 🔧 System Improvements for Next Run

### User Type Mapping
- [ ] Formalize SME borrower type in `fhc-growth-processor.js`
- [ ] Add to default user types (not just extension)
- [ ] Create user type selection guide

### Hashtag Mapping
- [ ] Create `hashtag-config.json` with:
  ```json
  {
    "first_home_buyer": {
      "xhs": ["#澳洲买房", "#房贷", "#理财"],
      "linkedin": ["#FirstHomeBuyer", "#PropertyLadder"]
    },
    "sme_borrower": {
      "xhs": ["#澳洲生意", "#商业贷款", "#SME"],
      "linkedin": ["#SMEFinance", "#BusinessLending"]
    }
  }
  ```

### FHC Value Props Library
- [ ] Consolidate all FHC value propositions
- [ ] Version control for A/B testing
- [ ] Track which props convert best per segment

---

## 📁 Files Generated This Run

```
outputs/insight-fhc-growth/
├── 2026-08-28-your-tax-timing-is-now-part-of-your-lending-story.json
├── 2026-08-28-your-tax-timing-is-now-part-of-your-lending-story.md
├── 2026-08-28-payday-super-is-now-a-cash-flow-readiness-issue.json
├── 2026-08-28-payday-super-is-now-a-cash-flow-readiness-issue.md
├── ROUTINE-EXECUTION-2026-08-28.md
└── NEXT-ACTIONS.md (this file)
```

---

## 🆘 Questions or Issues?

**Review full execution report:**
`outputs/insight-fhc-growth/ROUTINE-EXECUTION-2026-08-28.md`

**Check system docs:**
`docs/insight-fhc-growth-system.md`

**Routine config:**
`routines/insight-to-fhc-growth.json`

---

**Status:** ✅ Generation Complete | ⚠️ Review Pending | ❌ Not Published

*Next routine run: [Per schedule — weekly 2x, or on policy trigger]*
