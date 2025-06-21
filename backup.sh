#!/bin/bash

# NextJS App Code Export Script
# Simple and focused export for NextJS applications

# Configuration
SRC_DIR="./src"
OUTPUT_FILE="NextJS_Code_Export.txt"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo_status() {
    echo -e "${2}${1}${NC}"
}

echo_status "🚀 Starting NextJS Code Export..." "$BLUE"

# Check if src directory exists
if [ ! -d "$SRC_DIR" ]; then
    echo_status "❌ Error: $SRC_DIR directory not found!" "$RED"
    exit 1
fi

# Remove old file and create new one
rm -f "$OUTPUT_FILE"

# Write header
cat << EOF > "$OUTPUT_FILE"
NextJS Application Code Export
=============================
Generated: $TIMESTAMP
Source: $SRC_DIR

EOF

echo_status "📝 Collecting NextJS files..." "$YELLOW"

# Find and process NextJS files
find "$SRC_DIR" -type f \( \
    -name "*.tsx" -o \
    -name "*.ts" -o \
    -name "*.js" -o \
    -name "*.jsx" -o \
    -name "*.css" -o \
    -name "*.scss" -o \
    -name "*.json" \) \
    ! -path "*/node_modules/*" \
    ! -path "*/.next/*" \
    ! -path "*/dist/*" \
    ! -path "*/.git/*" \
    ! -name "*.lock.json" \
    ! -name "package-lock.json" \
    ! -name "yarn.lock" \
    | sort | while read -r file; do
    
    echo_status "  📄 Processing: $file" "$NC"
    
    # Add file separator and header
    echo "================================================================================================" >> "$OUTPUT_FILE"
    echo "FILE: $file" >> "$OUTPUT_FILE"
    echo "LINES: $(wc -l < "$file" 2>/dev/null || echo "0")" >> "$OUTPUT_FILE"
    echo "================================================================================================" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    # Add file content
    cat "$file" >> "$OUTPUT_FILE"
    echo -e "\n\n" >> "$OUTPUT_FILE"
done

# Also include important config files from root
echo_status "📋 Adding config files..." "$YELLOW"

for config_file in "package.json" "next.config.js" "next.config.ts" "tailwind.config.js" "tailwind.config.ts" "tsconfig.json" ".env.example" ".env.local.example"; do
    if [ -f "$config_file" ]; then
        echo_status "  📄 Adding: $config_file" "$NC"
        
        echo "================================================================================================" >> "$OUTPUT_FILE"
        echo "FILE: $config_file" >> "$OUTPUT_FILE"
        echo "LINES: $(wc -l < "$config_file" 2>/dev/null || echo "0")" >> "$OUTPUT_FILE"
        echo "================================================================================================" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
        
        cat "$config_file" >> "$OUTPUT_FILE"
        echo -e "\n\n" >> "$OUTPUT_FILE"
    fi
done

# Add footer
cat << EOF >> "$OUTPUT_FILE"
================================================================================================
Export completed at: $TIMESTAMP
Total file size: $(wc -c < "$OUTPUT_FILE" | awk '{print int($1/1024)"KB"}')
================================================================================================
EOF

echo_status "✅ Export completed!" "$GREEN"
echo_status "📁 Output file: $OUTPUT_FILE" "$BLUE"
echo_status "📊 File size: $(wc -c < "$OUTPUT_FILE" | awk '{print int($1/1024)"KB"}')" "$BLUE"