---
title: 备份与恢复
description: 创建可验证的一致备份并恢复到全新数据库和对象目录。
---

备份包含 PostgreSQL Custom Archive、完整本地对象树及版本化 SHA-256 Manifest。
创建时必须停止 API、worker 和外部 MCP 写入；验证不需要停服。

```bash
make backup BACKUP_DIR=/app/backups/2026-07-16T2000Z
make backup-verify BACKUP_DIR=/app/backups/2026-07-16T2000Z
```

Make 入口会先构建管理镜像，停止 Compose API/worker，并用退出 Trap 保证两者在
成功或失败后恢复。若另行运行 MCP，须在命令前手动停止。独立网关可保持运行。
备份卷仍在同一宿主，完成后应导出、加密并异地保存。

恢复只接受没有用户对象的新数据库，以及新建或空对象路径。先创建目标数据库，
将 `VOICEASSET_COMPOSE_DATABASE_URL` 指向它，再执行：

```bash
make restore \
  BACKUP_DIR=/app/backups/2026-07-16T2000Z \
  RESTORE_STORAGE=/app/var/restored
```

不要指向生产数据库；工具会拒绝非空目标。恢复后以一次性 API/worker 配置验证
`/readyz`、用户、资产、音频 Range、Revision、词库和审计，并比较对象 Hash。
验证完成前不要切换流量。若数据库已提交但对象发布失败，丢弃这两个新目标后重试。

详细 systemd 命令、失败处理和已通过的 30 表/13 文件演练证据见 Server 的
`docs/operations/backup-restore.md`。
