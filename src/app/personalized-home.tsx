import { Session } from "next-auth";
import { CreateTodoForm } from "./create-todo-form";
import { getMyTodos } from "@/server/todos";
import { unstable_noStore as noStore } from "next/cache";
import { Label } from "@/components/ui/label";
import TodoList from "./todo-list";

export default async function PersonalizedHome({
  session,
}: {
  session: Session;
}) {
  noStore();
  const todos = await getMyTodos(session.user.id);
  return (
    <div className="md:px-10 lg:px-40">
      <div className="py-5" />
      <Label htmlFor="text" className="py-5 px-7 text-xl">
        TodoList
      </Label>
      <div className="text-sm font-medium py-5 px-7">
        Your Personalized TodoList
      </div>
      <CreateTodoForm session={session} />
      <TodoList todos={todos} />
    </div>
  );
}
