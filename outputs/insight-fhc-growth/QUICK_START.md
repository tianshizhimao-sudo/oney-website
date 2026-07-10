# Quick Start — Insight → FHC Growth Engine

## ⚡ TL;DR

This routine automatically converts your Insight articles into multi-channel conversion assets that drive traffic to FHC.

**Schedule**: Runs automatically every Tuesday & Friday at 9:57 AM  
**Status**: ✅ Active (Session-only, 7-day auto-expire)

---

## 🚀 What It Does

Takes this:
```
📄 Generic Insight Article
"Here's what the new policy means..."
```

Converts to this:
```
📦 Conversion Asset Package
├── Enhanced article with strategic CTAs
├── 小红书 version (viral potential)
├── LinkedIn version (professional reach)
├── SEO-optimized metadata
└── Conversion funnel blueprint
```

---

## 🎯 How to Use It

### Option 1: Let It Run Automatically
1. Write Insights as usual → `/outputs/insights/`
2. Routine picks them up twice weekly
3. Find enhanced versions → `/outputs/insight-fhc-growth/`
4. Review CTAs before publishing

### Option 2: Manual Trigger (If Needed)
```
Ask Claude: "Run the FHC growth routine on [specific insight]"
```

---

## 📂 Directory Structure

```
/outputs/
├── insights/               ← Your original articles go here
├── policy-radar/          ← Policy-triggered content
└── insight-fhc-growth/    ← Enhanced conversion assets appear here
    ├── README.md          ← Full system documentation
    ├── _TEMPLATE.md       ← Output format reference
    └── YYYY-MM-DD-*.md    ← Processed articles
```

---

## ✅ Pre-Publishing Checklist

When you find a new file in `/insight-fhc-growth/`:

1. **Review CTAs**
   - [ ] Mid-article CTA feels natural?
   - [ ] End-article CTA is compelling but not pushy?
   - [ ] FHC value is explained, not assumed?

2. **Validate User Mapping**
   - [ ] Target user type is accurate?
   - [ ] Pain point correctly identified?
   - [ ] Intent level matches content?

3. **Check Multi-Channel Versions**
   - [ ] 小红书 version has strong hook?
   - [ ] LinkedIn version is professional?
   - [ ] SEO metadata is optimized?

4. **Approve or Adjust**
   - ✅ Looks good → Publish
   - ⚠️ Needs tweaks → Edit CTAs manually
   - ❌ Off-base → Flag for routine improvement

---

## 🔧 Common Adjustments

### If CTA Feels Too Pushy
Look for the `cta_blocks` section and soften the language:
- "Sign up now" → "See how this affects you"
- "Get started" → "Explore your options"
- "Don't miss out" → "Worth checking"

### If User Mapping Is Wrong
Check the `target_user` and `pain_point` fields. The routine makes best guesses but might miss nuance.

### If Intent Level Seems Off
High/Medium/Low intent determines CTA aggressiveness. Adjust manually if misaligned.

---

## 📊 What to Track (Manual for Now)

For each published article, note:
- **Article title**
- **Publish date**
- **CTR (article → FHC)**: [Use analytics]
- **FHC completion rate**: [Track in FHC system]
- **Actual user type**: [Did we target correctly?]

This data will help refine the routine over time.

---

## 🔄 Integration Flow

```
Policy Radar Monitor
    ↓
Insight Generator
    ↓
[YOU ARE HERE] → FHC Growth Engine
    ↓
Multi-Channel Distribution
    ↓
FHC Traffic & Conversions
```

---

## 💡 Pro Tips

### Maximize Conversion Rate
1. **Match tone to intent level**
   - High intent: Be direct
   - Low intent: Be educational

2. **Test different CTA placements**
   - Some articles work better with early CTAs
   - Others need to build value first

3. **Use the 小红书 version strategically**
   - It's optimized for shareability
   - Can drive viral reach → FHC traffic

4. **LinkedIn version for credibility**
   - Positions you as industry expert
   - Builds trust before conversion ask

---

## 🚨 Troubleshooting

### Routine didn't pick up my Insight
- Check file is in `/outputs/insights/`
- Wait for next scheduled run (Tue/Fri 9:57 AM)
- Or manually trigger

### Output quality is poor
- Review source Insight quality first
- Check if user type is ambiguous
- Consider manual CTA writing for complex topics

### CTAs feel generic
- Routine works best with clear pain points
- Strengthen problem articulation in original Insight
- Add more user context in article

---

## 🎓 Strategic Context

### Why This Matters

**Old model**: Write → Hope → Pray  
**New model**: Write → Target → Guide → Convert

Every Insight is now:
- A content asset (information)
- A traffic driver (SEO, social)
- A conversion funnel (FHC entry point)

### The Competitive Edge

Most content strategies measure:
- Views ✓
- Engagement ✓
- Time on page ✓

You now measure:
- **Qualified traffic to FHC** 🎯
- **Intent-matched users** 🎯
- **Conversion path effectiveness** 🎯

This is the shift from content marketing to **conversion-first content engineering**.

---

## 📞 Need Help?

- **System issues**: Check README.md for technical details
- **Strategy questions**: Review the conversion hypothesis in each output
- **Routine updates**: Recreate cron job with adjusted prompt

---

**Version**: 1.0  
**Last Updated**: 2026-07-10  
**Status**: Production-ready (testing phase)
