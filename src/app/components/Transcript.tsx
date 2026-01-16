import { Message } from "@/types";
import { Bot, User, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

const truncateText = (str: string, length: number) =>
  str.length > length ? str.slice(0, length) + "..." : str;

export default function Transcript({
  messages,
  truncate = true,
}: {
  messages: Message[];
  truncate?: boolean;
}) {




  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          <Bot className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>Hello! I&apos;m your Digital Twin.</p>
          <p className="text-sm mt-2">Ask me anything about AI deployment!</p>
        </div>
      )}



      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex gap-3 flex ${message.role === "user" ? "items-end" : "items-start"
            }`}
        >
            {message.role === 'assistant' && (
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    )}
          <div
            className={`${message.role === "user" ? "bg-blue-500" : "bg-gradient-to-r from-[#DC6668] to-[#65141B] text-black"
              } rounded-md py-2 px-8 prose dark:prose-invert max-w-none`}
          >
            <ReactMarkdown>
              {truncate ? truncateText(message.content, 200) : message.content}

            </ReactMarkdown>
          </div>
           {message.role === 'user' && (
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    )}
        </div>
        
      ))}

      {/* Iterates through each messages, one message object has the content, and role */}
      {/*  */}

    </div>
  );
}