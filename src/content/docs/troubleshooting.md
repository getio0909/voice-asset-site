---
title: 故障排除
description: 快速定位启动、登录、上传、Provider、MCP 和恢复问题。
---

## Console 显示 502 或空白页

运行 `docker compose -f deploy/compose/compose.yaml ps`，确认 migration 已成功退出、
API 健康且 gateway 正在运行。用 `curl http://127.0.0.1:18080/readyz` 区分 API
故障与代理故障。重新构建 Console 后清理浏览器旧缓存。

## 无法登录或 Cookie 丢失

确认浏览器 Origin 与 `VOICEASSET_PUBLIC_ORIGIN` 完全一致，包括协议和端口。HTTPS
部署必须启用 Secure Cookie；不要从不同主机名直接访问 API。重复 401 后等待登录
限流窗口，不要关闭保护。

## 上传或转写停住

检查对象卷空间、part 大小/编号和 SHA-256，再查看 worker 日志中的 `request_id`、
租约和重试状态。先用短 WAV 与 Mock ASR 排除供应商问题。M4A 必须是受支持的 ISO
BMFF/AAC 文件，扩展名本身不足以通过探测。

## Provider 或 MCP 失败

先运行 Profile 健康检查并确认主密钥未变化。MCP 同时检查 Server API Key Scope、
过期/撤销状态、入站 Bearer、TLS 信任和 `--enable-writes`。Capabilities 是公开端点，
不能证明 Token 有效；应调用一个受保护的最小读取端点。

## 备份或恢复失败

确认 `pg_dump`/`pg_restore` 可用、目标路径不重叠、创建时所有写进程已停止。恢复
必须使用干净数据库和空对象目录；失败后丢弃新目标再重试，不要清空生产路径。
