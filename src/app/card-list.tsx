import CardDialog from "./card-dialog";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Session } from "next-auth";
import { getMyLists } from "@/server/todos";
import { Suspense } from "react";
import { datefmt } from "@/lib/utils";

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
              <CardHeader className="flex flex-col p-8 space-y-2 w-10/12">
                <CardTitle className="truncate">{list.title}</CardTitle>
                <div className="py-2" />
                <CardDescription className="text-xs font-thin">
                  c {datefmt(list.createdAt)}
                </CardDescription>
                <CardDescription className="text-xs font-thin">
                  u {datefmt(list.updatedAt)}
                </CardDescription>
              </CardHeader>
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
