import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  output: 'static',
  integrations: [
    starlight({
      title: 'VoiceAsset',
      description: 'Self-hosted voice digital asset platform documentation.',
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' },
        en: { label: 'English', lang: 'en' },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/getio0909/voice-asset-site',
        },
      ],
      sidebar: [
        { label: 'Overview', translations: { 'zh-CN': '概览' }, slug: 'index' },
        {
          label: 'Project status',
          translations: { 'zh-CN': '项目状态' },
          slug: 'project-status',
        },
      ],
    }),
  ],
});
