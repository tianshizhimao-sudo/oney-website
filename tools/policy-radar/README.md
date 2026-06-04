# Policy Radar Monitor v1.0

**Layer 1** of the Oney content automation system - 实时监控银行政策变化（重点：Trust Home Loan）

## 🎯 Purpose

自动监控澳洲银行的政策变化，特别是 Trust Home Loan 相关政策，并：
1. ✅ 检测政策变化
2. ✅ 创建 Obsidian 知识库笔记
3. ✅ 触发 Insight Generator (Layer 2)
4. ✅ 最终驱动 FHC 导流 (Layer 3)

## 🔍 监控重点：Trust Home Loan

### 为什么关注 Trust？

Trust 贷款政策是**投资者和高净值客户**的核心关注点：
- 🏢 **Asset Protection**: Trust 提供资产保护
- 💰 **Tax Planning**: Tax 优化结构
- 📈 **Investment Strategy**: 多物业投资常用结构
- 🔒 **Estate Planning**: 遗产规划工具

### 常见政策变化

- **Trustee 资格要求**变化
- **Beneficiary 收入认定**标准调整
- **Trust deed 文档**要求更新
- **LVR 限制**变化（Trust vs Personal name）
- **利率差异**调整（Trust premium）

## 📊 监控范围

### Big 4 Banks
- ✅ Commonwealth Bank (CBA)
- ✅ Westpac
- ✅ ANZ
- ✅ NAB

### Other Sources
- 📰 RBA (Reserve Bank of Australia)
- 📰 Financial news (AFR, Domain)
- 📰 Industry updates

## 🚀 Quick Start

### 运行演示

```bash
node tools/policy-radar/policy-monitor.js --demo
```

这会：
1. 模拟检测到一个 Trust 政策变化
2. 创建 Obsidian 笔记
3. 触发 Insight Generator 队列

### 正常运行（需要实际网页抓取）

```bash
node tools/policy-radar/policy-monitor.js
```

### 手动添加政策变化

```bash
node tools/policy-radar/policy-monitor.js --manual
```

## 📁 Output

### Obsidian Notes
```
knowledge-vault/
└── 知识库/
    ├── Trust专题/           # Trust-related changes
    │   └── 2026-06-04-CBA-trust-home-loan.md
    └── 政策追踪/            # Other policy changes
        └── 2026-06-04-RBA-rate-change.md
```

### Event Log
```
data/
└── policy-events.json       # All detected events
```

### Insight Generator Queue
```
data/
└── insight-generator-queue.json  # Triggers for Layer 2
```

## 🔄 Workflow Integration

```
Policy Radar (Layer 1)
    ↓
    Detects: CBA updates Trust Trustee requirements
    ↓
    Creates: Obsidian note in knowledge-vault/知识库/Trust专题/
    ↓
    Triggers: Insight Generator (Layer 2)
    ↓
    Generates: "CBA Trust 贷款新规解读" article
    ↓
    Optimizes: FHC Growth Engine (Layer 3)
    ↓
    Result: Growth-optimized article with CTA → FHC
```

## 🎓 Significance Levels

| Level | Score | Trigger Insight? | Examples |
|-------|-------|-----------------|----------|
| **Critical** | 100 | ✅ Always | RBA rate change, Major lending restriction |
| **High** | 70 | ✅ Always | Trust policy change, LVR change |
| **Medium** | 40 | ⚠️ Sometimes | Documentation update, Rate special |
| **Low** | 10 | ❌ No | Website copy, Marketing content |

**Trust 相关**：无论 significance 如何，都会触发 Insight Generator

## 📊 Success Metrics

### Primary
- ✅ **Detection Accuracy** > 95%
- ✅ **Response Speed** < 5 min
- ✅ **False Negative Rate** < 2%

### Secondary
- **False Positive Rate** < 10%
- **Knowledge Base Completeness** > 90%

## 🔧 Configuration

Edit `routines/policy-radar-monitor.json` to:
- Add/remove monitoring sources
- Adjust significance thresholds
- Configure trigger rules
- Modify check intervals

## 🛠 Technical Implementation

### Current (Demo Mode)
- ✅ Simulated policy changes
- ✅ Obsidian note generation
- ✅ Event logging
- ✅ Downstream triggers

### Production (To Implement)
- [ ] Web scraping (Puppeteer/Playwright)
- [ ] RSS feed monitoring
- [ ] Content hash comparison
- [ ] Scheduled cron jobs
- [ ] Alerting system (Slack/Email)

## 📝 Obsidian Integration

### Vault Structure
```
knowledge-vault/
├── 知识库/
│   ├── 政策追踪/          # General policy tracking
│   ├── 银行信息/          # Bank-specific info
│   ├── Trust专题/         # Trust focus (Priority)
│   ├── 时间线/            # Timeline view
│   └── 分析笔记/          # Analysis notes
├── templates/
│   └── policy-change-template.md
└── .obsidian/
    └── app.json
```

### Features
- ✅ Auto-linking between related policies
- ✅ Tags for filtering (`#trust`, `#policy`, `#bank`)
- ✅ Frontmatter metadata for querying
- ✅ Timeline organization
- ✅ Graph view for connections

## 🎯 Trust-Specific Features

### Why Trust Focus?

| User Type | Impact | Why Monitor |
|-----------|--------|-------------|
| **Investors** | 🔴 High | Trust is primary structure |
| **High Net Worth** | 🔴 High | Asset protection + tax |
| **First Home Buyers** | 🟢 Low | Rarely use Trust |

### Trust Keywords Monitored
```javascript
[
  'trust',
  'family trust',
  'discretionary trust',
  'trust structure',
  'trustee',
  'beneficiary',
  'trust deed',
  'trust borrowing',
  'trust lending'
]
```

## 📈 Next Steps

### Phase 1 (Current - Demo)
- [x] Routine definition
- [x] Obsidian vault setup
- [x] Demo monitoring script
- [x] Event logging
- [x] Downstream triggers

### Phase 2 (Production)
- [ ] Web scraping implementation
- [ ] RSS monitoring
- [ ] Scheduled execution (cron)
- [ ] Alert system

### Phase 3 (Enhancement)
- [ ] ML-based significance scoring
- [ ] Automated impact analysis
- [ ] Historical trend analysis
- [ ] Predictive alerts

## 🔗 Related Documentation

- [Routine Definition](/routines/policy-radar-monitor.json)
- [Routines Cross-Analysis](/docs/routines-cross-analysis.md)
- [Obsidian Vault README](/knowledge-vault/README.md)
- [Insight Generator](/routines/insight-generator.json) *(to be created)*

## 💡 Core Principle

> **速度 > 完美**
>
> 快速检测比完美分析更重要。
> 宁可误报（可人工过滤），不能漏报。

---

**Version**: 1.0  
**Status**: 🟡 Demo Mode (Production implementation pending)  
**Last Updated**: 2026-06-04
