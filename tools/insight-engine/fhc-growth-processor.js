/**
 * Insight → FHC Growth Engine
 *
 * 将 Insight 内容系统化转化为 FHC 的流量与转化入口
 */

const fs = require('fs');
const path = require('path');

class FHCGrowthProcessor {
  constructor() {
    this.userTypes = {
      first_home_buyer: {
        painPoints: ['affordability', 'deposit', 'loan approval', 'borrowing capacity'],
        keywords: ['first home', 'deposit', 'borrowing power', 'approval']
      },
      investor: {
        painPoints: ['cash flow', 'tax optimization', 'portfolio growth', 'leverage'],
        keywords: ['investment', 'portfolio', 'negative gearing', 'cash flow']
      },
      refinance: {
        painPoints: ['high rates', 'loyalty tax', 'better deal', 'equity unlock'],
        keywords: ['refinance', 'rate comparison', 'loyalty', 'switch']
      },
      sme_owner: {
        painPoints: ['business cash flow', 'serviceability', 'commercial lending', 'working capital', 'tax reporting'],
        keywords: ['SME', 'business owner', 'self-employed', 'company', 'commercial', 'payroll', 'super']
      }
    };

    this.ctaTemplates = {
      high_intent: {
        mid_article: "Not sure where you stand? Our [Financial Health Check](#fhc) takes 3 minutes and shows you exactly what banks see when they assess your application.",
        end_article: "**Ready to see your numbers?** [Get your free Financial Health Check](#fhc) — it takes 3 minutes and gives you a clear picture of your borrowing capacity, application readiness, and next steps."
      },
      medium_intent: {
        mid_article: "Before you make any decisions, it's worth understanding where you stand. Our [Financial Health Check](#fhc) helps you see what lenders see — and what needs fixing before you apply.",
        end_article: "**Want to know if you're ready?** [Check your financial health](#fhc) in 3 minutes. It's free, and you'll get a personalised report on your borrowing position."
      },
      low_intent: {
        mid_article: "Understanding your financial position is the first step. A quick [Financial Health Check](#fhc) can show you where you stand and what to focus on.",
        end_article: "**Curious about your position?** Our [Financial Health Check](#fhc) gives you a clear snapshot of your borrowing capacity and readiness — no obligation, just insights."
      }
    };
  }

  /**
   * Step 1: 用户匹配 (Audience Mapping)
   */
  mapAudience(insightContent, userType, hotspot) {
    const userProfile = this.userTypes[userType];

    // Analyze content to identify pain points
    const identifiedPainPoints = userProfile.painPoints.filter(pain =>
      insightContent.toLowerCase().includes(pain.toLowerCase())
    );

    // Determine intent level based on content analysis
    let intentLevel = 'low';

    const highIntentKeywords = ['need', 'apply', 'ready', 'now', 'urgent'];
    const mediumIntentKeywords = ['consider', 'planning', 'prepare', 'should'];

    if (highIntentKeywords.some(kw => insightContent.toLowerCase().includes(kw))) {
      intentLevel = 'high';
    } else if (mediumIntentKeywords.some(kw => insightContent.toLowerCase().includes(kw))) {
      intentLevel = 'medium';
    }

    return {
      target_user: userType,
      pain_point: identifiedPainPoints[0] || userProfile.painPoints[0],
      intent_level: intentLevel
    };
  }

  /**
   * Step 2: 转化策略设计 (Conversion Design)
   */
  designConversion(intentLevel) {
    const strategies = {
      high: 'direct_cta',
      medium: 'educational_cta',
      low: 'soft_guidance'
    };

    return {
      strategy: strategies[intentLevel],
      cta_type: intentLevel + '_intent',
      approach: this.getApproachDescription(intentLevel)
    };
  }

  getApproachDescription(intentLevel) {
    const approaches = {
      high: '直接引导至 FHC，强调立即价值和行动紧迫性',
      medium: '先教育价值，再自然引导至 FHC',
      low: '软性提及 FHC，建立认知，不强推'
    };
    return approaches[intentLevel];
  }

