# Oney Routines 系统 - 交叉对比与总结

## 📊 Executive Summary

Oney 的自动化系统由 **3 个互相关联的 Routines** 组成，形成一个完整的内容生产 → 转化漏斗：

```
Policy Radar Monitor → Insight Generator → FHC Growth Engine
    (监控层)              (内容层)            (转化层)
```

**当前状态**：
- ✅ **FHC Growth Engine** (已实现)
- ⚠️ **Insight Generator** (已引用，待实现)
- ⚠️ **Policy Radar Monitor** (已引用，待实现)

---

## 🏗 系统架构全景图

```
┌─────────────────────────────────────────────────────────────────┐
│                    LAYER 1: 信息监控层                           │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐      │
│  │  Policy Radar Monitor v1 (待实现)                    │      │
│  │                                                       │      │
│  │  监控：                                                │      │
│  │  • RBA 政策变化                                       │      │
│  │  • 利率调整                                           │      │
│  │  • 贷款政策更新                                       │      │
│  │  • 房地产市场动态                                     │      │
│  │                                                       │      │
│  │  输出：                                                │      │
│  │  • Policy Update Events                              │      │
│  │  • Market Change Signals                             │      │
│  │  • Trigger Notifications                             │      │
│  └───────────────────┬──────────────────────────────────┘      │
│                      │                                          │
└──────────────────────┼──────────────────────────────────────────┘
                       │ trigger
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LAYER 2: 内容生产层                           │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐      │
│  │  Insight Generator v1 (待实现)                       │      │
│  │                                                       │      │
│  │  输入：                                                │      │
│  │  • Policy updates (from Layer 1)                     │      │
│  │  • User research data                                │      │
│  │  • Market trends                                     │      │
│  │  • Content calendar                                  │      │
│  │                                                       │      │
│  │  处理：                                                │      │
│  │  • 分析政策影响                                       │      │
│  │  • 识别用户痛点                                       │      │
│  │  • 生成文章框架                                       │      │
│  │  • 撰写 Insight 内容                                  │      │
│  │                                                       │      │
│  │  输出：                                                │      │
│  │  • Insight Draft (markdown)                          │      │
│  │  • Metadata (user_type, hotspot)                     │      │
│  └───────────────────┬──────────────────────────────────┘      │
│                      │                                          │
└──────────────────────┼──────────────────────────────────────────┘
                       │ feed
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LAYER 3: 转化优化层                           │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐      │
│  │  FHC Growth Engine v1 (✅ 已实现)                     │      │
│  │                                                       │      │
│  │  输入：                                                │      │
│  │  • Insight draft (from Layer 2)                      │      │
│  │  • User type classification                          │      │
│  │  • Hotspot identification                            │      │
│  │                                                       │      │
│  │  处理：                                                │      │
│  │  • Step 1: Audience Mapping                          │      │
│  │  • Step 2: Conversion Design                         │      │
│  │  • Step 3: Content Injection (CTA)                   │      │
│  │  • Step 4: Multi-channel Repurpose                   │      │
│  │  • Step 5: Funnel Design                             │      │
│  │                                                       │      │
│  │  输出：                                                │      │
│  │  • Growth-optimized article                          │      │
│  │  • Multi-channel content (XHS, LinkedIn)             │      │
│  │  • SEO meta                                          │      │
│  │  • Conversion tracking setup                         │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 三大 Routines 对比矩阵

| 维度 | Policy Radar Monitor v1 | Insight Generator v1 | FHC Growth Engine v1 |
|-----|------------------------|---------------------|---------------------|
| **状态** | ⚠️ 待实现 | ⚠️ 待实现 | ✅ 已实现 |
| **角色** | 信息雷达 | 内容生产者 | 转化优化器 |
| **核心目标** | 及时捕捉市场/政策变化 | 产出高质量 Insight 内容 | 将内容转化为 FHC 导流 |
| **触发方式** | • 实时监控<br>• RSS/API polling<br>• 定时检查 | • Policy events (被动)<br>• 定期生产 (主动)<br>• 内容日历 | • Weekly schedule<br>• Policy updates<br>• Market changes |
| **输入** | • RBA 官网<br>• 新闻源<br>• 数据 API | • Policy updates<br>• User research<br>• Content brief | • Insight draft<br>• User type<br>• Hotspot |
| **输出** | • Policy events<br>• Alert notifications | • Insight article (markdown)<br>• Metadata | • Growth-ready content<br>• Multi-channel versions<br>• CTA blocks |
| **处理复杂度** | 🟢 Low<br>(数据抓取 + 解析) | 🟡 Medium<br>(分析 + 写作) | 🟡 Medium<br>(策略设计 + 改写) |
| **自动化程度** | 🟢 100% 可全自动 | 🟡 80% (需要 review) | 🟡 85% (CTA 需 review) |
| **人工介入点** | 无（除非误报） | 内容质量检查 | CTA 自然度检查 |
| **成功指标** | • 检测准确率<br>• 响应速度 | • 内容质量<br>• 阅读时长 | • CTR (文章→FHC)<br>• FHC completion rate |
| **依赖** | 无 | Policy Radar Monitor | Insight Generator |
| **频率** | 实时/每小时 | 每周 2 次 | 每周 2 次 (同步 Generator) |
| **输出格式** | JSON events | Markdown + metadata | JSON + Markdown (双格式) |

---

## 🔄 Workflow 集成流程

### 完整的自动化链路

```
🔍 DETECT (Layer 1)
   │
   │  Policy Radar Monitor
   │  └─ 检测到：RBA 加息 0.25%
   │
   ▼
   
