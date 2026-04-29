#!/usr/bin/env node

/**
 * Integrate Growth Engine CTAs into live website
 *
 * This script takes Growth Engine outputs and integrates the enhanced CTAs
 * into the article.html file.
 */

const fs = require('fs');
const path = require('path');

class WebsiteIntegrator {
  constructor() {
    this.articleHtmlPath = path.join(__dirname, '../../article.html');
    this.outputsDir = path.join(__dirname, '../../outputs/insight-fhc-growth');
  }

  /**
   * Load Growth Engine output for an article
   */
  loadGrowthOutput(insightId) {
    const files = fs.readdirSync(this.outputsDir);
    const matchingFile = files.find(f =>
      f.includes(insightId.toLowerCase().replace(/[^a-z0-9]/g, '-')) &&
      f.endsWith('.json')
    );

    if (!matchingFile) {
      console.log(`⚠️  No Growth Engine output found for: ${insightId}`);
      return null;
    }

    const filepath = path.join(this.outputsDir, matchingFile);
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));

    console.log(`✓ Loaded Growth Engine output: ${matchingFile}`);
    return data;
  }

  /**
   * Generate CTA HTML from Growth Engine output
   */
  generateCTAHtml(growthData, position = 'mid') {
    const cta = position === 'mid'
      ? growthData.cta_blocks.mid_article
      : growthData.cta_blocks.end_article;

    // Convert markdown-style links to HTML
    const ctaHtml = cta
      .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" style="color:var(--accent-light);text-decoration:underline;">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    return `
        <div class="article-cta" style="background:var(--card);border:1px solid var(--accent);border-radius:16px;padding:32px;margin:40px 0;text-align:center;">
          <h3 style="font-size:22px;font-weight:700;margin-bottom:12px;">
            ${position === 'mid' ? 'Check Your Position' : 'Ready to Take Action?'}
          </h3>
          <p style="color:var(--text-muted);margin-bottom:20px;font-size:15px;">
            ${ctaHtml}
          </p>
          <a href="https://fhc.oneyco.com.au?utm_source=insights&utm_medium=article&utm_campaign=fhc-growth" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:8px;padding:16px 36px;border-radius:14px;font-weight:600;font-size:16px;text-decoration:none;background:linear-gradient(135deg,var(--accent-light),var(--accent));color:#000;transition:all 0.25s;">
            Start Free Health Check →
          </a>
        </div>`;
  }

  /**
   * Create enhanced article content with CTAs
   */
  createEnhancedContent(originalContent, growthData) {
    // Split content into paragraphs
    const paragraphs = originalContent.split('</p>');

    // Find midpoint for mid-article CTA
    const midPoint = Math.floor(paragraphs.length / 2);

    // Insert mid-article CTA
    const midCTA = this.generateCTAHtml(growthData, 'mid');
    paragraphs.splice(midPoint, 0, midCTA);

    // Rejoin content
    let enhancedContent = paragraphs.join('</p>');

    // Replace existing end CTA or add new one
    const endCTA = this.generateCTAHtml(growthData, 'end');

    // Look for existing CTA near the end
    const existingCtaRegex = /<div class="article-cta">[\s\S]*?<\/div>/g;
    const matches = enhancedContent.match(existingCtaRegex);

    if (matches && matches.length > 0) {
      // Replace the last CTA
      const lastCTA = matches[matches.length - 1];
      const lastIndex = enhancedContent.lastIndexOf(lastCTA);
      enhancedContent =
        enhancedContent.substring(0, lastIndex) +
        endCTA +
        enhancedContent.substring(lastIndex + lastCTA.length);
    } else {
      // Add end CTA before disclaimer
      const disclaimerIndex = enhancedContent.indexOf('<p class="disclaimer">');
      if (disclaimerIndex > -1) {
        enhancedContent =
          enhancedContent.substring(0, disclaimerIndex) +
          endCTA + '\n\n        ' +
          enhancedContent.substring(disclaimerIndex);
      }
    }

    return enhancedContent;
  }

  /**
   * Generate article summary page with multi-channel content
   */
  generateArticleSummaryPage(growthData) {
    const articleId = growthData.article_title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#1A1A2E">
  <title>${growthData.seo.title}</title>
  <meta name="description" content="${growthData.seo.description}">
  <meta name="keywords" content="${growthData.seo.keywords.join(', ')}">
  <link rel="icon" type="image/svg+xml" href="/assets/svg/oney-icon.svg">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/brand.css">
  <style>
    :root {
      --bg: #1A1A2E;
      --card: #252540;
      --border: #3D3D5C;
      --accent: #1FAD73;
      --accent-light: #2ECC85;
      --text: #ffffff;
      --text-muted: #a3a3b8;
    }
    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 40px 20px;
      max-width: 900px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 60px;
      padding-bottom: 30px;
      border-bottom: 2px solid var(--border);
    }
    .header h1 {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 12px;
    }
    .badge {
      display: inline-block;
      background: rgba(31,173,115,0.15);
      color: var(--accent-light);
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 20px;
    }
    .section {
      margin-bottom: 50px;
      padding: 30px;
      background: var(--card);
      border-radius: 16px;
      border: 1px solid var(--border);
    }
    .section h2 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--accent-light);
    }
    .section h3 {
      font-size: 16px;
      font-weight: 600;
      margin: 20px 0 10px;
      color: var(--text);
    }
    .section p {
      color: var(--text-muted);
      margin-bottom: 12px;
    }
    pre {
      background: var(--bg);
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      color: var(--text-muted);
      font-size: 14px;
      line-height: 1.6;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .meta-item {
      background: var(--bg);
      padding: 16px;
      border-radius: 8px;
    }
    .meta-label {
      font-size: 12px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .meta-value {
      font-size: 18px;
      font-weight: 700;
      color: var(--accent-light);
    }
    .cta-preview {
      background: linear-gradient(135deg, rgba(31,173,115,0.1), rgba(46,204,133,0.05));
      padding: 24px;
      border-radius: 12px;
      border: 2px dashed var(--accent);
      margin: 20px 0;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, var(--accent-light), var(--accent));
      color: #000;
      padding: 14px 32px;
      border-radius: 12px;
      font-weight: 600;
      text-decoration: none;
      margin-top: 16px;
      transition: transform 0.2s;
    }
    .btn:hover {
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="badge">${growthData.intent_level} Intent • ${growthData.target_user}</div>
    <h1>${growthData.article_title}</h1>
    <p style="color:var(--text-muted);margin-top:12px;">Growth Engine Analysis & Multi-Channel Content</p>
  </div>

  <div class="section">
    <h2>🎯 Growth Analysis</h2>
    <div class="meta-grid">
      <div class="meta-item">
        <div class="meta-label">Target User</div>
        <div class="meta-value">${growthData.target_user.replace('_', ' ')}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Intent Level</div>
        <div class="meta-value">${growthData.intent_level}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">CTA Strategy</div>
        <div class="meta-value">${growthData.cta_strategy.replace('_', ' ')}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Confidence</div>
        <div class="meta-value">${growthData.confidence}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>📍 CTA Blocks</h2>

    <h3>Mid-Article CTA</h3>
    <div class="cta-preview">
      <p>${growthData.cta_blocks.mid_article}</p>
    </div>

    <h3>End-Article CTA</h3>
    <div class="cta-preview">
      <p>${growthData.cta_blocks.end_article}</p>
      <a href="https://fhc.oneyco.com.au" class="btn">Start Free Health Check →</a>
    </div>
  </div>

  <div class="section">
    <h2>💡 FHC Value Integration</h2>
    <p>${growthData.fhc_integration}</p>
  </div>

  <div class="section">
    <h2>📱 Multi-Channel Versions</h2>

    <h3>小红书 (XHS)</h3>
    <pre>${growthData.xhs_version}</pre>

    <h3>LinkedIn</h3>
    <pre>${growthData.linkedin_version}</pre>
  </div>

  <div class="section">
    <h2>🔍 SEO Meta</h2>
    <p><strong>Title:</strong> ${growthData.seo.title}</p>
    <p><strong>Description:</strong> ${growthData.seo.description}</p>
    <p><strong>Keywords:</strong> ${growthData.seo.keywords.join(', ')}</p>
  </div>

  <div class="section">
    <h2>🎯 Funnel Design</h2>
    <p><strong>Entry Point:</strong> ${growthData.funnel_design.entry_point}</p>
    <p><strong>CTA Type:</strong> ${growthData.funnel_design.cta_type}</p>
    <p><strong>Landing Target:</strong> ${growthData.funnel_design.landing_target}</p>
    <p><strong>Expected User Action:</strong> ${growthData.funnel_design.expected_user_action}</p>
    <div style="margin-top:16px;padding:16px;background:var(--bg);border-radius:8px;">
      <p><strong>Conversion Hypothesis:</strong></p>
      <p style="color:var(--accent-light);">${growthData.conversion_hypothesis}</p>
    </div>
  </div>

  <div style="text-align:center;margin-top:60px;padding-top:30px;border-top:1px solid var(--border);">
    <p style="color:var(--text-muted);font-size:14px;">
      <a href="article.html?id=${articleId}" style="color:var(--accent-light);">View Original Article</a> •
      <a href="insights.html" style="color:var(--accent-light);">Back to Insights</a>
    </p>
    <p style="color:var(--text-muted);font-size:12px;margin-top:12px;">
      Generated by Insight → FHC Growth Engine v1.0
    </p>
  </div>
</body>
</html>`;

    const filename = `${articleId}-growth.html`;
    const filepath = path.join(__dirname, '../../', filename);

    fs.writeFileSync(filepath, htmlContent);
    console.log(`✓ Created summary page: ${filename}`);

    return filename;
  }

  /**
   * Main integration process
   */
  integrate(insightId) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Integrating Growth Engine CTAs: ${insightId}`);
    console.log(`${'='.repeat(60)}\n`);

    // Load Growth Engine output
    const growthData = this.loadGrowthOutput(insightId);

    if (!growthData) {
      return null;
    }

    // Generate summary page
    const summaryPage = this.generateArticleSummaryPage(growthData);

    console.log('\n📊 Integration Summary:');
    console.log(`   Intent Level: ${growthData.intent_level}`);
    console.log(`   CTA Strategy: ${growthData.cta_strategy}`);
    console.log(`   Summary Page: ${summaryPage}`);
    console.log(`   Preview: http://localhost:8000/${summaryPage}`);
    console.log('');

    return {
      growthData,
      summaryPage
    };
  }
}

// CLI interface
if (require.main === module) {
  const integrator = new WebsiteIntegrator();

  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Website Integration Tool

Usage:
  node integrate-to-website.js <insight-id>

Examples:
  node integrate-to-website.js two-rate-rises-first-home-buyers-2026
  node integrate-to-website.js how-to-check-your-financial-health

This will:
1. Load Growth Engine output for the specified insight
2. Generate an enhanced article summary page with CTAs
3. Create a live preview page you can test
`);
    process.exit(0);
  }

  const insightId = args[0];
  integrator.integrate(insightId);
}

module.exports = WebsiteIntegrator;
