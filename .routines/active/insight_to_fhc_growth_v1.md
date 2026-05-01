# 🔁 Routine — Insight → FHC Growth Engine

**ID:** `insight_to_fhc_growth_v1`  
**Version:** 1.0.0  
**Status:** Active  
**Owner:** Claude Code Agent

---

## 🎯 Objective

将 Insight 内容系统化转化为 FHC（Financial Health Check）的流量与转化入口，实现：
- 稳定内容产出
- 精准用户匹配
- 明确 CTA 引导
- 可追踪转化路径

**核心理念：** Insight ≠ 阅读，Insight = 转化入口

---

## ⚙️ Trigger

### 自动触发条件
- **定期触发：** 每周 2 次（与 Insight Generator 同步）
- **事件触发：**
  - 新政策更新（Policy Radar）
  - 新产品功能上线（FHC）
  - 市场热点变化（利率、贷款环境）

### 手动触发
```bash
npm run routine:insight-to-fhc -- --article-id="<article-id>"
```

---

## 📥 Inputs

### 必需输入
```json
{
  "article_draft": "Insight 文章草稿（来自 insight_generator_v1）",
  "article_id": "文章唯一标识符",
  "article_title": "文章标题",
  "article_content": "文章正文（markdown）",
  "pillar": "内容支柱（rate-watch/financial-health/refinance-ready）"
}
```

### 上下文输入
```json
{
  "fhc_positioning": "FHC 产品定位和价值主张",
  "target_user_type": "first-home-buyer | investor | refinance",
  "current_market_context": "当前热点（policy/rates/affordability）",
  "historical_performance": "历史表现数据（可选）"
}
```

---

## 🧠 Execution Instructions

### Step 1 — 用户匹配（Audience Mapping）

分析文章内容，识别目标用户画像：

```json
{
  "target_user": "first-home-buyer | investor | refinance",
  "pain_point": "具体痛点（affordability/timing/complexity）",
  "intent_level": "low | medium | high",
  "user_stage": "awareness | consideration | decision"
}
```

**判断标准：**
- **Low Intent:** 信息浏览型，了解市场
- **Medium Intent:** 评估比较型，在做计划
- **High Intent:** 决策行动型，准备申请

---

### Step 2 — 转化策略设计（Conversion Design）

根据用户意图级别，定义转化策略：

| Intent Level | Strategy | CTA Type | Placement |
|--------------|----------|----------|-----------|
| High | 直接引导 | "Check Your Borrowing Power Now" | 中段 + 结尾 |
| Medium | 教育引导 | "See How This Affects Your Situation" | 结尾 |
| Low | 软引导 | "Want to Know Where You Stand?" | 结尾 |

---

### Step 3 — 内容增强（Content Injection）

#### 3.1 CTA 段落设计

**中段 CTA（教育型 - 适用于 High/Medium Intent）**
```markdown
---

**💡 How does this affect YOUR situation?**

Every rate change impacts borrowers differently based on income, deposit, and debt levels. Our [Free Financial Health Check](#fhc-link) takes 5 minutes and shows you:
- Your exact borrowing capacity at current rates
- How much different rate scenarios would change your position
- What you can do to improve your situation

No sign-up. No spam. Just clear numbers.

[Run Your Free Check →](#fhc-link)

---
```

**结尾 CTA（行动型 - 所有 Intent）**
```markdown
---

## Next Step: Know Where You Stand

Rates change. Market conditions shift. But your financial position is something you can control — once you know where it is.

Take 5 minutes to run a [Free Financial Health Check](#fhc-link). You'll get:
- ✓ Your current borrowing capacity
- ✓ Personalized insights based on your situation
- ✓ A shareable report you can send to any broker or bank

**It's free. No sign-up required.**

[Start Your Financial Health Check →](#fhc-link)

---
```

#### 3.2 FHC 价值嵌入规则

在文章中自然嵌入 FHC 价值：
- **为什么需要？** 市场变化需要了解自己的实际能力
- **它如何解决？** 5 分钟获得清晰的财务画像
- **用户能得到什么？** 可行动的数据 + 可分享的报告

**嵌入位置：**
- 问题阐述后（"这意味着什么？"）
- 数据分析后（"对你的影响是..."）
- 策略建议前（"在采取行动前，先了解..."）

---

### Step 4 — 多渠道拆分（Content Repurpose）

#### A. 小红书版本（Short-form）

**规格：**
- 标题：强 hook，20 字以内
- 正文：800-1200 字
- 结构：痛点 → 数据 → 解决方案
- CTA：简化，侧重"免费工具"

**模板：**
```markdown
# [数字 + 痛点] 标题

[开场强 hook - 制造焦虑或好奇]

## 💰 真实影响

[3 个数据点，直观展示影响]

## ✅ 你可以做什么

[2-3 个可行动建议]

## 🎁 免费工具

想知道这对你的影响有多大？
👉 免费财务健康检测，5 分钟搞定
[链接]
```

