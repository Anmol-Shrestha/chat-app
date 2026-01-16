
# 🔒 LOCKEDIN | Full-Stack GenAI Study Platform

**LOCKEDIN** is a study management platform designed to automate the *non-learning* tasks of the student journey, so users can focus entirely on understanding and retention.

This repository contains **Phase 1** of the application:  
a **full-stack, authenticated AI chat interface** with **real-time streaming** and **persistent data storage**.

---

## 🚀 Features

- **Real-time LLM Streaming**  
  Uses OpenAI’s streaming API to deliver responses token-by-token, providing a smooth and low-latency chat experience.

- **Persistent Chat History**  
  Full-stack integration with **PostgreSQL** ensures study sessions are saved and accessible across devices.

- **Secure Authentication**  
  GitHub OAuth powered by **NextAuth/Auth.js** for secure and reliable user sessions.

- **Modern UI/UX**  
  A focus-first interface built using **Tailwind CSS**, **CSS Modules**, and **Shadcn UI** components.

- **Edge-Ready Architecture**  
  Built on the **Next.js App Router**, optimized for performance, scalability, and modern deployment platforms.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **AI:** OpenAI API (Streaming enabled)
- **Database:** PostgreSQL
- **Styling:** Tailwind CSS, CSS Modules, Shadcn UI
- **Authentication:** GitHub (NextAuth/Auth.js)
- **Deployment:** Vercel 

---

## 🏗️ Architecture Flow

1. **Client**  
   The user sends a prompt via the Shadcn-based chat interface.

2. **Server**  
   A Next.js Route Handler validates the user session and forwards the request to the OpenAI API.

3. **Streaming**  
   The LLM response is streamed back to the frontend in real time using Server-Sent Events (SSE).

4. **Persistence**  
   Once streaming completes, the final assistant message is stored in the PostgreSQL database for long-term chat history.

---

## 📌 Status

🚧 **Phase 1 Complete** — Authenticated streaming chat with persistence  
🔜 **Next Phases** — Study planning, WBS generation, quizzes, analytics, and personalized learning insights

