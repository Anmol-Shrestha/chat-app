"use client"

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCompletion } from "../server-actions/getCompletion";


// Representation of Message Data Model
interface Message {
    role: "user" | "assistant";
    content: string;
}


export default function Chat() {
    const chatId = useRef<number | null>(null);
    // Transcript
    const [messages, setMessages] = useState<Message[]>([]);
    // Single Message
    const [message, setMessage] = useState("");

    const onClick = async () =>{
        // calling chatgpt directly from client would expose openai token
        // We can use api/route or server actions, 
        // server actions are fundamental to app router, which lets our client talk to the server
        const completions = await getCompletion(chatId.current,[...messages, {role:'user', content:message}])

        chatId.current = completions.id;

        setMessage('')
        setMessages(completions.messages)

    }

    return (
        <>

        {/* UI Displays Messages Transcript messages contain message objects */}
            <div className="flex flex-col">
                {messages.map((message, i) => (
                    <div
                        key={i}
                        className={`mb-5 flex flex-col ${message.role === "user" ? "items-end" : "items-start"
                            }`}
                    >
                        <div
                            className={`${message.role === "user" ? "bg-blue-500" : "bg-gray-500 text-black"
                                } rounded-md py-2 px-8`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
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
