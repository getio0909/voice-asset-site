---
title: 开发者指南
description: 五仓库开发命令、契约同步和验证顺序。
---

将五个仓库克隆为同级目录。业务契约只在
`voice-asset-server/contracts/openapi.yaml` 定义；客户端通过各自
`CONTRACT_VERSION` 失败关闭，不能复制 Server 业务规则。

| 仓库 | 最小验证 |
| --- | --- |
| Server | `go test ./... && go vet ./... && make contract` |
| Console | `pnpm run verify` |
| Android | `./gradlew test lint assembleDebug` |
| MCP | `make verify` |
| Site | `pnpm test` |

先运行最小单元测试，再运行 lint/typecheck/build，最后才运行需要 PostgreSQL、
浏览器、Android SDK 或真实 Provider 的集成测试。Mock ASR/LLM 和录制 Fixture
必须在无云凭据时通过；Live Test 只能由显式环境开关启用。

API 变更顺序：修改 OpenAPI 与 Server 测试 → 实现 Server → 更新契约版本和兼容
矩阵 → 更新 Console/Android/MCP Pin → 在 Site 运行
`pnpm generate:api-reference` → 运行跨仓库 E2E。破坏性设计需新增 ADR，不能改写
已接受记录。

保持变更单一、测试可复现，不提交 `.env`、`local.properties`、Token、真实 Provider
响应或生成报告。具体目录和语言规范见各仓库 `AGENTS.md` 与 `CONTRIBUTING.md`。
