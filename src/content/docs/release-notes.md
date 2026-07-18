---
title: v1.0 发布说明（草案）
description: VoiceAsset v1.0 候选范围、验证证据和正式发布前门禁。
---

> **状态：草案，尚未发布。** VoiceAsset 尚未创建 `v1.0.0` Tag，也没有可声明为
> Stable 的二进制、容器或 APK。本页不会把本地候选和隔离测试部署当作正式版本。

## 候选范围

当前五个本地组件共同固定 OpenAPI `0.22.0`：Server 提供上传、不可变音频、异步波形、ASR、修订、
校对审核、API Key、设备会话、全文检索、Provider/Speaker 筛选、Segment 时间码、回收/恢复、Owner 明确确认的持久化永久删除、管理端 Job/审计/系统状态读取、本地工作区资料/成员生命周期，以及仅限 Session 的个人密码轮换；Console 覆盖主要 Owner 工作流；MCP 提供 21 个工具、
5 个资源和 6 个 Prompt；Site 提供中英文产品与运维文档。Android 已实现离线录音与
同步源代码、事务化增量资产变更缓存、活动服务器最近 50 条资产的离线 Compose 展示；
不提供增量能力的兼容 Server 会改用严格校验的有界资产清单引导，且无凭据输出的严格
TLS 烟测已验证远端 `0.13.0`/10443 分页。另有不依赖 0.16 增量流的本地录音上传/转写状态列表，并通过应用编译、lint、Room schema、Debug/Test APK、未签名 Release
APK/AAB 和 SBOM 门禁。Profile 可分别设置上传与批量转写策略，两个 WorkManager
阶段使用独立约束，Manual 策略提供明确的开始操作。失败或阻塞的同步项可从最后的
持久检查点手动重试，转写重试会使用新的幂等代次。下一条录音还能继承 Profile 默认值
或分别覆盖两项策略；Room 4 在开始录音时保存快照，重启和重试不会改变其语义。同一
离线查询可按缓存资产与本地录音的身份、元数据、状态和错误筛选，同时保留总数/匹配数、
每类 50 条上限以及被筛选隐藏的当前播放控件。连接
设备后的运行门禁尚未通过。未移入回收站的缓存资产还可先读取最新强 ETag，再用精确
`If-Match` 整体更新标题、语言和可空 Collection；冲突必须重载，成功只刷新对应
Room 行且不推进游标。已保存录音还可在身份、规范路径、大小及 SHA-256 校验后
在应用内播放，或通过不导出且只读的 Content URI 由用户主动分享。播放器提供暂停、
继续、停止和失败重试，并处理音频焦点与耳机断开。有界移动管理卡片可读取系统计数、
20 条近期 Job 及安全的 ASR/LLM Profile 状态，并以精确版本修改状态；Server 明确
标记为可重试的失败任务可沿用同一 UUID 增加一次有界尝试。应用不提供 Shell 或任意
命令入口；显式健康检查只保留安全分类和检查时间。0.22 候选还增加认证 WebSocket 实时转写与 Owner Session-only
出站 Webhook 管理、一次性加密密钥、持久投递、租约重试、签名请求和有界历史查询，
Console 提供对应管理页，并已通过真实 PostgreSQL 与隔离 10443 验收。0.20 候选新增仅限交互 Session
的个人终态任务事件：通知与任务状态同事务写入，只复制允许字段，游标绑定工作区与
用户，API Key 被拒绝；Console、Android 与 MCP 暂不消费该能力。0.19 候选还提供经审计、只读的
部署系统设置视图，只返回品牌、公开 Origin、存储类型及安全开关等允许字段；工作区
角色不能修改配置，页面不读取全局设置表，也不暴露路径、端点或凭据。0.18 候选还提供五分钟、单次使用的
个人设备配对；Console 只在内存中显示复制载荷，Android 严格解析后通过 Keystore 保存
完整 access/refresh 会话，临期时经单一边界轮换。新的设备清单采用两步精确 UUID 撤销，
撤销本机仅在远端成功后清理本地凭据。同一 Profile 可在不改变离线身份的前提下重新
连接；密码在网络请求前清除且不落盘，认证失败不修改已有会话。当前无需二维码依赖。