  /**
   * Step 3: 内容增强 (Content Injection)
   */
  injectCTA(insightContent, intentLevel, painPoint) {
    const ctaSet = this.ctaTemplates[intentLevel + '_intent'];

    const fhcValueProposition = this.generateFHCValue(painPoint, intentLevel);

    return {
      mid_article: ctaSet.mid_article,
      end_article: ctaSet.end_article,
      fhc_integration: fhcValueProposition
    };
  }

  generateFHCValue(painPoint, intentLevel) {
    const valueProps = {
      affordability: "FHC 会计算你当前的真实借款能力，考虑所有收入、负债和生活开销，给你一个银行视角的准确数字。",
      deposit: "FHC 会评估你的存款是否足够，以及是否有更好的策略（如担保人、政府补助）来缩短时间线。",
      'loan approval': "FHC 会检查银行最看重的 5 个指标，告诉你哪些已达标，哪些需要改进，以及具体改进方案。",
      'high rates': "FHC 会对比你当前利率和市场最优利率，计算出你每年多付了多少，以及转贷后能省多少。",
      'loyalty tax': "FHC 会显示你作为老客户的「忠诚税」成本，以及转贷后的实际收益。"
    };

    return valueProps[painPoint] || "FHC 会给你一个清晰的财务健康评分，以及个性化的下一步行动建议。";
  }

  /**
   * Step 4: 多渠道拆分 (Content Repurpose)
   */
  repurposeContent(title, summary, cta, userType, intentLevel) {
    // 小红书版本 - Short-form
    const xhsVersion = this.generateXHSVersion(title, summary, cta, userType);

    // LinkedIn版本 - Professional
    const linkedinVersion = this.generateLinkedInVersion(title, summary, cta, userType);

    // SEO Meta
    const seoMeta = this.generateSEOMeta(title, summary, userType);

    return {
      xhs_version: xhsVersion,
      linkedin_version: linkedinVersion,
      seo: seoMeta
    };
  }

  generateXHSVersion(title, summary, cta, userType) {
    const hooks = {
      first_home_buyer: "🏠 首次购房必看！",
      investor: "💰 投资者必读！",
      refinance: "💡 还在多付房贷？",
      sme_owner: "💼 企业主必看！"
    };

    const hashtags = {
      first_home_buyer: "#澳洲买房 #房贷 #理财",
      investor: "#澳洲投资 #房产投资 #理财规划",
      refinance: "#房贷refinance #省钱攻略 #理财",
      sme_owner: "#澳洲创业 #企业贷款 #商业理财"
    };

    return `${hooks[userType] || hooks.first_home_buyer}

${title}

${summary}

✅ 3分钟了解你的真实借款能力
✅ 免费 + 无推销

${cta.end_article}

${hashtags[userType] || hashtags.first_home_buyer}`;
  }

  generateLinkedInVersion(title, summary, cta, userType) {
    const hashtags = {
      first_home_buyer: "#AustralianProperty #MortgageTips #FinancialPlanning",
      investor: "#PropertyInvestment #RealEstate #WealthBuilding",
      refinance: "#MortgageRefinance #FinancialWellness #SmartMoney",
      sme_owner: "#SMEFinance #BusinessLending #FinancialHealth"
    };

    return `${title}

${summary}

This matters because the financial landscape is shifting rapidly, and being prepared means understanding your position before you need to act.

${cta.end_article}

${hashtags[userType] || hashtags.first_home_buyer}`;
  }

  generateSEOMeta(title, summary, userType) {
    const keywordSets = {
      first_home_buyer: ['first home buyer', 'home loan', 'borrowing capacity', 'FHC', 'financial health'],
      investor: ['property investment', 'investment loan', 'cash flow', 'portfolio', 'FHC'],
      refinance: ['refinance', 'mortgage comparison', 'rate switch', 'loyalty tax', 'FHC'],
      sme_owner: ['SME lending', 'business loan', 'self-employed', 'commercial finance', 'business financial health']
    };

    return {
      title: title + ' | Oney Financial Health',
      description: summary.substring(0, 155) + '...',
      keywords: keywordSets[userType] || keywordSets['first_home_buyer']
    };
  }

