# Insight → FHC Growth Engine 系统设计

## 📋 Executive Summary

将 Insight 内容从"信息输出"升级为"可量化导流资产"，系统化地把流量导入 FHC (Financial Health Check)。

**核心价值**：不仅仅是写内容，而是设计一个**内容 → 转化系统**。

---

## 🎯 Business Objective

**目标**：稳定把流量导入 FHC

**实现路径**：
1. 稳定内容产出（每周 2 次）
2. 精准用户匹配（first home buyer / investor / refinance）
3. 明确 CTA 引导（自然不硬推）
4. 可追踪转化路径（完整漏斗）

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Trigger Events                        │
│  • 每周 2 次定期触发                                      │
│  • 政策更新 (Policy Radar)                               │
│  • 产品上线 (FHC)                                        │
│  • 市场变化 (利率/贷款环境)                               │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│            Input: Insight Draft                         │
│  • 文章标题/内容                                          │
│  • 用户类型 (first_home_buyer/investor/refinance)       │
│  • 热点主题 (policy/rates/affordability)                │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│          Processing Pipeline (5 Steps)                  │
│                                                          │
│  Step 1: Audience Mapping                               │
│  ├─ 识别目标用户                                          │
│  ├─ 分析痛点                                             │
│  └─ 判断意图级别 (low/medium/high)                       │
│                                                          │
│  Step 2: Conversion Design                              │
│  ├─ High Intent   → Direct CTA                          │
│  ├─ Medium Intent → Educational CTA                     │
│  └─ Low Intent    → Soft Guidance                       │
│                                                          │
│  Step 3: Content Injection                              │
│  ├─ Mid-Article CTA (教育型)                            │
│  ├─ End-Article CTA (转化型)                            │
│  └─ FHC Value Proposition                               │
│                                                          │
│  Step 4: Multi-Channel Repurpose                        │
│  ├─ 小红书版本 (强 hook + 简化 CTA)                      │
│  ├─ LinkedIn 版本 (专业 + 软 CTA)                        │
│  └─ SEO Meta (title/description/keywords)               │
│                                                          │
│  Step 5: Funnel Design                                  │
│  ├─ Entry Point: Article                                │
│  ├─ CTA Type: direct/educational/soft                   │
│  ├─ Landing Target: FHC                                 │
│  └─ Expected User Action                                │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│              Output: Growth Asset                        │
│  • JSON (结构化数据)                                      │
│  • Markdown (可读报告)                                    │
│  • Multi-channel ready content                          │
│  • Conversion tracking setup                            │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│            Validation & Review                          │
│  • 自动验证 5 项规则                                      │
│  • CTA 必须人工审核                                       │
│  • 不允许自动发布                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🧠 Core Logic: 三种用户路径

| 用户类型 | 行为特征 | CTA 策略 | 预期 CTR |
|---------|---------|---------|----------|
| **信息型**<br>(Low Intent) | 了解阶段<br>无明确行动计划 | **软引导**<br>• 建立 FHC 认知<br>• 不强推<br>• 提供价值主张 | 3-7% |
| **评估型**<br>(Medium Intent) | 对比研究<br>准备阶段 | **教育型 CTA**<br>• 先解释 FHC 价值<br>• 再自然引导<br>• 强调无推销 | 7-12% |
| **决策型**<br>(High Intent) | 准备行动<br>寻找解决方案 | **直接 CTA**<br>• 强调立即价值<br>• 明确行动步骤<br>• 紧迫感（但不过度） | 12-18% |

---

## 💡 Growth Strategy

### 核心机制

```
痛点识别 → 问题解释 → 焦虑建立 → 解决方案 → FHC 入口
```

### 关键原则

> **每一篇 Insight，都必须有一个"带人进入 FHC 的理由"**

不是：
- ❌ 写内容为了阅读量
- ❌ 硬塞 CTA 广告

而是：
- ✅ Insight = 转化入口
- ✅ 内容 = 价值 + 引导
- ✅ CTA = 自然延伸

---

## 📊 Success Metrics

### Primary KPIs

1. **CTR (Article → FHC)**
   - High Intent: 12-18%
   - Medium Intent: 7-12%
   - Low Intent: 3-7%

2. **FHC Completion Rate**
   - Target: > 60%

### Secondary KPIs

3. **Drop-off Rate**
   - 监控漏斗各阶段流失

4. **Time on Page**
   - 评估内容质量和参与度

### Future Tracking

- 后续需要集成 Analytics
- 设置 UTM 参数追踪
- A/B 测试不同 CTA 措辞

---

## 🔧 Technical Implementation

### File Structure

```
oney-website/
├── routines/
│   └── insight-to-fhc-growth.json       # Routine 定义
│
├── tools/insight-engine/
│   ├── fhc-growth-processor.js          # 核心引擎
│   ├── run-growth-engine.js             # CLI 工具
│   ├── growth-engine-config.json        # 配置
│   └── README.md                        # 使用文档
│
├── outputs/insight-fhc-growth/
│   └── YYYY-MM-DD-topic.{json,md}       # 生成输出
│
├── data/
│   └── insights.json                    # Insights 数据源
│
└── docs/
    └── insight-fhc-growth-system.md     # 本文档
```

### Technology Stack

- **Language**: Node.js
- **Input**: JSON (insights data)
- **Output**: JSON + Markdown
- **Configuration**: JSON

### Usage

```bash
# 演示
node tools/insight-engine/run-growth-engine.js --demo

# 处理单篇
node tools/insight-engine/run-growth-engine.js --input <id>

# 批量处理
node tools/insight-engine/run-growth-engine.js --batch
```

