import { Card, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListType } from "@/lib/types";
import { CreateTodoForm } from "./create-todo-form";
import { Session } from "next-auth";
import TodoList from "./todo-list";
import { getTodosByListId } from "@/server/todos";
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteListAction } from "./list-actions";
import EditableTitle from "./list-title";

export default async function CardDialog({
  session,
  list,
}: {
  session: Session | null;
  list: ListType;
}) {
  const todos = await getTodosByListId(list.id);
  return (
    <Dialog>
      <Card>
        <CardHeader>
          <div className="flex flex-row">
            <EditableTitle list={list} />
            <form
              action={deleteListAction.bind(null, list.id)}
              className="py-1.5 w-1/12"
            >
              <button className="text-red-400">
                <TrashIcon />
              </button>
            </form>
          </div>
        </CardHeader>
        <TodoList todos={todos} />
      </Card>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{list.title}</DialogTitle>
          <div className="py-2" />
          <DialogDescription className="text-xs font-thin">
            c {list.createdAt.toLocaleString()}
          </DialogDescription>
          <DialogDescription className="text-xs font-thin">
            u {list.updatedAt.toLocaleString()}
          </DialogDescription>
          <CreateTodoForm session={session} listId={list.id} />
          <TodoList todos={todos} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
