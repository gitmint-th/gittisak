import fs from 'fs';
import yaml from 'js-yaml';
import merge from 'lodash.merge';

import type { MetaData } from '~/types';

// กำหนดโครงสร้างข้อมูลสำหรับการตั้งค่าเว็บไซต์
export interface SiteConfig {
  name: string; // ชื่อเว็บไซต์
  site?: string; // URL เว็บไซต์
  base?: string; // base path
  trailingSlash?: boolean; // กำหนดการใส่ / ท้าย URL
  googleSiteVerificationId?: string; // รหัสยืนยันเว็บไซต์ของ Google
}

// กำหนดโครงสร้างข้อมูลสำหรับ metadata
export interface MetaDataConfig extends Omit<MetaData, 'title'> {
  title?: {
    default: string; // ชื่อเริ่มต้น
    template: string; // รูปแบบชื่อ
  };
}

// กำหนดโครงสร้างข้อมูลสำหรับภาษา
export interface I18NConfig {
  language: string; // ภาษา
  textDirection: string; // ทิศทางข้อความ
  dateFormatter?: Intl.DateTimeFormat; // ตัวจัดรูปแบบวันที่
}

// กำหนดโครงสร้างข้อมูลสำหรับบล็อก
export interface AppBlogConfig {
  isEnabled: boolean; // เปิดใช้งานบล็อกหรือไม่
  postsPerPage: number; // จำนวนโพสต์ต่อหน้า
  isRelatedPostsEnabled: boolean; // เปิดใช้งานโพสต์ที่เกี่ยวข้องหรือไม่
  relatedPostsCount: number; // จำนวนโพสต์ที่เกี่ยวข้อง
  post: {
    isEnabled: boolean; // เปิดใช้งานโพสต์หรือไม่
    permalink: string; // โครงสร้างลิงก์ของโพสต์
    robots: {
      index: boolean; // ให้ index หรือไม่
      follow: boolean; // ให้ follow หรือไม่
    };
  };
  list: {
    isEnabled: boolean; // เปิดใช้งานรายการโพสต์หรือไม่
    pathname: string; // path ของรายการ
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  category: {
    isEnabled: boolean; // เปิดใช้งานหมวดหมู่หรือไม่
    pathname: string; // path ของหมวดหมู่
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  tag: {
    isEnabled: boolean; // เปิดใช้งานแท็กหรือไม่
    pathname: string; // path ของแท็ก
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
}

// กำหนดโครงสร้างข้อมูลสำหรับ Analytics
export interface AnalyticsConfig {
  vendors: {
    googleAnalytics: {
      id?: string; // รหัส Google Analytics
      partytown?: boolean; // ใช้งาน partytown หรือไม่
    };
  };
}

// โหลดไฟล์ config.yaml และแปลงเป็น object
const config = yaml.load(fs.readFileSync('src/config.yaml', 'utf8')) as {
  site?: SiteConfig;
  metadata?: MetaDataConfig;
  i18n?: I18NConfig;
  apps?: {
    blog?: AppBlogConfig;
  };
  ui?: unknown;
  analytics?: unknown;
};

const DEFAULT_SITE_NAME = 'Website';

// ฟังก์ชันสำหรับดึงข้อมูลการตั้งค่าเว็บไซต์
const getSite = () => {
  const _default = {
    name: DEFAULT_SITE_NAME,
    site: undefined,
    base: '/',
    trailingSlash: false,
    googleSiteVerificationId: '',
  };

  return merge({}, _default, config?.site ?? {}) as SiteConfig;
};

// ฟังก์ชันสำหรับดึงข้อมูล metadata
const getMetadata = () => {
  const siteConfig = getSite();

  const _default = {
    title: {
      default: siteConfig?.name || DEFAULT_SITE_NAME,
      template: '%s',
    },
    description: '',
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      type: 'website',
    },
  };

  return merge({}, _default, config?.metadata ?? {}) as MetaDataConfig;
};

// ฟังก์ชันสำหรับดึงข้อมูลภาษา
const getI18N = () => {
  const _default = {
    language: 'en',
    textDirection: 'ltr',
  };

  const value = merge({}, _default, config?.i18n ?? {});

  return Object.assign(value, {
    dateFormatter: new Intl.DateTimeFormat(value.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }),
  }) as I18NConfig;
};

// ฟังก์ชันสำหรับดึงข้อมูลบล็อก
const getAppBlog = () => {
  const _default = {
    isEnabled: false,
    postsPerPage: 6,
    isRelatedPostsEnabled: false,
    relatedPostsCount: 4,
    post: {
      isEnabled: true,
      permalink: '/blog/%slug%',
      robots: {
        index: true,
        follow: true,
      },
    },
    list: {
      isEnabled: true,
      pathname: 'blog',
      robots: {
        index: true,
        follow: true,
      },
    },
    category: {
      isEnabled: true,
      pathname: 'category',
      robots: {
        index: true,
        follow: true,
      },
    },
    tag: {
      isEnabled: true,
      pathname: 'tag',
      robots: {
        index: false,
        follow: true,
      },
    },
  };

  return merge({}, _default, config?.apps?.blog ?? {}) as AppBlogConfig;
};

// ฟังก์ชันสำหรับดึงข้อมูล UI
const getUI = () => {
  const _default = {
    theme: 'system',
    classes: {},
    tokens: {},
  };

  return merge({}, _default, config?.ui ?? {});
};

// ฟังก์ชันสำหรับดึงข้อมูล Analytics
const getAnalytics = () => {
  const _default = {
    vendors: {
      googleAnalytics: {
        id: undefined,
        partytown: true,
      },
    },
  };

  return merge({}, _default, config?.analytics ?? {}) as AnalyticsConfig;
};

// ส่งออกค่าการตั้งค่าต่าง ๆ
export const SITE = getSite();
export const I18N = getI18N();
export const METADATA = getMetadata();
export const APP_BLOG = getAppBlog();
export const UI = getUI();
export const ANALYTICS = getAnalytics();
