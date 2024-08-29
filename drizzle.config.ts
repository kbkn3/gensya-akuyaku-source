import type { Config } from 'drizzle-kit';

export default {
  schema: "./db/schema.ts",
  out: "./drizzle/migrations",
  driver: "d1-http",
  dialect: "sqlite",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
} satisfies Config;