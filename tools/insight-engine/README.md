# Insight → FHC Growth Engine

将 Insight 内容系统化转化为 FHC（Financial Health Check）的流量与转化入口。

## 🎯 核心目标

- **稳定内容产出**：每周 2 次自动处理
- **精准用户匹配**：智能识别目标用户群体
- **明确 CTA 引导**：自然嵌入转化路径
- **可追踪转化路径**：完整的漏斗设计

---

## 📦 文件结构

```
tools/insight-engine/
├── fhc-growth-processor.js      # 核心处理引擎
├── run-growth-engine.js          # CLI 工具
├── growth-engine-config.json     # 配置文件
└── README.md                     # 使用文档

routines/
└── insight-to-fhc-growth.json   # Routine 定义

outputs/insight-fhc-growth/
└── YYYY-MM-DD-topic.{json,md}   # 生成的输出
```

---

## 🚀 快速开始

### 1. 运行演示

```bash
cd tools/insight-engine
node run-growth-engine.js --demo
```

这会生成一个示例输出，展示系统的完整功能。

### 2. 处理单篇 Insight

```bash
node run-growth-engine.js --input <insight-id>
```

例如：
```bash
node run-growth-engine.js --input two-rate-rises-first-home-buyers-2026
```

### 3. 批量处理所有 Insights

```bash
node run-growth-engine.js --batch
```

---

## 🧠 工作流程

系统会执行以下 5 个步骤：

### Step 1: 用户匹配 (Audience Mapping)

识别文章的目标用户和意图级别：

```json
{
  "target_user": "first_home_buyer",
  "pain_point": "borrowing capacity",
  "intent_level": "high"
}
```

**意图级别分类：**
- **High**: 用户有明确行动意图（包含 "need", "apply", "ready" 等关键词）
- **Medium**: 用户在评估阶段（包含 "consider", "planning", "prepare" 等关键词）
- **Low**: 用户仅在了解信息

### Step 2: 转化策略设计 (Conversion Design)

根据意图级别选择最佳策略：

| 意图级别 | 策略类型 | 方法 |
|---------|---------|------|
| High | Direct CTA | 直接引导至 FHC，强调立即价值 |
| Medium | Educational CTA | 先教育价值，再自然引导 |
| Low | Soft Guidance | 软性提及 FHC，建立认知 |

### Step 3: 内容增强 (Content Injection)

在文章中自然嵌入两个 CTA：

1. **Mid-Article CTA**: 教育型，解释 FHC 价值
2. **End-Article CTA**: 转化型，引导行动

示例（High Intent）：

```markdown
## Mid-Article
Not sure where you stand? Our Financial Health Check takes 3 minutes 
and shows you exactly what banks see when they assess your application.

## End-Article
**Ready to see your numbers?** Get your free Financial Health Check — 
it takes 3 minutes and gives you a clear picture of your borrowing 
capacity, application readiness, and next steps.
```

### Step 4: 多渠道拆分 (Content Repurpose)

自动生成三种版本：

#### 小红书版本
- 强 hook（🏠 首次购房必看！）
- 结果导向
- 简化 CTA
- 3 个相关 hashtags

#### LinkedIn 版本
- 专业语气
- 趋势分析角度
- 软性 CTA
- 行业 hashtags

#### SEO Meta
- 优化的 title（< 60 字符）
- Meta description（< 155 字符）
- 5 个相关 keywords

### Step 5: 转化路径设计 (Funnel Design)

定义完整的转化漏斗：

```json
{
  "entry_point": "article",
  "cta_type": "direct_action",
  "landing_target": "FHC",
  "expected_user_action": "Complete FHC within 24 hours",
  "conversion_hypothesis": "高意图用户会直接行动，预期 CTR 12-18%"
}
```

---

## 📊 输出格式

每次处理会生成两个文件：

### JSON 文件（结构化数据）

```json
{
  "article_title": "...",
  "target_user": "first_home_buyer",
  "intent_level": "high",
  "cta_strategy": "direct_cta",
  "cta_blocks": {
    "mid_article": "...",
    "end_article": "..."
  },
  "fhc_integration": "...",
  "xhs_version": "...",
  "linkedin_version": "...",
  "seo": { ... },
  "funnel_design": { ... },
  "conversion_hypothesis": "...",
  "confidence": "high"
}
```

