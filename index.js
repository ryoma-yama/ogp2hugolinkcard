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

    // Title: og:title or <title>
    let ogTitle = getMeta('og:title').trim();
    if (!ogTitle) {
      ogTitle = $('title').text().trim();
      if (!ogTitle) {
        console.warn('⚠️  No title found.');
      }
    }

    // Description: og:description only, warn if missing
    const ogDesc = getMeta('og:description').trim();
    if (!ogDesc) {
      console.warn('⚠️  No og:description found.');
    }

    // Image: og:image only, warn if missing
    const ogImage = getMeta('og:image').trim();
    if (!ogImage) {
      console.warn('⚠️  No og:image found.');
    }

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
