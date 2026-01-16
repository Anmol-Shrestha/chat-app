import { Message } from "@/types";
import { UIMessage } from "@ai-sdk/react";
import { Bot, User, Send } from "lucide-react";


const name = "Anmol Shrestha"

const truncateText = (str: string, length: number) =>
    str.length > length ? str.slice(0, length) + "..." : str;

export default function StreamTranscript({
    messages,
    truncate = true,
}: {
    messages: UIMessage[];
    truncate?: boolean;
}) {




    return (
        <div className="flex-1 overflow-y-auto p-10 space-y-4">
            {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    <Bot className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>Hello! {name} I&apos;m your Optimized Assistant.</p>
                    <p className="text-sm mt-2">I can search and answer your questions!</p>
                </div>
            )}
            {/* {messages.map((message, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            message.role === "user" ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`${
              message.role === "user" ? "bg-blue-500" : "bg-gray-500 text-black"
            } rounded-md py-2 px-8`}
          >
            {truncate ? truncateText(message.content, 200) : message.content}
          </div>
        </div>
      ))}
 */}
            {/* Iterates through each messages, one message object has the content, and role */}
            {/*  */}
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                >
                    {/* The container is a flex box has 2 items, icon + chat  */}
                    {/* If the role is assistant, display the bot icon before the chat content */}
                    {/* If the role is user, display the bot icon after the chat content */}
                    {/*  */}
                    {message.role === 'assistant' && (
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    )}


                    {/* The Messages */}
                    {/* <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                                message.role === 'user'
                                    ? 'bg-slate-700 text-white'
                                    : 'bg-white border border-gray-200 text-gray-800'
                            }`}
                        >
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            <p
                                className={`text-xs mt-1 ${
                                    message.role === 'user' ? 'text-slate-300' : 'text-gray-500'
                                }`}
                            >
                                {new Date().toLocaleTimeString()}
                            </p>
                        </div> */}

                    {/* New Message COmponent */}
                    <div key={index}>
                        {message.parts.map(part => {
                            if (part.type === 'text') {
                                return <div key={`${message.id}-text`}>{part.text}</div>;
                            }
                        })}
                    </div>


                    {/* The User ICON */}
                    {message.role === 'user' && (
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    )}
                </div>
            ))}




        </div>
    );
}