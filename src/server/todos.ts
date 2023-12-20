import { db } from "@/server/db";
import { lists, todos } from "@/server/db/schema";
import { asc, desc, eq } from "drizzle-orm";

// export async function getAllTodos() {
//   return db.query.todos.findMany({
//     orderBy: [asc(todos.id)],
//   });
// }

// export async function getMyTodos(userId?: string) {
//   if (!userId) {
//     userId = "-1";
//   }
//   return db.query.todos.findMany({
//     where: eq(todos.authorId, userId),
//     orderBy: [desc(todos.createdAt)],
//   });
// }

export async function getMyLists(userId?: string) {
  if (!userId) {
    userId = "-1";
  }
  return db.query.lists.findMany({
    where: eq(lists.authorId, userId),
    orderBy: [desc(lists.createdAt)],
  });
}

export async function getTodosByListId(listId: number) {
  return db.query.todos.findMany({
    where: eq(todos.listId, listId),
    orderBy: [desc(todos.createdAt)],
  });
}
