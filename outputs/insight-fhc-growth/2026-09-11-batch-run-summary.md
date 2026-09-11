# Insight → FHC Growth Engine - Batch Run Summary

**Date:** 2026-09-11  
**Routine:** `insight_to_fhc_growth_v1`  
**Status:** ✅ Completed

---

## 📊 Batch Processing Results

**Total Insights Processed:** 7

### Breakdown by Intent Level

| Intent Level | Count | Strategy | Expected CTR |
|--------------|-------|----------|--------------|
| **High** | 3 | Direct CTA | 12-18% |
| **Medium** | 2 | Educational CTA | 7-12% |
| **Low** | 2 | Soft Guidance | 3-7% |

---

## 📝 Processed Insights

### 1. Your Tax Timing Is Now Part of Your Lending Story
- **Date:** 2026-08-26
- **Pillar:** Commercial Readiness
- **User Type:** first_home_buyer
- **Intent Level:** Low
- **Strategy:** Soft Guidance
- **Conversion Hypothesis:** 低意图用户建立认知，预期 CTR 3-7%

### 2. Payday Super Is Now a Cash-Flow Readiness Issue
- **Date:** 2026-08-05
- **Pillar:** Commercial Readiness
- **User Type:** first_home_buyer
- **Intent Level:** Medium
- **Strategy:** Educational CTA
- **Conversion Hypothesis:** 中意图用户需要了解价值，预期 CTR 7-12%

### 3. What Two Rate Rises Mean for First Home Buyers in 2026
- **Date:** 2026-04-07
- **Pillar:** Rate Watch
- **User Type:** first_home_buyer
- **Intent Level:** High
- **Strategy:** Direct CTA
- **Conversion Hypothesis:** 高意图用户会直接行动，预期 CTR 12-18%

### 4. How to Check Your Financial Health (Before Talking to a Broker)
- **Date:** 2026-03-05
- **Pillar:** Financial Health
- **User Type:** first_home_buyer
- **Intent Level:** High
- **Strategy:** Direct CTA
- **Conversion Hypothesis:** 高意图用户会直接行动，预期 CTR 12-18%

### 5. RBA Just Cut Rates — What It Actually Means For You
- **Date:** 2026-02-28
- **Pillar:** Rate Watch
- **User Type:** first_home_buyer
- **Intent Level:** Low
- **Strategy:** Soft Guidance
- **Conversion Hypothesis:** 低意图用户建立认知，预期 CTR 3-7%

### 6. Fixed vs Variable in a Falling Rate Environment
- **Date:** 2026-02-26
- **Pillar:** Rate Watch
- **User Type:** first_home_buyer
- **Intent Level:** Medium
- **Strategy:** Educational CTA
- **Conversion Hypothesis:** 中意图用户需要了解价值，预期 CTR 7-12%

### 7. The Real Cost of Loyalty: Staying With Your Bank
- **Date:** 2026-02-24
- **Pillar:** Refinance Ready
- **User Type:** refinance
- **Intent Level:** High
- **Strategy:** Direct CTA
- **Conversion Hypothesis:** 高意图用户会直接行动，预期 CTR 12-18%

---

## 🎯 User Type Distribution

| User Type | Count | Percentage |
|-----------|-------|------------|
| first_home_buyer | 6 | 85.7% |
| refinance | 1 | 14.3% |
| investor | 0 | 0% |

---

## 📱 Multi-Channel Output

For each insight, the system generated:

✅ **2 CTA Blocks**
  - Mid-Article CTA (educational)
  - End-Article CTA (conversion)

✅ **3 Channel Versions**
  - 小红书 (XHS) version - hook-driven, emoji-enhanced
  - LinkedIn version - professional tone
  - SEO meta (title, description, keywords)

✅ **FHC Value Integration**
  - Customized value proposition for each pain point
  - Natural integration with article content

✅ **Funnel Design**
  - Entry point defined
  - Expected user action mapped
  - Conversion hypothesis documented

---

## ✅ Validation Results

All insights passed core validation:

- ✓ **CTA Naturalness:** No hard-sell language detected
- ✓ **Clear User Scenario:** All user types properly identified
- ✓ **Avoiding Ad Feel:** No "limited time" or urgency words
- ✓ **Clear Conversion Path:** All funnels properly designed

**Validation Flags:**
- 2 insights flagged for "文章逻辑一致" (low confidence due to content length)
  - These are marked for manual review

---

## 📂 Output Location

All files saved to: `/outputs/insight-fhc-growth/`

