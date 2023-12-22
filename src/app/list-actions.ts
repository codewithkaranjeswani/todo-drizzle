"use server";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { lists } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export type CreateListFormState = { title: string; errors: { title?: string } };

export async function createListAction(
  state: CreateListFormState,
  formData: FormData,
  authorId?: string,
) {
  const title = formData.get("titleText") as string;
  if (title === "") {
    return {
      title: title,
      errors: {
        title: "Expected non-empty title",
      },
    };
  }
  const dt = new Date();

  await db.insert(lists).values({
    title: title,
    authorId: authorId || "-1",
    createdAt: dt,
    updatedAt: dt,
  });
  revalidatePath("/");
  return {
    title: "",
    errors: {
      title: undefined,
    },
  };
}

export async function updateListTitleAction(id: number, title: string) {
  await db
    .update(lists)
    .set({
      title: title,
    })
    .where(eq(lists.id, id));
  revalidatePath("/");
}

export async function deleteListAction(id: number) {
  await db.delete(lists).where(eq(lists.id, id));
  revalidatePath("/");
}
