# Quick Start - Insight → FHC Growth Engine

快速上手指南 - 5 分钟内运行你的第一个转化优化

---

## ⚡ 5 分钟快速开始

### Step 1: 运行演示

```bash
cd /home/user/oney-website
node tools/insight-engine/run-growth-engine.js --demo
```

**预期输出**:
- ✅ 完整的转化分析
- ✅ 两个 CTA 版本（mid-article + end-article）
- ✅ 三个渠道版本（小红书、LinkedIn、SEO）
- ✅ 转化漏斗设计

**输出文件位置**:
```
outputs/insight-fhc-growth/YYYY-MM-DD-demo-two-rate-rises.{json,md}
```

---

### Step 2: 查看结果

```bash
# 查看 Markdown 可读版本
cat outputs/insight-fhc-growth/$(ls -t outputs/insight-fhc-growth/*.md | head -1)

# 或者用你喜欢的编辑器打开
code outputs/insight-fhc-growth/
```

**你会看到**:
- 🎯 用户分析（目标用户、意图级别）
- 📍 CTA 内容块（可直接复制使用）
- 💡 FHC 价值说明
- 📱 多渠道版本
- 🔍 SEO Meta
- 🎯 转化漏斗设计
- 📊 下一步行动清单

---

### Step 3: 理解输出

#### JSON 文件（供程序使用）
```json
{
  "article_title": "...",
  "intent_level": "high",
  "cta_strategy": "direct_cta",
  "cta_blocks": {
    "mid_article": "自然嵌入的 CTA...",
    "end_article": "转化型 CTA..."
  },
  "funnel_design": {
    "expected_user_action": "Complete FHC within 24 hours",
    "conversion_hypothesis": "高意图用户会直接行动，预期 CTR 12-18%"
  }
}
```

#### Markdown 文件（供人工审核）
- 完整的分析报告
- 可读格式的所有内容
- 明确的下一步行动清单

---

## 🔄 实际使用流程

### 场景 1: 处理新的 Insight 文章

假设你刚写完一篇关于"首次购房者如何应对利率上升"的文章：

```bash
# 1. 准备输入数据
# 编辑或使用现有的 data/insights.json

# 2. 运行处理器
node tools/insight-engine/run-growth-engine.js --input your-insight-id

# 3. 审核 CTA
# 打开生成的 .md 文件，检查 CTA 自然性

# 4. 复制内容
# 将 CTA 块插入原文章
# 将多渠道版本发布到相应平台

# 5. 设置追踪
# 添加 UTM 参数（见下文）
```

---

### 场景 2: 批量优化所有 Insights

如果你有多篇文章需要优化：

```bash
# 批量处理所有 Insights
node tools/insight-engine/run-growth-engine.js --batch

# 查看所有输出
ls -lh outputs/insight-fhc-growth/
```

---

## 📝 典型工作流

```
┌──────────────────────────────────────────────────────────┐
│ Step 1: 写 Insight 文章                                   │
│ ├─ 确定主题（基于 Policy Radar 或市场热点）                │
│ ├─ 识别目标用户（first_home_buyer/investor/refinance）   │
│ └─ 撰写内容（聚焦痛点和解决方案）                          │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│ Step 2: 运行 Growth Engine                               │
│ └─ node run-growth-engine.js --input <article-id>       │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│ Step 3: 审核输出                                          │
│ ├─ 检查 CTA 自然性（是否生硬？）                          │
│ ├─ 确认用户意图判断（是否准确？）                          │
│ ├─ 评估转化逻辑（是否合理？）                              │
│ └─ 调整措辞（如需要）                                     │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│ Step 4: 集成到文章                                        │
│ ├─ 在中段插入 mid_article CTA                            │
│ ├─ 在结尾插入 end_article CTA                            │
│ ├─ 添加 FHC 价值说明（自然融入内容）                       │
│ └─ 设置 SEO Meta（title, description, keywords）         │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│ Step 5: 多渠道发布                                        │
│ ├─ 网站: 原文 + 优化后的 CTA                              │
│ ├─ 小红书: 使用 xhs_version                              │
│ ├─ LinkedIn: 使用 linkedin_version                       │
│ └─ 添加 UTM 参数追踪来源                                  │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│ Step 6: 监控性能                                          │
│ ├─ 追踪 CTR (文章 → FHC)                                 │
│ ├─ 监控 FHC 完成率                                        │
│ ├─ 分析漏斗流失点                                         │
│ └─ 迭代优化（基于数据）                                   │
└──────────────────────────────────────────────────────────┘
```

---

## 🎯 实战示例

### 示例文章: "What Two Rate Rises Mean for First Home Buyers"

#### 输入
- **User Type**: first_home_buyer
- **Hotspot**: rates
- **Content**: 解释利率上升对借款能力的影响

#### 系统分析
- **Intent Level**: HIGH（包含 "ready", "need" 等关键词）
- **Pain Point**: borrowing capacity
- **Strategy**: Direct CTA

#### 生成的 CTA

