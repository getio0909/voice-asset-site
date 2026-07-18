---
title: ASR 配置
description: 配置 Mock、阿里云和腾讯云转写 Provider。
---

首次部署先使用内置 Mock ASR。它不访问网络、不需要凭据，并生成确定性时间轴，
适合验证上传、worker、Transcript 和备份路径。

真实 Provider Profile 属于工作区，只能由管理员通过 Console 或公开 API 创建。
阿里云与腾讯云凭据由 Server 使用 `VOICEASSET_PROFILE_MASTER_KEY` 加密；浏览器、
Android 和 MCP 永远不接收明文。创建 Profile 后先运行健康检查，再将其启用并
发起短音频测试。不要把 App Key、Secret 或 Token 写入 `.env.example`、日志、
Fixture 或请求 URL。

Server 会限制并发、重试可恢复错误，并仅在策略允许时故障转移。每个任务保存
实际 Provider、Profile、热词版本和原始响应，因此切换 Provider 不会改写历史。
阿里与腾讯的录制 Fixture 契约测试不需要云凭据；真实测试必须显式设置
`VOICEASSET_LIVE_ASR=1` 及对应进程环境。

识别提示使用独立的[ASR 热词](../dictionaries/)，不要把纠错规则塞进热词。
端点和模式见[自动生成 API 参考](../api-reference/)。
