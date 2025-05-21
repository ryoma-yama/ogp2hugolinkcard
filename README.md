# ogp2shortcode

Hugo（PaperModテーマ）向けのリンクカードショートコードを、指定URLからOGP情報を取得して自動生成するCLIツール。

## 特徴

* 指定URLの OGP 情報（title / description / image）を抽出
* PaperMod に対応した `linkpreview` ショートコードを自動生成
* 生成結果をクリップボードに直接コピー（コピペ不要）

## 使用方法

### 準備

```bash
pnpm install
```

### 実行

#### シンプルな実行（ファイル名省略）

```bash
pnpm ogp https://example.com
```

## 出力結果（例）

```markdown
{{< linkCard
    url="https://example.com"
    title="Example Title"
    description="This is an example description."
    image="https://example.com/image.jpg"
>}}
```

## 依存

* Node.js 18 以上
* pnpm

## 使用ライブラリ

* [axios](https://github.com/axios/axios)
* [cheerio](https://github.com/cheeriojs/cheerio)
* [clipboardy](https://github.com/sindresorhus/clipboardy)
