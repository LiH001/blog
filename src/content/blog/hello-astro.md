---
title: "用 Astro 搭一个轻量个人博客"
description: "第一篇示例文章：介绍这个博客的目录、内容管理方式和适合继续扩展的方向。"
pubDate: "2026-06-16"
tags: ["Astro", "Blog", "Frontend"]
cover: "/covers/astro-blog.svg"
coverAlt: "个人技术博客封面"
---

## 为什么选 Astro

Astro 很适合内容型网站。它默认输出静态 HTML，访问速度快，部署简单，也可以在需要的时候局部引入交互组件。

这个博客的文章统一放在 `src/content/blog` 目录下，每篇文章通过 frontmatter 管理标题、摘要、发布日期、标签和封面图。

## 文章 frontmatter

一篇文章的基础格式如下：

```md
---
title: "文章标题"
description: "文章摘要"
pubDate: "2026-06-16"
tags: ["Astro", "TypeScript"]
cover: "/covers/astro-blog.svg"
---
```

## 适合继续扩展的方向

- 增加深色模式
- 增加全文搜索
- 增加阅读时间统计
- 增加相关文章推荐
- 接入评论系统

## 一个 TypeScript 示例

```ts
type Post = {
  title: string;
  tags: string[];
  pubDate: Date;
};

function isRecent(post: Post) {
  const thirtyDays = 1000 * 60 * 60 * 24 * 30;
  return Date.now() - post.pubDate.valueOf() < thirtyDays;
}
```

写博客的关键不是一次把系统做满，而是先让发布路径足够短。之后每次写作时发现重复动作，再把它变成工具。
