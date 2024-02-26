import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Header } from "./components/header"; 


export default function Home() {


  return (
    <>
    <div className="flex">
      <div className="flex min-h-screen flex-col place-items-center w-[90vw]">
          <Header/>
      </div>
    </div>
    </>
  );
}
