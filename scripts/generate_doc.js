const SDK = require('@yuque/sdk');
const client = new SDK({
  token: process.env.YUEQUE_TOKEN,
  requestOpts: {
    timeout: 10000
  }
});
const fs = require('fs');
const path = require('path');
const navList = [];

(async () => {
  const tocList = await client.repos.getTOC({
    namespace: 'midwayjs/midway_v2',
  })
  const docRoot = path.join(__dirname, '../docs');
  let firstGroup;
  let secondGroup;
  for (const item of tocList) {
    /**
     * {
      "type": "DOC",
      "title": "基础介绍",
      "uuid": "",
      "url": "introduction",
      "prev_uuid": "",
      "sibling_uuid": "",
      "child_uuid": "",
      "parent_uuid": "",
      "doc_id": 12439150,
      "level": 0,
      "id": 12439150,
      "open_window": 1,
      "visible": 1,
      "depth": 1,
      "slug": "introduction"
      }
     */
    if (item.level === 0) {
      // 一级
      firstGroup = {
        title: item.title,
        path: item.url,
        sidebarDepth: item.depth,
      };
      navList.push(firstGroup);
    } else if (item.level === 1) {
      firstGroup.children = firstGroup.children || [];
      // 二级
      secondGroup = {
        title: item.title,
        path: item.url,
        sidebarDepth: item.depth,
      };
      firstGroup.children.push(secondGroup);
    } else if (item.level === 2) {
      secondGroup.children = secondGroup.children || [];
      // 三级
      secondGroup.children.push({
        title: item.title,
        path: item.url,
        sidebarDepth: item.depth,
      });
    }

    // 生成一个文档
    if (item.type === 'DOC') {
      const body = await client.docs.get({
        namespace: 'midwayjs/midway_v2',
        slug: item.slug,
        data: {
          raw: 1
        }
      })
      fs.writeFileSync(path.join(docRoot, item.url + '.md'), body.body);
    }
  }
  fs.writeFileSync(path.join(docRoot, '.vuepress/nav.js'), 'module.exports = ' + JSON.stringify(navList));
})();