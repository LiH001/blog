---
title: "TronClass 题库导入与管理教程"
description: "详细介绍如何在 TronClass 教学平台中进行题库的高效导入、批量管理和组卷设置。"
pubDate: 2026-06-25
tags: ["TronClass", "教学工具", "题库管理"]
draft: false
---

# 从畅课网站抓取题库的教程

## 1. 准备工作：进入页面与开启开发者模式

首先，进入你需要提取小测或题库的页面。

![图片](/images/tronclass-tutorial/image1.png)

按下 f12 打开开发者模式，然后打开“网络”模块，勾选“保留日志”，选择“fetch/xhr”过滤器。

![图片](/images/tronclass-tutorial/image2.png)

## 2. 获取网络请求：查看测试记录

点击对应记录右侧的“查看”按钮。

![图片](/images/tronclass-tutorial/image3.png)

此时注意网页 url 中的数字编号（例如 1417044），在网络面板中找到与之同名的数据包。

![图片](/images/tronclass-tutorial/image4.png)

## 3. 提取数据包

右键点击该请求，选择“复制” -> “复制响应”。

![图片](/images/tronclass-tutorial/image5.png)

## 4. 解析 json 数据

打开 vscode 或其他文本编辑器，新建文件并将复制的内容粘贴进去。

![图片](/images/tronclass-tutorial/image6.png)

由于数据是 unicode 编码（显示为 \u 开头的字符），你可以直接把整段 json 交给 ai，让 ai 帮你把 unicode 转化为正常中文，并梳理出最终的题库文本。

![图片](/images/tronclass-tutorial/image7.png)
