"use server";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { lists, todos } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export type CreateTodoFormState = { text: string; errors: { text?: string } };

export async function createTodoAction(
  state: CreateTodoFormState,
  formData: FormData,
  listId: number,
  authorId?: string,
) {
  const text = formData.get("todoText") as string;
  if (text === "") {
    return {
      text: text,
      errors: {
        text: "Expected non-empty text",
      },
    };
  } else if (text.length > 255) {
    return {
      text: text,
      errors: {
        text: "Expected todo to have < 255 chars",
      },
    };
  }
  const dt = new Date();

  await db.insert(todos).values({
    listId: listId,
    content: text,
    authorId: authorId || "-1",
    createdAt: dt,
    updatedAt: dt,
  });
  revalidatePath("/");
  return {
    text: "",
    errors: {
      text: undefined,
    },
  };
}

export async function deleteTodoAction(id: number) {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath("/");
}

export async function toggleTodoAction(id: number) {
  const todo = await db.query.todos.findFirst({
    where: eq(todos.id, id),
  });

  await db
    .update(todos)
    .set({
      completed: !todo?.completed,
      updatedAt: new Date(),
    })
    .where(eq(todos.id, id));
  revalidatePath("/");
}

export async function updateTodoContentAction(id: number, content: string) {
  await db
    .update(todos)
    .set({
      content: content,
      updatedAt: new Date(),
    })
    .where(eq(todos.id, id));
  revalidatePath("/");
}
