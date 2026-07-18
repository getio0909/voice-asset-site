---
title: Docker Compose 部署
description: 单机拓扑、配置、数据卷、升级与回滚。
---

Compose 启动 PostgreSQL、一次性迁移、API、worker、管理工具，以及内置 Caddy
的 Console 网关。默认只有网关 `127.0.0.1:8080` 和诊断 API
`127.0.0.1:18080` 暴露到宿主；不要直接把开发配置发布到公网。

```bash
cp .env.example .env
docker compose -f deploy/compose/compose.yaml up --build --detach
docker compose -f deploy/compose/compose.yaml ps
curl --fail http://localhost:8080/readyz
```

`postgres_data` 保存数据库，`object_data` 保存原件、上传分片和生成物，
`backup_data` 保存管理工具创建的备份。`docker compose down` 不删除这些卷；
不要使用 `down --volumes`，除非明确要销毁所有数据。

联网部署时更换数据库密码，设置随机的 `VOICEASSET_PROFILE_MASTER_KEY`，将
`VOICEASSET_PUBLIC_ORIGIN` 设为唯一 HTTPS Origin，并在受信任反向代理后终止
TLS。只开放网关；PostgreSQL、API 和 MCP 保持私网或 loopback。

升级前先[备份并验证](../backup-restore/)，拉取固定版本，重新构建，运行迁移，
再启动服务并检查 `/readyz`。应用回滚只有在新迁移向后兼容时安全；否则恢复
升级前备份到全新数据库和对象目录。Dockerfile 使用支持 AMD64/ARM64 的上游
镜像，但每个目标架构仍须在发布前实际构建验证。
