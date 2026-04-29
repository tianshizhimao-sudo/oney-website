# Website Integration Guide
## Insight → FHC Growth Engine

本指南说明如何将 Growth Engine 生成的内容集成到 live 网站。

---

## 🎯 集成概述

Growth Engine 生成的内容可以通过以下方式集成到网站：

### 方式 1：增强型文章页面（已实现）

为每篇 Insight 生成一个单独的 Growth Analysis 页面，展示：
- 完整的 Growth Analysis（用户类型、意图级别、CTA 策略）
- 增强的 CTA 块（Mid-Article + End-Article）
- 多渠道内容（小红书、LinkedIn）
- SEO Meta 数据
- 转化漏斗设计

**优点**：
- ✅ 快速实现，无需修改现有文章
- ✅ 独立页面，可以单独 A/B 测试
- ✅ 完整展示 Growth Engine 的所有功能

**访问方式**：
```
原文章: article.html?id=insight-id
增强页面: insight-id-growth.html
```

### 方式 2：直接修改 article.html（未来优化）

将 CTA 块直接嵌入到 article.html 的 JavaScript 内容中。

**优点**：
- 统一的文章体验
- 无需额外页面

**缺点**：
- 需要修改现有代码
- 每次更新需要重新编辑 article.html

---

## 🚀 如何使用

### 步骤 1: 生成 Growth Engine 数据

```bash
cd tools/insight-engine
node run-growth-engine.js --input <insight-id>
```

示例：
```bash
node run-growth-engine.js --input two-rate-rises-first-home-buyers-2026
```

### 步骤 2: 集成到网站

```bash
node integrate-to-website.js <insight-id-partial>
```

示例：
```bash
node integrate-to-website.js two-rate-rises
```

这会生成：
- `<article-title>-growth.html` - 增强型文章页面

### 步骤 3: 部署到 Live

生成的 HTML 文件已经可以直接部署：

```bash
# 文件已在项目根目录
ls *-growth.html

# 推送到 Git
git add *-growth.html
git commit -m "feat: add Growth Engine enhanced pages"
git push origin main
```

---

## 📄 已集成的文章

当前已生成以下增强页面：

| 文章标题 | Growth 页面 | Live URL |
|---------|------------|----------|
| What Two Rate Rises Mean for First Home Buyers in 2026 | `what-two-rate-rises-mean-for-first-home-buyers-in-2026-growth.html` | `oneyco.com.au/what-two-rate-rises-mean-for-first-home-buyers-in-2026-growth.html` |
| How to Check Your Financial Health | `how-to-check-your-financial-health-before-talking-to-a-broker-growth.html` | `oneyco.com.au/how-to-check-your-financial-health-before-talking-to-a-broker-growth.html` |
| The Real Cost of Loyalty | `the-real-cost-of-loyalty-staying-with-your-bank-growth.html` | `oneyco.com.au/the-real-cost-of-loyalty-staying-with-your-bank-growth.html` |

---

## 🔗 在 Insights 页面添加链接

### 选项 A: 添加 "Growth Analysis" 链接到 insights.html

在每篇 Insight 卡片上添加一个按钮：

```html
<a href="<article-id>-growth.html" class="growth-link">
  📊 View Growth Analysis
</a>
```

### 选项 B: 替换原文章链接

直接将原文章链接指向 Growth 页面：

```html
<!-- 原来 -->
<a href="article.html?id=insight-id">Read article</a>

<!-- 改为 -->
<a href="insight-id-growth.html">Read article</a>
```

---

## 🎨 定制化

### 修改 CTA 样式

编辑 `tools/insight-engine/integrate-to-website.js` 中的 `generateCTAHtml()` 方法。

### 修改页面布局

编辑 `generateArticleSummaryPage()` 方法中的 HTML 模板。

### 添加追踪参数

CTA 链接已包含 UTM 参数：

```
utm_source=insights
utm_medium=article
utm_campaign=fhc-growth
```

可以在 `integrate-to-website.js` 中修改这些参数。

---

## 📊 性能追踪

### 建议追踪的指标

