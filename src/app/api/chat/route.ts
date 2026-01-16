
import { createChat, updateChat } from "@/db";

import { openai } from "@ai-sdk/openai";

import { NextRequest } from "next/server";
import { auth } from "@/auth";

import { convertToModelMessages, streamText, type UIMessage } from 'ai';


import { Message } from "@/types";


export function uiMessagesToChatMessages(
  messages: UIMessage[]
): Message[] {
  return messages.map((msg) => ({
    role: msg.role as "user" | "assistant",
    content: msg.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(""),
  }));
}



export const POST = auth(async function POST(req: NextRequest) {
    const body = await req.json();
  const messages = body.messages;
  const chatId = body.chatId;

  console.log("Received chatId:", chatId, "Type:", typeof chatId);

  const result = await streamText({
    model: openai("gpt-4o-mini-2024-07-18"),
    system: 'You are a helpful assistant.',
    messages: convertToModelMessages(messages),
    async onFinish({ text }) {
      // This runs AFTER streaming is complete
      const chatHistory = uiMessagesToChatMessages(messages);
      const newChatHistory: Message[] = [...chatHistory, { role: "assistant", content: text }];

      console.log("New Chat History", newChatHistory);

      let dbChatId = chatId;

      if (!dbChatId) {
        const session = await auth();
        dbChatId = await createChat(
          session?.user?.name!,
          chatHistory[0]?.content || "New Chat",
          newChatHistory
        );
        return dbChatId;
        console.log("Created chat:", chatId);
      } else {
        await updateChat(dbChatId, newChatHistory);
        console.log("Updated chat:", dbChatId);
      }

    },
  });

  return result.toUIMessageStreamResponse();
});



