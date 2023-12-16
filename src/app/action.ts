"use server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { todos } from "@/db/schema";
import { revalidatePath } from "next/cache";

export type CreateTodoFormState = { text: string; errors: { text?: string } };

export async function createTodoAction(
  state: CreateTodoFormState,
  formData: FormData
) {
  console.log(state);
  const text = formData.get("todoText") as string;
  if (text === "") {
    return {
      text: text,
      errors: {
        text: "Expected non-empty text",
      },
    };
  }
  const dt = new Date();

  await db.insert(todos).values({
    name: text,
    authorId: "1",
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
    })
    .where(eq(todos.id, id));
  revalidatePath("/");
}
