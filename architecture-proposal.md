# Oney & Co 网站架构方案 — 深度分析

> **日期:** 2026-02-12
> **状态:** 决策待定
> **关键依赖:** 商标申请结果 (TM 2623891, deadline 2026-02-13)

---

## 0. 关键前提 — 商标现实

在讨论任何方案之前，必须正视一个核心事实：

| 事实 | 影响 |
|------|------|
| "Oney & Co" 商标在 Class 36 (金融/broker) 被 ONEY BANK 阻挡 | **不能**在金融服务类别获得商标保护 |
| Class 41 (教育/培训) 可能通过 | 可以保护 mentoring/education 品牌 |
| ONEY BANK 是法国公司，目前未在澳洲积极运营 | 短期风险低，但长期隐患存在 |

**这意味着：** "Oney & Co" 作为品牌，在 broker 服务上没有商标保护。用 oneyco.au 做纯 broker 站并不能解决 IP 问题 — 问题出在名字，不在域名。

---

## 1. 当前状态

### 域名
| 域名 | 用途 | 托管 |
|------|------|------|
| oneyco.com.au | 主站 | GitHub Pages (repo: oney-website) |
| tools.oneyco.com.au | 工具站 | GitHub Pages (另一个 repo) |
| oneyco.au | 未使用 | 已注册 |

### 现有页面
- `index.html` — 首页 (FHC 主推，暗色主题)
- `fhc.html` — Free Financial Health Check
- `broker.html` — Selective Brokerage (限 25 客户)
- `brokerage.html` — 另一个 brokerage 页面
- `mentoring.html` — Mentoring & Education
- `mentor.html` — 另一个 mentor 页面
- `tools/` — 工具子页面 (commercial-investment, self-assess, etc.)
- `tools-landing.html` — 工具着陆页
- `pitch-deck.html` — Pitch deck

### GitHub Pages 限制
- 每个 repo = 一个站点 (一个 CNAME)
- 子域名 (tools.oneyco.com.au) 需要独立 repo
- 不支持服务端渲染，纯静态
- 不支持 301 redirect 配置（需要 JS/meta refresh）

---

## 2. 四个方案

---

### 方案 A: 单站统一 (推荐 ⭐)

**核心思路：** 一个品牌，一个站，多个入口。oneyco.com.au 承载一切。

#### 域名分配
| 域名 | 用途 |
|------|------|
| oneyco.com.au | 唯一主站，所有服务 |
| tools.oneyco.com.au | 工具站 (保持现状) |
| oneyco.au | 301 → oneyco.com.au |

#### 页面结构 (Sitemap)
```
oneyco.com.au/
├── index.html          ← 首页: FHC 为核心入口
├── fhc.html            ← Financial Health Check 工具
├── broker.html         ← Brokerage 服务介绍
├── mentoring.html      ← Mentoring & Education
├── tools.html          ← 工具概览 (链接到 tools.oneyco.com.au)
├── about.html          ← 关于 Dong / Oney & Co
├── contact.html        ← 联系 / Calendly
└── legal/
    ├── privacy.html
    ├── credit-guide.html
    └── disclaimer.html
```

#### 信息架构
```
                    ┌─────────────────┐
                    │   oneyco.com.au │
                    │   "Financial    │
                    │   Health for    │
                    │   Everyone"     │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │   FHC    │  │  Broker  │  │ Mentoring│
        │ (免费)   │  │ (服务)   │  │ (教育)   │
        │ 主推CTA  │  │ 限额制   │  │ 新broker │
        └──────────┘  └──────────┘  └──────────┘
              │              │              │
              ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ 生成报告 │  │ 预约咨询 │  │ 预约咨询 │
        │→发给任何 │  │ Calendly │  │ Calendly │
        │  lender  │  │          │  │          │
        └──────────┘  └──────────┘  └──────────┘
```

#### 用户旅程
```
搜索/社交/推荐 → oneyco.com.au
     │
     ├─ 看到 FHC → 做体检 → 得到报告 → 发给 lender
     │                                    └─ 部分人回来找 Dong 做 broker
     │
     ├─ 直接找 broker → /broker → Calendly 预约
     │
     └─ 新 broker 找 mentoring → /mentoring → 联系
```

#### 技术实现
- 一个 GitHub Pages repo (现有 oney-website)
- tools.oneyco.com.au 保持独立 repo
- oneyco.au 通过 DNS 设置 redirect (可用 Cloudflare 免费 Page Rules)
- 或在 oneyco.au 放一个简单的 `<meta http-equiv="refresh">` 页面

#### SEO 考虑
- ✅ 所有权重集中在 oneyco.com.au
- ✅ 不分散 domain authority
- ✅ 内链自然
- ✅ 一套 sitemap.xml 管理
- ⚠️ tools 子域名有独立权重，但同根域名，影响不大

