import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BsStars } from "react-icons/bs";
import { Header } from "./components/header";
import Secondheader from "./components/secondHeader";
import HeroSectionTwo from "./section2";
import { MouseParallax, ScrollParallax } from "react-just-parallax";
import FirstComponent from "./section1";
import Sec1Bg from "./bfsection1";
import HomeSectionFour from "./section4";
import NLoginHeader from "./homenav";
import HeroSectionThree from "./section3";
import HeroSectionFive from "./section5";
import Footer from "./footer";
import SecondHeaderS from "./components/S_secondHeader";


export default async function Home() {

  const {sessionId} = auth()
  const user = currentUser()

  if(await sessionId) {

    return redirect('/dashboard')

  }





  return (
    <>
    <div className="flex relative w-[100vw] place-content-center place-items-center">
      <div className="flex min-h-[100vh]   flex-col place-content-center justify-start  place-items-center w-[100vw]">

{/* hero */}
          <div className="w-full px-4 py-6 h-full gap-9 flex flex-col place-content-center place-items-center">
            <span className="w-full h-[5%] ">
              <NLoginHeader/>
            </span>

            <FirstComponent/>

          </div>

      </div>
    </div>
    </>
  );
}
