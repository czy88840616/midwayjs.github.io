const dayjs = require('dayjs');
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

async function getDocmentContent(slug) {
  return client.docs.get({
    namespace: 'midwayjs/midway_v2',
    slug: slug,
    data: {
      raw: 1
    }
  });
}

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

      let body;
      
      do {
        try {
          body = await getDocmentContent(item.slug);
          console.log(`got ${item.slug}`);
        } catch (err) {
          body = await getDocmentContent(item.slug);
          console.log(`retry got ${item.slug}`);
        }
      } while(!body);
     
      const text = [
        '---',
        'meta:',
        '  - name: referrer',
        '    content: no-referrer',
        '---',
        body.body
          .replace(/\n(#+)/gm, '\n\n$1')
          .replace(/```/gm, '\n```')
          .replace(/:::/gm, '\n:::')
          .replace(/:::\s?info/gm, '::: tip'),
        `<footer style="padding: 2rem 0 0 0rem;margin-bottom: -3rem;" class="page-edit"><div class="edit-link"><a href="https://www.yuque.com/midwayjs/midway_v2/${item.url}" target="_blank" rel="noopener noreferrer">Edit this page</a> <span><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg> <span class="sr-only">(opens new window)</span></span></div><div class="last-updated"><span class="prefix">上次更新:</span> <span class="time">${dayjs().format('YYYY-MM-DD HH:mm:ss')}</span></div><!----></footer>`
      ];
      fs.writeFileSync(path.join(docRoot, item.url + '.md'), text.join('\n'));
    }
  }
  fs.writeFileSync(path.join(docRoot, '.vuepress/nav.js'), 'module.exports = ' + JSON.stringify(navList));
})();
