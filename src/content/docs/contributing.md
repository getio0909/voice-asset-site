---
title: 贡献指南
description: 提交 Issue、代码和跨仓库变更的最小要求。
---

开始前先在相关仓库搜索 Issue，并阅读该仓库的 `CONTRIBUTING.md`、`AGENTS.md`
和架构决策。安全问题使用 `SECURITY.md` 的私密渠道，不要创建公开漏洞 Issue。

Fork 后从最新默认分支创建短生命周期分支。提交使用 Conventional Commits，例如
`feat(server): add backup verification` 或 `docs(site): explain MCP scopes`。一个提交
只解决一个问题，不混入格式化或无关重构。

Pull Request 必须说明：

- 影响的仓库和用户可见行为；
- 关联 Issue、兼容性与迁移风险；
- 实际运行的测试命令及结果；
- UI 变化的截图和无障碍验证；
- API 变化对应的 OpenAPI、测试、客户端 Pin、兼容矩阵与必要 ADR。

不得提交 Secret、真实用户音频、供应商原始响应、签名 Key 或本地配置。新增依赖
需说明必要性、许可证与安全影响，并更新 Lockfile/SBOM。维护者可能要求将跨仓库
工作拆成按契约顺序合并的多个 PR。
