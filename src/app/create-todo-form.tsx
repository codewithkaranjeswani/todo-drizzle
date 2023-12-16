"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateTodoFormState, createTodoAction } from "./action";
import { useFormState } from "react-dom";

export function CreateTodoForm() {
  const [formState, wrappedCreateTodoAction] = useFormState(createTodoAction, {
    text: "",
    errors: { text: undefined },
  } as CreateTodoFormState);
  return (
    <form
      action={wrappedCreateTodoAction}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const fs = {
          text: formData.get("todoText") as string,
          errors: { text: undefined },
        };
        createTodoAction(fs, formData).then(() => form.reset());
      }}
      className="flex flex-col gap-y-10 border p-5"
    >
      <Label htmlFor="text" className="py-5 text-xl">
        Create TodoItem
      </Label>
      <Input
        type="text"
        name="todoText"
        defaultValue={formState.text}
        placeholder="Your Daily Todo Item - like - Study Physics for 2 hours"
      />
      {formState.errors.text && (
        <div className="text-red-400">{formState.errors.text}</div>
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
}
