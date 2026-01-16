// inside of src/app/@chats/chats/[chatId]/page.tsx



import ChatMenu from "@/app/components/ChatMenu";
import { auth } from "@/auth";

export default async function ChatMenuColumn() {
  const session = await auth();
  const authenticated = !!session?.user?.name;

  return authenticated ? (
    <div className="md:w-1/3 h-full border-t-6 p-8 text-center  md:min-w-.5/3  w-full text-nowrap">
      <ChatMenu />
    </div>
  ) : null;
}