#### 优缺点
| 优点 | 缺点 |
|------|------|
| ✅ 维护成本最低 (1 个主站) | ❌ 所有服务共享一个品牌调性 |
| ✅ SEO 权重集中 | ❌ 如果 IP 出问题，所有服务受影响 |
| ✅ 品牌一致，用户不混淆 | ❌ broker 和 education 混在一起 |
| ✅ oneyco.au 不浪费 (redirect) | |
| ✅ GitHub Pages 限制下最简单 | |

#### 品牌一致性: ⭐⭐⭐⭐⭐
一个品牌、一个站、一致的视觉和信息。

---

### 方案 B: 双站分离 — 按 IP 类别分

**核心思路：** 利用两个域名，按商标类别分离服务。

#### 域名分配
| 域名 | 用途 | 对应 IP 类别 |
|------|------|--------------|
| oneyco.com.au | FHC + Mentoring + Tools | Class 41 (教育) ✅ 有商标保护 |
| oneyco.au | Broker 服务 | Class 36 (金融) ❌ 无商标保护 |
| tools.oneyco.com.au | 工具站 | 保持 |

#### 页面结构
```
oneyco.com.au/                    oneyco.au/
├── index.html (FHC 主推)         ├── index.html (Broker 首页)
├── fhc.html                      ├── residential.html
├── mentoring.html                ├── commercial.html
├── tools.html                    ├── refinance.html
├── about.html                    ├── about.html
└── contact.html                  └── contact.html
```

#### 用户旅程
```
教育/FHC 入口 → oneyco.com.au → FHC → 报告
                                       └─ "需要 broker 帮助?" → oneyco.au

Broker 入口 → oneyco.au → 服务页 → Calendly
```

#### 技术实现
- oneyco.com.au: 现有 GitHub Pages repo
- oneyco.au: 新建 GitHub Pages repo (需要新 CNAME)
- 两站之间互相链接

#### SEO 考虑
- ❌ 权重分散到两个域名
- ❌ 新域名 oneyco.au 没有任何 DA
- ⚠️ 跨域链接不如站内链接有力
- ⚠️ 需要两套 Google Search Console

#### 优缺点
| 优点 | 缺点 |
|------|------|
| ✅ 服务类别与 IP 对齐的意图 | ❌ **并不真正解决 IP 问题** (名字一样) |
| ✅ Broker 站可以更专业/聚焦 | ❌ SEO 权重分散 |
| ✅ 未来可独立发展 | ❌ 维护两个站点，工作量翻倍 |
| | ❌ 用户可能困惑两个域名 |
| | ❌ 一人公司维护两站不现实 |

#### 品牌一致性: ⭐⭐⭐
两个站用同一品牌色和设计语言可以保持一致，但用户会疑惑为什么有两个网址。

#### ⚠️ 关键问题
**把 broker 放在 oneyco.au 并不能规避 IP 风险。** 商标冲突是关于"名称"而非"域名"。只要你以 "Oney & Co" 名义提供金融服务，无论在哪个域名，都可能面临 ONEY BANK 的质疑。域名分离是假安全感。

---

### 方案 C: 品牌分层 — 子品牌策略

**核心思路：** Oney & Co 作为母品牌 (教育/FHC)，broker 服务用不同的品牌名。

#### 域名分配
| 域名 | 品牌 | 用途 |
|------|------|------|
| oneyco.com.au | Oney & Co | FHC + Mentoring + 母品牌 |
| oneyco.au | [新 broker 品牌名] 或 "Dong Mao Lending" | Broker 服务 |
| tools.oneyco.com.au | Oney Tools | 工具 |

#### 页面结构
```
oneyco.com.au/                    oneyco.au/
├── index.html (FHC + 品牌总览)   ├── index.html (Broker 首页)
├── fhc.html                      ├── 用不同品牌名
├── mentoring.html                ├── 但 "by Dong from Oney & Co"
├── tools.html                    ├── 作为个人背书
├── about.html                    └── contact.html
└── contact.html
```

#### 用户旅程
```
Oney & Co (教育品牌)
     │
     ├─ FHC → 报告 → "如需 broker, 见 Dong's lending practice"
     │                                    ↓
     │                              oneyco.au (broker 品牌)
     │
     └─ Mentoring → 联系 Dong
```

#### 技术实现
- 两个 GitHub Pages repo
- 不同的视觉系统 (或同系列微调)

#### SEO 考虑
- ❌ 权重分散
- ❌ 品牌认知分裂
- ⚠️ 但如果 broker 品牌做起来，有独立 SEO 价值

