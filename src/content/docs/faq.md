---
title: FAQ
description: VoiceAsset 部署、数据、Provider、MCP 和发布常见问题。
---

## 可以完全离线运行吗？

可以使用本地存储、PostgreSQL、Mock ASR 和 Mock LLM 验证完整核心流程。选择云
Provider 后，对应音频或文本会发送到该服务。

## 支持哪些上传格式？

当前接受经过内容探测的 WAV 和 Android AAC/M4A。文件扩展名不会绕过大小、结构、
Hash 和音频边界检查。

## MCP 会直连数据库吗？

不会。MCP 只调用公开 Server API，Scope、工作区隔离和审计仍由 Server 强制。

## 支持 S3-compatible Storage 吗？

Server API/Worker 已接入 AWS SDK v2 的 S3-compatible 适配器，并覆盖条件创建、完整哈希校验、ETag 删除和分页清理。
但代表性远端性能与备份/恢复证据尚未完成，因此 v1.0 仍不把该后端标记为 release-grade。

## 为什么不能原地恢复？

拒绝非空数据库和对象目录可以避免覆盖正确数据或形成数据库/文件混合版本。恢复到
新目标、验证后切换更容易审计和回滚。

## 何时提供稳定 APK 和容器？

Phase 6 的 Android 设备、跨架构、迁移、安全和发布门禁通过后才会提供带 Checksum
与 SBOM 的 `v1.0.0` 产物。参见[下载页](../downloads/)。
