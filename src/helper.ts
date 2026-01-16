"use server"
import { signIn as naSignIn, signOut as naSignOut } from "./auth";

export async function signInNew(){
await naSignIn();
}

export async function signOutNew(){
await naSignOut();
}