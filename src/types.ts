// inside src/types.ts

export interface Chat {
  id: number;
  name: string;
  user_email: string;
  timestamp: Date;
}

// STEP 1: Change the Type Definition
// export interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

type ContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; imageUrl: { url: string } };

export interface Message {
  role: "user" | "assistant";
  content: string ;
}

export interface StoredMessage extends Message {
  id: number;
  chat_id: number;
}

export interface ChatWithMessages extends Chat {
  messages: StoredMessage[];
}
