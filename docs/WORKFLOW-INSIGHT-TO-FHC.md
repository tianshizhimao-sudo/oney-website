# 🔄 Complete Workflow: Insight → FHC Conversion System

**实战指南：如何把这个系统用起来**

---

## 📋 Overview

这个文档告诉你：**具体怎么用这个系统把流量导入 FHC**

**目标：**
- 每周稳定产出 2 篇 conversion-ready 的 Insight
- CTR from article to FHC: 7-18%
- FHC completion rate: > 60%

---

## 🎯 Weekly Routine (建议流程)

### Monday & Thursday (每周两次)

```bash
# Step 1: Generate enhanced content
cd tools/insight-engine
node run-growth-engine.js --batch

# Step 2: Review outputs
ls -la ../../outputs/insight-fhc-growth/

# Step 3: Pick the best one for this week
# (based on current market events)
```

**Time:** ~30 minutes

---

## 📊 Step-by-Step Workflow

### 1️⃣ Content Generation (5 min)

```bash
# Run the engine on latest insights
cd tools/insight-engine
node run-growth-engine.js --batch
```

**What happens:**
- System analyzes all insights in `data/insights.json`
- Generates conversion-optimized versions
- Outputs to `outputs/insight-fhc-growth/`

**You get:**
- JSON file (structured data)
- MD file (human-readable report)

---

### 2️⃣ Manual Review (10 min)

Open the generated `.md` file:

```bash
# Example
cat outputs/insight-fhc-growth/2026-06-05-how-to-check-your-financial-health.md
```

**Check these 5 things:**

#### ✅ Checklist

- [ ] **CTA 自然吗？**
  - Does it feel like a natural part of the article?
  - Or does it feel like an ad interruption?

- [ ] **用户场景对吗？**
  - Is the target_user correct?
  - Does it match the article content?

- [ ] **转化路径清晰吗？**
  - Can you clearly see: Article → CTA → FHC?
  - Is the next action obvious?

- [ ] **措辞对吗？**
  - No urgency words ("limited time", "act now")
  - Helpful tone, not pushy

- [ ] **Multi-channel 版本合适吗？**
  - 小红书 version: 符合小红书风格吗？
  - LinkedIn version: 够专业吗？

---

### 3️⃣ Website Integration (15 min)

#### Option A: Manual Copy-Paste (Recommended for now)

1. Open the `.md` file
2. Copy the two CTA blocks:
   - Mid-article CTA
   - End-article CTA

3. Edit your article HTML file
4. Paste CTAs at appropriate positions

**Example:**

```html
<!-- Mid-Article CTA (after ~50% of content) -->
<div class="article-cta">
  <h3>Check Your Position</h3>
  <p>Not sure where you stand? Our Financial Health Check takes 3 minutes...</p>
  <a href="https://fhc.oneyco.com.au?utm_source=insights&utm_medium=article&utm_campaign=fhc-growth">
    Start Free Health Check →
  </a>
</div>

<!-- End-Article CTA (at the end) -->
<div class="article-cta">
  <h3>Ready to Take Action?</h3>
  <p><strong>Ready to see your numbers?</strong> Get your free Financial Health Check...</p>
  <a href="https://fhc.oneyco.com.au?utm_source=insights&utm_medium=article&utm_campaign=fhc-growth">
    Start Free Health Check →
  </a>
</div>
```

#### Option B: Automated Integration (Future)

```bash
# This will automatically inject CTAs into article.html
node integrate-to-website.js --insight-id how-to-check-your-financial-health
```

**Status:** Script exists but needs testing with your actual article structure

---

### 4️⃣ Multi-Channel Publishing (20 min)

#### 小红书 (Xiaohongshu)

Copy the `xhs_version` from the JSON output:

```json
{
  "xhs_version": "🏠 首次购房必看！\n\nWhat Two Rate Rises Mean...\n\n#澳洲买房 #房贷 #理财"
}
```

