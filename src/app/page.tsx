
import Chat from "./components/Chat";
import { Separator } from "@radix-ui/react-dropdown-menu";

//Authentication
import { auth } from "@/auth";
// create a session object with auth()

export default async function Home() {
  const session = await auth();
  console.log("User Session")
  console.log(session?.user?.email)
  return (
    <main>
      <h1 className="text-4xl font-bold">Welcome to GPT Chat</h1>
       {!session?.user?.name && <div>You need to log in to use this chat.</div>}
      {session?.user?.name && (
        <>
          <Separator className="my-5" />
          <Chat />
        </>
      )}

    </main>
  );
}



