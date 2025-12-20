import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages } from "ai";
import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { UIMessage } from "ai";
export const runtime = "edge";

export const POST = auth(async function POST(req: NextRequest) {
  const { messages } : { messages: UIMessage[]} = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
});