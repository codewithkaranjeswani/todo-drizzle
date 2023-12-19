import { unstable_noStore as noStore } from "next/cache";
import { getServerAuthSession } from "@/server/auth";
import EveryoneHome from "./home";
import PersonalizedHome from "./personalized-home";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();
  return (
    <div className="md:px-10 lg:px-40">
      {session ? <PersonalizedHome session={session} /> : <EveryoneHome />}
    </div>
  );
}
