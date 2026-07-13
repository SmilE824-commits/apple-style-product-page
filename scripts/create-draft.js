/**
 * 创建微信公众号草稿
 * 需要配置 WECHAT_APPID 和 WECHAT_SECRET
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const APPID = process.env.WECHAT_APPID;
const SECRET = process.env.WECHAT_SECRET;

async function getAccessToken() {
    if (!APPID || !SECRET) {
        console.log('未配置微信凭证，跳过草稿创建');
        return null;
    }

    try {
        const response = await axios.get(
            `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`
        );
        return response.data.access_token;
    } catch (error) {
        console.error('获取 access_token 失败:', error.message);
        return null;
    }
}

async function createDraft(accessToken, title, content) {
    // 这里实现创建草稿逻辑
    // 具体实现参考微信官方文档: https://developers.weixin.qq.com/doc/offiaccount/Draft_Box/Add_draft.html
    console.log(`创建草稿: ${title}`);
    return { media_id: '' };
}

async function main() {
    const token = await getAccessToken();
    if (!token) return;

    const articlesDir = path.join(__dirname, '..', 'articles');
    const latestFile = path.join(articlesDir, 'latest.md');

    if (!fs.existsSync(latestFile)) {
        console.log('没有找到最新文章');
        return;
    }

    const latest = fs.readFileSync(latestFile, 'utf-8');
    const titleMatch = latest.match(/\[([^\]]+)\]/);
    const title = titleMatch ? titleMatch[1] : '未命名文章';

    // 读取格式化后的 HTML 内容
    const formattedDir = path.join(articlesDir, 'formatted');
    const htmlFiles = fs.readdirSync(formattedDir).filter(f => f.endsWith('.html'));

    if (htmlFiles.length === 0) {
        console.log('没有找到格式化后的文章');
        return;
    }

    const latestHtml = fs.readFileSync(path.join(formattedDir, htmlFiles[htmlFiles.length - 1]), 'utf-8');
    await createDraft(token, title, latestHtml);
}

main().catch(console.error);