📝 GENERATE (Layer 2)
   │
   │  Insight Generator
   │  ├─ 分析影响：首次购房者借款能力下降
   │  ├─ 识别痛点：affordability, loan approval
   │  └─ 生成文章：《加息对首购族的真实影响》
   │
   ▼
   
🎯 OPTIMIZE (Layer 3)
   │
   │  FHC Growth Engine
   │  ├─ 判断意图：High Intent (用户急需解决方案)
   │  ├─ 设计 CTA：直接引导至 FHC
   │  ├─ 生成多渠道版本 (XHS, LinkedIn)
   │  └─ 设置转化追踪
   │
   ▼
   
📊 PUBLISH & TRACK
   └─ 发布 + 监控转化率
```

### 时间线示例

| 时间 | Layer 1 | Layer 2 | Layer 3 | 结果 |
|-----|---------|---------|---------|------|
| **Day 0, 14:30** | RBA 宣布加息 | - | - | - |
| **Day 0, 14:35** | 检测到政策变化 ✓ | - | - | Event triggered |
| **Day 0, 15:00** | - | 开始生成 Insight | - | Draft in progress |
| **Day 0, 16:00** | - | Insight 完成 ✓ | - | Ready for growth |
| **Day 0, 16:15** | - | - | Growth processing | CTA injection |
| **Day 0, 16:30** | - | - | Output ready ✓ | Ready to publish |
| **Day 0, 17:00** | - | - | - | 📢 Published |

**从政策变化到发布：~2.5 小时**

---

## 🎯 各 Routine 核心逻辑对比

### Policy Radar Monitor (监控逻辑)

```python
# 伪代码
while True:
    sources = [RBA, news_feeds, data_apis]
    
    for source in sources:
        new_data = fetch(source)
        changes = detect_changes(new_data)
        
        if is_significant(changes):
            event = {
                "type": "policy_update",
                "source": source,
                "impact_level": calculate_impact(changes),
                "affected_users": identify_affected_groups(changes)
            }
            
            trigger_downstream(event)  # → Insight Generator
    
    sleep(check_interval)
```

**核心能力**：
- ✓ 变化检测（Change Detection）
- ✓ 影响评估（Impact Assessment）
- ✓ 用户匹配（User Matching）

---

### Insight Generator (内容逻辑)

```python
# 伪代码
def generate_insight(policy_event):
    # Step 1: 分析
    analysis = {
        "policy_change": extract_key_changes(policy_event),
        "user_impact": calculate_user_impact(policy_event),
        "pain_points": identify_pain_points(policy_event)
    }
    
    # Step 2: 定位
    targeting = {
        "user_type": determine_target_user(analysis),
        "hotspot": classify_hotspot(policy_event)
    }
    
    # Step 3: 创作
    article = {
        "title": generate_title(analysis, targeting),
        "hook": craft_opening(analysis.pain_points),
        "body": write_article(analysis),
        "data_points": include_numbers(policy_event),
        "actionable_advice": generate_advice(analysis)
    }
    
    return {
        "content": article,
        "metadata": targeting
    }
