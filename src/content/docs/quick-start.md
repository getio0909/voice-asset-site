---
title: 快速开始
description: 使用相邻仓库和 Docker Compose 启动本地 Mock 工作流。
---

## 1. 准备仓库

需要 Git、Docker Engine、Compose v2；GNU Make 是可选快捷入口。Server 和
Console 必须保持为同级目录：

```bash
git clone https://github.com/getio0909/voice-asset-server.git
git clone https://github.com/getio0909/voice-asset-console.git
cd voice-asset-server
cp .env.example .env
make up
```

Windows PowerShell 使用 `Copy-Item .env.example .env`。首次构建完成后打开
`http://localhost:8080`；直接 API 诊断端口为 `127.0.0.1:18080`。

## 2. 创建初始管理员

先将密码放入当前进程环境，不要写到命令参数或仓库文件：

```bash
export VOICEASSET_ADMIN_PASSWORD='replace-this-local-password'
make seed ADMIN_EMAIL=owner@example.com
unset VOICEASSET_ADMIN_PASSWORD
```

PowerShell 对应 `$env:VOICEASSET_ADMIN_PASSWORD = '...'`，完成后执行
`Remove-Item Env:VOICEASSET_ADMIN_PASSWORD`。

## 3. 完成首次转写

登录 Console，创建资产，上传短 WAV，选择内置 Mock ASR 并等待 worker 完成。
Mock 不需要云凭据。确认音频可播放且 Transcript 显示时间码后，再阅读
[ASR 配置](../asr/)或[LLM 配置](../llm/)。默认 Compose 密码只适合本机；
任何联网部署都必须先按[部署指南](../deployment/)加固。