  /**
   * Step 5: 转化路径设计 (Funnel Design)
   */
  designFunnel(intentLevel, userType) {
    const funnels = {
      high: {
        entry_point: 'article',
        cta_type: 'direct_action',
        landing_target: 'FHC',
        expected_user_action: 'Complete FHC within 24 hours',
        conversion_hypothesis: '高意图用户会直接行动，预期 CTR 12-18%'
      },
      medium: {
        entry_point: 'article',
        cta_type: 'educational_bridge',
        landing_target: 'FHC',
        expected_user_action: 'Read FHC explainer, then complete',
        conversion_hypothesis: '中意图用户需要了解价值，预期 CTR 7-12%'
      },
      low: {
        entry_point: 'article',
        cta_type: 'soft_awareness',
        landing_target: 'FHC',
        expected_user_action: 'Bookmark or return later',
        conversion_hypothesis: '低意图用户建立认知，预期 CTR 3-7%'
      }
    };

    return funnels[intentLevel];
  }

  /**
   * 主处理流程
   */
  process(input) {
    const {
      insight_title,
      insight_content,
      insight_summary,
      user_type,
      hotspot
    } = input;

    console.log(`\n🚀 Processing: ${insight_title}`);
    console.log(`   User Type: ${user_type} | Hotspot: ${hotspot}\n`);

    // Step 1: Audience Mapping
    const audienceMap = this.mapAudience(insight_content, user_type, hotspot);
    console.log(`✓ Audience mapped: ${audienceMap.intent_level} intent`);

    // Step 2: Conversion Design
    const conversionStrategy = this.designConversion(audienceMap.intent_level);
    console.log(`✓ Strategy: ${conversionStrategy.strategy}`);

    // Step 3: Content Injection
    const ctaBlocks = this.injectCTA(
      insight_content,
      audienceMap.intent_level,
      audienceMap.pain_point
    );
    console.log(`✓ CTA blocks generated`);

    // Step 4: Content Repurpose
    const multiChannel = this.repurposeContent(
      insight_title,
      insight_summary,
      ctaBlocks,
      user_type,
      audienceMap.intent_level
    );
    console.log(`✓ Multi-channel content created`);

    // Step 5: Funnel Design
    const funnel = this.designFunnel(audienceMap.intent_level, user_type);
    console.log(`✓ Funnel designed\n`);

    // Compile output
    const output = {
      article_title: insight_title,
      target_user: audienceMap.target_user,
      intent_level: audienceMap.intent_level,
      cta_strategy: conversionStrategy.strategy,
      cta_blocks: {
        mid_article: ctaBlocks.mid_article,
        end_article: ctaBlocks.end_article
      },
      fhc_integration: ctaBlocks.fhc_integration,
      xhs_version: multiChannel.xhs_version,
      linkedin_version: multiChannel.linkedin_version,
      seo: multiChannel.seo,
      funnel_design: funnel,
      conversion_hypothesis: funnel.conversion_hypothesis,
      confidence: this.calculateConfidence(audienceMap, insight_content)
    };

    // Validate
    this.validate(output);

    return output;
  }

  calculateConfidence(audienceMap, content) {
    // Simple confidence scoring
    const hasKeywords = content.length > 500;
    const clearIntent = audienceMap.intent_level !== 'low';

    if (hasKeywords && clearIntent) return 'high';
    if (hasKeywords || clearIntent) return 'medium';
    return 'low';
  }

