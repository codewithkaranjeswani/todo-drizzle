import CardDialog from "./card-dialog";
import { Card, CardHeader } from "@/components/ui/card";
import { Session } from "next-auth";
import { getMyLists } from "@/server/todos";
import { Suspense } from "react";

export default async function CardList({
  session,
}: {
  session: Session | null;
}) {
  const lists = await getMyLists(session?.user.id);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5">
      {lists.map((list) => (
        <Suspense
          key={list.id}
          fallback={
            <Card>
              <CardHeader>{list.title}</CardHeader>
              <div className="p-5 text-center">Loading ... </div>
            </Card>
          }
        >
          <CardDialog key={list.id} session={session} list={list} />
        </Suspense>
      ))}
    </div>
  );
}
