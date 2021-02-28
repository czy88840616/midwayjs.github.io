#!/bin/bash
set -e

vuepress build docs
node ./scripts/replace.js

## 生成typedoc
git clone https://github.com/midwayjs/midway.git
cd midway
npm i
npm i typedoc@0.19.2 typedoc-neo-theme typedoc-plugin-lerna-packages
npm run bootstrap
npm run build
npm run typedoc
cp ./docs/api-reference ../docs/.vuepress/dist