1. **页面访问量**
   - Growth 页面 vs 原文章页面

2. **CTA 点击率**
   - Mid-Article CTA CTR
   - End-Article CTA CTR

3. **FHC 转化率**
   - 从 Growth 页面进入 FHC 的用户
   - 完成 FHC 的比例

4. **多渠道表现**
   - 小红书内容分享率
   - LinkedIn 内容参与度

### 实现方式

在 HTML 中添加 Google Analytics 事件追踪：

```javascript
// Mid-Article CTA Click
gtag('event', 'cta_click', {
  'event_category': 'engagement',
  'event_label': 'mid_article_cta',
  'value': 1
});

// End-Article CTA Click
gtag('event', 'cta_click', {
  'event_category': 'conversion',
  'event_label': 'end_article_cta',
  'value': 1
});
```

---

## 🔄 批量集成

为所有 Insights 生成 Growth 页面：

```bash
cd tools/insight-engine

# 方法 1: 批量处理所有
node run-growth-engine.js --batch

# 方法 2: 单独集成每篇
for id in two-rate-rises how-to-check real-cost-of-loyalty; do
  node integrate-to-website.js $id
done
```

---

## 🚨 注意事项

### SEO 考虑

- Growth 页面有独立的 SEO meta 标签
- 建议在原文章中添加 `canonical` 链接指向 Growth 页面
- 或在 Growth 页面中添加 `noindex` 避免重复内容

### 维护

- 当 Insight 内容更新时，需要重新运行 Growth Engine
- Growth 页面是静态生成的，不会自动更新

### 性能

- 每个 Growth 页面约 8-10KB
- 所有样式内联，无外部依赖
- 加载速度快

---

## 📁 文件结构

```
oney-website/
├── *-growth.html                          # 生成的 Growth 页面
├── tools/insight-engine/
│   ├── integrate-to-website.js            # 集成脚本
│   ├── run-growth-engine.js               # Growth Engine CLI
│   └── fhc-growth-processor.js            # 核心处理器
├── outputs/insight-fhc-growth/
│   └── YYYY-MM-DD-title.{json,md}         # Growth Engine 输出
└── docs/
    └── website-integration-guide.md        # 本文档
```

---

## 🎯 下一步

### 短期（已完成）
- ✅ 生成 Growth 页面
- ✅ 创建集成脚本
- ✅ 部署到 Live

### 中期
- [ ] 在 insights.html 添加 "Growth Analysis" 链接
- [ ] 添加 Google Analytics 追踪
- [ ] A/B 测试不同 CTA 措辞

### 长期
- [ ] 将 CTA 直接集成到 article.html
- [ ] 自动化内容更新流程
- [ ] 基于数据优化 CTA 策略

---

## 💡 最佳实践

### 1. 测试流程

在部署到 Live 前：
1. 本地预览 Growth 页面
2. 检查所有 CTA 链接
3. 验证 UTM 参数
4. 测试移动端显示

### 2. 内容更新

当 Insight 内容变化时：
```bash
# 重新生成 Growth 数据
node run-growth-engine.js --input <id>

# 重新集成到网站
node integrate-to-website.js <id>

# 提交更新
git add *-growth.html outputs/
git commit -m "update: refresh Growth pages"
git push
```

### 3. 性能监控

定期检查：
- Growth 页面的访问量
- CTA 点击率
- FHC 转化率
- 页面加载速度

---

## 🆘 故障排除

### 问题：找不到 Growth Engine 输出

**解决**：
```bash
# 先生成数据
node run-growth-engine.js --input <insight-id>

# 再集成
node integrate-to-website.js <insight-id-partial>
```

### 问题：生成的页面样式错误

**检查**：
- CSS 变量是否正确（:root 定义）
- 字体是否加载（Google Fonts）
- 浏览器兼容性

### 问题：CTA 链接不工作

**验证**：
- FHC URL 是否正确
- UTM 参数格式
- 链接是否包含 `https://`

---

**Last Updated:** 2026-04-29  
**Version:** 1.0  
**Status:** ✅ Production Ready