## 已验证证据

- Server、Console、MCP 和 Site 的本地测试、静态检查及构建通过。Android 的 134 个
  JVM 测试、Ktlint、核心与 app lint、Debug/Test APK、未签名 Release APK/AAB、
  43 个 instrumentation 测试编译及 141 组件 SBOM/校验和门禁通过，但不把设备测试
  或正式签名描述为已完成。
- 0.11 波形切片已通过迁移 1–11、所有历史版本升级、真实 PostgreSQL、真实
  FFmpeg 字节确定性与性能、认证读取、Console 跳转/倍速和浏览器无障碍门禁。
- 0.12 永久删除候选已在真实 PostgreSQL 中通过迁移 1–12 的全部历史版本升级，
  并验证成功删除、完整性失败、终态恢复、关系图移除及审计保留。模拟 Chromium
  已验证精确 ID 确认、持久任务状态、恢复与无障碍；部署浏览器也上传/转写专用
  资产、移入回收站并观察精确 ID 永久删除成功，关系图与两个对象文件均已移除，
  审计仍保留。后续自清理验收还验证了 Server `404`，以及永久删除进入 `succeeded`
  后 Console 立即移除对应的内存转写结果。
- 0.13 管理读取候选通过工作区隔离、筛选绑定游标、收敛字段和失败关闭读审计的
  Server 单元/真实 PostgreSQL 覆盖；Console 的 76 个单元测试与模拟 Chromium
  已覆盖 Job Center、审计日志、实时 Dashboard 和系统状态。远端 Owner 验收还验证了
  字段白名单、无意外写入、空 Web Storage 和零 axe 问题。
- 本地 0.14 工作区候选增加带审计的资料读取、Owner 精确 ETag 重命名、成员清单与
  生命周期保护。Server 单元、契约和一次性真实 PostgreSQL 测试通过；Console 的
  89 个单元测试及 5 个默认模拟 Chromium 流程覆盖 Workspace 与 Members，并验证
  空 Web Storage 和零 axe 问题。该切片尚未提交或部署。
- 本地 0.15 账户候选增加当前密码复核、PBKDF2 哈希原子替换、用户跨工作区全部
  Session 撤销和无凭据审计。Server 全量门禁与一次性真实 PostgreSQL 回滚/旧令牌
  拒绝测试通过；Console 的 95 个单元测试及 6 个默认模拟 Chromium 流程验证三项密码
  字段即时清空、无冗余 logout、只读 Version Information 与 axe 零违规；Android 73 个 JVM 测试及 Debug APK、
  MCP verify 和 Site 的 78 操作双语参考均通过。该切片同样尚未提交或部署。
- 本地 0.16 增量同步候选增加事务内写入的有序资产变更、固定高水位分页、不可变
  快照和永久删除 tombstone；迁移 15 已通过从 1–14 各版本升级及真实 PostgreSQL
  回滚测试。Android Room 2 按 Server Profile 原子保存页面和游标；能力不存在时从
  稳定清单引导缓存，且不回退较新行或 tombstone。活动 Profile 的完整缓存数量及最近 50 条资产已接入 Compose；已保存服务器可显式切换且录音期间会禁用切换。本地录音列表独立展示上传、转写、离线文本可用性与错误。同一大小写不敏感查询覆盖两类离线列表，并保留总数/匹配数、50 条上限和隐藏播放项控制。缓存资产元数据编辑会读取最新强 ETag，以精确 `If-Match` 整体替换标题、语言和可空 Collection；冲突及不确定网络失败要求重新加载，成功只刷新对应 Room 行，旧同步页不能回退版本。Profile 上传与批量转写策略现已接入表单；两阶段分别受 WorkManager 约束，Manual 上传/转写从持久检查点显式启动。Room 3 让失败项从最后检查点恢复，并通过转写重试代次避免复用终态任务；Room 4 保存单条录音的可空策略覆盖。录音播放与导出共享失败关闭的身份、路径、大小及 SHA-256 校验；播放只保留一个活动引擎并处理音频焦点。替换 Debug APK 已通过 V2 开发签名校验。Console、MCP 和 Site 同步固定
  `0.16.0`，Site 参考现为 79 个操作。无第三方依赖的五仓库门禁执行真实
  `adminctl capabilities` 输出并核对全部契约固定值、Console/Android 必需能力、MCP
  API 身份与完全一致的 Site OpenAPI；4 个失败路径测试通过，托管工作流尚未运行。
  该切片未提交、未部署。