### Markdown 文件（可读格式）

包含完整的分析报告、CTA 内容、多渠道版本和下一步行动清单。

---

## ⚙️ 配置

编辑 `growth-engine-config.json` 来自定义：

### 用户类型映射

```json
{
  "user_type_mapping": {
    "rate-watch": "first_home_buyer",
    "financial-health": "first_home_buyer",
    "refinance-ready": "refinance"
  }
}
```

### 热点映射

```json
{
  "hotspot_mapping": {
    "rate-watch": "rates",
    "financial-health": "affordability",
    "refinance-ready": "policy"
  }
}
```

### CTA 偏好

```json
{
  "cta_preferences": {
    "tone": "helpful",
    "style": "conversational",
    "avoid_words": ["buy now", "limited time"]
  }
}
```

---

## ✅ 验证规则

系统会自动检查：

- ✓ CTA 是否自然（不能硬推）
- ✓ 是否明确用户场景
- ✓ 是否和文章逻辑一致
- ✓ 是否避免"纯广告感"
- ✓ 是否有明确转化路径

---

## 🔗 集成

### 与其他 Routines 集成

```
Policy Radar → Insight Generator → FHC Growth Engine
```

### 触发条件

1. **定期触发**：每周 2 次（与 Insight Generator 同步）
2. **事件触发**：
   - 政策更新（Policy Radar）
   - 产品功能上线（FHC）
   - 市场热点变化（利率、贷款环境）

---

## 📈 成功指标

### 主要指标
- **CTR（文章 → FHC）**: 目标 7-18%（根据意图级别）
- **FHC Completion Rate**: 目标 > 60%

### 次要指标
- **Drop-off Rate**: 监控漏斗流失点
- **Time on Page**: 评估内容质量

---

## 🎯 核心原则

> **每一篇 Insight，都必须有一个"带人进入 FHC 的理由"**

这不仅仅是内容，而是一个完整的**转化系统**：

```
痛点 → 解释 → 焦虑 → 解决方案 → FHC 入口
```

---

## 📝 使用示例

### 示例 1: 处理现有 Insight

```bash
# 查看所有可用的 insights
cat ../../data/insights.json | grep '"id"'

# 处理特定 insight
node run-growth-engine.js --input how-to-check-your-financial-health

# 查看结果
ls -la ../../outputs/insight-fhc-growth/
```

### 示例 2: 自定义处理

修改 `fhc-growth-processor.js` 中的模板：

```javascript
const ctaTemplates = {
  high_intent: {
    mid_article: "你的自定义 CTA...",
    end_article: "你的自定义 CTA..."
  }
};
```

---

## 🚨 Review Policy

- ✅ 内容可自动生成
- ⚠️ CTA **必须人工 review**（前期）
- ❌ 不允许自动发布

---

## 🔄 下一步

处理完成后，需要：

1. [ ] **人工审核** CTA 自然性
2. [ ] **测试** FHC 集成流程
3. [ ] **排期** 多渠道发布
4. [ ] **设置** 转化追踪（UTM 参数）
5. [ ] **监控** CTR 和完成率

---

## 💡 最佳实践

### DO ✓
- 理解用户的真实痛点
- 让 CTA 成为内容的自然延伸
- 提供明确的价值主张
- 测试不同的 CTA 位置和措辞

### DON'T ✗
- 硬推广告式 CTA
- 忽略用户意图级别
- 使用紧迫感词汇（"限时"、"立即"）
- 跳过人工审核直接发布

---

## 🛠 故障排除

### 问题：生成的 CTA 太硬
**解决**：降低意图级别或调整 `cta_preferences.tone`

### 问题：找不到输出文件
**检查**：确保 `outputs/insight-fhc-growth/` 目录存在

### 问题：用户类型识别不准
**调整**：修改 `growth-engine-config.json` 中的映射规则

---

## 📞 支持

遇到问题？检查：
1. Node.js 版本 >= 14
2. `data/insights.json` 存在且格式正确
3. 配置文件格式正确

---

**Generated by Insight → FHC Growth Engine v1.0**
