/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://mingwireless.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
  },
  additionalPaths: async () => [
    { loc: "/", changefreq: "daily", priority: 1.0 },
    { loc: "/services", changefreq: "weekly", priority: 0.9 },
    { loc: "/quote", changefreq: "weekly", priority: 0.9 },
    { loc: "/book", changefreq: "weekly", priority: 0.8 },
    { loc: "/about", changefreq: "monthly", priority: 0.7 },
    { loc: "/contact", changefreq: "monthly", priority: 0.7 },
    { loc: "/iphone-repair-toronto", changefreq: "weekly", priority: 0.8 },
    { loc: "/samsung-repair-toronto", changefreq: "weekly", priority: 0.8 },
    { loc: "/macbook-repair-toronto", changefreq: "weekly", priority: 0.8 },
    { loc: "/phone-repair-downtown-toronto", changefreq: "weekly", priority: 0.8 },
  ],
};
