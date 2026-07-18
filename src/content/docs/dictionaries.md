---
title: 热词和词典
description: 正确区分 ASR 识别提示与 LLM 纠错术语。
---

VoiceAsset 故意维护两套独立系统：

| 类型 | 生效阶段 | 典型内容 |
| --- | --- | --- |
| ASR Hotword | 供应商识别前/中 | 人名、产品名、缩写及可选权重 |
| LLM Glossary | ASR 完成后的纠错 | 错写→标准写法、术语说明、上下文规则 |

两者都属于工作区、具有不可变版本，并可按集合或资产解析。任务启动时保存解析后
的版本快照；之后编辑词表不会改变已有 Job、Revision 或审计证据。

把短、明确、可能出现在音频中的词放进 Hotword。不要加入整句 Prompt、敏感凭据
或互相冲突的拼写。Glossary 用于规范格式和纠正常见识别错误，但仍必须经过结构化
Patch 校验与人工 Review。删除逻辑实体不会删除历史版本引用。

排查效果时先查看任务记录的 Provider/Profile 和版本 ID，再比较原始 ASR、
Normalized 与 Corrected Revision；不要只看最终文本。配置端点见
[API 参考](../api-reference/)。
