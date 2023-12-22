import { BoxIcon, CheckboxIcon, TrashIcon } from "@radix-ui/react-icons";
import { deleteTodoAction, toggleTodoAction } from "./todo-action";
import { TodoType } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TodoList({ todos }: { todos: TodoType[] }) {
  return (
    <div className="flex flex-col gap-y-5 border-b p-5">
      <ScrollArea className="h-[20vh] w-[80vhpx] rounded-md p-4">
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
              <div className="w-10/12">{todo.content}</div>
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
      </ScrollArea>
    </div>
  );
}
