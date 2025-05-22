# ogp2shortcode

A CLI tool that fetches OGP information from a given URL and generates a Hugo-compatible link card shortcode. The result is automatically copied to your clipboard for easy use.

## Requirements

- Node.js 18 or higher

## Features

- Extracts OGP information (title / description / image) from the specified URL
- Generates a `linkCard` shortcode for Hugo
- Automatically copies the generated shortcode to your clipboard

## Installation

```bash
npm install -g ogp2shortcode
```

## Usage

```bash
ogp2shortcode https://example.com
```

After execution, the shortcode will be copied to your clipboard.

## Example Output

```markdown
{{< linkCard
    url="https://example.com"
    title="Example Title"
    description="This is an example description."
    image="https://example.com/image.jpg"
>}}
```

## Dependencies

- [axios](https://github.com/axios/axios)
- [cheerio](https://github.com/cheeriojs/cheerio)
- [clipboardy](https://github.com/sindresorhus/clipboardy)

## License

This project is licensed under the [Apache License 2.0](./LICENSE).