- 0.20 个人事件候选通过完整五仓库门禁。迁移 17 的真实 PostgreSQL 测试覆盖终态
  回填、失败后重试成功、事务回滚、用户隔离、顺序与不可变；84 操作 Site 门禁和
  8 个跨仓兼容用例通过。42 对象/42 文件 r2 备份先恢复到独立目标并升级到 schema
  17，再部署 `.20260718.5`。严格 TLS 验收读取 35 条安全事件，并验证 Session-only、
  API Key 拒绝、空页 checkpoint、已认证工作区/用户游标绑定、篡改/方法拒绝、安全
  审计、登出与登出后 401。公共 Caddy、独立 gateway、配置哈希、重启计数和复用证书
  均未变化。14,619,252 字节 V2 开发签名 APK 为
  `VoiceAsset-0.1.0-dev-contract-0.20.0-personal-notifications-debug-20260718T085854Z.apk`，
  SHA-256 为
  `7eb84ec921b27140b151cd3bfe2bcb8136e5837c67718de1d916721ebcbadfd2`。
- 0.19 系统设置候选增加经审计的 `admin:read` 安全运行时投影。API 只返回 8 个
  允许字段，所有写方法返回 `405`，任意查询参数返回 `400`，且不读取部署全局
  `system_settings` 表。Console 页面没有表单或保存入口；107 个单元测试、7 个本地
  Chromium 流程、Android 134 个 JVM 测试与完整构建、MCP 全量测试、83 操作 Site
  门禁及 7 个跨仓兼容用例通过。隔离 10443 现运行 `.20260718.4`、契约 0.19 与
  schema 16；42 对象/42 文件离线备份已校验。严格 TLS 的 401、白名单读取、拒写、
  查询拒绝、审计及登出验收通过，两个 Caddy 进程/配置与复用证书保持不变。新的
  14,619,252 字节 V2 开发签名 APK 为
  `VoiceAsset-0.1.0-dev-contract-0.19.0-device-sessions-reconnect-debug-20260718T071900Z.apk`，
  SHA-256 为
  `82708cc07bf0b8c148dfaf951314e111ff480b37d5800a7abdbcbfe2e4845a57`。
- 本地 0.18 设备配对候选增加五分钟、单次使用、仅保存 Secret SHA-256 的会话交换；
  较新签发会撤销同一用户较早且未认领的载荷，认领在一个事务内校验活动账户并创建
  会话与无凭据审计。Server 全量真实 PostgreSQL、OpenAPI 和兼容门禁通过；Console
  105 个测试/类型检查/Lint/构建、Android 134 个 JVM 测试/全构建与 41 个
  instrumentation 方法编译、MCP 覆盖率/vet/构建/race、Site 82 操作静态门禁均通过。
  当前只提供无新依赖的复制/粘贴回退。同一 Profile 可安全重新连接，密码在网络请求前
  清除且不落盘，认证失败不修改已有会话。14,619,252 字节 V2 开发签名 APK 为
  `VoiceAsset-0.1.0-dev-contract-0.18.0-device-sessions-reconnect-debug-20260718T062602Z.apk`，
  SHA-256 为
  `9253a623451db78596d1f645b4bb038d8f6e07f4b0423f82e5200ea6481ae1ec`。
  该阶段隔离 10443 环境运行 `.20260718.3` 与 schema 16，并通过已验证备份、恢复演练、
  严格 TLS 签发、错误 Origin、认领、会话读取、重放拒绝、登出、仅哈希落盘与日志
  脱敏检查。线上发现的亚秒过期时间不一致已复现并修复为两处统一整秒。真机配对和
  托管 CI 仍待执行。
