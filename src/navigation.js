import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'หน้าแรก',
      links: [
        {
          text: 'ซอฟต์แวร์ SaaS',
          href: getPermalink('/homes/saas'),
        },
        {
          text: 'สตาร์ทอัพ',
          href: getPermalink('/homes/startup'),
        },
        {
          text: 'แอปมือถือ',
          href: getPermalink('/homes/mobile-app'),
        },
        {
          text: 'ส่วนตัว',
          href: getPermalink('/homes/personal'),
        },
      ],
    },
    {
      text: 'หน้าเว็บ',
      links: [
        {
          text: 'คุณสมบัติ (ลิงก์สมอ)',
          href: getPermalink('/#features'),
        },
        {
          text: 'บริการ',
          href: getPermalink('/services'),
        },
        {
          text: 'ราคา',
          href: getPermalink('/pricing'),
        },
        {
          text: 'เกี่ยวกับเรา',
          href: getPermalink('/about'),
        },
        {
          text: 'ติดต่อ',
          href: getPermalink('/contact'),
        },
        {
          text: 'ข้อกำหนด',
          href: getPermalink('/terms'),
        },
        {
          text: 'นโยบายความเป็นส่วนตัว',
          href: getPermalink('/privacy'),
        },
      ],
    },
    {
      text: 'แลนดิ้ง',
      links: [
        {
          text: 'สร้างรายชื่อผู้สนใจ',
          href: getPermalink('/landing/lead-generation'),
        },
        {
          text: 'หน้าเซลส์แบบยาว',
          href: getPermalink('/landing/sales'),
        },
        {
          text: 'คลิกเพื่อดำเนินการ',
          href: getPermalink('/landing/click-through'),
        },
        {
          text: 'รายละเอียดสินค้า/บริการ',
          href: getPermalink('/landing/product'),
        },
        {
          text: 'เร็ว ๆ นี้ หรือก่อนเปิดตัว',
          href: getPermalink('/landing/pre-launch'),
        },
        {
          text: 'สมัครสมาชิก',
          href: getPermalink('/landing/subscription'),
        },
      ],
    },
    {
      text: 'บล็อก',
      links: [
        {
          text: 'รายการบล็อก',
          href: getBlogPermalink(),
        },
        {
          text: 'บทความ',
          href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
        },
        {
          text: 'บทความ (MDX)',
          href: getPermalink('markdown-elements-demo-post', 'post'),
        },
        {
          text: 'หน้าหมวดหมู่',
          href: getPermalink('tutorials', 'category'),
        },
        {
          text: 'หน้าป้ายกำกับ',
          href: getPermalink('astro', 'tag'),
        },
      ],
    },
    {
      text: 'วิดเจ็ต',
      href: '#',
    },
  ],
  actions: [{ text: 'ดาวน์โหลด', href: 'https://github.com/onwidget/astrowind', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'ผลิตภัณฑ์',
      links: [
        { text: 'คุณสมบัติ', href: '#' },
        { text: 'ความปลอดภัย', href: '#' },
        { text: 'ทีมงาน', href: '#' },
        { text: 'องค์กร', href: '#' },
        { text: 'เรื่องราวลูกค้า', href: '#' },
        { text: 'ราคา', href: '#' },
        { text: 'แหล่งข้อมูล', href: '#' },
      ],
    },
    {
      title: 'แพลตฟอร์ม',
      links: [
        { text: 'API สำหรับนักพัฒนา', href: '#' },
        { text: 'พันธมิตร', href: '#' },
        { text: 'Atom', href: '#' },
        { text: 'Electron', href: '#' },
        { text: 'AstroWind เดสก์ท็อป', href: '#' },
      ],
    },
    {
      title: 'สนับสนุน',
      links: [
        { text: 'เอกสาร', href: '#' },
        { text: 'ฟอรั่มชุมชน', href: '#' },
        { text: 'บริการมืออาชีพ', href: '#' },
        { text: 'ทักษะ', href: '#' },
        { text: 'สถานะ', href: '#' },
      ],
    },
    {
      title: 'บริษัท',
      links: [
        { text: 'เกี่ยวกับ', href: '#' },
        { text: 'บล็อก', href: '#' },
        { text: 'ร่วมงานกับเรา', href: '#' },
        { text: 'ข่าวประชาสัมพันธ์', href: '#' },
        { text: 'ความหลากหลาย', href: '#' },
        { text: 'ผลกระทบทางสังคม', href: '#' },
        { text: 'ร้านค้า', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'ข้อกำหนด', href: getPermalink('/terms') },
    { text: 'นโยบายความเป็นส่วนตัว', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
    สร้างโดย <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://onwidget.com/"> onWidget</a> · สงวนลิขสิทธิ์ทั้งหมด.
  `,
};
