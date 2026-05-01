#!/bin/bash

##############################################################################
# Insight → FHC Growth Engine Routine Executor
#
# This script triggers the insight_to_fhc_growth_v1 routine to transform
# Insight articles into FHC conversion assets.
#
# Usage:
#   ./run-insight-to-fhc.sh --article-id="two-rate-rises-first-home-buyers-2026"
#   ./run-insight-to-fhc.sh --all  # Process all insights
#
##############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Directories
ROUTINE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$ROUTINE_DIR")"
OUTPUTS_DIR="$PROJECT_ROOT/outputs/insight-fhc-growth"
DATA_DIR="$PROJECT_ROOT/data"

# Functions
print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Insight → FHC Growth Engine${NC}"
    echo -e "${BLUE}================================${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${YELLOW}ℹ${NC} $1"
}

# Parse arguments
ARTICLE_ID=""
PROCESS_ALL=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --article-id=*)
            ARTICLE_ID="${1#*=}"
            shift
            ;;
        --all)
            PROCESS_ALL=true
            shift
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --article-id=ID    Process specific article by ID"
            echo "  --all              Process all articles in insights.json"
            echo "  --help             Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0 --article-id=two-rate-rises-first-home-buyers-2026"
            echo "  $0 --all"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Main execution
print_header

# Check if insights.json exists
if [ ! -f "$DATA_DIR/insights.json" ]; then
    print_error "insights.json not found in $DATA_DIR"
    exit 1
fi

print_info "Reading insights from $DATA_DIR/insights.json"

if [ "$PROCESS_ALL" = true ]; then
    print_info "Processing all insights..."

    # This would loop through all articles
    # For now, we'll just show a message
    print_info "Batch processing not yet implemented"
    print_info "Please use --article-id=<id> to process individual articles"
    exit 0
fi

if [ -z "$ARTICLE_ID" ]; then
    print_error "No article ID provided"
    echo "Use --article-id=<id> or --all"
    exit 1
fi

print_info "Processing article: $ARTICLE_ID"

# Create output directory for this article
OUTPUT_DATE=$(date +%Y-%m-%d)
ARTICLE_OUTPUT_DIR="$OUTPUTS_DIR/${OUTPUT_DATE}-${ARTICLE_ID}"

if [ -d "$ARTICLE_OUTPUT_DIR" ]; then
    print_info "Output directory already exists: $ARTICLE_OUTPUT_DIR"
    read -p "Overwrite? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Cancelled"
        exit 0
    fi
    rm -rf "$ARTICLE_OUTPUT_DIR"
fi

mkdir -p "$ARTICLE_OUTPUT_DIR"
print_success "Created output directory: $ARTICLE_OUTPUT_DIR"

# ============================================================================
# CLAUDE CODE AGENT EXECUTION POINT
# ============================================================================
#
# At this point, a Claude Code Agent would be invoked to:
# 1. Read the article content from insights.json
# 2. Execute the insight_to_fhc_growth_v1 routine
# 3. Generate all required outputs (enhanced article, multi-channel, etc.)
# 4. Save outputs to $ARTICLE_OUTPUT_DIR
#
# For manual execution, you can use this prompt with Claude Code:
#
# """
# Execute the insight_to_fhc_growth_v1 routine for article ID: ${ARTICLE_ID}
#
# 1. Read the article from data/insights.json
# 2. Follow the routine definition in .routines/active/insight_to_fhc_growth_v1.md
# 3. Generate all outputs according to the schema
# 4. Save outputs to: ${ARTICLE_OUTPUT_DIR}
#
# Required outputs:
# - enhanced-article.md (article with CTA injections)
# - xiaohongshu.md (小红书 version)
# - linkedin.md (LinkedIn version)
# - seo-meta.json (SEO metadata)
# - funnel-design.json (conversion funnel design)
# - execution-report.json (complete execution report)
# """
#
# ============================================================================

print_info ""
print_info "Manual execution required:"
print_info "Run Claude Code with the following prompt:"
print_info ""
echo -e "${YELLOW}─────────────────────────────────────────────────────────────${NC}"
cat <<EOF
Execute the insight_to_fhc_growth_v1 routine for article: ${ARTICLE_ID}

Steps:
1. Read article content from data/insights.json
2. Follow .routines/active/insight_to_fhc_growth_v1.md
3. Generate all outputs per the schema
4. Save to: ${ARTICLE_OUTPUT_DIR}/

Required outputs:
- enhanced-article.md
- xiaohongshu.md
- linkedin.md
- seo-meta.json
- funnel-design.json
- execution-report.json
EOF
echo -e "${YELLOW}─────────────────────────────────────────────────────────────${NC}"
print_info ""

# For automation, this would call a Claude API or Agent SDK
# Example (pseudocode):
#
# claude-agent execute \
#   --routine=insight_to_fhc_growth_v1 \
#   --input="{\"article_id\": \"$ARTICLE_ID\"}" \
#   --output-dir="$ARTICLE_OUTPUT_DIR"

print_info "Waiting for manual execution..."
print_info "Press Enter when outputs are ready, or Ctrl+C to cancel"
read

# Verify outputs
print_info "Verifying outputs..."

REQUIRED_FILES=(
    "enhanced-article.md"
    "xiaohongshu.md"
    "linkedin.md"
    "seo-meta.json"
    "funnel-design.json"
    "execution-report.json"
)

ALL_EXIST=true
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$ARTICLE_OUTPUT_DIR/$file" ]; then
        print_success "$file"
    else
        print_error "$file (missing)"
        ALL_EXIST=false
    fi
done

echo ""

if [ "$ALL_EXIST" = true ]; then
    print_success "All outputs generated successfully!"
    print_success "Location: $ARTICLE_OUTPUT_DIR"
    echo ""
    print_info "Next steps:"
    echo "  1. Review the enhanced article for CTA quality"
    echo "  2. Check multi-channel versions for platform appropriateness"
    echo "  3. Verify SEO metadata and tracking parameters"
    echo "  4. Publish content to respective platforms"
    echo ""
else
    print_error "Some outputs are missing"
    print_info "Please check the execution and try again"
    exit 1
fi

print_header
print_success "Routine execution complete!"