- 0.17 任务重试候选新增工作区隔离的 `admin:write` 入口；仅 Server 标记为可重试的
  失败 Job 能沿用 UUID、保留 `attempts` 并把 20 次硬上限内的 `max_attempts` 精确加
  一，相关 Asset 生命周期、Job 与无敏感字段审计在一个事务中提交。Server 单元、
  HTTP、OpenAPI、全量 Go 和真实 PostgreSQL 门禁通过；Console 95 个测试与 6 个模拟
  Chromium 流程、Android 112 个 JVM 测试/全构建与 32 个 instrumentation 方法编译、
  MCP 覆盖率/vet/构建、Site 80 操作静态门禁及五仓库 5 个兼容用例均通过。隔离 10443
  环境已部署 `.20260718.1`、schema 15 与匹配 Console；升级前备份通过，真实重试验证
  同 UUID、尝试上限、重复冲突、安全审计和可变数据清理。19,421,634 字节部署归档的
  SHA-256 为
  `3950784247ce2870f684d4d42b8a209cc025bc144f5260004cdb20aa72b98f61`。新的
  14,348,236 字节 V2 开发签名 APK SHA-256 为
  `5a5afed75d841ddef861e58fdf30b1f6a60b8323790414a3792288d6d10965c2`。
  10443 继续通过受限符号链接复用现有证书；443/10443 证书一致，公共 Caddy 配置哈希
  与进程未变。真机执行和托管 CI 仍未完成，因此这不是 v1.0。
- 隔离 Debian 环境的 `0.13.0` 候选运行 `.6` API/Worker 与 `.4` MCP，并通过严格 TLS、完整波形回填、认证 PNG
  浏览器流程、全文检索/回收站/导出、会话轮换/撤销、MCP 精确时间码与恢复演练。
  VoiceAsset 只公开 `10443`。独立网关现通过受限符号链接复用现有 Let’s Encrypt
  证书并单独热重载；现有公共 Caddy 的配置哈希、进程和重启次数保持不变。
- 本地上传、Mock Worker、音频读取和真实 FFmpeg 性能预算通过；Server/MCP 的六平台
  候选归档以及 Console/Site 静态归档均可复现并通过完整 SHA-256 与内容校验。
- API 直连端口的有限标签 Prometheus HTTP 指标与结构化状态/延迟日志已通过单元和
  Linux race、部署抓取/脱敏及网关不暴露覆盖，标签不包含原始路径或 Query。独立
  Prometheus 3.13.1 以 7 天/1 GiB 上限保留 Histogram 样本，两个抓取目标与四条
  单元测试规则均健康，重启后历史仍可查询；端口 `19090` 保持回环且没有公网响应。

这些证据属于未提交候选切片，不是正式 Tag 的来源证明。当前兼容状态见
[项目状态](../project-status/)，产物状态见[下载](../downloads/)。

## 升级原则

升级前先验证数据库和对象备份，停止写入，执行 Server 迁移，再检查 readiness 和一条
代表性上传/转写流程。生产环境只做前向迁移；回滚应把升级前备份恢复到干净目标，不能
依赖对在线数据执行 down migration。

## 正式发布前门禁

- 提交五个协调切片并通过默认分支 CI；
- 运行不可变 Tag 流程，记录精确 Commit、镜像 Digest、Checksums、SBOM 和签名；
- 验证 Linux amd64/arm64 容器及 Docker 升级/恢复；
- 在已安装的 Google Android SDK 基础上，通过加速模拟器或真机运行门禁，并完成
  外部签名 APK/AAB、麦克风、进程终止及网络恢复验证；
- 对已接入的 S3-compatible SDK 适配器完成代表性远端兼容性、性能和备份/恢复证据，才可将该后端标记为 release-grade。
- 部署并验证 OpenTelemetry Collector 及部署者选择的告警通知接收端。

这些门禁全部关闭前，不发布 `v1.0.0`，也不把任何组件提升为 Stable。
