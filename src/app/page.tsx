import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="md:px-20">
      <div className="text-sm font-medium py-10">Save your TodoList & Tasks here!</div>
      <form
        action={async (formData: FormData) => {
          "use server";
          // const text = formData.get("todoText") as string;
          console.log("in form action");
        }}
        className="flex flex-col gap-y-5 border py-5 px-2"
      >
        <Label htmlFor="text">Create Todo</Label>
        <Input
          type="text"
          name="todoText"
          placeholder="Your Daily Todo Item - like - Study Physics for 2 hours"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
