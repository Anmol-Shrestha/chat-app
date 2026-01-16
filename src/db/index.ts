import { sql } from "@vercel/postgres";

import type { Chat, ChatWithMessages, Message } from "../types";


export async function createChat(
  userEmail: string,
  name: string,
  msgs: Message[]
) {
  // 1. Use RETURNING id to get the ID in a single step
  const { rows } = await sql`
    INSERT INTO chats (user_email, name) 
    VALUES (${userEmail}, ${name}) 
    RETURNING id
  `;

  const chatId = rows[0].id;

  // 2. Now that we have the chatId safely, insert the messages
  // Using Promise.all is faster and more reliable than a standard for-loop here
  await Promise.all(
    msgs.map((msg) => 
      sql`
        INSERT INTO messages (chat_id, role, content) 
        VALUES (${chatId}, ${msg.role}, ${msg.content})
      `
    )
  );

  return chatId;
}

export async function getChat(
  chatId: number
): Promise<ChatWithMessages | null> {
  const { rows: chats } = await sql`SELECT * FROM chats WHERE id = ${chatId}`;
  if (!chats[0]) {
    return null;
  }
  const { rows: messages } =
    await sql`SELECT * FROM messages WHERE chat_id = ${chatId}`;
  return {
    ...chats[0],
    messages: messages.map((msg) => ({
      ...msg,
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
  } as ChatWithMessages;
}

export async function getChats(userEmail: string): Promise<Chat[]> {
  const { rows: chats } =
    await sql`SELECT * FROM chats WHERE user_email = ${userEmail}`;
  return chats as Chat[];
}

export async function getChatsWithMessages(
  userEmail: string
): Promise<ChatWithMessages[]> {
  const { rows: chats } =
    await sql`SELECT * FROM chats WHERE user_email = ${userEmail} ORDER BY timestamp DESC LIMIT 3`;

  for (const chat of chats) {
    const { rows: messages } =
      await sql`SELECT * FROM messages WHERE chat_id = ${chat.id}`;
    chat.messages = messages.map((msg) => ({
      ...msg,
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }));
  }

  return chats as ChatWithMessages[];
}

export async function getMessages(chatId: number) {
  const { rows: messages } =
    await sql`SELECT * FROM messages WHERE chat_id = ${chatId}`;

  return messages.map((msg) => ({
    ...msg,
    role: msg.role as "user" | "assistant",
    content: msg.content,
  }));
}

export async function updateChat(chatId: number, msgs: Message[]) {
  await sql`DELETE FROM messages WHERE chat_id = ${chatId}`;
  for (const msg of msgs) {
    await sql`INSERT INTO messages (chat_id, role, content) VALUES (${chatId}, ${msg.role}, ${msg.content})`;
  }
}