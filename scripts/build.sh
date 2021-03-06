#!/bin/bash
set -e

## 生成文档
node ./scripts/generate_doc.js

vuepress build docs
node ./scripts/replace.js

## 生成 typedoc
git clone https://github.com/midwayjs/midway.git
cd midway
npm i
npm i typedoc@0.19.2 typedoc-neo-theme typedoc-plugin-lerna-packages
npm run bootstrap
npm run build
npm run typedoc
cp -r ./docs/api-reference ../docs/.vuepress/dist