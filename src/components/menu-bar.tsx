import { getServerAuthSession } from "@/server/auth";
import { ModeToggle } from "./mode-toggle";

export default async function Menubar() {
  const session = await getServerAuthSession();
  return (
    <div className="border-b flex justify-between items-center py-5 px-10">
      <div className="flex justify-center items-center font-bold">TodoList</div>
      {session ? <div>Signed In</div> : <div>Sign In</div>}
      <ModeToggle />
    </div>
  );
}
