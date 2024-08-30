import { sql } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const counter = sqliteTable('counter', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  count: integer('count').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
})

export const getter = sqliteTable('getter', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  count: integer('count').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
})
