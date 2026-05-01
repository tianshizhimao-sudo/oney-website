# CTA Block Templates

These templates provide pre-written CTA blocks for different intent levels and user stages.

## High Intent — Direct CTA

### Mid-Article CTA (High Intent)

```markdown
---

💡 **How does this affect YOUR borrowing power?**

Every rate change impacts your capacity differently based on your income, deposit, and existing debts. Our [Free Financial Health Check]({{FHC_LINK}}) takes 5 minutes and shows you:
- Your exact borrowing capacity at current rates
- How much recent changes have affected your position
- What you can do to strengthen your application

No sign-up. No spam. Just clear numbers.

[Check Your Borrowing Power →]({{FHC_LINK}})

---
```

### End-Article CTA (High Intent)

```markdown
---

## Next Step: Know Your Numbers

Rate changes are beyond your control. But knowing exactly where you stand — that's power.

Take 5 minutes to run a [Free Financial Health Check]({{FHC_LINK}}). You'll get:
- ✓ Your current borrowing capacity at current rates
- ✓ Personalized insights based on your income and debts
- ✓ A shareable report you can send to any broker or bank

**It's free. No sign-up required.**

[Start Your Financial Health Check →]({{FHC_LINK}})

---
```

---

## Medium Intent — Educational CTA

### Mid-Article CTA (Medium Intent)

```markdown
---

**🤔 Want to see how this affects your situation?**

Understanding the market is one thing. Knowing how it impacts YOUR specific circumstances is another.

Our [Free Financial Health Check]({{FHC_LINK}}) helps you:
- Calculate your borrowing capacity in the current environment
- Identify opportunities to improve your position
- Get a clear picture before talking to lenders

Takes 5 minutes. No sign-up needed.

[See Your Financial Health →]({{FHC_LINK}})

---
```

### End-Article CTA (Medium Intent)

```markdown
---

## Want to Know Where You Stand?

The market keeps changing. Your best move is to understand your own position first.

Run a [Free Financial Health Check]({{FHC_LINK}}) to get:
- ✓ Clear data on your borrowing capacity
- ✓ Insights into what strengthens your application
- ✓ A baseline to measure your progress

No commitment. Just clarity.

[Check Your Financial Health →]({{FHC_LINK}})

---
```

---

## Low Intent — Soft CTA

### End-Article CTA Only (Low Intent)

```markdown
---

## Curious About Your Own Situation?

If you're starting to think about buying property, the first step is understanding where you are financially.

Our [Free Financial Health Check]({{FHC_LINK}}) gives you:
- ✓ An honest assessment of your current borrowing capacity
- ✓ Simple insights into what affects your application
- ✓ A starting point for your planning

It's free and takes 5 minutes. No pressure, just information.

[Learn More →]({{FHC_LINK}})

---
```

---

## Scenario-Specific CTAs

### Rate Rise Impact

```markdown
**📊 See Your Personal Impact**

This rate rise affects everyone differently. See exactly how much YOUR borrowing capacity has changed with our [Free Financial Health Check]({{FHC_LINK}}).

[Calculate Your New Capacity →]({{FHC_LINK}})
```

### Policy Change

```markdown
**🔍 Check Your Eligibility**

With the new policy changes, eligibility criteria have shifted. Find out where you stand with our [Free Financial Health Check]({{FHC_LINK}}).

[Check Your Eligibility →]({{FHC_LINK}})
```

### Refinance

```markdown
**💰 Could You Get a Better Rate?**

See if refinancing makes sense for your situation. Our [Free Financial Health Check]({{FHC_LINK}}) shows your current position and potential savings.

[Explore Your Options →]({{FHC_LINK}})
```

### First Home Buyer

```markdown
**🏠 Ready to Buy?**

Before you start looking at properties, know exactly what you can afford. Get your [Free Financial Health Check]({{FHC_LINK}}) in 5 minutes.

[Know Your Budget →]({{FHC_LINK}})
```

---

## Variable Placeholders

When using these templates, replace:

- `{{FHC_LINK}}` → Full FHC URL with tracking parameters
  - Example: `https://oney.co/fhc?source=insight&article={{ARTICLE_ID}}&intent={{INTENT_LEVEL}}&utm_medium=article&utm_campaign={{CAMPAIGN_NAME}}`
- `{{ARTICLE_ID}}` → Unique article identifier
- `{{INTENT_LEVEL}}` → `high` | `medium` | `low`
- `{{CAMPAIGN_NAME}}` → Campaign identifier for tracking

---

## CTA Selection Guide

| User Intent | User Stage | Recommended CTA | Placement |
|-------------|-----------|-----------------|-----------|
| High | Decision | Direct - High Intent | Mid + End |
| High | Consideration | Direct - High Intent | End only |
| Medium | Consideration | Educational - Medium | End only |
| Medium | Awareness | Educational - Medium | End only |
| Low | Awareness | Soft - Low Intent | End only |

---

## Quality Checklist

Before using any CTA:
- [ ] Does it flow naturally from the content?
- [ ] Is the value proposition clear?
- [ ] Does it match the reader's intent level?
- [ ] Are tracking parameters included?
- [ ] Is the language pressure-free?
- [ ] Does it avoid salesy tone?

---

**Last Updated:** 2026-05-01  
**Version:** 1.0.0