```

**核心能力**：
- ✓ 影响分析（Impact Analysis）
- ✓ 痛点识别（Pain Point Detection）
- ✓ 内容框架（Content Framework）
- ✓ 数据支撑（Data-backed）

---

### FHC Growth Engine (转化逻辑)

```javascript
// 已实现
function process_for_growth(insight) {
    // Step 1: 用户意图判断
    const intent = analyze_intent(insight.content);
    // high/medium/low
    
    // Step 2: 转化策略选择
    const strategy = {
        high: "direct_cta",
        medium: "educational_cta",
        low: "soft_guidance"
    }[intent];
    
    // Step 3: CTA 注入
    const enhanced = inject_cta(insight, strategy);
    
    // Step 4: 多渠道改写
    const multi_channel = {
        xhs: repurpose_for_xhs(enhanced),
        linkedin: repurpose_for_linkedin(enhanced),
        seo: generate_seo_meta(enhanced)
    };
    
    // Step 5: 漏斗设计
    const funnel = design_conversion_path(intent, insight.user_type);
    
    return {
        enhanced_content,
        multi_channel,
        funnel,
        tracking_setup
    };
}
```

**核心能力**：
- ✅ 意图判断（Intent Detection）
- ✅ 策略选择（Strategy Selection）
- ✅ CTA 生成（CTA Generation）
- ✅ 多渠道适配（Multi-channel）
- ✅ 漏斗设计（Funnel Design）

---

## 📈 价值递增模型

每一层都在上一层的基础上增值：

| Layer | 输入价值 | 输出价值 | 增值 |
|-------|---------|---------|------|
| **Layer 1**<br>Policy Radar | Raw data<br>(公开信息) | Structured events<br>(结构化事件) | ↑ **10x**<br>(从噪音到信号) |
| **Layer 2**<br>Insight Generator | Events<br>(事件数据) | Quality content<br>(高质量内容) | ↑ **50x**<br>(从数据到洞察) |
| **Layer 3**<br>FHC Growth | Content<br>(内容资产) | Conversion asset<br>(转化资产) | ↑ **200x**<br>(从阅读到转化) |

**最终乘数效应**：10x × 50x × 200x = **100,000x**

原始数据 → 可转化的导流资产

---

## 🔑 关键设计原则对比

### Policy Radar Monitor

**原则**：**速度 > 完美**

- 快速检测比完美分析更重要
- 宁可误报，不能漏报（可人工过滤）
- 实时性是核心竞争力

### Insight Generator

**原则**：**质量 > 数量**

- 一篇高质量胜过十篇平庸
- 必须有独特价值（not just 新闻转述）
- 数据支撑 + 可执行建议

### FHC Growth Engine

**原则**：**自然 > 强推**

- CTA 必须是内容的自然延伸
- 避免"纯广告感"
- 用户价值优先，转化其次

---

## 🚨 依赖关系与风险

### 依赖链

```
Policy Radar (L1)
    ↓ 
    └─► [Event] ─► Insight Generator (L2)
                      ↓
                      └─► [Draft] ─► FHC Growth (L3)
                                        ↓
                                        └─► [Asset] ─► Publish
```

### 单点故障分析

| 如果失败... | 影响范围 | 缓解方案 |
|-----------|---------|---------|
| **L1 挂了** | 🔴 全链路停止 | • 手动触发 L2<br>• 内容日历兜底 |
| **L2 挂了** | 🟡 无新内容 | • 使用已有 drafts<br>• 人工撰写 |
| **L3 挂了** | 🟢 可发原文 | • 直接发 L2 输出<br>• 后补 CTA |

**关键发现**：
- Layer 1 是最脆弱的（外部依赖多）
- Layer 3 是最可替代的（可人工）
- 应优先稳定 Layer 1 & 2

---

## 💡 交叉优化机会

### 1. 反馈回路（Feedback Loop）

```
FHC Growth (L3) 的转化数据
    ↓
    └─► 优化 Insight Generator (L2) 的选题
            ↓
            └─► 优化 Policy Radar (L1) 的监控重点
```

**实现方案**：
- L3 追踪哪些主题 CTR 最高
- L2 多写高转化主题
- L1 优先监控高价值政策类别

### 2. 预测式生产

```
Policy Radar 检测到早期信号
    ↓
    └─► 提前生成 Insight draft
            ↓
            └─► 政策正式宣布时立即发布
