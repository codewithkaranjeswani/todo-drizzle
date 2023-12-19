import { CreateTodoForm } from "./create-todo-form";
import { unstable_noStore as noStore } from "next/cache";
import { BoxIcon, CheckboxIcon, TrashIcon } from "@radix-ui/react-icons";
import { deleteTodoAction, toggleTodoAction } from "./action";
import { getMyTodos } from "@/server/todos";
import { Label } from "@/components/ui/label";

export default async function EveryoneHome() {
  noStore();
  const todos = await getMyTodos();
  return (
    <div className="md:px-10 lg:px-40">
      <div className="text-sm font-medium py-10">Shared TodoList</div>
      <CreateTodoForm session={null} />
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
