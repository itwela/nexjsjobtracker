import Image from "next/image";
import { UserButton, currentUser } from "@clerk/nextjs";
import { Header } from "./components/header"; 
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function Home() {

  const {sessionId} = auth()
  const user = currentUser()

  if(await sessionId) {

    return redirect('/dashboard')

  }



  return (
    <>
    <div className="flex bg-mprimary w-[100vw] place-content-center">
      <div className="flex min-h-screen flex-col place-items-center w-[90vw]">
          <Header/>
      </div>
    </div>
    </>
  );
}