```

**竞争优势**：从"2.5 小时响应"到"即时发布"

### 3. A/B 测试系统

在 L3 (Growth Engine) 中：
- 同一文章生成 3 种 CTA 变体
- 追踪各自转化率
- 自动优化 CTA 模板

---

## 📊 成功指标体系

### Layer 1: Policy Radar Monitor

| 指标 | 目标 | 测量方式 |
|-----|------|---------|
| **检测准确率** | > 95% | 真阳性 / (真阳性 + 假阳性) |
| **响应速度** | < 5 min | 政策发布 → 事件触发 |
| **漏报率** | < 2% | 人工验证 vs 自动检测 |

### Layer 2: Insight Generator

| 指标 | 目标 | 测量方式 |
|-----|------|---------|
| **内容质量** | > 4.0/5.0 | 人工评分 |
| **生产速度** | < 1.5 hr | Event → Draft |
| **阅读时长** | > 3 min | Analytics |

### Layer 3: FHC Growth Engine

| 指标 | 目标 | 测量方式 |
|-----|------|---------|
| **CTR (文章→FHC)** | 8-15% | 点击 / 页面访问 |
| **FHC Completion** | > 60% | 完成 / 开始 |
| **多渠道覆盖** | 3+ channels | XHS + LinkedIn + Web |

### 端到端指标

| 指标 | 目标 | 说明 |
|-----|------|------|
| **Policy → Publish** | < 3 hr | 完整链路速度 |
| **转化成本** | < $5/lead | 内容制作成本 / FHC 完成数 |
| **内容 ROI** | > 500% | FHC 价值 / 制作成本 |

---

## 🔮 进化路线图

### Phase 1: 完成基础架构 (Current)

- [x] Layer 3: FHC Growth Engine ✅
- [ ] Layer 2: Insight Generator
- [ ] Layer 1: Policy Radar Monitor

### Phase 2: 优化与集成 (Q3 2026)

- [ ] 三层完整打通
- [ ] 追踪系统集成
- [ ] A/B 测试框架
- [ ] 反馈回路建立

### Phase 3: 智能化升级 (Q4 2026)

- [ ] AI 优化 CTA 措辞
- [ ] 自动选题（基于转化数据）
- [ ] 预测式内容生产
- [ ] 个性化内容变体

### Phase 4: 规模化 (2027)

- [ ] 日更内容能力
- [ ] 多产品线支持（beyond FHC）
- [ ] 跨语言版本（中英双语）
- [ ] 完全自动化发布

---

## 🎓 关键洞察

### 1. **分层设计的优势**

❌ 单一巨型 Routine：
```
检测 + 生成 + 优化 (一个黑盒)
```
- 难以调试
- 难以优化
- 难以替换

✅ 三层分离：
```
检测 → 生成 → 优化 (三个模块)
```
- 各自优化
- 独立测试
- 灵活替换

### 2. **渐进式实现策略**

你的选择：**先做 Layer 3**

✓ 正确！因为：
1. L3 最接近转化（ROI 最明确）
2. L3 可独立运行（用现有 insights 测试）
3. L3 验证后，再投资 L1/L2 更稳妥

### 3. **自动化 vs 人工的平衡点**

| Layer | 自动化 | 人工 | 平衡点 |
|-------|--------|------|--------|
| L1 | 100% | 0% | ✓ 适合全自动 |
| L2 | 70% | 30% | ✓ AI 生成 + 人工润色 |
| L3 | 85% | 15% | ✓ 自动生成 + CTA review |

**关键**：不追求 100% 自动化，而是找到最优平衡点

---

## 🔗 技术实现对比

### 实现复杂度

```
Policy Radar:     ████░░░░░░ 40% 复杂度
                  (数据抓取 + 解析)

Insight Generator: ███████░░░ 70% 复杂度
                  (分析 + LLM + 结构化输出)

FHC Growth:       ██████░░░░ 60% 复杂度
                  (策略引擎 + 模板系统)
```

### 技术栈建议

| Routine | 推荐技术 | 理由 |
|---------|---------|------|
| **Policy Radar** | Node.js + Cheerio<br>+ RSS parser | 轻量、快速 |
| **Insight Generator** | Python + OpenAI API<br>+ Langchain | AI 友好 |
| **FHC Growth** | Node.js (已实现) | 与网站技术栈一致 |

---

## 📝 Next Steps

### 立即行动 (本周)

1. **验证 Layer 3**
   ```bash
   node tools/insight-engine/run-growth-engine.js --demo
   ```
   - 测试现有实现
   - 优化 CTA 模板
   - 准备发布流程

2. **设计 Layer 2**
   - 创建 `routines/insight-generator.json`
   - 定义输入/输出 schema
   - 确定 LLM prompt 策略

3. **规划 Layer 1**
   - 列出监控源清单
   - 测试数据抓取可行性
   - 设计事件格式

### 短期目标 (本月)

- [ ] Layer 3: 发布第一篇 growth-optimized insight
- [ ] Layer 2: 实现 MVP（手动触发）
- [ ] Layer 1: Prototype（监控 RBA 官网）

### 中期目标 (本季度)

- [ ] 三层完全打通
- [ ] 每周自动生产 2 篇
- [ ] CTR 达到 8%+

---

## 🎯 总结

### 三大 Routines，三个核心问题

| Routine | 核心问题 | 解决方案 |
|---------|---------|---------|
| **Policy Radar** | **什么值得写？** | 监控市场，捕捉信号 |
| **Insight Generator** | **怎么写得好？** | AI 辅助，数据支撑 |
| **FHC Growth** | **如何转化？** | 策略设计，自然引导 |

### 系统的真正价值

不是"自动化写文章"，而是：

> **从市场信号到可转化资产的完整价值链**

这是大多数内容团队做不到的，因为他们：
- 有 L2（人工写作）
- 缺 L1（被动响应，不主动监控）
- 缺 L3（写完就发，不优化转化）

你现在构建的是：**一个增长引擎，而不仅仅是内容工厂**

---

**Version**: 1.0  
**Created**: 2026-06-04  
**Status**: 📊 Analysis Complete

---

*"Most people write content. You're building a growth system."*