#### B. LinkedIn 版本

**规格：**
- 标题：专业、趋势导向
- 正文：保持原文 80%，增加行业分析
- Tone：更专业，数据驱动
- CTA：软性，侧重"洞察"

**增强点：**
- 增加市场趋势分析段落
- 引用行业数据或报告
- 使用更正式的语言
- CTA 强调"专业工具"而非"免费"

#### C. SEO Meta

```json
{
  "title": "60 字以内，包含主关键词 + 价值点",
  "description": "155 字以内，包含次关键词 + CTA",
  "keywords": [
    "主关键词",
    "长尾关键词 1",
    "长尾关键词 2",
    "FHC 相关关键词"
  ],
  "og_title": "社交分享优化标题",
  "og_description": "社交分享描述",
  "canonical_url": "文章规范 URL"
}
```

---

### Step 5 — 转化路径设计（Funnel）

定义完整的用户转化路径：

```json
{
  "entry_point": "article_page",
  "cta_type": "direct | educational | soft",
  "landing_target": "fhc.html",
  "expected_user_journey": [
    "阅读文章（问题认知）",
    "点击 CTA（产生兴趣）",
    "进入 FHC（评估工具）",
    "完成检测（获得结果）",
    "分享报告或联系（转化）"
  ],
  "conversion_metrics": {
    "article_to_cta_click": "CTR",
    "cta_to_fhc_entry": "Entry Rate",
    "fhc_completion": "Completion Rate",
    "fhc_to_action": "Conversion Rate"
  }
}
```

---

## 📤 Output Schema

完整输出 JSON 结构：

```json
{
  "meta": {
    "routine_id": "insight_to_fhc_growth_v1",
    "routine_version": "1.0.0",
    "execution_date": "YYYY-MM-DD",
    "article_id": "original-article-id"
  },
  
  "analysis": {
    "target_user": "first-home-buyer",
    "pain_point": "affordability concerns",
    "intent_level": "medium",
    "user_stage": "consideration"
  },
  
  "conversion_strategy": {
    "cta_type": "educational",
    "cta_placement": ["mid-article", "end-article"],
    "expected_ctr": "5-8%"
  },
  
  "enhanced_content": {
    "article_with_cta": "完整文章（含 CTA）",
    "mid_cta_block": "中段 CTA 内容",
    "end_cta_block": "结尾 CTA 内容"
  },
  
  "fhc_integration": {
    "value_proposition": "FHC 价值说明",
    "trigger_points": ["触发点 1", "触发点 2"],
    "link_parameters": "?source=insight&article=xxx&intent=medium"
  },
  
  "multi_channel": {
    "xiaohongshu": {
      "title": "小红书标题",
      "content": "小红书正文",
      "hashtags": ["#标签1", "#标签2"]
    },
    "linkedin": {
      "title": "LinkedIn 标题",
      "content": "LinkedIn 正文",
      "tone": "professional"
    },
    "seo": {
      "title": "SEO 标题",
      "description": "SEO 描述",
      "keywords": ["关键词数组"]
    }
  },
  
  "funnel_design": {
    "entry": "article",
    "journey": ["步骤数组"],
    "conversion_hypothesis": "预期转化逻辑",
    "tracking_params": "UTM 参数"
  },
  
  "quality_checks": {
    "cta_naturalness": "natural | forced",
    "user_scenario_clarity": "clear | vague",
    "content_consistency": "consistent | inconsistent",
    "ad_feeling": "low | medium | high",
    "conversion_path_clarity": "clear | unclear"
  },
  
  "confidence_score": "1-10",
  "recommended_next_steps": ["建议数组"]
}
```

---

## 🔍 Validation Rules

在生成内容前，必须验证：

### ✅ Content Quality Checks
- [ ] CTA 是否自然融入（不能硬推）
- [ ] 是否明确用户场景（谁适合读这篇文章）
- [ ] FHC 引导是否符合文章逻辑
- [ ] 是否避免"纯广告感"
- [ ] 价值主张是否清晰（FHC 能解决什么问题）

### ✅ Conversion Path Checks
- [ ] 是否有明确的 CTA
- [ ] CTA 文案是否匹配用户意图级别
- [ ] 转化路径是否完整（从文章到 FHC）
- [ ] Tracking 参数是否设置正确
- [ ] 是否有备用 CTA（万一主 CTA 不适用）

### ✅ Multi-Channel Checks
- [ ] 小红书版本是否符合平台调性
- [ ] LinkedIn 版本是否足够专业
- [ ] SEO meta 是否包含关键词
- [ ] 各渠道 CTA 是否适配平台特性

---

## 📦 Output Destination

所有生成的内容存储在：

