import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const authOptions: NextAuthConfig = {
  callbacks: {
    async signIn({ profile }) {
      // Change this to your username
      return profile?.login === "Anmol-Shrestha";
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  basePath: "/api/auth",
  secret: process.env.NEXTAUTH_SECRET,
};

// auth options gets an object with 4 keys: callbacks, providers, basepath, secret
// 1. callbacks: object async signIn({profile}) 
// returns true or false depending on login value being correct username

// 

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);