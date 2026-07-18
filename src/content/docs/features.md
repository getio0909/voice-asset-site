---
title: 产品功能
description: VoiceAsset 当前已实现的资产、转写、审核和 Agent 能力。
---

## 资产工作流

- 创建工作区资产并分片、校验上传 WAV 或 Android M4A 原件。
- 使用 Mock、阿里云或腾讯云 ASR 运行可恢复任务；原始供应商响应永久保留。
- 将时间轴保存为不可变 Revision，并通过 Mock/OpenAI-compatible LLM
  生成结构化纠错建议。
- 逐项接受或拒绝修改，最后创建不可变的 Approved Revision。

## 查找与交付

Console 提供登录、全会话撤销的账户密码修改、上传、转写、纠错审核、最多 100 条已加载资产的有界批量回收/恢复、ASR Profile/热词、LLM Profile/术语表和最小权限 API Key 生命周期管理。对于已回收资产，只有工作区 Owner 在输入完整资产 ID 后才能请求永久删除；Console 显示持久任务状态及终态失败后的明确恢复，不会把受理误报为立即清除。每项批量请求都携带独立资源版本，冲突项不会中止其他项。LLM API Key 与自定义 Header 值只写且不进入浏览器持久存储。人工审核默认启用；管理员可选择仅在非空术语替换通过全部安全校验时生效的 `validated_glossary_only` 自动批准。公开 API 支持标题与最新 Transcript Segment 的 PostgreSQL 全文检索、Collection/Tag/状态/日期/Provider/Speaker 筛选、带时间码的有界命中、组织
元数据、精确时间段 Transcript、Range 音频读取、异步生成且校验完整性的不可变
波形 PNG、短 Clip，以及 JSON、
Markdown、SRT、WebVTT 导出。MCP 在同一权限边界上提供 21 个工具、资源和
提示词；写工具默认关闭。交互 Session 还可通过个人事件源读取与任务状态同事务
写入的终态历史；API Key 被拒绝，当前 Console、Android 和 MCP 尚未接入该视图。

## 安全与可运维性

会话使用 HttpOnly Cookie；Agent 使用一次性、可过期、可撤销的最小权限
API Key。供应商凭据加密存储，读写都有工作区隔离和审计。Server 包含迁移、
健康检查、离线一致备份和只恢复到干净目标的工具。
worker 异步生成波形，Console 支持点击或键盘跳转及 0.75–2 倍速播放；worker 还以
校验完整性、可重试的有界批次清理过期 Clip/导出文件与元数据；除非 Owner 另行
确认资产永久删除，否则保留源记录和审计。

当前是 Phase 6 候选版本，不是生产 SLA 承诺。请结合[项目状态](../project-status/)
和[安全模型](../security/)评估部署。
