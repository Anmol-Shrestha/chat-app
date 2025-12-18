"use client"

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCompletion } from "../server-actions/getCompletion";
import Transcript from "./Transcript";
import { useRouter } from "next/navigation";


// Representation of Message Data Model
interface Message {
    role: "user" | "assistant";
    content: string;
}

// We extended the capability of Chat Component from
// Only initiating a chat
// To taking a chat ID and displaying the past messages
// Chat - Display Messages Message[]
// Message type has role and content


export default function Chat(
   {
    id = null,
    messages : initialMessages = []
    }:{
        id?:number|null;
        messages?:Message[]
    }
) {
    const chatId = useRef<number | null>(id);
    // Transcript
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    // Single Message
    const [message, setMessage] = useState("");

    
    let router = useRouter();

    const onClick = async () =>{
        // calling chatgpt directly from client would expose openai token
        // We can use api/route or server actions, 
        // server actions are fundamental to app router, which lets our client talk to the server
        const completions = await getCompletion(chatId.current,[...messages, {role:'user', content:message}])


        if(!chatId.current){
            router.push(`/chats/${completions.id}`)
            router.refresh()
        }


        chatId.current = completions.id;

        setMessage('')
        setMessages(completions.messages)

    }

    return (
        <>

        {/* UI Displays Messages Transcript messages contain message objects */}
            <div className="flex flex-col">
            <Transcript messages={messages}/>
            </div>
            {/* User Input Interface gathers the message state */}
            {/* getCompletion action is also triggered from this interface  */}
            <div className="flex border-t-2 border-t-gray-500 pt-3 mt-3">
                <Input
                    className="flex-grow text-xl"
                    placeholder="Question"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            onClick();
                        }
                    }}
                />
                <Button onClick={onClick}>Send</Button>
            </div>
        </>
    )
}
