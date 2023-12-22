"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Session } from "next-auth";
import { useFormState } from "react-dom";
import { CreateListFormState, createListAction } from "./list-actions";

export function CreateListForm({ session }: { session: Session | null }) {
  const authorId = session?.user.id;
  const cla = (v: CreateListFormState, fd: FormData) =>
    createListAction(v, fd, authorId);
  const [formState, wrappedCreateListAction] = useFormState(cla, {
    title: "",
    errors: { title: undefined },
  } as CreateListFormState);
  return (
    <>
      <form
        action={wrappedCreateListAction}
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          wrappedCreateListAction(formData);
          form.reset();
        }}
        className="flex flex-col sm:flex-row gap-2 border-b p-5 pb-10"
      >
        <div className="absolute px-2 pt-10">
          {formState.errors.title && (
            <div className="text-red-400 text-sm">{formState.errors.title}</div>
          )}
        </div>
        <Input
          type="text"
          name="titleText"
          placeholder="Your TodoList title - like - About the movies I watched today"
        />
        <Button type="submit" variant={"outline"}>
          Create New TodoList
        </Button>
      </form>
    </>
  );
}
