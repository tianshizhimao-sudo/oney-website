#!/usr/bin/env node

/**
 * CLI Tool for Insight → FHC Growth Engine
 *
 * Usage:
 *   node run-growth-engine.js --input <insight-id>
 *   node run-growth-engine.js --batch
 *   node run-growth-engine.js --demo
 */

const fs = require('fs');
const path = require('path');
const FHCGrowthProcessor = require('./fhc-growth-processor');

const INSIGHTS_DATA_PATH = path.join(__dirname, '../../data/insights.json');
const CONFIG_PATH = path.join(__dirname, './growth-engine-config.json');

class GrowthEngineCLI {
  constructor() {
    this.processor = new FHCGrowthProcessor();
    this.insights = this.loadInsights();
    this.config = this.loadConfig();
  }

  loadInsights() {
    try {
      const data = fs.readFileSync(INSIGHTS_DATA_PATH, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('❌ Error loading insights data:', error.message);
      return [];
    }
  }

  loadConfig() {
    try {
      const data = fs.readFileSync(CONFIG_PATH, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.log('⚠️  Config not found, using defaults');
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      user_type_mapping: {
        'first-home-buyers': 'first_home_buyer',
        'rate-watch': 'first_home_buyer',
        'financial-health': 'first_home_buyer',
        'refinance-ready': 'refinance',
        'investment': 'investor'
      },
      hotspot_mapping: {
        'rate-watch': 'rates',
        'financial-health': 'affordability',
        'refinance-ready': 'policy',
        'first-home-buyers': 'affordability'
      }
    };
  }

  /**
   * Process a single insight by ID
   */
  processInsight(insightId) {
    const insight = this.insights.find(i => i.id === insightId);

    if (!insight) {
      console.error(`❌ Insight not found: ${insightId}`);
      return null;
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`Processing Insight: ${insight.title}`);
    console.log(`${'='.repeat(60)}\n`);

    const userType = this.config.user_type_mapping[insight.pillar] || 'first_home_buyer';
    const hotspot = this.config.hotspot_mapping[insight.pillar] || 'rates';

    const input = {
      insight_title: insight.title,
      insight_content: this.generateFullContent(insight),
      insight_summary: insight.summary,
      user_type: userType,
      hotspot: hotspot
    };

    const result = this.processor.process(input);

    const filename = `${insight.date}-${this.slugify(insight.title)}`;
    this.processor.saveOutput(result, filename);

    return result;
  }

  /**
   * Process all insights in batch
   */
  processBatch() {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Batch Processing: ${this.insights.length} insights`);
    console.log(`${'='.repeat(60)}\n`);

    const results = [];

    this.insights.forEach((insight, index) => {
      console.log(`[${index + 1}/${this.insights.length}] ${insight.title}`);
      const result = this.processInsight(insight.id);
      if (result) {
        results.push(result);
      }
    });

    console.log(`\n✅ Batch processing complete: ${results.length} insights processed\n`);

    return results;
  }

  /**
   * Run demo with sample data
   */
  runDemo() {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Running Demo: Insight → FHC Growth Engine`);
    console.log(`${'='.repeat(60)}\n`);

    const demoInput = {
      insight_title: 'What Two Rate Rises Mean for First Home Buyers in 2026',
      insight_content: `The RBA has raised rates twice in 2026 — cash rate now at 4.10%. For first home buyers, this isn't just a headline. Your borrowing capacity has dropped. Here's exactly how much, and what to do about it.

## Understanding the Impact

When rates rise, banks adjust their serviceability calculations. This directly impacts how much you can borrow. On a household income of $120,000, the recent rate rises have reduced borrowing capacity by approximately $45,000.

This means if you were pre-approved for $650,000 six months ago, you might only qualify for $605,000 now. That's a significant gap, especially in a competitive market.

## The Numbers

Let's break down exactly what these rate rises mean:

- **Cash Rate:** Now at 4.10% (up from 3.85%)
- **Average Variable Rate:** 6.35% (up from 6.10%)
- **Borrowing Capacity Impact:** Down 6-8% on average

For a couple earning $120,000 combined:
- Previous capacity: ~$650,000
- Current capacity: ~$605,000
- Gap: $45,000

## What Should You Do?

First, understand your current position. Don't rely on old pre-approvals. Your borrowing capacity has likely changed.

Second, optimize your financial profile:
- Reduce credit card limits
- Pay down personal loans
- Improve your savings pattern
- Review your expenses

Third, consider your timing strategy. If you're not ready to buy immediately, use this time to strengthen your position.`,
      insight_summary: 'The RBA has raised rates twice in 2026 — cash rate now at 4.10%. For first home buyers, this isn\'t just a headline. Your borrowing capacity has dropped. Here\'s exactly how much, and what to do about it.',
      user_type: 'first_home_buyer',
      hotspot: 'rates'
    };

    const result = this.processor.process(demoInput);

    const date = new Date().toISOString().split('T')[0];
    this.processor.saveOutput(result, `${date}-demo-two-rate-rises`);

    console.log('\n✅ Demo complete! Check outputs/insight-fhc-growth/ for results\n');

    return result;
  }

  /**
   * Generate full content from insight metadata
   */
  generateFullContent(insight) {
    return `${insight.summary}

This is a ${insight.readTime} article from the ${insight.pillarLabel} series.

[Full content would be loaded from markdown file or CMS]

Published: ${insight.date}`;
  }

  /**
   * Slugify text for filenames
   */
  slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 50);
  }

  /**
   * Display help
   */
  showHelp() {
    console.log(`
Insight → FHC Growth Engine CLI

Usage:
  node run-growth-engine.js [options]

Options:
  --input <id>     Process a specific insight by ID
  --batch          Process all insights
  --demo           Run demo with sample data
  --help           Show this help message

Examples:
  node run-growth-engine.js --demo
  node run-growth-engine.js --input two-rate-rises-first-home-buyers-2026
  node run-growth-engine.js --batch

Output:
  All results are saved to: outputs/insight-fhc-growth/
`);
  }
}

// Main CLI execution
function main() {
  const args = process.argv.slice(2);
  const cli = new GrowthEngineCLI();

  if (args.length === 0 || args.includes('--help')) {
    cli.showHelp();
    return;
  }

  if (args.includes('--demo')) {
    cli.runDemo();
  } else if (args.includes('--batch')) {
    cli.processBatch();
  } else if (args.includes('--input')) {
    const idIndex = args.indexOf('--input');
    const insightId = args[idIndex + 1];
    if (!insightId) {
      console.error('❌ Please provide an insight ID');
      cli.showHelp();
      return;
    }
    cli.processInsight(insightId);
  } else {
    console.error('❌ Invalid arguments');
    cli.showHelp();
  }
}

if (require.main === module) {
  main();
}

module.exports = GrowthEngineCLI;
