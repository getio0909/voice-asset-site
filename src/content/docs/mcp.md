---
title: MCP 配置
description: 以最小权限运行本地 stdio 或远程 Streamable HTTP Agent 服务。
---

MCP Server 只调用 VoiceAsset 公开 REST API，不读取 PostgreSQL 或对象目录。
`search_assets` 可按标题/最新转写、Provider 与 Speaker 检索，并返回可直接引用的
Revision、Segment 和毫秒时间码。
本地客户端优先使用 stdio：

```bash
export VOICE_ASSET_SERVER_URL=https://voice.example.com
export VOICE_ASSET_SERVER_TOKEN='one-time-server-api-key'
go run ./cmd/voice-asset-mcp --transport=stdio
```

写工具默认关闭。只有 API Key 具备相应 Server Scope，并显式传入
`--enable-writes` 或 `VOICE_ASSET_MCP_ENABLE_WRITES=true` 时才会注册。只读 Agent
通常只需要 `assets:read` 与 `transcripts:read`；Clip/导出或元数据写入应单独增加
最小 Scope。每次读取和写入仍由 Server 授权并审计。

远程模式监听 `/mcp`：

```bash
go run ./cmd/voice-asset-mcp --transport=http --listen=127.0.0.1:8090
```

非 loopback 监听必须配置原生 TLS 证书/私钥和独立入站 Bearer。入站 Bearer 与
MCP 调用 Server 的 API Key 不是同一个秘密。保持速率限制、Origin 防护和请求
大小限制；不要用 `--enable-writes` 代替 Scope 管理。内部 CA 应加入客户端信任库，
禁止关闭生产 TLS 校验。完整工具列表和远程测试变量见 MCP 仓库 README。