  validate(output) {
    const checks = [
      { rule: 'CTA 自然性', pass: !output.cta_blocks.mid_article.includes('立即购买') },
      { rule: '明确用户场景', pass: !!output.target_user },
      { rule: '文章逻辑一致', pass: output.confidence !== 'low' },
      { rule: '避免纯广告感', pass: !output.cta_blocks.end_article.includes('限时') },
      { rule: '明确转化路径', pass: !!output.funnel_design.expected_user_action }
    ];

    console.log('📋 Validation:');
    checks.forEach(check => {
      console.log(`   ${check.pass ? '✓' : '✗'} ${check.rule}`);
    });
    console.log('');
  }

  /**
   * 保存输出
   */
  saveOutput(output, filename) {
    const outputDir = path.join(__dirname, '../../outputs/insight-fhc-growth');
    const filepath = path.join(outputDir, filename);

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save JSON
    fs.writeFileSync(filepath + '.json', JSON.stringify(output, null, 2));

    // Save Markdown summary
    const markdown = this.generateMarkdownSummary(output);
    fs.writeFileSync(filepath + '.md', markdown);

    console.log(`💾 Output saved to: ${filepath}.{json,md}\n`);
  }

  generateMarkdownSummary(output) {
    return `# ${output.article_title}

## 🎯 Growth Analysis

**Target User:** ${output.target_user}
**Intent Level:** ${output.intent_level}
**CTA Strategy:** ${output.cta_strategy}
**Confidence:** ${output.confidence}

---

## 📍 CTA Blocks

### Mid-Article CTA
${output.cta_blocks.mid_article}

### End-Article CTA
${output.cta_blocks.end_article}

---

## 💡 FHC Value Integration

${output.fhc_integration}

---

## 📱 Multi-Channel Versions

### 小红书 (XHS)
\`\`\`
${output.xhs_version}
\`\`\`

### LinkedIn
\`\`\`
${output.linkedin_version}
\`\`\`

---

## 🔍 SEO Meta

**Title:** ${output.seo.title}
**Description:** ${output.seo.description}
**Keywords:** ${output.seo.keywords.join(', ')}

---

## 🎯 Funnel Design

**Entry Point:** ${output.funnel_design.entry_point}
**CTA Type:** ${output.funnel_design.cta_type}
**Landing Target:** ${output.funnel_design.landing_target}
**Expected User Action:** ${output.funnel_design.expected_user_action}

**Conversion Hypothesis:**
${output.funnel_design.conversion_hypothesis}

---

## 📊 Next Steps

1. [ ] Review CTA naturalness (manual)
2. [ ] Test FHC integration flow
3. [ ] Schedule multi-channel posts
4. [ ] Set up conversion tracking
5. [ ] Monitor CTR and completion rate

---

*Generated by Insight → FHC Growth Engine v1.0*
`;
  }
}

// CLI interface
if (require.main === module) {
  const processor = new FHCGrowthProcessor();

  // Example usage
  const exampleInput = {
    insight_title: 'What Two Rate Rises Mean for First Home Buyers in 2026',
    insight_content: `The RBA has raised rates twice in 2026 — cash rate now at 4.10%. For first home buyers, this isn't just a headline. Your borrowing capacity has dropped. Here's exactly how much, and what to do about it.

When rates rise, banks adjust their serviceability calculations. This directly impacts how much you can borrow. On a household income of $120,000, the recent rate rises have reduced borrowing capacity by approximately $45,000.

This means if you were pre-approved for $650,000 six months ago, you might only qualify for $605,000 now. That's a significant gap, especially in a competitive market.

What should you do? First, understand your current position. Second, optimize your financial profile. Third, consider your timing strategy.`,
    insight_summary: 'The RBA has raised rates twice in 2026 — cash rate now at 4.10%. For first home buyers, this isn\'t just a headline. Your borrowing capacity has dropped. Here\'s exactly how much, and what to do about it.',
    user_type: 'first_home_buyer',
    hotspot: 'rates'
  };

  const result = processor.process(exampleInput);

  const date = new Date().toISOString().split('T')[0];
  processor.saveOutput(result, `${date}-two-rate-rises-first-home-buyers`);
}

module.exports = FHCGrowthProcessor;
