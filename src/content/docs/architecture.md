---
title: 架构
description: 五仓库边界、数据流和不可变性约束。
---

VoiceAsset 恰好由五个同级仓库组成：

| 仓库 | 职责 |
| --- | --- |
| `voice-asset-server` | Go API、worker、迁移、PostgreSQL 和对象存储边界 |
| `voice-asset-console` | Vue 3 管理界面和同源反向代理 |
| `voice-asset-android` | Kotlin/Compose 录音、Room 状态和 WorkManager 续传 |
| `voice-asset-mcp` | 只调用公开 REST API 的 Agent 语义层 |
| `voice-asset-site` | Astro/Starlight 双语静态文档 |

典型数据流为：客户端创建资产 → 分片上传原件 → worker 调用 ASR → 保存原始
响应和时间轴 Revision → LLM 生成纠错 Patch → 人工审核 → Approved Revision →
搜索、导出或 MCP 精确引用。

Server 是模块化单体，也是业务规则和 OpenAPI 的唯一权威来源。客户端不得
直连数据库、对象存储或供应商。原始音频、供应商响应和 Transcript Revision
不可变；可变元数据使用显式版本或审计记录。PostgreSQL 保存权威元数据，
本地对象目录保存内容寻址文件，两者通过[一致备份](../backup-restore/)共同保护。
