import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import type { Context } from 'hono'
import { getter } from '../../db/schema'

/**
 * kiribanを取得した人の名前と訪問者数のリストを返します。
 * @param c - コンテキストオブジェクト。
 * @returns kiribanを取得した人の名前と訪問者数のリスト。
 */
export const getKiriban = async (c: Context) => {
  // データベース接続
  const db = drizzle(c.env.DB)
  // kiribanを取得した人の名前と訪問者数のリストを取得
  const kiribanList = await db
    .select()
    .from(getter)
    .where(eq(getter.name, 'kiriban'))
  return kiribanList
}
