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
        <DialogTrigger asChild>
          <Card>
            <CardHeader>{list.title}</CardHeader>
            <TodoList todos={todos} />
          </Card>
        </DialogTrigger>
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