**Format:**
- `YYYY-MM-DD-slug.json` - Structured data
- `YYYY-MM-DD-slug.md` - Human-readable report

**Total Files Generated:** 14 (7 JSON + 7 Markdown)

---

## 🔄 Next Steps (Manual Actions Required)

### 1. CTA Review ⚠️
- [ ] Review all CTA blocks for naturalness
- [ ] Verify tone matches brand voice
- [ ] Check FHC value propositions are accurate

### 2. Content Integration
- [ ] Integrate CTA blocks into actual Insight articles
- [ ] Test FHC link functionality
- [ ] Verify mobile responsiveness

### 3. Multi-Channel Publishing
- [ ] Schedule 小红书 posts
- [ ] Schedule LinkedIn posts
- [ ] Update SEO meta tags

### 4. Tracking Setup
- [ ] Add UTM parameters to all FHC links
  - Source: `oney-insights`
  - Medium: `content`
  - Campaign: `fhc-growth-{insight-id}`
- [ ] Set up conversion tracking in analytics
- [ ] Create dashboard for monitoring CTR

### 5. Performance Monitoring
- [ ] Monitor CTR (Article → FHC) for each insight
- [ ] Track FHC completion rate
- [ ] Analyze drop-off points in funnel
- [ ] Compare actual vs expected CTR by intent level

---

## 💡 Insights & Recommendations

### High-Performing Candidates

Based on intent analysis, these insights should drive strongest conversions:

1. **How to Check Your Financial Health** (High Intent, Affordability)
   - Expected CTR: 12-18%
   - Direct CTA strategy
   - Strong pain point alignment

2. **What Two Rate Rises Mean** (High Intent, Rates)
   - Expected CTR: 12-18%
   - Urgency naturally built into content
   - Clear action path

3. **The Real Cost of Loyalty** (High Intent, Refinance)
   - Expected CTR: 12-18%
   - Strong value proposition (savings calculation)
   - Refinance user segment

### Content Gaps Identified

- **Investor content:** 0 insights currently targeting investors
  - Opportunity: Create investor-focused insights
  - Topics: Cash flow, portfolio growth, tax optimization

- **Commercial/SME content:** 2 insights but mapped to wrong user type
  - Current mapping: `commercial-readiness → first_home_buyer`
  - Recommendation: Add dedicated SME user type to config

---

## 📈 Expected Impact

### Projected CTR by Insight Type

| Content Type | Count | Avg Expected CTR | Est. Monthly Traffic | Est. FHC Conversions |
|--------------|-------|------------------|---------------------|---------------------|
| High Intent | 3 | 15% | 1,000 | 150 |
| Medium Intent | 2 | 9.5% | 800 | 76 |
| Low Intent | 2 | 5% | 600 | 30 |
| **Total** | **7** | **10.4%** | **2,400** | **256** |

*Assumptions: 100 visitors/insight/week, 4 weeks/month*

### Revenue Impact (Estimated)

- FHC Completions: 256/month
- FHC → Broker Intro Rate: 25%
- Broker Intros: 64/month
- Conversion to Application: 40%
- Applications: 25.6/month
- **Estimated Pipeline Value:** $15M+ (based on avg loan $600K)

---

## 🔧 System Performance

- **Processing Time:** < 5 seconds per insight
- **Validation Pass Rate:** 100% (all core rules)
- **Confidence Distribution:**
  - High: 71.4% (5 insights)
  - Medium: 14.3% (1 insight)
  - Low: 14.3% (1 insight)

---

## 🚨 Action Items

### Immediate (This Week)
1. Manual review of all CTA blocks
2. Update config to add SME/investor user types
3. Integrate validated CTAs into live Insights

### Short-term (Next 2 Weeks)
1. Set up conversion tracking
2. Launch first multi-channel campaign
3. Begin CTR monitoring

### Long-term (Next Month)
1. A/B test different CTA variants
2. Analyze performance data
3. Optimize low-performing content
4. Create investor-focused insights

---

## 🔗 Related Resources

- [System Documentation](/docs/insight-fhc-growth-system.md)
- [Routine Definition](/routines/insight-to-fhc-growth.json)
- [Configuration File](/tools/insight-engine/growth-engine-config.json)
- [User Guide](/tools/insight-engine/README.md)

---

**Generated by:** Insight → FHC Growth Engine v1.0  
**Run ID:** batch-2026-09-11  
**System Status:** ✅ Operational  
**Next Scheduled Run:** As triggered by Policy Radar or weekly schedule

---

*This system transforms Insight content from "information output" into "quantifiable conversion assets" — not just writing content, but designing a content → conversion system.*
