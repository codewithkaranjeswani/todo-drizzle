import { db } from "@/server/db";
import { todos } from "@/server/db/schema";
import { asc, desc, eq } from "drizzle-orm";

export async function getAllTodos() {
  return db.query.todos.findMany({
    orderBy: [asc(todos.id)],
  });
}

export async function getMyTodos(id?: string) {
  if (!id) {
    id = "-1";
  }
  return db.query.todos.findMany({
    where: eq(todos.authorId, id),
    orderBy: [desc(todos.createdAt)],
  });
}
