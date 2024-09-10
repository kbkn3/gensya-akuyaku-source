import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import type { Context } from 'hono'
import { counter, getter } from '../../db/schema'

/**
 * kiribanのカウントを更新し、現在の訪問者数を返します。
 * @param c - コンテキストオブジェクト。
 * @returns 現在の訪問者数。
 */
export const kiribanUpdate = async (c: Context):Promise<number> => {
  // データベース接続
  const db = drizzle(c.env.DB)
  // 現在の訪問者数を取得
  let currentNumberOfVisitorsObj = await db
    .select()
    .from(counter)
    .where(eq(counter.id, 1))
  // 訪問者数レコードが存在しない場合、新規作成
  if (currentNumberOfVisitorsObj.length === 0) {
    await db.insert(counter).values({ count: 0 }).execute()
    currentNumberOfVisitorsObj = await db
      .select()
      .from(counter)
      .where(eq(counter.id, 1))
  }
  if (c.req.routePath === '/') {
    // 現在の訪問者数を更新
    let currentNumberOfVisitors = 0
    if (
      currentNumberOfVisitorsObj[0].count !== undefined &&
      currentNumberOfVisitorsObj[0].count !== null
    ) {
      const res = await db
        .update(counter)
        .set({ count: currentNumberOfVisitorsObj[0].count + 1 })
        .where(eq(counter.id, 1))
        .returning({ count: counter.count })
      if (res[0].count) {
        currentNumberOfVisitors = res[0].count
      } else {
        c.notFound()
      }
    }

    // キリ番を踏んだ場合の処理
    if (isKiriban(currentNumberOfVisitors)) {
      await db
        .insert(getter)
        .values({ name: 'runakeikain', count: currentNumberOfVisitors })
        .execute()
    }

    return currentNumberOfVisitors
  }
    return currentNumberOfVisitorsObj[0].count ?? 0;
}

/**
 * 指定された数値がキリ番かどうかを判定します。
 * キリ番とは、値に応じて末尾が0で終わる数値のことです。
 * キリ番のパターンは1000人までは100人ごと、10000人までは1000人ごと。。。という設定です。
 *
 * @param num - チェックする数値。
 * @returns 数値がキリ番であればtrue、そうでなければfalseを返します。
 */
const isKiriban = (num: number) => {
  if (num < 1000) return num % 100 === 0
  if (num < 10000) return num % 1000 === 0
  return num % 10000 === 0
}
