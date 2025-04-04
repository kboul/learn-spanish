import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/words");
  // return <main className="flex flex-col items-center min-h-screen p-5 gap-4"></main>;
}
