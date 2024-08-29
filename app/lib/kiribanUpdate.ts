import { drizzle } from "drizzle-orm/d1"
import { eq } from 'drizzle-orm'
import type { Context } from "hono"
import { counter } from "../../db/schema"

export const kiribanUpdate = async (c: Context) => {
  const db = drizzle(c.env.DB)
  let currentNumberOfVisitorsObj = await db
    .select()
    .from(counter)
    .where(eq(counter.id, 1))
  if (currentNumberOfVisitorsObj.length === 0) {
    await db.insert(counter).values({ count: 0 }).execute()
    currentNumberOfVisitorsObj = await db
    .select()
    .from(counter)
    .where(eq(counter.id, 1))
  }
  let currentNumberOfVisitors = 0
  if (currentNumberOfVisitorsObj[0].count !== undefined && currentNumberOfVisitorsObj[0].count !== null) {
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
  return currentNumberOfVisitors
}
