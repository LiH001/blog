---
title: "基于 Astro + Three.js + Vercel 搭建个人技术笔记博客"
description: "记录如何使用 Astro 框架，并融合 WebGL 着色器、GSAP 动效与自定义 HTML 笔记直链机制，打造无缝的学习笔记博客系统。"
pubDate: 2026-06-25
tags: ["Astro", "博客搭建", "建站日记"]
draft: false
---

# 从零搭建我的技术笔记本

为了能随时记录日常学习中觉得有用的知识（如 LaTeX 排版、音频盲源分离、概率统计笔记和各种小工具教程），我搭建了这个个人技术博客。

以下是这个博客的项目构成、技术选型、关键代码实现以及自动部署的总结。

---

## 项目目录与构成解析

本博客基于 Astro 框架搭建，采用组件化与数据驱动的设计方式。核心项目结构如下：

```text
blog/
├── astro.config.mjs          # Astro 配置文件，集成 MDX 和 Vite 缓存设置
├── package.json              # 依赖包声明（包含 astro, three, gsap, tailwindcss）
├── src/
│   ├── components/           # 页面公共组件
│   │   ├── ShaderAnimation.astro   # 基于 Three.js 着色器绘制的 3D 背景
│   │   └── ThemeToggle.astro       # 主题切换下拉菜单组件
│   ├── content/              # 博客文章数据源
│   │   └── blog/                   # 存放 Markdown/MDX 文章及附件
│   ├── content.config.ts     # 数据集合（Collections）的架构校验文件
│   ├── layouts/              # 页面模板布局
│   │   ├── BaseLayout.astro        # 包含导航栏、页脚及全局样式的通用模板
│   │   └── BlogPostLayout.astro    # 博客文章详情页专用模板
│   ├── pages/                # 基于文件的路由系统
│   │   ├── index.astro             # 博客首页
│   │   ├── about.astro             # 关于我页面
│   │   ├── projects.astro          # 项目展示页面
│   │   ├── blog/                   # 文章列表及动态详情路由（[slug].astro）
│   │   └── tags/                   # 标签归档路由
│   ├── styles/               # 样式管理
│   │   └── global.css              # 全局样式，包含设计系统与毛玻璃特效
│   └── site.config.ts        # 站点与作者个人信息全局配置
```

在 Astro 架构中，`src/content/` 充当本地“数据库”，所有的文章以标准格式存放于此。`src/pages/` 通过文件系统路由自动将页面生成为静态 HTML 文件，保证极佳的加载性能。

---

## 技术选型与核心优势

在选型上，本项目主要考虑极速的加载体验和优秀的视觉交互：

1.  **Astro**：采用 Islands 孤岛架构，默认生成零 JS 的纯静态页面，仅在主题切换等需要交互的组件上才加载少量的客户端 JS。
2.  **Tailwind CSS (v4)**：利用 CSS 优先的设计系统快速定义微调卡片、边框及响应式网格。
3.  **Three.js**：在首页和卡片中集成 WebGL 画布，通过自定义片元着色器渲染具有脉冲发光和波纹起伏特效的 3D 文字背景。
4.  **GSAP**：处理入场过渡、卡片滚动淡入、信号波形动画以及鼠标悬停 3D 卡片倾斜交互。

---

## 关键技术点与代码实现

在博客的开发过程中，为提升交互性能并解决公式排版问题，我实现了以下核心代码：

### 1. Tailwind v4 自定义类名深色模式

Tailwind CSS v4 默认基于操作系统的媒体查询（`prefers-color-scheme`）触发 `dark:` 前缀样式。为了让用户手动切换“浅色”/“深色”时，样式能与页面 `html` 标签的 `.dark` 类名保持同步，我在 `global.css` 中配置了自定义变体规则：

```css
@import "tailwindcss";

/* 强制 Tailwind 使用类名选择器而非系统媒体查询 */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-ink: var(--theme-ink);
  --color-muted: var(--theme-muted);
  --color-paper: var(--theme-paper);
}

:root {
  --theme-ink: #1f2933;
  --theme-paper: #fffdf9;
}

.dark {
  --theme-ink: #e2e8f0;
  --theme-paper: #0b0f19;
}
```

### 2. 阻断白屏闪烁的同步主题脚本

为了防止用户在使用深色模式时刷新页面瞬间闪现白屏（FOUC 现象），我们将主题判定脚本放置在 `BaseLayout.astro` 的 `<head>` 顶端。该脚本采用同步执行机制，在浏览器渲染正文前完成类名添加：

```html
<head>
  <meta charset="UTF-8" />
  <script is:inline>
    const getTheme = () => {
      const saved = localStorage.getItem('theme');
      if (saved && saved !== 'system') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    const isDark = getTheme() === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.dataset.theme = localStorage.getItem('theme') || 'system';
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
```

### 3. 静态 HTML 笔记直链与重定向机制

数学类笔记（如概率统计）中含有大量复杂的数学公式。直接转成 Markdown 排版复杂且公式易解析出错。我的做法是直接将渲染好的静态 `概率统计.html` 放入 `public/` 静态目录，并在文章元信息中定义 `redirectUrl` 路径进行直接链接。

对于直接键入网址访问的用户，我们在动态路由 `[slug].astro` 中实现了客户端自动重定向：

```html
---
const { post } = Astro.props;

let Content = null;
let headings = [];
if (!post.data.redirectUrl) {
  const rendered = await render(post);
  Content = rendered.Content;
  headings = rendered.headings;
}
---

{
  post.data.redirectUrl ? (
    <html>
      <head>
        <meta http-equiv="refresh" content={`0;url=${post.data.redirectUrl}`} />
        <script is:inline define:vars={{ url: post.data.redirectUrl }}>
          window.location.replace(url);
        </script>
      </head>
      <body>
        <p>正在跳转...</p>
      </body>
    </html>
  ) : (
    <BlogPostLayout post={post} headings={headings}>
      <Content />
    </BlogPostLayout>
  )
}
```

---

## 托管与持续集成

项目目前部署在 Vercel 平台上，整个发布流程为自动持续集成：

1. 本地新撰写一篇文章，或者修改代码。
2. 运行 `git push` 将更新推送至 GitHub 仓库。
3. Vercel 接收 GitHub 推送钩子，自动在云端执行打包编译命令。
4. 构建通过后，新修改的内容会在一分钟内同步并刷新至线上地址，无需任何手动打包与服务器上传操作。
