import { Session } from "next-auth";
import { CreateTodoForm } from "./create-todo-form";
import { deleteTodoAction, toggleTodoAction } from "./action";
import { BoxIcon, CheckboxIcon, TrashIcon } from "@radix-ui/react-icons";
import { getMyTodos } from "@/server/todos";
import { unstable_noStore as noStore } from "next/cache";
import { Label } from "@/components/ui/label";

export default async function PersonalizedHome({
  session,
}: {
  session: Session;
}) {
  noStore();
  const todos = await getMyTodos(session.user.id);
  return (
    <div className="md:px-10 lg:px-40">
      <div className="text-sm font-medium py-10">
        Your Personalized TodoList
      </div>
      <CreateTodoForm session={session} />
      <div className="py-5" />
      <div className="flex flex-col gap-y-5 border p-5">
        <Label htmlFor="text" className="py-5 text-xl">
          TodoList
        </Label>
        <ul className="list-disc">
          {todos.map((todo) => (
            <li className="flex border-b p-2" key={todo.id}>
              <form
                action={toggleTodoAction.bind(null, todo.id)}
                className="w-2/12"
              >
                <button>
                  {todo.completed ? <CheckboxIcon /> : <BoxIcon />}
                </button>
              </form>
              <div className="w-10/12">{todo.name}</div>
              <form
                action={deleteTodoAction.bind(null, todo.id)}
                className="w-2/12"
              >
                <button className="text-red-400">
                  <TrashIcon />
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
