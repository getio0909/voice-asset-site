---
title: VoiceAsset
description: 可自托管、Agent Native 的语音数字资产管理平台。
template: splash
hero:
  tagline: 将录音转化为持久、可搜索、可审计的数字资产。
  actions:
    - text: 快速开始
      link: ./quick-start/
      icon: right-arrow
    - text: 查看功能
      link: ./features/
      icon: open-book
---

VoiceAsset 将 WAV/Android M4A 上传、转写、LLM 纠错、人工审核、导出和
Agent 访问组织为一套自托管工作流。原始音频、ASR 响应和 Transcript
Revision 保持不可变，Web、Android 与 MCP 只通过公开 API 协作。

项目当前处于 **Phase 6：v1.0 缺口收敛**。五个本地仓库已对齐 OpenAPI
`0.22.0`，加入认证 WebSocket 实时转写与 Owner Session-only 出站 Webhook 管理。隔离的
`10443` 环境现运行已验证的 `.20260718.9` Server/Worker/MCP、`0.22.0`、
schema 18 和匹配 Console；Webhook 创建、测试、轮换密钥与投递历史验收通过，
现有证书与公共 Caddy 保持不变。
尚未发布
`v1.0.0`，请先阅读[项目状态](./project-status/)与
[下载说明](./downloads/)。
