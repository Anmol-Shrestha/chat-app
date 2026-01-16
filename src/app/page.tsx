
import { Separator } from "@radix-ui/react-dropdown-menu";

//Authentication
import { auth } from "@/auth";
import PreviousChats from "./components/PreviousChats";
import { Suspense } from "react";
import Spinner from "./components/Spinner";

// create a session object with auth()
import StreamChat from "./components/StreamChat";
import LockedInLanding from "./components/welcome-component/LandingPage";

// import styling for main page
import styles from "./mainpage.module.css"

export default async function Home() {
  const session = await auth();
  console.log("User Session")
  console.log(session?.user?.name)
  return (
    <main className={styles.main}>
      
       {!session?.user?.name && <LockedInLanding/>}
       
      {session?.user?.name && (
        <>
        <Suspense fallback={<Spinner/>} >
          <PreviousChats/>
        </Suspense> 
          <Separator className="my-5" />
          <StreamChat />
        </>
      )}

    </main>
  );
}



