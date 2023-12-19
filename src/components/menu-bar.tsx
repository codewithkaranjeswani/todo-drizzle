import { getServerAuthSession } from "@/server/auth";
import { ModeToggle } from "./mode-toggle";
import { SignOutButton } from "./ui/signout-button";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function Menubar() {
  const session = await getServerAuthSession();
  return (
    <div className="border-b flex flex-wrap justify-between items-center gap-y-4 gap-x-2 py-5 px-10">
      <div className="flex justify-center items-center font-bold">TodoList</div>
      <div className="flex gap-x-2">
        {session ? (
          <SignOutButton variant={"outline"} />
        ) : (
          <Button asChild size={"default"} variant={"outline"}>
            <Link href="/api/auth/signin">Sign In</Link>
          </Button>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}
