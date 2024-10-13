#!/bin/bash

# Set the URL of your central repository
THEME_REPO_URL="https://github.com/piratesocial/pirate"

# Set the branch or tag you want to pull updates from
BRANCH_OR_TAG="main"

# Backup user content
cp -r src/content user_content_backup

# Clone the central repository
git clone --branch $BRANCH_OR_TAG --depth 1 $THEME_REPO_URL tmp_theme

# Replace the src folder
rm -rf src
mv tmp_theme/src .

# Restore user content, excluding config.ts
rsync -av --exclude='config.ts' user_content_backup/ src/content/

# Copy the new config.ts from the theme update
cp tmp_theme/src/content/config.ts src/content/

# Replace root configuration files
cp tmp_theme/astro.config.mjs .
cp tmp_theme/keystatic.config.ts .
cp tmp_theme/netlify.toml .
cp tmp_theme/package.json .
cp tmp_theme/README.md .
cp tmp_theme/tsconfig.json .
cp tmp_theme/tailwind.config.cjs .
cp tmp_theme/postcss.config.cjs .

# Clean up
rm -rf tmp_theme
rm -rf user_content_backup

echo "Theme updated successfully!"
