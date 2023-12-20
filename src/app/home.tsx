import { unstable_noStore as noStore } from "next/cache";
import { Label } from "@/components/ui/label";
import { getMyLists } from "@/server/todos";
import { CreateListForm } from "./create-list-form";
import CardList from "./card-list";

export default async function EveryoneHome() {
  noStore();
  const lists = await getMyLists();
  return (
    <>
      <div className="py-5" />
      <Label htmlFor="text" className="py-5 px-7 text-xl">
        TodoList
      </Label>
      <div className="text-sm font-medium py-5 px-7">
        Shared Todolist - Try it out
      </div>
      <CreateListForm session={null} />
      <CardList session={null} lists={lists} />
    </>
  );
}
