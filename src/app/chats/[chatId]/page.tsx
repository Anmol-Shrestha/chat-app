import Chat from "@/app/components/Chat"
import { auth } from "@/auth"
import { getChat } from "@/db"
import { notFound } from "next/navigation"
import { redirect } from "next/navigation"
// Force nextjs to re-render and fetch fresh data each time it is requested
export const dynamic = 'force-dynamic'
export default async function ChatDetail({
    params,
}: {
    params: Promise<{ chatId: string }>
}) {
    const { chatId } = await params


    const chat = await getChat(+chatId);
    if (!chat) {
        return notFound()
    }
    // id, user_email, timestap, messages messages[]

    const session = await auth()

    if (!session || session?.user?.name !== chat.user_email) {
        return redirect('/')
    }
    console.log("Session User name:", session?.user?.name)




    console.log("chatId:", chatId)

    return <>
        <Chat id={+chatId} key={chatId} messages={chat?.messages} />
           </>
}