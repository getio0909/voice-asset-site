---
title: Android 配置
description: 构建原生客户端并连接自托管 Server。
---

Android 客户端需要 JDK 21、Android SDK Platform 37 和 Build Tools 37.0.0。
在 `voice-asset-android/local.properties` 设置本机 SDK 路径；该文件不得提交。

```bash
./gradlew test lintDebug assembleDebug
```

Windows 使用 `gradlew.bat`。Debug APK 位于
`app/build/outputs/apk/debug/`；连接 API 26+ 设备或模拟器后运行
`./gradlew connectedDebugAndroidTest`。

正式候选流程还会运行 `lintRelease assembleRelease bundleRelease`，并通过仓库
`scripts/package-release.sh` 与 `scripts/verify-release.sh` 输出和检查明确未签名的
APK/AAB、141 组件 CycloneDX SBOM 及完整 SHA-256。密钥不得进入仓库或 CI；直接安装
使用外部签名后的 APK，AAB 则应以 upload key 签名后交给 Play App Signing。

在应用内创建 Server Profile 时使用部署的 HTTPS Origin，不要填写 PostgreSQL、
对象存储或供应商地址。应用会先读取 `/api/v1/system/capabilities` 并对 OpenAPI
`0.13.0`–`0.22.0` 的显式兼容列表及必需能力进行校验，其他版本失败关闭。当前
`https://api.getio.net:10443` 复用系统信任的公网证书，自定义 CA
留空；其他测试环境使用私有 CA 时应安装到测试设备信任库，不能在代码中跳过 TLS 校验。

启动应用不要求先登录或连接服务器，默认先显示本地录音入口；没有 Server Profile
时仍可录音、停止、播放和导出本地文件。配置服务器后才启用上传、转写和同步。

当前 `0.22.0` 候选支持一次性设备配对：在 Console 的 **Device sessions** 页面点击
**Create pairing payload**，复制默认遮罩的 URI，并在 Android Server Profile 中粘贴后
点击 **Pair server**。载荷只在两个客户端内存中保留，五分钟后失效；创建新载荷会撤销
同一账户较早且未认领的载荷。Android 在网络请求前清除输入，并只通过 Keystore 保存
认领所得 access/refresh 凭据及两个过期时间。当前回退流程不依赖二维码库。

同一加密会话边界会对即将过期的 access 凭据只轮换一次，并在 refresh 被拒绝后清除
不可用的本地状态。点击 **Refresh device sessions** 可读取当前 Profile 的无凭据设备
清单；撤销必须再次确认，并在操作前重新从 Server 按精确会话 UUID 查找目标。撤销
**This device** 时，仅在远端成功后删除本地凭据。旧版应用留下的 access-only 记录可
继续使用到过期。过期或撤销本机会话后，使用 **Reconnect current server** 为当前
Profile 替换加密会话，无需创建重复 Profile，离线录音身份和设置保持不变。密码会在
网络请求前从界面状态清除且不会保存；认证失败不会修改已有本地会话。

## 真机验收

将最新 Debug APK 覆盖安装到现有 Debug 版本，Server Origin 填
`https://api.getio.net:10443`，自定义 CA 留空。优先在 Console 的 **Device sessions**
页面生成一次性配对 URI；Android 配对不需要填写账户密码。确认清单出现 **This
device** 后，断网录制至少十秒，停止并播放本地文件，再恢复网络，确认上传和转写同步。

随后经二次确认撤销 **This device**，使用与 Console 登录相同的凭据执行 **Reconnect
current server**，确认 Profile、离线录音数量与设置未改变。项目没有默认账户密码。
反馈问题时提供失败步骤、界面错误、设备型号、Android 版本和大致 UTC 时间；截图或日志
不得包含密码、配对 URI、会话 ID 或 Token。

当前部署的 `0.22.0` Server 提供 `incremental_sync`，因此 Android 使用固定高水位的
持久变更游标。兼容的 `0.13.0`–`0.15.0` Server 不提供该能力时，应用改用稳定的
分页资产清单做有界引导。每页都会严格校验工作区、字段结构、
标识、时间、倒序关系和游标推进；Room 只接受较新版本且不会复活 tombstone，也不会把
旧清单中“未出现”误判为删除。保存或选择 Profile 会安排拉取，用户也可点击
“Refresh server assets”主动排队。提供 `incremental_sync` 的新版 Server 仍使用持久
变更游标。

“Mobile administration”卡片只在用户点击“Refresh administration”后加载。具有
`admin:read` 的账户可查看有界工作区状态、最近 20 个不含敏感载荷的任务，以及现有
ASR/LLM Profile；具有 `admin:write` 的账户可使用界面显示的版本作为精确
`If-Match` 启用或停用 Profile，并可重试界面明确标记为可重试的失败任务。重试沿用
原任务 UUID，只增加一次有界尝试；冲突时必须刷新。应用不会提供 Provider 凭据、SSH、
Shell 或任意命令。“Check health”是显式操作，应用只保留安全状态、可选错误分类和
检查时间。较早的真实 `0.13.0`/10443 烟测已验证这些读取，在撤销临时会话前恢复了测试
LLM Profile 的原启用状态，并通过另一临时会话得到 Mock LLM `healthy` 结果。当前
0.17 Server 的真实失败 Job 重试也已通过；Android 端仍需在真机上验收该按钮流程。

录音使用前台服务写入 M4A，Room 保存资产、上传检查点和按 Server Profile 隔离的
增量同步游标；WorkManager 在网络恢复后继续分片上传并拉取有序资产变更。会话只
保存在 Android Keystore 保护的存储中。失败或阻塞的本地条目会显示“Retry sync”；
Room 3 从最后持久检查点恢复，并为重新转写生成新幂等代次。创建 Profile 时可分别
选择上传和批量转写策略；WorkManager 为两个阶段独立应用网络/充电约束。Manual 上传
显示“Start upload”，Manual 转写则在上传检查点显示“Start transcription”。录音卡还可让
下一条录音继承服务器默认值，或单独覆盖上传/转写策略；Room 4 在开始录音时保存该快照，
因此应用重启、重试和手动操作都使用同一策略，旧录音继续继承服务器默认值。实时策略
在 Server 适配器和设备 E2E 完成前不出现在表单中。离线资产库的同一搜索框可按缓存
资产的标题/ID/语言/状态，以及本地录音的文件名/ID/状态/错误码进行大小写不敏感筛选；
总数与匹配数分开显示，每类最多渲染 50 条。即使正在播放的录音被筛选隐藏，暂停和停止
控件仍会保留。未移入回收站的缓存资产提供“Edit metadata”：应用先读取最新资产和
强 ETag，再用完全一致的 `If-Match` 整体替换标题、语言和可空 Collection。冲突或
响应不确定的网络故障不会盲目重试，必须重新加载；成功后仅刷新对应 Room 行，不推进
增量游标，旧同步页也不能覆盖较新的版本。已保存录音可由用户点击
“Play”在应用内播放，或点击“Export”主动导出。两个路径都会先核对 Room 身份、
规范文件路径、大小和 SHA-256。播放器支持暂停、继续、停止和失败重试，只保留一个活动
MediaPlayer，并处理音频焦点及耳机断开事件；导出则通过只读 Content URI 打开系统分享
面板，Provider 不导出、不接受写入，也不会暴露内部路径。当前 Phase 6
仍要求二维码渲染/扫描、更广的安全管理、设备录音、断网续传、后台限制与
外部签名测试通过后才能作为发布 APK；
参见[下载页](../downloads/)和[项目状态](../project-status/)。
