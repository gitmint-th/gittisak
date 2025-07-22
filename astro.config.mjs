// กำหนดค่าการทำงานของ Astro สำหรับโปรเจกต์นี้

import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig, squooshImageService } from 'astro/config';

import sitemap from '@astrojs/sitemap'; // สร้างแผนผังเว็บไซต์อัตโนมัติ
import tailwind from '@astrojs/tailwind'; // ใช้งาน Tailwind CSS
import mdx from '@astrojs/mdx'; // รองรับไฟล์ MDX
import partytown from '@astrojs/partytown'; // เพิ่มประสิทธิภาพสคริปต์ภายนอก
import icon from 'astro-icon'; // ใช้งานไอคอน
import tasks from './src/utils/tasks'; // งานเสริม

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin } from './src/utils/frontmatter.mjs';

import { ANALYTICS, SITE } from './src/utils/config.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ฟังก์ชันสำหรับกำหนดการใช้งานสคริปต์ภายนอก
const whenExternalScripts = (items = []) =>
  ANALYTICS.vendors.googleAnalytics.id && ANALYTICS.vendors.googleAnalytics.partytown
    ? Array.isArray(items)
      ? items.map((item) => item())
      : [items()]
    : [];

export default defineConfig({
  site: SITE.site, // URL เว็บไซต์
  base: SITE.base, // base path
  trailingSlash: SITE.trailingSlash ? 'always' : 'never', // กำหนดการใส่ / ท้าย URL

  output: 'static', // สร้างเว็บไซต์แบบ static

  integrations: [
    tailwind({
      applyBaseStyles: false, // ไม่ใช้ base styles ของ Tailwind
    }),
    sitemap(), // สร้าง sitemap
    mdx(), // รองรับ MDX
    icon({
      include: {
        tabler: ['*'], // ใช้ไอคอน tabler ทั้งหมด
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ], // ใช้ไอคอน flat-color-icons เฉพาะที่ระบุ
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] }, // กำหนดการส่งข้อมูลไปยัง dataLayer
      })
    ),

    tasks(), // งานเสริม
  ],

  image: {
    service: squooshImageService(), // ใช้ Squoosh สำหรับจัดการรูปภาพ
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin], // คำนวณเวลาอ่าน
    rehypePlugins: [responsiveTablesRehypePlugin], // ตาราง responsive
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'), // กำหนด alias สำหรับ path
      },
    },
  },
});
