---
title: 下载
description: 当前可用的源码构建方式与未来发布产物。
---

VoiceAsset 尚未发布 `v1.0.0`，目前没有可声明为稳定版的预构建二进制、APK 或容器
Tag。不要从非官方附件安装，也不要把隔离测试服务器当作生产下载源。

当前可从五个官方仓库获取源码：

- [Server](https://github.com/getio0909/voice-asset-server)
- [Console](https://github.com/getio0909/voice-asset-console)
- [Android](https://github.com/getio0909/voice-asset-android)
- [MCP](https://github.com/getio0909/voice-asset-mcp)
- [Site](https://github.com/getio0909/voice-asset-site)

本地候选构建分别使用 `make build`、`pnpm build`、
`./gradlew assembleDebug`、`make build` 和 `pnpm build`。部署优先按
[快速开始](../quick-start/)从固定提交构建 Compose 镜像。

Phase 6 将生成 AMD64/ARM64 Server 与 MCP、Console/Site 静态包、签名 Android
APK、容器清单、SHA-256、SBOM、Release Notes 和兼容矩阵。当前
[v1.0 发布说明草案](../release-notes/)列出了已验证证据和未关闭门禁。只有 CI、
跨仓库 E2E、安全、迁移、恢复和 Android 设备门禁全部通过后，下载页才会链接这些
版本化产物。
