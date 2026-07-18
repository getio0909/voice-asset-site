---
title: LLM 配置
description: 配置 Mock 或 OpenAI-compatible 纠错，并审核不可变 Revision。
---

Mock LLM 不需要网络或密钥，适合端到端验证纠错、Review 和 Approval。真实配置
使用工作区级 OpenAI-compatible Profile，包含 HTTPS Base URL、模型、加密 API
Key 和受限自定义 Header。Server 拒绝不安全协议、回环/私网 SSRF 目标及越界响应。

纠错不会覆盖 ASR。任务读取一个不可变源 Revision 和确定的 LLM 词典版本，要求
Provider 返回结构化 Patch，再由 Server 校验时间范围、文本和变更边界。用户可以
逐项接受或拒绝，所有决定追加记录；只有显式 Approval 才生成新的 Approved
Revision。

Profile 默认使用 `never`，因此保留人工审核。可选的
`validated_glossary_only` 只处理非空有效术语表产生的非空确定性替换，并要求
文本、数字、语义、变更比例和时间轴校验全部通过。同一事务仍会生成自动审核、
系统审计、`human_edited` 和 `approved` Revision；它不会直接接受任意模型改写。

建议流程：

1. 保持 `VOICEASSET_PROFILE_MASTER_KEY` 稳定并安全备份。
2. 创建禁用状态的 Profile，运行健康检查后再启用。
3. 使用 Mock 和非敏感短 Transcript 验证提示与词典。
4. 默认审核结构化差异；仅对已验证的确定性术语替换考虑启用自动批准。
5. 对超时、限流和模式错误设置告警；不要记录完整 Prompt 或凭据。

ASR 热词与 LLM 词典语义不同，参见[热词和词典](../dictionaries/)。
