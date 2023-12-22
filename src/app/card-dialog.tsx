import { Card, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ListType } from "@/lib/types";
import { CreateTodoForm } from "./create-todo-form";
import { Session } from "next-auth";
import TodoList from "./todo-list";
import { getTodosByListId } from "@/server/todos";
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteListAction } from "./list-actions";

export default async function CardDialog({
  session,
  list,
}: {
  session: Session | null;
  list: ListType;
}) {
  const todos = await getTodosByListId(list.id);
  return (
    <>
      <Dialog>
        <Card>
          <CardHeader className="flex flex-row gap-x-2">
            <DialogTrigger asChild>
              <div className="w-11/12 hover:cursor-pointer">{list.title}</div>
            </DialogTrigger>
            <form
              action={deleteListAction.bind(null, list.id)}
              className="w-1/12"
            >
              <button className="text-red-400">
                <TrashIcon />
              </button>
            </form>
          </CardHeader>
          <TodoList todos={todos} />
        </Card>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{list.title}</DialogTitle>
            <CreateTodoForm session={session} listId={list.id} />
            <TodoList todos={todos} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
