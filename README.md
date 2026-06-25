# 🌟 Personal Tech Blog | LiH 的个人技术笔记

[![Astro](https://img.shields.io/badge/Astro-v5.x-ff5a03?style=flat-square&logo=astro)](https://astro.build/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.x-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-latest-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

这是一个基于 **Astro**、**Tailwind CSS v4** 和 **TypeScript** 搭建的轻量级、响应式个人技术笔记博客。集成了 **Three.js** 3D 自定义着色器背景以及 **GSAP** 微交互动效，提供极致的视觉体验和顺滑的使用手感。

📂 **项目地址**：[https://github.com/LiH001/blog](https://github.com/LiH001/blog)  
🌐 **在线演示**：[https://blog-five-mocha-42.vercel.app/](https://blog-five-mocha-42.vercel.app/)

---

## ✨ 核心特性

- 🎨 **极具质感的视觉设计**：采用现代**毛玻璃拟物风 (Glassmorphism)** 设计，搭配精致的网格背景与半透明卡片阴影。
- 🌓 **三态主题切换**：支持 ☀️ 浅色 (Light)、🌙 深色 (Dark) 和 💻 跟随系统 (System) 三种主题模式，通过内联同步脚本优化，彻底**防止页面加载时的白屏闪烁 (FOUC)**。
- 🎭 **深色主题对比度优化**：针对深色模式重新设计了所有按钮、分类标签云（Tags）、卡片和代码块的配色方案，确保在任何屏幕和光线下都有高水平的对比度和极佳的可读性。
- 🔮 **着色器 3D 动效背景**：使用 **Three.js** 开发的自定义片元/顶点着色器（Fragment/Vertex Shader）背景，为博客带来生动的流动感和未来感。
- 🚀 **极速静态生成 (SSG)**：基于 Astro 纯静态路由渲染，页面秒开。
- 📝 **Markdown & MDX 深度集成**：支持快速编写数学公式、插入代码段并集成 Shiki 代码语法着色（使用 `github-dark` 主题）。
- 📑 **内容集合规范管理**：基于 Astro Content Collections，实现文章发布状态过滤、按时间倒序排列、自动化标签关联等。

---

## 🛠 技术栈

| 模块 | 选型 | 说明 |
| :--- | :--- | :--- |
| **基础框架** | **Astro 5.x** | 新一代静态网站生成器，极佳的开发体验与极致的体积优化 |
| **编程语言** | **TypeScript** | 强类型支撑，保证逻辑严谨性 |
| **样式与布局** | **Tailwind CSS v4** + PostCSS | 采用全新 v4 架构的 CSS 样式引擎，实现更高效的编译和灵活的主题适配 |
| **3D 渲染** | **Three.js** | 用于渲染头部区域动态粒子/流动着色器动画 |
| **交互动效** | **GSAP** | 驱动流畅的卡片倾斜、悬浮及滚动交互过渡效果 |
| **内容解析** | **@astrojs/mdx** | 允许在 Markdown 中直接导入并使用 Astro 组件 |
| **代码高亮** | **Shiki** | 运行于编译时的精准代码语法着色 |
| **部署托管** | **Vercel** | Git 挂钩自动化 CI/CD，支持全球边缘网络 CDN 加速 |

---

## 📂 项目结构

```bash
blog/
├── src/
│   ├── components/      # 重用 UI 组件 (如 ThemeToggle.astro, ShaderAnimation.astro 等)
│   ├── content/         # Markdown / MDX 博客文章与内容配置 (Content Collections)
│   ├── layouts/         # 基础页面模板布局 (BaseLayout.astro)
│   ├── pages/           # Astro 页面文件 (定义 /blog, /about, /projects 等静态路由)
│   ├── scripts/         # 交互与初始化脚本 (如防闪烁内联脚本)
│   ├── styles/          # 全局样式配置 (global.css)
│   └── utils/           # 辅助工具函数 (如内容格式化、标签整理)
├── public/              # 静态公共资源 (头像、图标等)
├── astro.config.mjs     # Astro 配置文件
├── tsconfig.json        # TypeScript 配置文件
└── package.json         # 项目依赖与运行脚本
```

---

## 🚀 快速开始

### 1. 克隆并进入仓库

```bash
git clone https://github.com/LiH001/blog.git
cd blog
```

### 2. 安装依赖

推荐使用 `npm` 进行依赖安装：

```bash
npm install
```

### 3. 本地开发

启动本地开发服务器（默认运行在 `http://localhost:4321`）：

```bash
npm run dev
```

### 4. 生产环境打包

静态生成所有的 HTML、CSS 与 JS 文件：

```bash
npm run build
```

构建完成后，可以在本地预览打包效果：

```bash
npm run preview
```

---

## 🌐 部署与自动化

本项目现已完美适配 **Vercel** 自动化静态页面托管。

当您向 GitHub 仓库的 `main` 分支提交代码并推送（`git push`）时，Vercel 关联项目将自动捕获更新，并在云端自动执行 `npm run build` 生成最新静态页面，全程无需人工干预即可完成秒级零停机发布。

---

## 📝 许可证

本项目基于 [MIT License](./LICENSE) 许可发布。
