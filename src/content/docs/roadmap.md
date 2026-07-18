---
title: Roadmap
description: Phase 6 到 v1.0 正式发布的剩余工作。
---

当前处于 **Phase 6：v1.0 发布候选**。中英文站点、自动 API 参考、单机 Compose
网关、离线一致备份/干净恢复，以及隔离 `10443` 的 0.11 Server、Console、MCP
波形切片已验证；Phase 5 的全部默认分支 CI 退出门禁仍未关闭。

Phase 6 剩余工作：

- 跨仓库完整 Mock ASR → LLM → Review → MCP → Export → Restore E2E；
- 性能、安全、数据迁移、Docker 升级和 Android 稳定性测试；
- AMD64/ARM64 产物、签名 APK、Checksums、SBOM 与 Release Notes；
- 完整兼容矩阵和 `v1.0` Release Checklist。

v1.0 明确不包含 iOS、通话录音、任意 Shell/SSH 管理、SaaS 计费、跨区域多活、
Kubernetes Operator、Kafka、服务网格、自研基础模型、视频编辑器或无限制插件。
这些项目可以进入后续 Roadmap，但不会降低当前验收标准。
