/**
 * 文章生成脚本
 * 调用 AI API 生成微信公众号文章标题和正文
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ARTICLE_TOPIC = process.env.ARTICLE_TOPIC || '前端开发技术分享';

// 确保输出目录存在
const outputDir = path.join(__dirname, '..', 'articles');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * 调用 AI API 生成文章标题
 */
async function generateTitle() {
    if (!OPENAI_API_KEY) {
        console.log('未配置 OPENAI_API_KEY，使用默认标题');
        return '前端技术周刊 | 本周精选';
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{
                role: 'system',
                content: '你是一位资深技术自媒体编辑，擅长写吸引人的公众号文章标题。'
            }, {
                role: 'user',
                content: `请为"${ARTICLE_TOPIC}"这个主题生成 3 个微信公众号文章标题，要求：\n1. 吸引眼球，有传播力\n2. 适合技术类公众号\n3. 字数控制在 20-30 字\n\n直接返回标题，每行一个。`
            }],
            temperature: 0.8,
            max_tokens: 200
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const titles = response.data.choices[0].message.content.trim().split('\n');
        return titles[0].replace(/^\d+\.\s*/, '').trim();
    } catch (error) {
        console.error('生成标题失败:', error.message);
        return '前端技术周刊 | 本周精选';
    }
}

/**
 * 调用 AI API 生成文章正文
 */
async function generateContent(title) {
    if (!OPENAI_API_KEY) {
        console.log('未配置 OPENAI_API_KEY，使用模板内容');
        return generateTemplateContent(title);
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{
                role: 'system',
                content: `你是一位资深前端开发工程师和技术写作者。请用 Markdown 格式撰写微信公众号文章，要求：\n1. 结构清晰，使用 ## 和 ### 标题\n2. 包含代码示例\n3. 语言通俗易懂但专业\n4. 适合中国读者阅读习惯\n5. 文章长度 2000-3000 字`
            }, {
                role: 'user',
                content: `请撰写一篇题为"${title}"的技术文章，主题是"${ARTICLE_TOPIC}"。`
            }],
            temperature: 0.7,
            max_tokens: 3000
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('生成正文失败:', error.message);
        return generateTemplateContent(title);
    }
}

/**
 * 生成模板内容（当 API 不可用时）
 */
function generateTemplateContent(title) {
    return `# ${title}

> 本文介绍了前端开发中的最佳实践和前沿技术。

## 前言

在当今快速发展的前端领域，保持学习和实践是每个开发者的必修课。

## 核心内容

### 1. 技术选型

选择合适的技术栈是项目成功的基础。

\`\`\`javascript
// 示例代码
const app = createApp({});
app.mount('#app');
\`\`\`

### 2. 性能优化

性能是用户体验的关键指标。

### 3. 工程化实践

现代化的前端工程化包括构建工具、CI/CD、代码规范等。

## 总结

持续学习，不断实践，才能在前端领域保持竞争力。

---

*本文由 GitHub Actions 自动生成。*
`;
}

/**
 * 主函数
 */
async function main() {
    const date = new Date().toISOString().split('T')[0];
    console.log(`开始生成文章: ${date}`);

    const title = await generateTitle();
    console.log(`生成标题: ${title}`);

    const content = await generateContent(title);

    const filename = `${date}-article.md`;
    const filepath = path.join(outputDir, filename);

    const article = `---\ntitle: "${title}"\ndate: "${date}"\ntopic: "${ARTICLE_TOPIC}"\n---\n\n${content}`;

    fs.writeFileSync(filepath, article, 'utf-8');
    console.log(`文章已保存: ${filepath}`);

    // 同时更新最新文章链接
    fs.writeFileSync(
        path.join(outputDir, 'latest.md'),
        `# 最新文章\n\n- [${title}](${filename})\n- 生成时间: ${new Date().toLocaleString('zh-CN')}\n`
    );
}

main().catch(console.error);
