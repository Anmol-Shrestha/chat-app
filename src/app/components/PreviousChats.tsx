import { auth } from '@/auth';
import { getChatsWithMessages } from '@/db';
import React from 'react'
import Transcript from './Transcript';
import Link from "next/link";
import { Separator } from "@radix-ui/react-dropdown-menu";

async function PreviousChats() {

    const session = await auth()
    console.log("Previous Chats")
    console.log(session?.user?.name)

    await new Promise((resolve) => setTimeout(resolve, 3000));
    

    const chats = await getChatsWithMessages(session?.user?.name!);
    // chatid, messages:[{}]
    return (
       <div>
      {chats.length > 0 && (
        <>
          <div className="text-2xl font-bold">Previous Chat Sessions</div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {chats.map((chat) => (
              <div key={chat.id} className="m-1 border-2 rounded-xl">
                <Link
                  href={`/chats/${chat.id}`}
                  className="text-lg line-clamp-1 px-5 py-2 text-dark rounded-t-lg"
                >
                  {chat.name}
                </Link>
                <div className="p-3">
                  <Transcript messages={chat.messages.slice(0, 2)} />
                </div>
              </div>
            ))}
          </div>
          <Separator className="mt-5" />
        </>
      )}

      {chats.length === 0 && (
        <div className="flex justify-center">
          <div className="text-gray-500 italic text-2xl">
            No previous chats.
          </div>
        </div>
      )}
    </div>
    )
}

export default PreviousChats