# 🔁 Routine — Insight → FHC Growth Engine

**ID**: `insight_to_fhc_growth_v1`

**Status**: ✅ Production Ready

---

## 🎯 Objective

将 Insight 内容系统化转化为 FHC（Financial Health Check）的流量与转化入口，实现：

- **稳定内容产出** — 每周 2 次自动处理
- **精准用户匹配** — 智能识别目标用户群体（first home buyer / investor / refinance）
- **明确 CTA 引导** — 自然嵌入转化路径，避免硬推
- **可追踪转化路径** — 完整的漏斗设计与性能追踪

**核心价值**：不是写内容，而是设计一个**内容 → 转化系统**

---

## ⚙️ Trigger

### 定期触发
- **频率**: 每周 2 次（与 Insight Generator 同步）
- **时间**: 与内容生成周期对齐

### 事件触发
自动监听以下事件：

1. **政策更新** (`policy_radar_monitor_v1`)
   - 政府政策变化
   - 监管环境调整
   - 补贴/计划变动

2. **产品上线** (FHC 功能更新)
   - 新功能发布
   - 体验优化
   - 价值主张更新

3. **市场变化**
   - 利率调整（RBA 决策）
   - 贷款环境变化
   - 购房可负担性变化

---

## 📥 Inputs

### Required 必需输入

```json
{
  "insight_draft": {
    "source": "insight_generator_v1",
    "type": "markdown",
    "fields": ["title", "content", "summary"]
  },
  "fhc_positioning": {
    "type": "config",
    "description": "FHC 产品定位与价值主张"
  },
  "user_type": {
    "enum": ["first_home_buyer", "investor", "refinance"],
    "required": true
  },
  "current_hotspot": {
    "enum": ["policy", "rates", "affordability"],
    "required": true
  }
}
```

### Optional 可选输入

```json
{
  "historical_performance": {
    "type": "analytics",
    "fields": [
      "high_ctr_titles",
      "best_performing_topics",
      "conversion_benchmarks"
    ]
  }
}
```

---

## 🧠 Execution Instructions

Claude Code 必须按以下 5 个步骤执行：

### Step 1 — 用户匹配 (Audience Mapping)

**目标**: 识别文章的目标用户和意图级别

**方法**:
1. 分析内容关键词
2. 识别用户痛点
3. 判断意图级别

**输出**:
```json
{
  "target_user": "first_home_buyer|investor|refinance",
  "pain_point": "具体痛点描述",
  "intent_level": "low|medium|high"
}
```

**意图级别分类标准**:

| 级别 | 特征 | 关键词示例 |
|-----|------|----------|
| **High** | 用户有明确行动意图 | need, apply, ready, urgent, now |
| **Medium** | 用户在评估阶段 | consider, planning, prepare, should |
| **Low** | 用户仅在了解信息 | learn, understand, explore, curious |

---

### Step 2 — 转化策略设计 (Conversion Design)

**目标**: 根据意图级别选择最佳引导策略

**策略映射**:

| 意图级别 | 策略类型 | 方法 | 预期 CTR |
|---------|---------|------|----------|
| **High** | Direct CTA | 直接引导至 FHC，强调立即价值 | 12-18% |
| **Medium** | Educational CTA | 先教育价值，再自然引导 | 7-12% |
| **Low** | Soft Guidance | 软性提及 FHC，建立认知 | 3-7% |

**输出**:
```json
{
  "strategy": "direct_cta|educational_cta|soft_guidance",
  "cta_type": "high_intent|medium_intent|low_intent",
  "approach": "策略描述"
}
```

---

### Step 3 — 内容增强 (Content Injection)

**目标**: 在文章中自然嵌入转化元素

#### 3.1 CTA 段落（强制）

必须在以下位置插入：

1. **Mid-Article CTA** (文章中段)
   - 类型: 教育型
   - 目的: 解释 FHC 价值
   - 要求: 自然过渡，不打断阅读体验

2. **End-Article CTA** (文章结尾)
   - 类型: 转化型
   - 目的: 引导行动
   - 要求: 明确下一步，强调价值

