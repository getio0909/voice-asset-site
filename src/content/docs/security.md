---
title: 安全模型
description: 信任边界、身份认证、秘密、网络和审计控制。
---

Server 是唯一业务信任边界。Console 使用 SameSite、HttpOnly Session Cookie 和
Origin 校验；Android 使用 Keystore 保护会话；Agent 使用只显示一次明文的哈希
API Key。Key 必须限定工作区、Scope、过期时间并支持撤销，MCP 的入站 Bearer
不能代替 Server Key。

账户页修改密码时必须重新提供当前密码。Server 在一个事务中替换 PBKDF2 哈希、
撤销该用户跨工作区的全部 Session，并写入不含密码或哈希的审计记录；成功后
Console 清除本地身份并要求重新登录。此端点拒绝 API Key，且按用户和客户端 IP
限制尝试次数。

供应商凭据由稳定、随机的 `VOICEASSET_PROFILE_MASTER_KEY` 加密。主密钥与数据库
备份必须分开保存；丢失主密钥会使已保存 Profile 无法解密。秘密不得进入 Git、
命令参数、URL、日志、Fixture 或前端 Bundle。

仅反向代理对外开放 HTTPS。PostgreSQL、API、worker 和 MCP 保持 loopback 或
私网；远程 MCP 同时需要 TLS、入站 Bearer、速率限制和 Origin 防护。Console
网关发送 CSP、Permissions-Policy、Referrer-Policy、MIME 和 Frame 防护 Header。

工作区查询、API Key Scope、资源所有权与软删除都在 Server 强制执行。关键读写
留下不可变审计记录；日志应保留 `request_id`，但要删去 Cookie、Token、音频和
Transcript 正文。备份按高敏数据加密、限权和异地保存。

部署前运行各仓库测试、依赖漏洞/许可证检查、Secret Scan 和[恢复演练](../backup-restore/)。
安全问题请按各仓库 `SECURITY.md` 私下报告，不要公开真实数据或利用细节。
