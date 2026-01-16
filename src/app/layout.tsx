import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import styles from "./mainpage.module.css"
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


import Navigation from "./components/navigation-component/Navigation";


const inter = Inter({ subsets: ["latin"] });


// For themes
import { ThemeProvider } from "./components/theme-provider";

// ==============IMPORT END=============================




export const metadata: Metadata = {
  title: "LockedIn",
  description: "LockedIn is a Study Tool that helps students do their assignments effectively. The goal is to give the students set of tools that "
};



export default async function RootLayout({
  children,
  chats, // "chats" the the name of hte prallel routes folder 
}: Readonly<{
  children: React.ReactNode;
  chats: React.ReactNode;
}>) {
  // auth() returns an object with multiple objects in it.
  // we only need the user object with values such as name, email, image.
  // so we reassign the object.
  const session = await auth();


  if (session?.user) {
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <SessionProvider basePath="/api/auth" session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} px-2 md:px-5`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>

              {/* LockedIn LandingPage Nav if unathenticated */}
            <Navigation />
             {/* LockedIn System nav if autenticated */}

            <div className={`${styles.mainLayout} flex flex-col md:flex-row`}>
              {/* This is from parallel route */}
              {chats}
              {/* This is from main route */}
              <div className="flex-grow">{children}</div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}