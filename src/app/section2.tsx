'use client'

import { CardContent } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import { Card } from "@nextui-org/react";
import { useRef } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { SlEnvolopeLetter } from "react-icons/sl";
import gsap from "gsap";

export default function HeroSectionTwo() {

  const triggerRef = useRef(null);

  useGSAP(() => {

    const trigger = triggerRef.current;

    let tl2 = gsap.timeline({
      defaults: {ease: 'power2.out', duration: 2},
      scrollTrigger: {
        trigger: trigger,
        start: 'top center',
        end: 'bottom 80%',
        scrub: true,
        markers: true,
      },
    })

    tl2.from((".second-wrapper"),{
      opacity: 0.2, // Set your desired opacity value here
    })



  })
  
    return(
        <>
           {/* section 2 made by for */}
           <section ref={triggerRef} className="second-wrapper w-[100vw] overflow-hidden bg-dprimary gap-3  px-8 flex flex-col md:flex-row place-items-center place-content-center h-[100vh] ">

<div className="h-[100vh] pt-[10vh] w-[100vw] justify-start flex place-items-center place-content-center flex-col text-center gap-2">
    
    <div className="flex flex-col gap-5 place-items-center h-[50vh]">

        <h1 className="text-left sm:text-center text-3xl sm:text-5xl bg-gradient-to-r from-main-w to-lprimary bg-clip-text text-transparent">
          Made <em className="text-blue-500 pr-3">by </em> job seekers, <br />
          <em className="text-blue-500 pr-3">for </em> job seekers
        </h1>

        {/* button group */}
        <div className="w-[90%] sm:w-[70%] flex flex-col sm:flex-row place-items-start sm:place-items-center place-content-center gap-4">

            <span className="h-[50px] text-main-w/60 hover:text-main-w leading-[1em] bg-gradient-to-b from-dprimary to-lprimary outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                <span>
                  <SlEnvolopeLetter/>
                </span>
                <span>
                  Cover Letters
                </span>
            </span>

            <span className="h-[50px] text-main-w/60 hover:text-main-w leading-[1em] bg-gradient-to-b from-dprimary to-lprimary outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                <span>
                  <LuMessagesSquare/>
                </span>
                <span>
                  Follow-up Messages
                </span>
            </span>

            <span className="h-[50px] text-main-w/60 hover:text-main-w leading-[1em] bg-gradient-to-b from-dprimary to-lprimary outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                <span>
                  <FaRegCheckCircle/>
                </span>
                <span>
                  Application Tracking
                </span>
            </span>

        </div>

        {/* tired of ..... */}
        <span className="pt-5 w-[90%] sm:w-[70%]">
            <h2 className="text-sm sm:text-md text-left sm:text-center hover:text-main-w text-main-w/60">
                Tired of rewriting cover letters? What about crafting messages to 
                follow up on applications? Cant keep track of the 
                job you applied to 3 weeks ago?
            </h2>
        </span>

    </div>

    <div className="h-[50vh] relative flex place-content-start place-items-center flex-col">
        <h1 className="flex w-[70%] text-3xl pt-9 sm:pt-0  sm:text-5xl bg-gradient-to-r from-main-w to-lprimary bg-clip-text text-transparent">
            Track all your applications in one place
        </h1>

        <Card className="hidden sm:flex absolute border-main-w/40 top-[35%] h-[200em] w-[80vw] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
              <CardContent>
            
                  
              <div  className="homeimg w-full h-full absolute top-0 left-0" >
              </div>


              </CardContent>
        </Card>
    </div>
    
</div>

</section>
        </>
    )
}