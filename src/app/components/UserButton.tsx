"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react";

function getFirstTwoCapitalLetters(str?: string | null) {
  const match = (str || "").match(/[A-Z]/g);
  return match ? match.slice(0, 2).join("") : "GT";
}

export default function UserButton({
  onSignIn

}: {
  onSignIn: () => Promise<void>;
  
}) {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === "authenticated" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={session?.user?.image!} />
              <AvatarFallback>
                {getFirstTwoCapitalLetters(session?.user?.name)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

       {/* if unauthenticated then button */}
      {status === "unauthenticated" && (
        <Button onClick={() => {
          console.log("clicked")
          return onSignIn()
        }}>Sign in</Button>
      )}
    </div>
  );
}