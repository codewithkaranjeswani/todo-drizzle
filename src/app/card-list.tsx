import { ListType } from "@/lib/types";
import CardDialog from "./card-dialog";
import { Session } from "next-auth";

export default function CardList({
  session,
  lists,
}: {
  session: Session | null;
  lists: ListType[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5">
      {lists.map((list) => (
        <CardDialog key={list.id} session={session} list={list} />
      ))}
    </div>
  );
}
