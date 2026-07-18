---
title: Changelog
description: 查找五个组件的版本化变更记录。
---

每个仓库独立采用 Keep a Changelog 与 Semantic Versioning。跨仓库功能先以 Server
OpenAPI 版本建立兼容边界，再分别记录客户端实现；不要只根据某一个仓库的版本
推断整套系统兼容。

- [Server CHANGELOG](https://github.com/getio0909/voice-asset-server/blob/main/CHANGELOG.md)
- [Console CHANGELOG](https://github.com/getio0909/voice-asset-console/blob/main/CHANGELOG.md)
- [Android CHANGELOG](https://github.com/getio0909/voice-asset-android/blob/main/CHANGELOG.md)
- [MCP CHANGELOG](https://github.com/getio0909/voice-asset-mcp/blob/main/CHANGELOG.md)
- [Site CHANGELOG](https://github.com/getio0909/voice-asset-site/blob/main/CHANGELOG.md)

当前本地共同契约是 OpenAPI `0.22.0`。升级前阅读所有受影响组件的 `[Unreleased]`、
Server 迁移说明和兼容矩阵，并先执行备份。当前
[v1.0 发布说明草案](../release-notes/)区分已验证候选和未关闭门禁；正式版本还会
补充精确 Commit、镜像 Digest、Checksums、SBOM 和已验证的组合。

当前 `[Unreleased]` Console 已加入 LLM Profile/术语表管理和显式策略切换；人工
审核仍为默认值。仅 `validated_glossary_only` 可在非空术语规则和确定性变更通过
全部 Server 校验后原子生成审核、系统审计及 Approved Revision。`.6` 远端只读
浏览器验收通过严格 TLS，凭据值不返回浏览器，且未重启 MCP 或任一 Caddy。

Android `[Unreleased]` 现在会在兼容但不提供 `incremental_sync` 的 Server 上通过
有界稳定清单引导缓存；真实严格 TLS 的 `0.13.0`/10443 烟测已验证分页响应。新版
Server 继续使用增量游标，Room 不会回退较新行或 tombstone。缓存资产还可打开元数据
编辑器：先读取最新强 ETag，
再以精确 `If-Match` 整体替换标题、语言和可空 Collection。冲突必须重载，成功只
刷新对应 Room 行且不推进同步游标。新增的有界移动管理卡片可读取系统计数、近期 Job
及 ASR/LLM Profile 状态，并仅以精确资源版本修改 Profile 状态。显式健康检查只保留
安全分类和检查时间。真实 `10443` 烟测在可逆修改后恢复了已启用的 LLM Profile，
Mock LLM 返回 `healthy`，两个网关服务均保持运行且没有重启；112 个 JVM 测试和
32 个设备测试方法编译门禁通过。

Server `[Unreleased]` 还加入认证 WebSocket 实时转写，以及 Owner Session-only 出站 Webhook：一次性加密密钥、
版本前置条件、通知触发的持久投递、租约重试、签名请求和有界历史查询。Console
提供对应管理页；真实 PostgreSQL、隔离 10443 验收和 91 操作 API 参考均已同步。
