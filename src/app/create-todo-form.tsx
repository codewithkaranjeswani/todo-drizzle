"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateTodoFormState, createTodoAction } from "./todo-actions";
import { useFormState } from "react-dom";
import { type Session } from "next-auth";

export function CreateTodoForm({
  session,
  listId,
}: {
  session: Session | null;
  listId: number;
}) {
  const authorId = session?.user.id;
  const cta = (v: CreateTodoFormState, fd: FormData) =>
    createTodoAction(v, fd, listId, authorId);
  const [formState, wrappedCreateTodoAction] = useFormState(cta, {
    text: "",
    errors: { text: undefined },
  } as CreateTodoFormState);
  return (
    <>
      <form
        action={wrappedCreateTodoAction}
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          wrappedCreateTodoAction(formData);
          form.reset();
        }}
        className="flex flex-col gap-y-10 border-b p-5"
      >
        <div className="absolute px-2 pt-10">
          {formState.errors.text && (
            <div className="text-red-400 text-sm">{formState.errors.text}</div>
          )}
        </div>
        <Input
          type="text"
          name="todoText"
          defaultValue={formState.text}
          placeholder="Your Daily Todo Item - like - Study Physics for 2 hours"
        />
        <Button type="submit" variant={"outline"}>
          Create Todo
        </Button>
      </form>
    </>
  );
}
