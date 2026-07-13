# Aura Pro - Apple Style Product Page

参考苹果官网设计的现代化产品展示页面，采用极简主义设计语言，大量留白，精致排版和流畅动画。

## 特性

- **极简导航栏** - 固定顶部，毛玻璃背景效果
- **沉浸式 Hero 区域** - 大字体标题，3D 设备模型展示
- **滚动触发动画** - Intersection Observer 实现流畅的滚动动画
- **产品特性卡片** - 芯片、显示屏、摄像头三大核心卖点
- **颜色切换展示** - 四款钛金属配色，点击切换设备渲染
- **响应式设计** - 完美适配桌面端和移动端
- **性能优化** - 支持 prefers-reduced-motion 无障碍访问

## 技术栈

- HTML5
- CSS3 (CSS Variables, Grid, Flexbox, Animation)
- Vanilla JavaScript (ES6+)
- Inter Font Family

## 目录结构

```
apple-style-product-page/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── main.js         # 交互逻辑
├── images/             # 图片资源
└── README.md           # 项目说明
```

## 本地预览

直接在浏览器中打开 `index.html` 即可预览效果。

或使用本地服务器：

```bash
npx serve .
```

## 设计亮点

1. **字体排版** - 使用 Inter 字体，精确控制字间距和行高
2. **色彩系统** - 深色主题为主，搭配浅色区域形成对比
3. **微交互** - 按钮磁吸效果、卡片悬浮放大、视差滚动
4. **交互动画** - 芯片波纹扩散、显示屏柱状图跳动、镜头光泽闪烁
5. **渐变文字** - 标题使用渐变填充，增加视觉层次

## 浏览器兼容

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 许可证

MIT License
