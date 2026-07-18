import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  output: "static",
  integrations: [
    starlight({
      title: "VoiceAsset",
      description: "Self-hosted voice digital asset platform documentation.",
      favicon: "/favicon.svg",
      defaultLocale: "root",
      locales: {
        root: { label: "简体中文", lang: "zh-CN" },
        en: { label: "English", lang: "en" },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/getio0909/voice-asset-site",
        },
      ],
      sidebar: [
        {
          label: "Get started",
          translations: { "zh-CN": "开始使用" },
          items: [
            {
              label: "Overview",
              translations: { "zh-CN": "概览" },
              slug: "index",
            },
            {
              label: "Quick start",
              translations: { "zh-CN": "快速开始" },
              slug: "quick-start",
            },
            {
              label: "Features",
              translations: { "zh-CN": "产品功能" },
              slug: "features",
            },
            {
              label: "Architecture",
              translations: { "zh-CN": "架构" },
              slug: "architecture",
            },
          ],
        },
        {
          label: "Operate",
          translations: { "zh-CN": "部署运维" },
          items: [
            {
              label: "Deployment",
              translations: { "zh-CN": "部署" },
              slug: "deployment",
            },
            {
              label: "Monitoring",
              translations: { "zh-CN": "监控" },
              slug: "monitoring",
            },
            {
              label: "Backup and restore",
              translations: { "zh-CN": "备份与恢复" },
              slug: "backup-restore",
            },
            {
              label: "Troubleshooting",
              translations: { "zh-CN": "故障排除" },
              slug: "troubleshooting",
            },
          ],
        },
        {
          label: "Configure",
          translations: { "zh-CN": "配置" },
          items: [
            { label: "Android", slug: "android" },
            {
              label: "ASR providers",
              translations: { "zh-CN": "ASR Provider" },
              slug: "asr",
            },
            {
              label: "LLM providers",
              translations: { "zh-CN": "LLM Provider" },
              slug: "llm",
            },
            {
              label: "Hotwords and dictionaries",
              translations: { "zh-CN": "热词和词典" },
              slug: "dictionaries",
            },
            { label: "MCP", slug: "mcp" },
          ],
        },
        {
          label: "Reference",
          translations: { "zh-CN": "参考" },
          items: [
            {
              label: "API Reference",
              translations: { "zh-CN": "API 参考" },
              slug: "api-reference",
            },
            {
              label: "Security",
              translations: { "zh-CN": "安全模型" },
              slug: "security",
            },
            {
              label: "Privacy",
              translations: { "zh-CN": "隐私说明" },
              slug: "privacy",
            },
            {
              label: "Developer guide",
              translations: { "zh-CN": "开发者指南" },
              slug: "developer-guide",
            },
            {
              label: "Contributing",
              translations: { "zh-CN": "贡献指南" },
              slug: "contributing",
            },
          ],
        },
        {
          label: "Project",
          translations: { "zh-CN": "项目" },
          items: [
            {
              label: "Downloads",
              translations: { "zh-CN": "下载" },
              slug: "downloads",
            },
            {
              label: "Release notes",
              translations: { "zh-CN": "发布说明" },
              slug: "release-notes",
            },
            {
              label: "Project status",
              translations: { "zh-CN": "项目状态" },
              slug: "project-status",
            },
            { label: "Roadmap", slug: "roadmap" },
            { label: "Changelog", slug: "changelog" },
            { label: "License", slug: "license" },
            { label: "FAQ", slug: "faq" },
          ],
        },
      ],
    }),
  ],
});
