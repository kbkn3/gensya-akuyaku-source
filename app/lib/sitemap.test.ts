import sitemap, { SitemapOptions } from "./sitemap"; // あなたのsitemapモジュールへの正しいパスに置き換えてください
import { Hono } from "hono";

// モックアプリケーションの作成
const createMockApp = () => {
  const app = new Hono();
  app.get("/", (c) => c.text("Home"));
  app.get("/about", (c) => c.text("About"));
  app.get("/contact", (c) => c.text("Contact"));
  return app;
};

test("sitemap generates correct XML", () => {
  const app = createMockApp();
  const options: SitemapOptions = {
    app,
    hostname: "https://example.com",
  };

  const result = sitemap(options);

  expect(result.status).toBe(200);
  expect(result.headers["Content-Type"]).toBe("application/xml");
  expect(result.data).toContain('<?xml version="1.0" encoding="UTF-8"?>');
  expect(result.data).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  expect(result.data).toContain('<loc>https://example.com/</loc>');
  expect(result.data).toContain('<loc>https://example.com/about/</loc>');
  expect(result.data).toContain('<loc>https://example.com/contact/</loc>');
});

test("sitemap excludes specified routes", () => {
  const app = createMockApp();
  const options: SitemapOptions = {
    app,
    hostname: "https://example.com",
    exclude: ["/about"],
  };

  const result = sitemap(options);

  expect(result.data).toContain('<loc>https://example.com/</loc>');
  expect(result.data).not.toContain('<loc>https://example.com/about/</loc>');
  expect(result.data).toContain('<loc>https://example.com/contact/</loc>');
});

test("sitemap uses custom frequency and priority", () => {
  const app = createMockApp();
  const options: SitemapOptions = {
    app,
    hostname: "https://example.com",
    frequency: {
      "/": "daily",
      "/about": "monthly",
    },
    priority: {
      "/": "1.0",
      "/about": "0.8",
    },
  };

  const result = sitemap(options);

  expect(result.data).toContain('<changefreq>daily</changefreq>');
  expect(result.data).toContain('<priority>1.0</priority>');
  expect(result.data).toContain('<changefreq>monthly</changefreq>');
  expect(result.data).toContain('<priority>0.8</priority>');
});

test("sitemap throws error for invalid priority", () => {
  const app = createMockApp();
  const options: SitemapOptions = {
    app,
    priority: {
      "/": "1.5", // 無効な優先度
    },
  };

  expect(() => sitemap(options)).toThrow("Invalid priority value for /: 1.5. Must be between 0.0 and 1.0");
});

test("sitemap throws error for invalid frequency", () => {
  const app = createMockApp();
  const options: SitemapOptions = {
    app,
    frequency: {
      "/": "biweekly" as any, // 無効な頻度
    },
  };

  expect(() => sitemap(options)).toThrow("Invalid frequency value for /: biweekly");
});

