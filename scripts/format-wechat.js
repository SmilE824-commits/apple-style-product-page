/**
 * 微信公众号文章格式化脚本
 * 将 Markdown 转换为适合微信排版的 HTML
 */

const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

const articlesDir = path.join(__dirname, '..', 'articles');
const outputDir = path.join(__dirname, '..', 'articles', 'formatted');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 配置 Markdown 解析器
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});

/**
 * 转换为微信公众号风格的 HTML
 */
function convertToWechatHtml(markdownContent) {
    let html = md.render(markdownContent);

    // 添加微信风格的 CSS 类
    html = html
        .replace(/<h1/g, '<h1 style="font-size:22px;font-weight:bold;color:#333;margin:20px 0;line-height:1.4;"')
        .replace(/<h2/g, '<h2 style="font-size:18px;font-weight:bold;color:#333;margin:16px 0;line-height:1.4;border-left:4px solid #0071e3;padding-left:12px;"')
        .replace(/<h3/g, '<h3 style="font-size:16px;font-weight:bold;color:#555;margin:14px 0;line-height:1.4;"')
        .replace(/<p>/g, '<p style="font-size:15px;color:#333;line-height:1.8;margin:12px 0;text-align:justify;">')
        .replace(/<blockquote>/g, '<blockquote style="border-left:4px solid #ddd;padding:0 16px;color:#666;margin:16px 0;background:#f9f9f9;padding:12px 16px;border-radius:4px;">')
        .replace(/<code>/g, '<code style="background:#f4f4f4;padding:2px 6px;border-radius:3px;font-size:14px;color:#e83e8c;">')
        .replace(/<pre>/g, '<pre style="background:#1e1e1e;color:#d4d4d4;padding:16px;border-radius:8px;overflow-x:auto;font-size:13px;line-height:1.6;">')
        .replace(/<ul>/g, '<ul style="padding-left:20px;margin:12px 0;">')
        .replace(/<ol>/g, '<ol style="padding-left:20px;margin:12px 0;">')
        .replace(/<li>/g, '<li style="font-size:15px;color:#333;line-height:1.8;margin:6px 0;">')
        .replace(/<strong>/g, '<strong style="color:#0071e3;">')
        .replace(/<img/g, '<img style="max-width:100%;border-radius:8px;margin:16px 0;display:block;"');

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WeChat Article</title>
</head>
<body style="max-width:677px;margin:0 auto;padding:20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#fff;">
${html}
</body>
</html>`;
}

/**
 * 主函数
 */
function main() {
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') && !f.startsWith('latest'));

    if (files.length === 0) {
        console.log('没有找到需要格式化的文章');
        return;
    }

    files.forEach(file => {
        const filepath = path.join(articlesDir, file);
        const content = fs.readFileSync(filepath, 'utf-8');

        // 提取 front matter 后的正文
        const bodyMatch = content.match(/---\n[\s\S]*?---\n([\s\S]*)/);
        const body = bodyMatch ? bodyMatch[1] : content;

        const html = convertToWechatHtml(body);
        const outputFile = file.replace('.md', '.html');
        const outputPath = path.join(outputDir, outputFile);

        fs.writeFileSync(outputPath, html, 'utf-8');
        console.log(`格式化完成: ${outputFile}`);
    });
}

main();