#### 优缺点
| 优点 | 缺点 |
|------|------|
| ✅ 真正规避 IP 问题 (不同品牌名) | ❌ 需要想一个新 broker 品牌名 |
| ✅ "Oney & Co" 在有保护的领域使用 | ❌ 两个品牌 = 两倍市场工作 |
| ✅ 未来如果 broker 做大可独立 | ❌ 一人公司运营两个品牌不现实 |
| | ❌ 用户可能觉得不专业/混乱 |
| | ❌ 信任需要从零建立 |

#### 品牌一致性: ⭐⭐
两个品牌天然分裂。虽然可以通过 "by Dong" 串联，但用户感知是两个不同实体。

---

### 方案 D: 单站 + 个人品牌融合

**核心思路：** oneyco.com.au 做一切，但 broker 服务以 Dong Mao 个人名义呈现（因为 ACR 本来就绑定个人/公司，不绑定商标）。

#### 域名分配
| 域名 | 用途 |
|------|------|
| oneyco.com.au | 唯一主站 |
| oneyco.au | redirect → oneyco.com.au/broker |
| tools.oneyco.com.au | 工具站 |

#### 页面结构
```
oneyco.com.au/
├── index.html          ← "Dong Mao | Oney & Co"
│                         FHC 作为主要入口
├── fhc.html            ← Financial Health Check
├── broker.html         ← "Dong Mao — Your Broker"
│                         个人品牌为主，Oney & Co 为背景
├── mentoring.html      ← "Oney & Co Mentoring"
│                         商标保护下的品牌
├── tools.html          ← 链接到 tools 子域名
├── about.html          ← Dong 的故事 + Oney & Co 使命
└── contact.html
```

#### 信息架构
```
┌─────────────────────────────────────────────┐
│              oneyco.com.au                  │
│      "Dong Mao | Oney & Co"                │
│                                             │
│  ┌─────────┐ ┌──────────┐ ┌──────────────┐ │
│  │  FHC    │ │  Broker  │ │  Mentoring   │ │
│  │ Oney &  │ │  Dong    │ │  Oney & Co   │ │
│  │ Co 品牌 │ │  Mao 个  │ │  品牌 (有IP  │ │
│  │ (公益)  │ │  人品牌  │ │  保护)       │ │
│  └─────────┘ └──────────┘ └──────────────┘ │
└─────────────────────────────────────────────┘
```

#### 用户旅程
```
任何入口 → oneyco.com.au
     │
     ├─ FHC → 做体检 → 报告 → 可选联系 Dong
     │
     ├─ 找 broker → 看到 Dong 的专业背景 → 预约
     │    (oneyco.au 也能直达这里)
     │
     └─ 找 mentoring → Oney & Co Mentoring → 联系
```

#### 技术实现
- 主站: 现有 GitHub Pages repo
- oneyco.au: Cloudflare redirect 到 oneyco.com.au/broker
  - 或者: 简单的 index.html `<meta refresh>` 跳转
- tools.oneyco.com.au: 保持现状

#### SEO 考虑
- ✅ 所有权重集中
- ✅ "Dong Mao broker Sydney" 个人品牌 SEO
- ✅ "Oney & Co financial health check" 品牌 SEO
- ✅ oneyco.au redirect 不分散权重
- ✅ 个人品牌 + 公司品牌双重索引

#### 优缺点
| 优点 | 缺点 |
|------|------|
| ✅ 维护成本最低 | ❌ 品牌信息稍复杂 |
| ✅ SEO 权重集中 | ❌ 需要在页面上巧妙平衡个人/公司品牌 |
| ✅ 务实解决 IP 问题 | ❌ 如果未来有合伙人，个人品牌需调整 |
| ✅ Broker 用个人名义，合法合规 | |
| ✅ oneyco.au 不浪费 (快捷入口) | |
| ✅ 一人公司最自然的呈现 | |

#### 品牌一致性: ⭐⭐⭐⭐
个人品牌 + 公司品牌的混合在 solo practitioner 中非常常见且自然。Hunter Galloway 就是这么做的。

---

## 3. 方案对比总结

| 维度 | 方案 A (单站统一) | 方案 B (双站分离) | 方案 C (子品牌) | 方案 D (单站+个人品牌) |
|------|:-:|:-:|:-:|:-:|
| 维护成本 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| IP 合规 | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| SEO 效果 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 品牌一致性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| 用户体验 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| 未来扩展性 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 实施难度 | 简单 | 中等 | 高 | 简单 |

---

## 4. 推荐方案: D (单站 + 个人品牌融合)

### 为什么选 D

**方案 A 的简单 + IP 风险的务实应对 = 方案 D**

1. **IP 问题的本质：** 商标冲突在于 "Oney" 这个名字 + Class 36，不在于域名。分域名（方案 B）是假安全感。真正的解决思路是：
   - **有 IP 保护的领域 (教育/FHC):** 大方用 "Oney & Co" 品牌
   - **无 IP 保护的领域 (broker):** 以个人名义 "Dong Mao" 为主，"Oney & Co" 为辅

