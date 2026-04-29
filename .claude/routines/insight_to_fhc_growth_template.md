# Insight → FHC Growth Engine - Execution Template

## 使用方法

当你需要执行此 routine 时，提供以下信息：

```
执行 insight_to_fhc_growth_v1

输入：
- 文章标题：[标题]
- 文章内容：[内容或链接]
- 用户类型：[first home buyer / investor / refinance]
- 当前热点：[policy / rates / affordability]
```

---

## 执行流程

Claude Code 将自动：

1. **分析文章** → 识别目标用户和痛点
2. **设计转化** → 确定最优 CTA 策略
3. **增强内容** → 注入 FHC 相关 CTA
4. **多渠道改编** → 生成小红书、LinkedIn 版本
5. **输出完整包** → 保存到 `/outputs/insight-fhc-growth/`

---

## 输出文件结构

```
outputs/insight-fhc-growth/
├── YYYY-MM-DD-topic/
│   ├── main-article.md          # 增强后的主文章
│   ├── xhs-version.md           # 小红书版本
│   ├── linkedin-version.md      # LinkedIn版本
│   ├── seo-metadata.json        # SEO元数据
│   ├── funnel-design.json       # 转化漏斗设计
│   └── analysis.json            # 分析和策略
```

---

## 快速命令

```bash
# 执行routine（手动触发）
Claude Code: "执行 insight_to_fhc_growth_v1，输入：[文章信息]"

# 查看历史输出
ls outputs/insight-fhc-growth/

# 查看最新输出
cat outputs/insight-fhc-growth/$(ls -t outputs/insight-fhc-growth/ | head -1)/analysis.json
```

---

## 注意事项

⚠️ **人工Review点**：
- CTA 是否自然融入
- 是否过度推销
- 转化路径是否清晰

✅ **自动化部分**：
- 用户匹配
- 内容改编
- SEO优化
- 文件输出

❌ **禁止自动化**：
- 发布到网站
- 发送到社交媒体
- 修改生产环境