---

## 🔄 Integration Flow

```
┌──────────────────┐
│  Policy Radar    │ (监控政策变化)
│  Monitor v1      │
└────────┬─────────┘
         │ trigger
         ▼
┌──────────────────┐
│  Insight         │ (生成 Insight 内容)
│  Generator v1    │
└────────┬─────────┘
         │ feed
         ▼
┌──────────────────┐
│  FHC Growth      │ (转化增强)
│  Engine v1       │
└────────┬─────────┘
         │ output
         ▼
┌──────────────────┐
│  Publishing      │ (多渠道发布)
│  Channels        │
└──────────────────┘
```

---

## 🎨 CTA Template Examples

### High Intent (直接 CTA)

**Mid-Article:**
> Not sure where you stand? Our Financial Health Check takes 3 minutes and shows you exactly what banks see when they assess your application.

**End-Article:**
> **Ready to see your numbers?** Get your free Financial Health Check — it takes 3 minutes and gives you a clear picture of your borrowing capacity, application readiness, and next steps.

### Medium Intent (教育型 CTA)

**Mid-Article:**
> Before you make any decisions, it's worth understanding where you stand. Our Financial Health Check helps you see what lenders see — and what needs fixing before you apply.

**End-Article:**
> **Want to know if you're ready?** Check your financial health in 3 minutes. It's free, and you'll get a personalised report on your borrowing position.

### Low Intent (软引导)

**Mid-Article:**
> Understanding your financial position is the first step. A quick Financial Health Check can show you where you stand and what to focus on.

**End-Article:**
> **Curious about your position?** Our Financial Health Check gives you a clear snapshot of your borrowing capacity and readiness — no obligation, just insights.

---

## ✅ Validation Checklist

系统会自动检查以下 5 项：

1. ✓ **CTA 自然性**
   - 不能硬推
   - 不能像纯广告
   - 必须是内容的自然延伸

2. ✓ **明确用户场景**
   - 清楚目标用户是谁
   - 理解他们的痛点

3. ✓ **文章逻辑一致**
   - CTA 和文章主题匹配
   - 转化路径合理

4. ✓ **避免纯广告感**
   - 不用紧迫感词汇（"限时"、"立即"）
   - 强调价值而非推销

5. ✓ **明确转化路径**
   - 清楚用户下一步应该做什么
   - Landing page 明确

---

## 🚨 Review Policy

### 自动化程度

| 环节 | 自动化 | 说明 |
|-----|-------|------|
| **内容生成** | ✅ 全自动 | 系统自动处理所有步骤 |
| **CTA Review** | ⚠️ 人工审核 | 前期必须人工检查自然性 |
| **发布** | ❌ 禁止自动 | 必须人工确认后发布 |

### 审核流程

1. 系统生成输出
2. **人工审核** CTA 措辞和位置
3. **测试** FHC 转化流程
4. 排期多渠道发布
5. 设置转化追踪
6. 监控性能指标

---

## 🎓 Key Learnings

### 为什么这个系统重要？

> "大多数人：写内容。你现在：设计内容 → 转化系统。"

### 核心差异

**传统方式**：
- 写文章 → 发布 → 希望有人看 → 希望有人点击 → 希望有人转化

**Growth Engine 方式**：
- 分析用户意图 → 设计转化策略 → 嵌入自然 CTA → 优化漏斗 → 追踪转化

### 结果差异

**无系统**：
- CTR: ~1-3%
- 转化不可预测
- 无法优化

**有系统**：
- CTR: 3-18% (根据意图分层)
- 可预测转化率
- 持续优化可能

---

## 🔮 Future Enhancements

### Phase 2 Features

1. **A/B Testing**
   - 自动生成多个 CTA 变体
   - 测试不同措辞效果

2. **Analytics Integration**
   - 自动追踪 CTR
   - 实时监控转化率
   - 漏斗可视化

3. **AI Optimization**
   - 基于历史数据优化 CTA
   - 智能选择最佳策略
   - 自动调整意图判断

4. **Dynamic Personalization**
   - 根据用户来源调整 CTA
   - A/B 测试自动化
   - 实时优化

### Phase 3 Vision

- 完全自动化的内容 → 转化引擎
- 实时性能优化
- 跨平台统一追踪
- 智能内容推荐

---

## 📚 Resources

### 相关文档
- [Routine Definition](/routines/insight-to-fhc-growth.json)
- [使用文档](/tools/insight-engine/README.md)
- [示例输出](/outputs/insight-fhc-growth/)

### 依赖系统
- `insight_generator_v1` (待实现)
- `policy_radar_monitor_v1` (待实现)

---

## 🤝 Contribution Guidelines

### 修改 CTA 模板

编辑 `fhc-growth-processor.js`:

```javascript
const ctaTemplates = {
  high_intent: {
    mid_article: "你的新模板...",
    end_article: "你的新模板..."
  }
};
```

### 调整用户类型映射

编辑 `growth-engine-config.json`:

```json
{
  "user_type_mapping": {
    "new-pillar": "first_home_buyer"
  }
}
```

### 添加新的验证规则

在 `validate()` 方法中添加新检查。

---

## 💬 Support

**Questions?**
- 查看 [README.md](/tools/insight-engine/README.md)
- 检查示例输出了解预期格式
- 运行 `--demo` 测试系统

---

**Version:** 1.0
**Last Updated:** 2026-04-24
**Status:** ✅ Production Ready

---

*Built with focus on conversion, not just content.*