**Post as:**
- Image: Create simple infographic (Canva)
- Caption: Use the xhs_version text
- Hashtags: Already included in output
- CTA: Link to FHC in bio or comments

#### LinkedIn

Copy the `linkedin_version`:

```json
{
  "linkedin_version": "What Two Rate Rises Mean for First Home Buyers in 2026\n\nThe RBA has raised rates..."
}
```

**Post as:**
- Text post or link to full article
- Professional tone maintained
- Hashtags included
- Soft CTA to FHC

#### SEO Meta Tags

Update your article HTML `<head>`:

```html
<head>
  <title>What Two Rate Rises Mean for First Home Buyers in 2026 | Oney</title>
  <meta name="description" content="The RBA has raised rates twice in 2026 — cash rate now at 4.10%...">
  <meta name="keywords" content="first home buyer, home loan, borrowing capacity, FHC, financial health">
</head>
```

---

### 5️⃣ Conversion Tracking Setup (10 min)

#### UTM Parameters (Already included in system)

```
https://fhc.oneyco.com.au?utm_source=insights&utm_medium=article&utm_campaign=fhc-growth
```

**Breakdown:**
- `utm_source=insights` - Traffic from Insights
- `utm_medium=article` - Came from article content
- `utm_campaign=fhc-growth` - This specific growth engine

#### Track These Metrics

**Primary:**
- [ ] Article page views
- [ ] CTA clicks (article → FHC)
- [ ] FHC starts
- [ ] FHC completions

**Calculate:**
- CTR = (CTA clicks / Article views) × 100%
- Completion Rate = (FHC completions / FHC starts) × 100%

**Target Benchmarks:**

| Intent Level | Expected CTR | Target Completion |
|-------------|-------------|-------------------|
| High | 12-18% | > 60% |
| Medium | 7-12% | > 55% |
| Low | 3-7% | > 50% |

---

## 📈 Weekly Optimization Loop

### Week 1: Baseline
- [ ] Publish 2 Insights with CTAs
- [ ] Track CTR for each intent level
- [ ] Monitor FHC completion rate
- [ ] Note any issues

### Week 2-4: Test & Learn
- [ ] A/B test different CTA positions
- [ ] Try different headlines on 小红书
- [ ] Test LinkedIn posting times
- [ ] Compare performance by user type

### Month 2+: Optimize
- [ ] Identify best-performing CTA style
- [ ] Adjust config based on data
- [ ] Create playbook for each user type
- [ ] Scale what works

---

## 🎨 Real Example Walkthrough

### Scenario: New RBA Rate Decision

**1. Policy Radar detects change**
→ New rate decision announced

**2. You create Insight article**
→ "What the June 2026 Rate Rise Means for First Home Buyers"

**3. Add to insights.json**
```json
{
  "id": "june-2026-rate-rise",
  "title": "What the June 2026 Rate Rise Means for First Home Buyers",
  "pillar": "rate-watch",
  "summary": "The RBA just raised rates by 0.25%...",
  "date": "2026-06-05"
}
```

**4. Run Growth Engine**
```bash
node run-growth-engine.js --input june-2026-rate-rise
```

**5. System Output**
```
✓ Audience mapped: high intent
✓ Strategy: direct_cta
✓ CTA blocks generated
✓ Multi-channel content created
✓ Funnel designed
```

**6. Review Generated Content**
- CTAs feel natural ✓
- User type correct (first_home_buyer) ✓
- Conversion path clear ✓

**7. Integrate to Website**
- Copy mid-article CTA → paste after section 2
- Copy end-article CTA → paste at end
- Update SEO meta tags

**8. Publish Multi-Channel**
- 小红书: Post with infographic
- LinkedIn: Share with professional framing
- Email: Include in newsletter

**9. Track Results**
- Article views: 1,200
- CTA clicks: 180
- CTR: 15% ✓ (within 12-18% target for high intent)
- FHC completions: 108
- Completion rate: 60% ✓

**10. Learn & Iterate**
- This CTA style works well for rate-related content
- Save for future rate articles
- Test similar approach on affordability content

