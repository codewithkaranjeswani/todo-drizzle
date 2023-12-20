import { Session } from "next-auth";
import { unstable_noStore as noStore } from "next/cache";
import { Label } from "@/components/ui/label";

export default async function PersonalizedHome({
  session,
}: {
  session: Session;
}) {
  noStore();
  return (
    <>
      <div className="py-5" />
      <Label htmlFor="text" className="py-5 px-7 text-xl">
        TodoList
      </Label>
      <div className="text-sm font-medium py-5 px-7">
        Your Personalized TodoList
      </div>
    </>
  );
}
