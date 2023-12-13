import { ModeToggle } from "./mode-toggle";

export default async function Menubar() {
  return (
    <div className="border-b flex justify-between items-center py-5 px-10">
      <div className="flex justify-center items-center font-bold">TodoList</div>
      <ModeToggle />
    </div>
  );
}
