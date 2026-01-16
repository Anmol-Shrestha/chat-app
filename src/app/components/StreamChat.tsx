"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//import { getCompletion } from "@/app/server-actions/getCompletion";


import StreamTranscript from "./StreamTranscript";
import { Message } from "@/types";

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';



export default function StreamChat({
  id = null,
  messages: initialMessages = [],
}: {
  id?: number | null;
  messages?: Message[];
}) {

  const [message, setMessage] = useState("");
  const chatId = useRef<number | null>(id);


// Getting The Data from the server
  const { messages, sendMessage  } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });



const handleSend = () => {

  if(!message.trim()) return;

  sendMessage(
    {parts:[{type:'text', text:message}]},
     {
    body:{chatId:chatId.current}
  }
  )
 
   setMessage("")
   console.log("Chat ID is: ",chatId.current)
}



  return (
    <div className="flex flex-col h-full rounded-lg shadow-lg">

      {/* Displays Messages */}
      <StreamTranscript messages={messages} truncate={false} />

      {/* Input */}
      <div className="flex border-t-2 border-t-gray-500 pt-3 mt-3">
        <Input
          className="flex-grow text-xl"
          placeholder="Question"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <Button onClick={handleSend} className="ml-3 text-xl">
          Send 
        </Button>
      </div>
    </div>
  );
}