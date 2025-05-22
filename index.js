#!/usr/bin/env node
import axios from 'axios';
import * as cheerio from 'cheerio';
import clipboard from 'clipboardy';

const url = process.argv[2];
if (!url) {
  console.error('Usage: ogp2shortcode <URL>');
  process.exit(1);
}

(async () => {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const getMeta = (prop) =>
      $(`meta[property='${prop}']`).attr('content') ||
      $(`meta[name='${prop}']`).attr('content') || '';

    const ogTitle = getMeta('og:title').trim();
    const ogDesc = getMeta('og:description').trim();
    const ogImage = getMeta('og:image').trim();

    const output = `{{< linkCard\n    url=\"${url}\"\n    title=\"${ogTitle}\"\n    description=\"${ogDesc}\"\n    image=\"${ogImage}\"\n>}}`;

    await clipboard.write(output);
    console.log('✅ Shortcode copied to clipboard.');
    console.log('\n----- Shortcode Output -----\n');
    console.log(output);
    console.log('\n---------------------------');
  } catch (err) {
    console.error('❌ Failed to fetch OGP info:', err.message);
    process.exit(1);
  }
})();
