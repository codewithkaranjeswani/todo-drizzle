import { Session } from "next-auth";
import { Label } from "@/components/ui/label";
import { CreateListForm } from "./create-list-form";
import CardList from "./card-list";
import { Suspense } from "react";

export default async function PersonalizedHome({
  session,
}: {
  session: Session;
}) {
  return (
    <>
      <div className="py-5" />
      <Label htmlFor="text" className="py-5 px-7 text-xl">
        TodoList
      </Label>
      <div className="text-sm font-medium py-5 px-7">
        Your Personalized TodoList
      </div>
      <CreateListForm session={session} />
      <Suspense
        fallback={<div className="py-10 text-center">Loading ... </div>}
      >
        <CardList session={session} />
      </Suspense>
    </>
  );
}