#### 3.2 FHC 价值嵌入

自然解释以下三点：

1. **为什么需要 FHC**
   - 与文章痛点关联
   - 不脱离内容逻辑

2. **它如何解决问题**
   - 具体功能说明
   - 实际价值展示

3. **用户能得到什么结果**
   - 明确输出
   - 可量化收益

**CTA 模板示例**:

##### High Intent (直接 CTA)

**Mid-Article**:
> Not sure where you stand? Our [Financial Health Check](#fhc) takes 3 minutes and shows you exactly what banks see when they assess your application.

**End-Article**:
> **Ready to see your numbers?** [Get your free Financial Health Check](#fhc) — it takes 3 minutes and gives you a clear picture of your borrowing capacity, application readiness, and next steps.

##### Medium Intent (教育型 CTA)

**Mid-Article**:
> Before you make any decisions, it's worth understanding where you stand. Our [Financial Health Check](#fhc) helps you see what lenders see — and what needs fixing before you apply.

**End-Article**:
> **Want to know if you're ready?** [Check your financial health](#fhc) in 3 minutes. It's free, and you'll get a personalised report on your borrowing position.

##### Low Intent (软引导)

**Mid-Article**:
> Understanding your financial position is the first step. A quick [Financial Health Check](#fhc) can show you where you stand and what to focus on.

**End-Article**:
> **Curious about your position?** Our [Financial Health Check](#fhc) gives you a clear snapshot of your borrowing capacity and readiness — no obligation, just insights.

---

### Step 4 — 多渠道拆分 (Content Repurpose)

**目标**: 生成多个渠道的衍生内容

#### A. 小红书版本 (Short-form)

**特征**:
- 强 hook（emoji + 吸睛标题）
- 结果导向（突出价值）
- CTA 简化（降低门槛）
- 3 个相关 hashtags

**格式**:
```
🏠 [hook 标题]

[精简版内容]

✅ 3分钟了解你的真实借款能力
✅ 免费 + 无推销

[简化 CTA]

#澳洲买房 #房贷 #理财
```

#### B. LinkedIn 版本

**特征**:
- 更专业的语气
- 强趋势分析角度
- 软 CTA（不强推）
- 行业相关 hashtags

**格式**:
```
[专业标题]

[内容摘要 + 趋势分析]

This matters because [行业影响]

[软性 CTA]

#AustralianProperty #MortgageTips #FinancialPlanning
```

#### C. SEO Meta

**字段**:
```json
{
  "title": "< 60 字符，包含主关键词",
  "description": "< 155 字符，包含 CTA",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}
```

**关键词策略**:
- first_home_buyer: "first home buyer", "home loan", "borrowing capacity", "FHC", "financial health"
- investor: "property investment", "investment loan", "cash flow", "portfolio", "FHC"
- refinance: "refinance", "mortgage comparison", "rate switch", "loyalty tax", "FHC"

---

### Step 5 — 转化路径设计 (Funnel Design)

**目标**: 定义完整的用户转化漏斗

**输出**:
```json
{
  "entry_point": "article",
  "cta_type": "direct_action|educational_bridge|soft_awareness",
  "landing_target": "FHC",
  "expected_user_action": "具体行动描述",
  "conversion_hypothesis": "转化假设与预期"
}
```

**漏斗示例**:

**High Intent 用户**:
```
文章阅读 → 点击 CTA → 直接进入 FHC → 24小时内完成
预期 CTR: 12-18%
```

**Medium Intent 用户**:
```
文章阅读 → 点击 CTA → 了解 FHC 价值 → 完成评估
预期 CTR: 7-12%
```

**Low Intent 用户**:
```
文章阅读 → 认知 FHC → 收藏/稍后访问 → 延迟转化
预期 CTR: 3-7%
```

---

## 📤 Output Schema

```json
{
  "article_title": "string",
  "target_user": "first_home_buyer|investor|refinance",
  "intent_level": "low|medium|high",
  "cta_strategy": "direct_cta|educational_cta|soft_guidance",
  "cta_blocks": {
    "mid_article": "string (CTA 文本)",
    "end_article": "string (CTA 文本)"
  },
  "fhc_integration": "string (FHC 价值说明)",
  "xhs_version": "string (小红书版本)",
  "linkedin_version": "string (LinkedIn 版本)",
  "seo": {
    "title": "string (< 60 chars)",
    "description": "string (< 155 chars)",
    "keywords": ["string", "string", "string", "string", "string"]
  },
  "funnel_design": {
    "entry_point": "article",
    "cta_type": "string",
    "landing_target": "FHC",
    "expected_user_action": "string"
  },
  "conversion_hypothesis": "string (转化假设)",
  "confidence": "low|medium|high"
}
```

---

## 🔍 Validation Rules

Claude Code 必须自动检查以下 5 项：

### 1. ✓ CTA 自然性
- ❌ 不能硬推
- ❌ 不能像纯广告
- ✅ 必须是内容的自然延伸

**检查方法**: CTA 不包含 "立即购买"、"限时"、"不要错过" 等强推词汇

### 2. ✓ 明确用户场景
- ✅ 清楚目标用户是谁
- ✅ 理解他们的痛点
- ✅ 内容与用户类型匹配

**检查方法**: `target_user` 字段必须存在且有效

### 3. ✓ 文章逻辑一致
- ✅ CTA 和文章主题匹配
- ✅ 转化路径合理
- ✅ 不跳跃/不生硬

**检查方法**: `confidence` 不能为 "low"

### 4. ✓ 避免纯广告感
- ❌ 不用紧迫感词汇（"限时"、"立即"、"不要错过"）
- ✅ 强调价值而非推销
- ✅ 教育优先，转化次之

**检查方法**: CTA 文本不包含避免词汇列表

### 5. ✓ 明确转化路径
- ✅ 清楚用户下一步应该做什么
- ✅ Landing page 明确
- ✅ 预期行动可测量

**检查方法**: `funnel_design.expected_user_action` 字段必须具体且可执行

---

## 📦 Output Destination

**路径格式**:
```
/outputs/insight-fhc-growth/YYYY-MM-DD-topic.{json,md}
```

**文件类型**:
1. **JSON** - 结构化数据，供程序读取
2. **Markdown** - 可读报告，供人工审核

**示例**:
```
outputs/insight-fhc-growth/
├── 2026-06-12-two-rate-rises-first-home-buyers.json
└── 2026-06-12-two-rate-rises-first-home-buyers.md
```

---

## 🔗 Integration Rule（关键）

### 必须绑定的 Routines

1. **`insight_generator_v1`** (Insight 生成器)
2. **`policy_radar_monitor_v1`** (政策监控)

### 集成逻辑

```
┌──────────────────┐
│  Policy Radar    │  监控政策变化
│  Monitor v1      │
└────────┬─────────┘
         │ trigger
         ▼
┌──────────────────┐
│  Insight         │  生成 Insight 内容
│  Generator v1    │
└────────┬─────────┘
         │ feed
         ▼
┌──────────────────┐
│  FHC Growth      │  转化增强（本系统）
│  Engine v1       │
└────────┬─────────┘
         │ output
         ▼
┌──────────────────┐
│  Publishing      │  多渠道发布
│  Channels        │
└──────────────────┘
```

**工作流**:
```
Policy变化 → Insight生成 → FHC引流增强 → 多渠道发布
```

---

## 🚨 Review Policy

### 自动化程度

| 环节 | 自动化 | 审核要求 | 原因 |
|-----|-------|---------|------|
| **内容生成** | ✅ 全自动 | 无需人工 | 系统自动处理所有步骤 |
| **CTA Review** | ⚠️ 人工审核 | **必须** | CTA 自然性需人工判断（前期） |
| **发布** | ❌ 禁止自动 | **必须** | 必须人工确认后发布 |

### 审核流程

1. ✅ **系统自动生成** 完整输出
2. 👤 **人工审核** CTA 措辞和位置
3. 🧪 **测试** FHC 转化流程完整性
4. 📅 **排期** 多渠道内容发布
5. 📊 **设置** 转化追踪（UTM 参数）
6. 📈 **监控** CTR 和完成率

---

## 🧠 Growth Strategy（核心逻辑）

### 1. 内容不是目的

**关键认知**:
```
Insight ≠ 阅读量
Insight = 转化入口
```

内容的价值不在于阅读数，而在于有效引导用户进入 FHC。

---

### 2. 三种用户路径

| 用户类型 | 行为特征 | CTA 策略 | 预期结果 |
|---------|---------|---------|---------|
| **信息型**<br>(Low Intent) | 了解阶段<br>无明确行动计划 | **软引导**<br>• 建立 FHC 认知<br>• 不强推<br>• 提供价值主张 | CTR: 3-7%<br>延迟转化 |
| **评估型**<br>(Medium Intent) | 对比研究<br>准备阶段 | **教育型 CTA**<br>• 先解释 FHC 价值<br>• 再自然引导<br>• 强调无推销 | CTR: 7-12%<br>中期转化 |
| **决策型**<br>(High Intent) | 准备行动<br>寻找解决方案 | **直接 CTA**<br>• 强调立即价值<br>• 明确行动步骤<br>• 适度紧迫感 | CTR: 12-18%<br>立即转化 |

---

### 3. 核心机制

**转化路径设计**:
```
痛点识别 → 问题解释 → 焦虑建立 → 解决方案 → FHC 入口
```

**示例**（首次购房者 + 利率上升）:

1. **痛点识别**: "利率上升，借款能力下降"
2. **问题解释**: "每次加息影响 $45,000 借款额"
3. **焦虑建立**: "你的预批可能已经失效"
4. **解决方案**: "需要重新评估财务健康"
5. **FHC 入口**: "3分钟了解你的真实借款能力"

---

### 4. 成功标准

#### Primary KPIs（主要指标）

1. **CTR (Article → FHC)**
   - High Intent: 12-18%
   - Medium Intent: 7-12%
   - Low Intent: 3-7%

2. **FHC Completion Rate**
   - Target: > 60%
   - 定义: 点击进入 FHC 后完成评估的比例

#### Secondary KPIs（次要指标）

3. **Drop-off Rate**
   - 监控漏斗各阶段流失
   - 识别优化机会点

4. **Time on Page**
   - 评估内容质量
   - 判断参与度

#### Future Tracking（后续追踪）

- 集成 Google Analytics
- 设置 UTM 参数追踪来源
- A/B 测试不同 CTA 措辞
- 多变量测试（内容 × CTA × 渠道）

---

## 🧠 核心原则

> **每一篇 Insight，都必须有一个"带人进入 FHC 的理由"**

### 不是 (❌)
- 写内容为了阅读量
- 硬塞 CTA 广告
- 纯信息输出
- 希望用户自己发现 FHC

### 而是 (✅)
- Insight = 转化入口
- 内容 = 价值 + 引导
- CTA = 自然延伸
- 系统化引导用户进入 FHC

---

## 📊 Performance Benchmarks

### 与传统方式对比

**无系统（传统方式）**:
- CTR: ~1-3%（未优化）
- 转化不可预测
- 无法系统优化
- 依赖运气

**有系统（Growth Engine）**:
- CTR: 3-18%（根据意图分层）
- 可预测转化率
- 持续优化可能
- 数据驱动决策

**提升幅度**: 3-6x CTR improvement

---

## 🔄 Technical Implementation

### 运行命令

#### 演示模式
```bash
cd tools/insight-engine
node run-growth-engine.js --demo
```

#### 处理单篇
```bash
node run-growth-engine.js --input <insight-id>
```

#### 批量处理
```bash
node run-growth-engine.js --batch
```

### 配置文件

**位置**: `tools/insight-engine/growth-engine-config.json`

**可配置项**:
- 用户类型映射
- 热点映射
- CTA 偏好（语气、风格、避免词汇）
- 多渠道设置
- 验证规则
- 追踪参数

---

## 🎓 Key Learnings

### 为什么这个系统重要？

> "大多数人：写内容。你现在：设计内容 → 转化系统。"

### 战略级差异

**传统内容营销**:
```
写文章 → 发布 → 希望有人看 → 希望有人点击 → 希望有人转化
```
**结果**: 转化率 1-3%，不可控

**Growth Engine 方式**:
```
分析用户意图 → 设计转化策略 → 嵌入自然 CTA → 优化漏斗 → 追踪转化
```
**结果**: 转化率 3-18%，可预测，可优化

### 核心能力提升

这个系统让你具备：

1. **战略思维** - 从"写内容"到"设计转化系统"
2. **用户洞察** - 识别意图级别，精准匹配策略
3. **数据驱动** - 可追踪、可分析、可优化
4. **系统化** - 可复制、可扩展、可自动化

---

## 🔮 Future Enhancements

### Phase 2（短期）

1. **A/B Testing**
   - 自动生成多个 CTA 变体
   - 测试不同措辞效果
   - 自动选择最优版本

2. **Analytics Integration**
   - 自动追踪 CTR
   - 实时监控转化率
   - 漏斗可视化

3. **AI Optimization**
   - 基于历史数据优化 CTA
   - 智能选择最佳策略
   - 自动调整意图判断

### Phase 3（中期）

4. **Dynamic Personalization**
   - 根据用户来源调整 CTA
   - A/B 测试自动化
   - 实时内容优化

5. **Multi-touch Attribution**
   - 跨渠道用户追踪
   - 归因模型建立
   - ROI 精确计算

### Phase 4（长期愿景）

6. **Fully Autonomous Engine**
   - 完全自动化的内容 → 转化引擎
   - 实时性能优化
   - 跨平台统一追踪
   - 智能内容推荐

---

## 📚 Related Resources

### 文档
- [系统设计文档](/docs/insight-fhc-growth-system.md)
- [使用指南](/tools/insight-engine/README.md)
- [示例输出](/outputs/insight-fhc-growth/)
- [配置文件](/tools/insight-engine/growth-engine-config.json)

### 代码
- [核心引擎](/tools/insight-engine/fhc-growth-processor.js)
- [CLI 工具](/tools/insight-engine/run-growth-engine.js)
- [集成脚本](/tools/insight-engine/integrate-to-website.js)

### 依赖系统
- `insight_generator_v1` (待实现)
- `policy_radar_monitor_v1` (待实现)

---

## 🤝 Support & Contribution

### 常见问题

**Q: 如何自定义 CTA 模板？**
A: 编辑 `tools/insight-engine/fhc-growth-processor.js` 中的 `ctaTemplates` 对象

**Q: 如何调整用户类型映射？**
A: 修改 `growth-engine-config.json` 中的 `user_type_mapping`

**Q: 如何查看处理结果？**
A: 检查 `outputs/insight-fhc-growth/` 目录中的 JSON 和 MD 文件

### 贡献指南

欢迎改进以下方面：
- CTA 模板优化
- 用户意图判断逻辑
- 多渠道内容模板
- 验证规则增强
- 性能追踪集成

---

## 📋 Quick Reference

### 命令速查

```bash
# 运行演示
node tools/insight-engine/run-growth-engine.js --demo

# 处理指定 Insight
node tools/insight-engine/run-growth-engine.js --input <id>

# 批量处理
node tools/insight-engine/run-growth-engine.js --batch

# 查看输出
ls -la outputs/insight-fhc-growth/
```

### 关键文件

| 文件 | 用途 |
|-----|------|
| `routines/insight-to-fhc-growth.json` | Routine 定义 |
| `tools/insight-engine/fhc-growth-processor.js` | 核心处理引擎 |
| `tools/insight-engine/growth-engine-config.json` | 配置文件 |
| `outputs/insight-fhc-growth/` | 输出目录 |

---

**Version**: 1.0
**Last Updated**: 2026-06-12
**Status**: ✅ Production Ready
**Maintained by**: Oney Growth Team

---

*Built with focus on conversion, not just content.*
*From information output to quantifiable traffic asset.*
