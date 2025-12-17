"use server"
import { auth } from "@/auth";
import { createChat, updateChat } from "@/db";
import OpenAI from "openai";



const openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET,
})





export async function getCompletion(
    // Transcript of the message to AI
    // Array of object which contains role and content
    id:number | null,
    messageHistory:{
        role: "user" | "assistant";
        content:string;
    }[]
){

    const response = await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        // contains new prompt from the user
        messages:messageHistory,
    })

    // Concatenates new result from CHATGPT request
    
    const messages = [
        ...messageHistory,
        response.choices[0].message as unknown as {
            role:"user" | "assistant";
            content: string;
        },
    ];

    const session = await auth();
    
    let chatId = id;
    if(!chatId){
        chatId = await createChat(
      "anmolstha777@gmail.com",
      messageHistory[0].content,
      messages
        )
    }else{
        await updateChat(chatId, messages);
    }

    // Returns messages
    return {messages, id : chatId};

}





