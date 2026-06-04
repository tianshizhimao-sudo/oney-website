#!/usr/bin/env node

/**
 * Policy Radar Monitor v1.0
 *
 * 监控银行政策变化（重点：Trust Home Loan）
 * 自动创建 Obsidian 笔记并触发下游系统
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class PolicyRadarMonitor {
  constructor() {
    this.vaultPath = path.join(__dirname, '../../knowledge-vault');
    this.dataPath = path.join(__dirname, '../../data');
    this.eventsFile = path.join(this.dataPath, 'policy-events.json');
    this.snapshotsDir = path.join(this.dataPath, 'policy-snapshots');

    this.ensureDirectories();

    // Trust Home Loan 重点监控关键词
    this.trustKeywords = [
      'trust',
      'family trust',
      'discretionary trust',
      'trust structure',
      'trustee',
      'beneficiary',
      'trust deed',
      'trust borrowing',
      'trust lending'
    ];

    // 银行监控目标
    this.banks = {
      'CBA': {
        name: 'Commonwealth Bank',
        trustPage: 'https://www.commbank.com.au/home-loans/trust-lending.html',
        priority: 'high'
      },
      'Westpac': {
        name: 'Westpac',
        trustPage: 'https://www.westpac.com.au/personal-banking/home-loans/trust-lending/',
        priority: 'high'
      },
      'ANZ': {
        name: 'ANZ',
        trustPage: 'https://www.anz.com.au/personal/home-loans/get-started/borrowing-structure/',
        priority: 'high'
      },
      'NAB': {
        name: 'NAB',
        trustPage: 'https://www.nab.com.au/personal/home-loans/understand-home-loans/trust-lending',
        priority: 'high'
      }
    };
  }

  ensureDirectories() {
    [this.vaultPath, this.dataPath, this.snapshotsDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Ensure vault structure
    const vaultFolders = [
      '知识库/政策追踪',
      '知识库/银行信息',
      '知识库/Trust专题',
      '知识库/时间线',
      '知识库/分析笔记'
    ];

    vaultFolders.forEach(folder => {
      const fullPath = path.join(this.vaultPath, folder);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    });
  }

  /**
   * 生成内容的 hash 用于检测变化
   */
  generateHash(content) {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  /**
   * 加载历史事件
   */
  loadEvents() {
    if (!fs.existsSync(this.eventsFile)) {
      return [];
    }
    return JSON.parse(fs.readFileSync(this.eventsFile, 'utf8'));
  }

  /**
   * 保存事件
   */
  saveEvent(event) {
    const events = this.loadEvents();
    events.push(event);
    fs.writeFileSync(this.eventsFile, JSON.stringify(events, null, 2));
  }

  /**
   * 检测政策变化（模拟实现）
   *
   * 实际生产环境需要：
   * 1. 使用 Puppeteer/Playwright 抓取网页
   * 2. 使用 RSS reader 监控 RBA
   * 3. 使用 API 监控新闻源
   */
  async detectChanges() {
    console.log('🔍 Policy Radar Monitor - Starting scan...\n');

    const detectedChanges = [];

    // 模拟检测到的变化
    // 实际实现时，这里会是真实的网页抓取和对比逻辑

    // Example: CBA Trust 政策变化
    const exampleChange = this.simulateTrustPolicyChange();

    if (exampleChange) {
      detectedChanges.push(exampleChange);
    }

    return detectedChanges;
  }

  /**
   * 模拟 Trust 政策变化检测
   */
  simulateTrustPolicyChange() {
    // 这是一个示例变化 - 实际情况下会从网页抓取
    return {
      id: this.generateEventId(),
      timestamp: new Date().toISOString(),
      source: 'CBA',
      sourceName: 'Commonwealth Bank',
      topic: 'Trust Home Loan',
      significance: 'high',
      title: 'CBA 更新 Trust 贷款 Trustee 资格要求',
      summary: 'CBA 宣布更新 Trust 贷款的 Trustee 资格要求，新增个人 Trustee 必须是 Beneficiary 的条款',
      details: {
        what_changed: 'Trustee 资格要求增加新条件',
        old_value: '允许任何个人或公司作为 Trustee',
        new_value: '个人 Trustee 必须同时是 Trust 的 Beneficiary；公司 Trustee 的 Director 必须是 Beneficiary',
        impact: '影响使用个人 Trustee 的投资者，可能需要修改 Trust 结构或更换 Trustee'
      },
      affected_users: ['investor'],
      recommended_action: '检查现有 Trust 结构，如不符合新要求需尽快调整',
      url: 'https://www.commbank.com.au/home-loans/trust-lending.html',
      detected_at: new Date().toISOString()
    };
  }

  generateEventId() {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 创建 Obsidian 笔记
   */
  createObsidianNote(event) {
    const date = new Date(event.timestamp);
    const dateStr = date.toISOString().split('T')[0];

    // 生成文件名
    const filename = `${dateStr}-${event.source}-${this.slugify(event.topic)}.md`;

    // Trust 相关的放在 Trust 专题文件夹
    let folder = '知识库/政策追踪';
    if (this.isTrustRelated(event)) {
      folder = '知识库/Trust专题';
    }

    const filepath = path.join(this.vaultPath, folder, filename);

    // 生成笔记内容
    const content = this.generateNoteContent(event);

    // 写入文件
    fs.writeFileSync(filepath, content);

    console.log(`📝 Created note: ${folder}/${filename}`);

    return {
      filename,
      filepath,
      folder
    };
  }

  isTrustRelated(event) {
    const searchText = `${event.topic} ${event.title} ${event.summary}`.toLowerCase();
    return this.trustKeywords.some(keyword => searchText.includes(keyword.toLowerCase()));
  }

  generateNoteContent(event) {
    const date = new Date(event.timestamp);
    const dateStr = date.toISOString().split('T')[0];
    const timeStr = date.toLocaleString('en-AU');

    return `---
date: ${dateStr}
source: ${event.source}
sourceName: ${event.sourceName}
topic: ${event.topic}
significance: ${event.significance}
affected_users: [${event.affected_users.join(', ')}]
status: new
tags: [policy, ${this.isTrustRelated(event) ? 'trust, ' : ''}change, ${event.source.toLowerCase()}]
---

# ${event.title}

> **Detected**: ${timeStr}
> **Source**: [[${event.sourceName}]]
> **Significance**: 🔴 ${event.significance.toUpperCase()}

## 📋 概述

${event.summary}

## 🔄 变化详情

### What Changed
${event.details.what_changed}

### Before
\`\`\`
${event.details.old_value}
\`\`\`

### After
\`\`\`
${event.details.new_value}
\`\`\`

## 📊 影响分析

### Impact Level
- **Significance**: ${event.significance}
- **Affected Users**: ${event.affected_users.map(u => `[[${u}]]`).join(', ')}

### Key Implications
${event.details.impact}

## 👥 用户影响

### Investors
${event.affected_users.includes('investor') ? '**高影响** - ' + event.details.impact : '无直接影响'}

### First Home Buyers
${event.affected_users.includes('first_home_buyer') ? '**影响** - 需要评估' : '无直接影响'}

### Refinancers
${event.affected_users.includes('refinance') ? '**影响** - 需要评估' : '无直接影响'}

## 💡 推荐行动

### For Clients
${event.recommended_action}

### For Content
✅ **建议生成 Insight**: 这个政策变化值得撰写详细分析文章

**潜在标题**:
- "${event.title} - 投资者需要知道什么"
- "CBA Trust 贷款新规解读"
- "Trust 结构调整指南"

## 🔗 相关链接

- [Official Source](${event.url})
- Related: [[Trust Home Loan]], [[${event.source}]], [[Policy Changes ${dateStr.substring(0, 7)}]]

## 📝 Notes

*This policy change was automatically detected by Policy Radar Monitor v1.0*

**Next Steps**:
1. [ ] Verify change with official source
2. [ ] Assess client impact
3. [ ] Generate Insight article
4. [ ] Update FHC questions if needed

---
*Last Updated: ${timeStr}*
*Event ID: \`${event.id}\`*
`;
  }

  slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9一-龥]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 50);
  }

  /**
   * 评估是否触发下游系统
   */
  shouldTriggerInsightGenerator(event) {
    // High or critical significance
    if (['critical', 'high'].includes(event.significance)) {
      return true;
    }

    // Trust 相关始终触发
    if (this.isTrustRelated(event)) {
      return true;
    }

    return false;
  }

  /**
   * 触发 Insight Generator
   */
  triggerInsightGenerator(event) {
    console.log(`\n🚀 Triggering Insight Generator for: ${event.title}`);

    const trigger = {
      source: 'policy_radar_monitor_v1',
      event_id: event.id,
      timestamp: new Date().toISOString(),
      policy_event: event,
      content_brief: {
        suggested_title: `${event.title} - 投资者需要知道什么`,
        user_type: event.affected_users[0] || 'investor',
        hotspot: event.topic.toLowerCase().includes('rate') ? 'rates' : 'policy',
        urgency: event.significance === 'critical' ? 'immediate' : 'normal'
      }
    };

    // 保存到触发队列
    const triggerFile = path.join(this.dataPath, 'insight-generator-queue.json');
    let queue = [];
    if (fs.existsSync(triggerFile)) {
      queue = JSON.parse(fs.readFileSync(triggerFile, 'utf8'));
    }
    queue.push(trigger);
    fs.writeFileSync(triggerFile, JSON.stringify(queue, null, 2));

    console.log(`   ✓ Added to Insight Generator queue`);
    console.log(`   ✓ User type: ${trigger.content_brief.user_type}`);
    console.log(`   ✓ Hotspot: ${trigger.content_brief.hotspot}`);

    return trigger;
  }

  /**
   * 生成监控报告
   */
  generateReport(changes) {
    console.log('\n' + '='.repeat(60));
    console.log('📊 POLICY RADAR MONITOR - SCAN REPORT');
    console.log('='.repeat(60) + '\n');

    console.log(`Scan completed at: ${new Date().toLocaleString('en-AU')}`);
    console.log(`Changes detected: ${changes.length}\n`);

    if (changes.length === 0) {
      console.log('✓ No significant policy changes detected\n');
      return;
    }

    changes.forEach((change, index) => {
      console.log(`${index + 1}. [${change.significance.toUpperCase()}] ${change.title}`);
      console.log(`   Source: ${change.sourceName}`);
      console.log(`   Topic: ${change.topic}`);
      console.log(`   Affected: ${change.affected_users.join(', ')}`);
      console.log('');
    });

    console.log('='.repeat(60) + '\n');
  }

  /**
   * 主执行流程
   */
  async run() {
    try {
      // 1. 检测变化
      const changes = await this.detectChanges();

      // 2. 处理每个变化
      const processed = [];

      for (const change of changes) {
        console.log(`\n📍 Processing: ${change.title}`);

        // 保存事件
        this.saveEvent(change);
        console.log('   ✓ Event saved');

        // 创建 Obsidian 笔记
        const note = this.createObsidianNote(change);
        console.log(`   ✓ Obsidian note created`);

        // 触发下游系统
        if (this.shouldTriggerInsightGenerator(change)) {
          const trigger = this.triggerInsightGenerator(change);
          change.triggered_insight = true;
        } else {
          console.log('   ⊘ Significance too low, not triggering Insight Generator');
          change.triggered_insight = false;
        }

        processed.push({
          ...change,
          obsidian_note: note
        });
      }

      // 3. 生成报告
      this.generateReport(processed);

      return {
        success: true,
        changes_detected: processed.length,
        changes: processed
      };

    } catch (error) {
      console.error('❌ Error in Policy Radar Monitor:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * 手动添加政策变化（用于测试或手动录入）
   */
  async addManualChange(changeData) {
    console.log('📝 Adding manual policy change...\n');

    const event = {
      id: this.generateEventId(),
      timestamp: new Date().toISOString(),
      source: changeData.source || 'Manual',
      sourceName: changeData.sourceName || 'Manual Entry',
      topic: changeData.topic,
      significance: changeData.significance || 'medium',
      title: changeData.title,
      summary: changeData.summary,
      details: changeData.details || {},
      affected_users: changeData.affected_users || [],
      recommended_action: changeData.recommended_action || '',
      url: changeData.url || '',
      detected_at: new Date().toISOString(),
      manual: true
    };

    // 保存
    this.saveEvent(event);

    // 创建笔记
    const note = this.createObsidianNote(event);

    // 触发下游
    if (this.shouldTriggerInsightGenerator(event)) {
      this.triggerInsightGenerator(event);
    }

    console.log('\n✅ Manual change added successfully\n');

    return event;
  }
}

// CLI interface
if (require.main === module) {
  const monitor = new PolicyRadarMonitor();

  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
Policy Radar Monitor v1.0

Usage:
  node policy-monitor.js              Run scan
  node policy-monitor.js --demo       Run with demo data
  node policy-monitor.js --manual     Add manual entry (interactive)
  node policy-monitor.js --help       Show this help

Examples:
  node policy-monitor.js --demo
    `);
    process.exit(0);
  }

  if (args.includes('--demo') || args.includes('--manual')) {
    // Run with simulated changes
    monitor.run().then(result => {
      if (result.success) {
        console.log('✅ Policy Radar Monitor completed successfully');
        process.exit(0);
      } else {
        console.error('❌ Policy Radar Monitor failed');
        process.exit(1);
      }
    });
  } else {
    // Normal run
    monitor.run().then(result => {
      process.exit(result.success ? 0 : 1);
    });
  }
}

module.exports = PolicyRadarMonitor;