2. **一人公司的现实：** Dong 就是 Oney & Co。客户找的是 Dong 这个人，不是一个公司。个人品牌在 broker 行业本就是常态 (Hunter Galloway, Chris Bates, etc.)。

3. **维护成本：** 一个站，一个 repo，一套设计。oneyco.au 做快捷入口，零额外维护。

4. **SEO 最优：** 所有内容在一个域名下，权重集中。"Dong Mao mortgage broker Sydney" + "Oney Co financial health check" 双关键词策略。

5. **未来灵活：**
   - 如果商标最终在 Class 36 通过 → 可以把 broker 页面也全面品牌化
   - 如果需要分离 → 随时可以把 oneyco.au 独立出去
   - 如果加合伙人 → 个人品牌页面可以扩展为团队页面

### 具体实施步骤

#### 第一步: oneyco.au redirect (30 分钟)
```
# 选项 1: Cloudflare (推荐)
# 在 Cloudflare DNS 设置 Page Rule:
# oneyco.au/* → 301 redirect → https://oneyco.com.au/broker

# 选项 2: GitHub Pages
# 新建 repo，只放一个 index.html:
<meta http-equiv="refresh" content="0;url=https://oneyco.com.au/broker">
```

#### 第二步: 调整现有页面 (2-4 小时)
- `index.html`: 保持 FHC 主推，hero 区域加 "Dong Mao | Oney & Co"
- `broker.html`: 标题改为 "Dong Mao — Your Broker"，副标题 "at Oney & Co"
- `mentoring.html`: 强化 "Oney & Co Mentoring" 品牌
- 新增 `about.html`: Dong 的故事 + Oney & Co 使命

#### 第三步: Landing page 策略
| 入口 | URL | 目标用户 |
|------|-----|----------|
| 名片/LinkedIn | oneyco.com.au | 所有人 |
| Broker 推广 | oneyco.au | 找 broker 的客户 |
| FHC 推广 | oneyco.com.au/fhc | 做体检的任何人 |
| Mentoring | oneyco.com.au/mentoring | 新 broker |
| Tools | tools.oneyco.com.au | Broker 同行 |

---

## 5. 关于 IP 问题的独立建议

无论选哪个方案，以下建议都适用：

1. **先确认商标结果** (deadline 2026-02-13)
   - 如果 Class 41 通过: "Oney & Co" 在教育领域安全
   - 如果全部被拒: 需要认真考虑是否继续使用 "Oney & Co" 品牌

2. **Broker 服务的合规路径**
   - ACR (信贷代表注册) 绑定的是公司名 + 个人名，不是商标
   - 以 "Oney & Co Pty Ltd" 公司名义运营 broker 服务是合法的
   - 商标只保护品牌名的市场使用权，不影响运营资质
   - **但要注意:** 如果 ONEY BANK 未来进入澳洲市场并主张权利，可能需要调整

3. **风险评估**
   - ONEY BANK 是法国公司，在澳洲没有活跃业务
   - 他们持有澳洲商标主要是防御性注册
   - 实际被追诉的概率 **低**，但不是零
   - 最稳妥做法: 在网站 broker 相关页面以个人品牌为主 (方案 D)

4. **长远考虑**
   - 如果 Oney & Co 做大，可以考虑联系 ONEY BANK 协商共存协议 (co-existence agreement)
   - 或者注册新商标 (如 "Oney & Co Australia") 尝试通过

---

## 6. oneyco.au 的最佳用法

**不要让 oneyco.au 闲置。** 即使不做独立站，它也有价值：

| 用法 | 实现 | 场景 |
|------|------|------|
| **Broker 快捷入口** | redirect → oneyco.com.au/broker | 名片、口头推荐 |
| **短链接** | oneyco.au/fhc → oneyco.com.au/fhc | 营销材料 |
| **品牌保护** | 防止他人注册 | 持有即可 |

**推荐:** 设置 redirect + 保留域名。年费 ~$20，物超所值。

---

## 7. 最终建议

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   方案 D: 单站 + 个人品牌融合                             │
│                                                          │
│   oneyco.com.au = 唯一主站 (一切都在这里)                 │
│   oneyco.au = 快捷 redirect → /broker                   │
│   tools.oneyco.com.au = 工具站 (保持不变)                 │
│                                                          │
│   品牌策略:                                               │
│   - FHC / Mentoring → "Oney & Co" 品牌 (有 IP 保护)     │
│   - Broker → "Dong Mao" 个人品牌 (at Oney & Co)         │
│   - Tools → "Oney Tools" (B2B, 教育类)                   │
│                                                          │
│   核心理由: 最低维护成本 + 最优 SEO + 务实 IP 策略        │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

这个方案最大限度地保持简单，同时为每一种可能的未来都留有余地。

---

*Prepared by CTO Agent | 2026-02-12*
