import { Label } from "@/components/ui/label";
import { CreateListForm } from "./create-list-form";
import CardList from "./card-list";
import { Suspense } from "react";

export default function EveryoneHome() {
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
      <Suspense
        fallback={<div className="py-10 text-center">Loading ... </div>}
      >
        <CardList session={null} />
      </Suspense>
    </>
  );
}
