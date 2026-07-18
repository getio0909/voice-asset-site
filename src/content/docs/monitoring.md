---
title: 监控
description: 健康探针、日志、关键指标和最小告警基线。
---

反向代理和编排器使用以下无秘密端点：

| 端点                          | 用途                                     |
| ----------------------------- | ---------------------------------------- |
| `/livez`                      | API 进程是否存活；只用于重启判断         |
| `/readyz`                     | 数据库等依赖是否可服务；只在成功时接流量 |
| `/healthz`                    | 聚合健康状态，适合人工诊断               |
| `/api/v1/system/capabilities` | 版本与功能协商，不是凭据验证端点         |
| API 直连 `/metrics`           | 进程内 Prometheus HTTP 指标；不要代理     |

Compose 使用 `docker compose ps`、`logs --since` 和容器重启计数；systemd 使用
`systemctl is-active/show` 与 `journalctl -u voiceasset-*`。结构化请求日志保留时间、
状态码、延迟和 `request_id`，但不得包含 Cookie、API Key、Provider Secret、音频
或 Transcript 正文。

至少监控：5xx/429 比例、P95 延迟、数据库连接与磁盘、对象卷空间、过期 Clip/导出
积压、worker 租约过期/重试、Job 队列年龄、Provider 超时、上传校验失败、登录限流、API Key 拒绝、
备份最后成功时间及定期恢复演练。对 `/readyz` 连续失败、磁盘余量不足、任务积压、
审计写入失败和备份过期设置告警。

worker 每次公平调度最多清理 25 个过期 Clip/导出，并在删除前校验大小和 SHA-256。
如果最早过期时间连续多个心跳仍落后于当前时间，或积压增长时不再出现
`artifact.reaped` system 审计，应立即告警。

API 直连监听器通过 `GET /metrics` 输出 Prometheus 文本。标签只包含有限集合的
Method、Route Family 和状态码，不包含原始路径、Query、凭据或资源 ID；同源网关
不会代理该端点。只允许 Prometheus 通过回环或私有运维网络抓取，不要公开暴露，
也不要给监控系统授予业务写 Scope。请求延迟使用固定累计 Bucket 的 Histogram，
可以在不引入原始路径标签的情况下计算 P95。

隔离测试部署运行校验和固定的 Prometheus 3.13.1，仅监听
`127.0.0.1:19090`，每 15 秒抓取/计算，并按 7 天或 1 GiB 上限保留 TSDB。
配置包含 API Down、持续 5xx、持续 P95 超限和配置重载失败四条已通过
`promtool` 单元测试的规则；两个抓取目标均健康，重启后历史 Range Query 仍可读。
网关、UFW 和公网都不暴露 `/metrics` 或 `19090`。

API 内存计数仍会随进程重启清零，但已抓取样本由上述 TSDB 保存。当前规则没有
通知接收端，部署者必须另行选择并验证告警路由。API/Worker 在显式配置
`VOICEASSET_OTEL_EXPORTER_OTLP_ENDPOINT` 时输出 OTLP/HTTP Trace；当前部署尚未配置
Collector 或通知接收端，Worker、数据库和存储信号仍需外部采集。
