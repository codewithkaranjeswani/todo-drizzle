import { CreateTodoForm } from "./create-todo-form";
import { unstable_noStore as noStore } from "next/cache";
import { getMyTodos } from "@/server/todos";
import { Label } from "@/components/ui/label";
import TodoList from "./todo-list";

export default async function EveryoneHome() {
  noStore();
  const todos = await getMyTodos();
  return (
    <>
      <div className="py-5" />
      <Label htmlFor="text" className="py-5 px-7 text-xl">
        TodoList
      </Label>
      <div className="text-sm font-medium py-5 px-7">
        Shared Todolist - Try it out
      </div>
      <CreateTodoForm session={null} />
      <TodoList todos={todos} />
    </>
  );
}