---

## 🚀 Quick Reference

### Daily
- [ ] Check if new policy/market changes → trigger system

### Weekly (Mon & Thu)
- [ ] Run growth engine on new insights
- [ ] Review & approve CTAs
- [ ] Publish to website
- [ ] Post multi-channel versions
- [ ] Monitor initial CTR

### Monthly
- [ ] Analyze performance by intent level
- [ ] Adjust CTA templates if needed
- [ ] Update config based on learnings
- [ ] Report on growth metrics

---

## 🎯 Success Metrics Dashboard (Track This)

### Overall Health
```
Total Insights Published:  ____ / month
Avg CTR (Article → FHC):   ____% (target: 7-15%)
Avg FHC Completion:        ____% (target: > 60%)
```

### By Intent Level
```
High Intent Articles:
- Count: ____
- Avg CTR: ____% (target: 12-18%)

Medium Intent Articles:
- Count: ____
- Avg CTR: ____% (target: 7-12%)

Low Intent Articles:
- Count: ____
- Avg CTR: ____% (target: 3-7%)
```

### By Channel
```
小红书:
- Posts: ____
- Engagement: ____
- FHC clicks: ____

LinkedIn:
- Posts: ____
- Engagement: ____
- FHC clicks: ____

Website:
- Articles: ____
- Total views: ____
- Total CTR: ____%
```

---

## ⚠️ Common Pitfalls (Avoid These)

### ❌ Don't
- Auto-publish without reviewing CTAs
- Ignore the intent level signal
- Use all high-intent CTAs (too pushy)
- Forget to set up UTM tracking
- Skip the multi-channel versions
- Copy-paste same CTA for every article

### ✅ Do
- Review every CTA for naturalness
- Match CTA intensity to intent level
- Test different positions
- Track everything
- Use multi-channel strategy
- Customize CTAs per article topic

---

## 🔧 Troubleshooting

### Problem: CTR too low (< 3%)
**Diagnosis:**
- CTA too soft?
- Wrong placement?
- Unclear value prop?

**Fix:**
- Try medium-intent CTA even on low-intent article
- Move CTA earlier in article
- Make FHC value more explicit

### Problem: High CTR but low FHC completion
**Diagnosis:**
- Landing page mismatch
- FHC too long/complex
- Trust issue

**Fix:**
- Ensure article promise matches FHC
- Simplify FHC flow
- Add social proof

### Problem: Generated CTA too generic
**Diagnosis:**
- System not detecting article nuance
- User type mapping incorrect

**Fix:**
- Manually customize CTA
- Adjust user_type_mapping in config
- Add article-specific context

---

## 📞 Need Help?

**Check:**
1. Quick Start Guide: `/docs/INSIGHT-FHC-QUICK-START.md`
2. System Docs: `/docs/insight-fhc-growth-system.md`
3. Tool README: `/tools/insight-engine/README.md`
4. Example Outputs: `/outputs/insight-fhc-growth/`

**Debug:**
```bash
# Run demo to test system
node run-growth-engine.js --demo

# Check generated output quality
cat outputs/insight-fhc-growth/2026-06-05-demo-two-rate-rises.md
```

---

## 🎓 Key Principles (Remember)

### 1. Content = Conversion Asset
Insight 不是为了阅读，是为了转化入口

### 2. Intent-Based Strategy
不同意图 = 不同 CTA 策略

### 3. Natural > Pushy
CTA 必须是内容的自然延伸，不是广告插入

### 4. Test Everything
数据驱动优化，不要猜测

### 5. System Thinking
这不是写文章，是设计转化系统

---

**核心机制：**
```
痛点识别 → 问题解释 → 焦虑建立 → 解决方案 → FHC 入口
```

**每一篇 Insight，都必须有一个"带人进入 FHC 的理由"**

---

**Version:** 1.0  
**Last Updated:** 2026-06-05  
**Status:** ✅ Production Ready

*Built with focus on conversion, not just content.*