**Mid-Article**:
> Not sure where you stand? Our [Financial Health Check](#fhc) takes 3 minutes and shows you exactly what banks see when they assess your application.

**End-Article**:
> **Ready to see your numbers?** [Get your free Financial Health Check](#fhc) — it takes 3 minutes and gives you a clear picture of your borrowing capacity, application readiness, and next steps.

#### 为什么有效？

1. **自然性** ✓
   - 从"借款能力下降"的痛点自然引导到"检查你的借款能力"
   - 不是硬推，而是提供解决方案

2. **价值明确** ✓
   - "3 分钟" - 降低门槛
   - "exactly what banks see" - 具体价值
   - "borrowing capacity, application readiness, next steps" - 明确输出

3. **行动清晰** ✓
   - "Get your free Financial Health Check" - 明确下一步
   - 链接直接可点击

#### 预期结果
- **CTR**: 12-18%（高意图用户）
- **Completion Rate**: > 60%
- **转化路径**: 文章 → 点击 CTA → 完成 FHC → 24小时内

---

## ⚙️ 配置自定义

### 修改 CTA 模板

编辑 `tools/insight-engine/fhc-growth-processor.js`:

```javascript
this.ctaTemplates = {
  high_intent: {
    mid_article: "你的自定义 CTA...",
    end_article: "你的自定义 CTA..."
  },
  // ... 其他意图级别
};
```

### 调整用户类型映射

编辑 `tools/insight-engine/growth-engine-config.json`:

```json
{
  "user_type_mapping": {
    "your-pillar": "first_home_buyer",
    "another-topic": "refinance"
  }
}
```

### 设置 CTA 偏好

```json
{
  "cta_preferences": {
    "tone": "helpful|professional|casual",
    "style": "conversational|formal",
    "avoid_words": ["buy now", "limited time", "act fast"]
  }
}
```

---

## 📊 追踪转化

### UTM 参数设置

为每个渠道添加 UTM 参数：

**网站文章**:
```
https://oney.com.au/fhc?utm_source=oney-insights&utm_medium=article&utm_campaign=fhc-growth-two-rate-rises
```

**小红书**:
```
utm_source=xiaohongshu&utm_medium=social&utm_campaign=fhc-growth-two-rate-rises
```

**LinkedIn**:
```
utm_source=linkedin&utm_medium=social&utm_campaign=fhc-growth-two-rate-rises
```

### 在 Google Analytics 中追踪

1. **设置目标**
   - 目标 1: FHC 页面访问
   - 目标 2: FHC 完成（thank you page）

2. **创建漏斗**
   ```
   文章页面 → FHC 页面 → FHC 完成
   ```

3. **监控指标**
   - CTR: 文章 → FHC
   - Completion Rate: FHC 访问 → 完成
   - Drop-off: 在哪一步流失

---

## ✅ 审核清单

每次生成后，检查以下 5 项：

- [ ] **CTA 自然性**: 读起来是否流畅？是否像广告？
- [ ] **用户场景清晰**: 目标用户和痛点是否明确？
- [ ] **逻辑一致**: CTA 是否与文章内容匹配？
- [ ] **避免广告感**: 是否使用了"限时"、"立即"等词汇？
- [ ] **转化路径明确**: 用户知道下一步做什么吗？

---

## 🚨 常见问题

### Q1: CTA 感觉太硬，怎么办？

**A**: 检查 `intent_level` 判断是否准确。如果文章实际是低意图，但系统判断为高意图，可以：
- 手动调整意图级别
- 修改文章内容关键词
- 自定义 CTA 模板使用更软的语气

### Q2: 如何 A/B 测试不同 CTA？

**A**: 目前需要手动操作：
1. 运行系统生成基础版本
2. 手动创建变体
3. 使用 A/B 测试工具（如 Google Optimize）
4. 追踪两个版本的 CTR

**未来**: Phase 2 将支持自动生成多个变体

### Q3: 多渠道版本需要手动调整吗？

**A**: 建议稍作调整：
- 小红书: 检查 emoji 和语气是否符合平台风格
- LinkedIn: 确保专业度和行业相关性
- SEO: 验证 keywords 是否准确

### Q4: 如何集成到现有发布流程？

**A**: 
1. 在写文章时运行 Growth Engine
2. 将生成的 CTA 复制到文章模板
3. 设置 UTM 参数
4. 按正常流程发布
5. 在 Analytics 中监控

---

## 📈 成功指标

### 第一周目标
- [ ] 运行 3 篇文章
- [ ] 设置基础追踪
- [ ] 收集初步 CTR 数据

### 第一个月目标
- [ ] 处理所有新 Insights
- [ ] CTR 达到 5% 以上（平均）
- [ ] FHC Completion Rate > 50%

### 三个月目标
- [ ] 建立稳定的内容 → 转化流程
- [ ] 根据意图分层的 CTR 达到目标
- [ ] 开始 A/B 测试优化

---

## 🔗 相关资源

- [完整规范文档](./insight-to-fhc-growth-v1-spec.md)
- [系统设计](../docs/insight-fhc-growth-system.md)
- [使用指南](../tools/insight-engine/README.md)
- [配置文件](../tools/insight-engine/growth-engine-config.json)

---

## 💡 最佳实践

### DO ✓
- 每篇新文章都运行 Growth Engine
- 人工审核每个 CTA 的自然性
- 追踪每个渠道的 CTR
- 基于数据迭代优化
- 定期更新 CTA 模板

### DON'T ✗
- 跳过人工审核直接发布
- 使用紧迫感词汇（"限时"、"立即"）
- 忽视用户意图级别
- 硬推 FHC 而不解释价值
- 在没有追踪的情况下发布

---

## 🎓 核心理念

记住这个系统的核心：

> **每一篇 Insight，都必须有一个"带人进入 FHC 的理由"**

这不仅仅是内容，而是一个完整的**转化系统**：

```
痛点 → 解释 → 焦虑 → 解决方案 → FHC 入口
```

**你在做的不是"写内容"，而是"设计转化系统"**

---

**准备好了吗？运行你的第一个转化优化！**

```bash
node tools/insight-engine/run-growth-engine.js --demo
```

---

*Last Updated: 2026-06-12*
*Questions? Check the full documentation or open an issue.*
