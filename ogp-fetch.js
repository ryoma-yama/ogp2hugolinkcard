import axios from 'axios';
import * as cheerio from 'cheerio';
import clipboard from 'clipboardy';

const url = process.argv[2];
if (!url) {
  console.error('使い方: node index.js <URL>');
  process.exit(1);
}

try {
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  const getMeta = (prop) =>
    $(`meta[property='${prop}']`).attr('content') ||
    $(`meta[name='${prop}']`).attr('content') || '';

  const ogTitle = getMeta('og:title').trim();
  const ogDesc = getMeta('og:description').trim();
  const ogImage = getMeta('og:image').trim();

  const output = `{{< linkCard
    url="${url}"
    title="${ogTitle}"
    description="${ogDesc}"
    image="${ogImage}"
>}}`;

  await clipboard.write(output);
  console.log('✅ ショートコードをクリップボードにコピーしました。');
} catch (err) {
  console.error('❌ 取得に失敗しました:', err.message);
}