```
outputs/insight-fhc-growth/
├── YYYY-MM-DD-{article-id}/
│   ├── enhanced-article.md          # 增强后的完整文章
│   ├── xiaohongshu.md              # 小红书版本
│   ├── linkedin.md                 # LinkedIn 版本
│   ├── seo-meta.json               # SEO 元数据
│   ├── funnel-design.json          # 转化漏斗设计
│   └── execution-report.json       # 执行报告（完整 JSON）
```

---

## 🔗 Integration Rules

### 上游依赖
- **insight_generator_v1:** 提供原始 Insight 文章
- **policy_radar_monitor_v1:** 提供政策更新触发

### 下游集成
- **content_publisher_v1:** 将内容发布到各平台（未来）
- **analytics_tracker_v1:** 追踪转化数据（未来）

### 集成流程
```
Policy 变化 → Insight 生成 → FHC 引流增强 → 发布 → 追踪
```

---

## 🚨 Review Policy

### 自动化程度
- ✅ **可自动生成：** 内容增强、多渠道拆分、SEO meta
- ⚠️ **需人工 Review：** CTA 文案、转化策略（前期）
- ❌ **不允许自动发布：** 所有内容需人工审核后发布

### Review Checklist（发布前）
- [ ] CTA 是否过于推销
- [ ] FHC 价值说明是否准确
- [ ] 用户场景是否匹配
- [ ] 多渠道内容是否适配
- [ ] Tracking 参数是否正确

---

## 🧠 Growth Strategy — 核心逻辑

### 1. 内容不是目的

> **Insight ≠ 阅读量**  
> **Insight = 转化入口**

每篇 Insight 都必须回答：
- 用户为什么要用 FHC？
- FHC 如何解决这篇文章提到的问题？
- 用户使用 FHC 后能得到什么？

---

### 2. 三种用户路径

| 用户类型 | 行为特征 | CTA 策略 | FHC 价值点 |
|---------|---------|---------|-----------|
| **信息型** | 了解市场，无明确计划 | 教育型 CTA | "知道自己的位置" |
| **评估型** | 对比选项，在做决策 | FHC 解释 | "看清真实能力" |
| **决策型** | 准备行动，需要工具 | 直接进入 | "立即获得报告" |

---

### 3. 转化核心机制

```
痛点识别 → 问题解释 → 焦虑放大 → 解决方案 → FHC 入口
```

**示例：**
1. **痛点：** "利率上涨了 0.25%"
2. **解释：** "这意味着 $600K 贷款每月多 $87"
3. **焦虑：** "你的借贷能力下降了 $35K"
4. **解决方案：** "了解你的真实财务状况"
5. **FHC：** "5 分钟免费检测，看清你的位置"

---

### 4. 成功标准（Metrics）

**短期指标（内容层）**
- Article → CTA Click Rate: 目标 5-10%
- CTA → FHC Entry Rate: 目标 60-80%

**中期指标（转化层）**
- FHC Completion Rate: 目标 40-60%
- FHC → Action Rate: 目标 15-25%

**长期指标（业务层）**
- Insight → Lead Conversion: 目标 2-5%
- Lead Quality Score: 目标 7+/10

---

## 📊 Performance Tracking（建议后续实现）

### 追踪参数格式
```
?utm_source=insight
&utm_medium=article
&utm_campaign={article-id}
&utm_content={cta-position}
&intent={low|medium|high}
```

### 关键事件
- `insight_article_view`
- `insight_cta_click`
- `fhc_entry_from_insight`
- `fhc_completion_from_insight`
- `lead_conversion_from_insight`

---

## 🔄 Iteration Plan

### v1.0.0（当前版本）
- 手动触发
- 基础内容增强
- 多渠道拆分
- 人工 Review

### v1.1.0（计划）
- 自动触发（基于 insight_generator）
- A/B 测试 CTA 文案
- 自动化 SEO 优化

### v2.0.0（未来）
- AI 优化 CTA（基于历史数据）
- 自动发布（需人工审核）
- 实时转化追踪

---

## 📝 Notes

### 关键原则
1. **每篇 Insight 都必须有明确的"带人进入 FHC 的理由"**
2. **CTA 必须自然，不能破坏阅读体验**
3. **转化路径必须清晰，用户不能迷失**
4. **多渠道内容必须适配平台特性**

### 风险控制
- 避免过度推销（会降低内容可信度）
- 避免 CTA 过多（会分散注意力）
- 避免价值主张不清（用户不知道为什么要点）

### 成功关键
- **精准用户匹配：** 对的人，看对的内容
- **自然价值传递：** FHC 是解决方案，不是广告
- **清晰行动路径：** 一个主 CTA，一条转化路径

---

**Last Updated:** 2026-05-01  
**Maintained By:** Claude Code Agent  
**Contact:** N/A
