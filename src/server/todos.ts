import { db } from "@/server/db";
import { todos } from "@/server/db/schema";
import { asc } from "drizzle-orm";

export async function getAllTodos() {
  return db.query.todos.findMany({
    orderBy: [asc(todos.id)],
  });
}
