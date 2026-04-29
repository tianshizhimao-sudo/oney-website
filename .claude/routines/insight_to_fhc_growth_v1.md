# 🔁 Routine — Insight → FHC Growth Engine

**ID**: `insight_to_fhc_growth_v1`

---

## 🎯 Objective

将 Insight 内容系统化转化为 FHC（Financial Health Check）的流量与转化入口，实现：
- 稳定内容产出
- 精准用户匹配
- 明确 CTA 引导
- 可追踪转化路径

---

## ⚙️ Trigger

- 每周 2 次（与 Insight Generator 同步）
- 或在以下事件触发：
  - 新政策更新（Policy Radar）
  - 新产品功能上线（FHC）
  - 市场热点变化（利率、贷款环境）

---

## 📥 Inputs

- Insight 文章草稿（来自 `insight_generator_v1`）
- FHC 产品定位
- 用户类型（first home buyer / investor / refinance）
- 当前热点（policy / rates / affordability）
- 历史表现（如已有：高点击标题/主题）

---

## 🧠 Execution Instructions

### Step 1 — 用户匹配（Audience Mapping）

识别文章适配用户：

```json
{
  "target_user": "",
  "pain_point": "",
  "intent_level": "low/medium/high"
}
```

---

### Step 2 — 转化策略设计（Conversion Design）

定义最优引导路径：
- **直接 CTA**（高意图）
- **教育型 CTA**（中意图）
- **软引导**（低意图）

---

### Step 3 — 内容增强（Content Injection）

必须在 Insight 中加入：

#### 3.1 CTA 段落（强制）
- 放在：
  - 中段（教育型）
  - 结尾（转化型）

#### 3.2 FHC 价值嵌入
自然解释：
- 为什么需要 FHC
- 它如何解决问题
- 用户能得到什么结果

---

### Step 4 — 多渠道拆分（Content Repurpose）

生成以下衍生内容：

**A. 小红书版本（Short-form）**
- 强 hook
- 结果导向
- CTA 简化

**B. LinkedIn版本**
- 更专业
- 强趋势分析
- 软 CTA

**C. SEO Meta**
- title
- description
- keywords

---

### Step 5 — 转化路径设计（Funnel）

输出：

```json
{
  "entry_point": "article",
  "cta_type": "",
  "landing_target": "FHC",
  "expected_user_action": ""
}
```

---

## 📤 Output Schema

```json
{
  "article_title": "",
  "target_user": "",
  "intent_level": "",
  "cta_strategy": "",
  "cta_blocks": {
    "mid_article": "",
    "end_article": ""
  },
  "fhc_integration": "",
  "xhs_version": "",
  "linkedin_version": "",
  "seo": {
    "title": "",
    "description": "",
    "keywords": []
  },
  "funnel_design": {},
  "conversion_hypothesis": "",
  "confidence": ""
}
```

---

## 🔍 Validation Rules

Claude Code 必须检查：
- ✅ CTA 是否自然（不能硬推）
- ✅ 是否明确用户场景
- ✅ 是否和文章逻辑一致
- ✅ 是否避免"纯广告感"
- ✅ 是否有明确转化路径

---

## 📦 Output Destination

```
/outputs/insight-fhc-growth/YYYY-MM-DD-topic.md
```

---

## 🔗 Integration Rule（关键）

该 Routine 必须绑定：
- `insight_generator_v1`
- `policy_radar_monitor_v1`

逻辑：
```
Policy变化 → Insight生成 → FHC引流增强
```

---

## 🚨 Review Policy

- ✅ 内容可自动生成
- ⚠️ CTA 必须人工 review（前期）
- ❌ 不允许自动发布

---

## 🧠 Growth Strategy（核心逻辑）

### 1. 内容不是目的

```
Insight ≠ 阅读
Insight = 转化入口
```

### 2. 三种用户路径

| 用户类型 | 行为 | CTA |
|---------|------|-----|
| 信息型 | 了解 | 教育型 CTA |
| 评估型 | 对比 | FHC 解释 |
| 决策型 | 行动 | 直接进入 FHC |

### 3. 核心机制

```
痛点 → 解释 → 焦虑 → 解决方案 → FHC入口
```

### 4. 成功标准（建议你后续加 tracking）

- CTR（文章 → FHC）
- FHC completion rate
- Drop-off rate
- Time on page

---

## 🧠 核心原则

> **每一篇 Insight，都必须有一个"带人进入 FHC 的理由"**

---

## 执行示例

### 输入示例：
```
文章主题：2026年首次购房者新政策解读
用户类型：First Home Buyer
热点：First Home Guarantee扩容
```

### 输出示例：
详见 `/outputs/insight-fhc-growth/2026-04-29-first-home-guarantee.md`
