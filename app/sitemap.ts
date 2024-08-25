import { SitemapStream } from "sitemap";
import { createWriteStream } from "node:fs";
import { resolve } from "node:path";

export function ssrSitemap(opts) {
  const pages = new Set();
  let config;
  let hasVitePlusinSSR = false;

  const defaultOtps = {
    host: "https://localhost", // no trailing slash
    exclude: [],
    filename: "sitemap.xml",
    pagesFolder: "/pages/", // with slashes
    i18n: {
      locales: [],
      localeDefault: null,
    },
  };

  const mergedOpts = { ...defaultOtps, ...opts };

  return {
    name: "ssrSitemap",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      hasVitePlusinSSR = config.plugins.find((plugin) =>
        plugin.name.includes("vite-plugin-ssr"),
      );
    },
    async transform(_, file) {
      if (config?.ssr && config.command === "build" && hasVitePlusinSSR) {
        const splitRoot = file.split(mergedOpts.pagesFolder);

        if (splitRoot.length > 1) {
          const splitLocale = splitRoot[1].split("/");
          const [page] = splitLocale;
          const { exclude = [] } = mergedOpts;

          if (!exclude.includes(page) && !pages.has(page)) {
            pages.add(page);
          }
        }
      }
    },
    async writeBundle({ dir }) {
      if (dir.includes("client")) {
        const sitemap = new SitemapStream({
          hostname: mergedOpts.host,
        });
        const writeStream = createWriteStream(
          resolve(dir, mergedOpts.filename),
        );
        sitemap.pipe(writeStream);

        pages.forEach((url) => {
          if (mergedOpts.i18n.locales.length) {
            mergedOpts.i18n.locales.forEach((locale) => {
              const localeUrl =
                mergedOpts.i18n.localeDefault &&
                locale === mergedOpts.i18n.localeDefault
                  ? ""
                  : locale;
              sitemap.write(`${localeUrl}/${url}`);
            });
          } else {
            sitemap.write(url);
          }
        });

        sitemap.end();
        await new Promise((r) => writeStream.on("finish", r));
      }
    },
  };
}