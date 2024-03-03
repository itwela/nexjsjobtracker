'use client'

import { CardContent } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import { Card } from "@nextui-org/react";
import { useRef } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { SlEnvolopeLetter } from "react-icons/sl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSectionTwo() {

  const triggerRef = useRef(null);

  useGSAP(() => {

    const trigger = triggerRef.current;

    let tl2 = gsap.timeline({
      defaults: {ease: 'power2.out', duration: 2},
      scrollTrigger: {
        trigger: trigger,
        start: 'top 70%',
        end: 'bottom 80%',
        // scrub: true,
        // markers: true,
        toggleActions: 'play play reverse reverse'
      },
    })

    tl2.from(("#madeby"),{
      y:'-39',
    })

    tl2.from([
      "#clbutton", 
      "#fubutton", 
      "#atbutton", 
      "#tiredof", 
      "#trackall", 
      "#cardpic", 
    ],{
      opacity: 0,
      y:'-39',
      stagger: 0.418
    })



  })
  
    return(
        <>
           {/* section 2 made by for */}
           <section ref={triggerRef} className="second-wrapper w-[100vw] overflow-hidden bg-dprimary gap-3  px-8 flex flex-col md:flex-row place-items-center place-content-center h-[100vh] ">

<div className="h-[100vh] pt-[10vh] w-[100vw] justify-between flex place-items-center place-content-center flex-col text-center gap-2">
    
    <div className="flex flex-col gap-5 place-items-center h-[50vh]">

        <h1  id='madeby' className="text-center text-3xl sm:text-5xl bg-gradient-to-r from-main-w to-lprimary bg-clip-text text-transparent">
            Made <em className="text-blue-500 pr-3">by </em> job seekers,
           <br />
          <em className="text-blue-500 pr-3">for </em> job seekers
        </h1>

        {/* button group */}
        <div className="w-[90%] sm:w-[70%] flex flex-col sm:flex-row place-items-center sm:place-items-center place-content-center gap-4">

            <span id="clbutton" className="h-[50px] text-main-w/60 hover:text-main-w leading-[1em] bg-gradient-to-l from-dprimary to-lprimary outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                <span>
                  <SlEnvolopeLetter/>
                </span>
                <span>
                  Cover Letters
                </span>
            </span>

            <span id="fubutton" className="h-[50px] text-main-w/60 hover:text-main-w leading-[1em] bg-gradient-to-l from-dprimary to-lprimary outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                <span>
                  <LuMessagesSquare/>
                </span>
                <span>
                  Follow-up Messages
                </span>
            </span>

            <span id="atbutton" className="h-[50px] text-main-w/60 hover:text-main-w leading-[1em] bg-gradient-to-l from-dprimary to-lprimary outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                <span>
                  <FaRegCheckCircle/>
                </span>
                <span>
                  Application Tracking
                </span>
            </span>

        </div>

        {/* tired of ..... */}
        <span id="tiredof" className="pt-5 w-[70%]">
            <h2 className="text-sm sm:text-md text-center hover:text-main-w text-main-w/60">
                Tired of rewriting cover letters? What about crafting messages to 
                follow up on applications? Cant keep track of the 
                job you applied to 3 weeks ago?
            </h2>
        </span>

    </div>

    <div className="h-[50vh] relative flex place-content-center place-items-center  flex-col">
        <h1 id="trackall" className="flex w-[70%] text-3xl place-content-center place-items-center sm:pt-[0em]  md:text-5xl bg-gradient-to-r from-main-w to-lprimary bg-clip-text text-transparent">
            Track all your applications in one place
        </h1>

        <Card id="cardpic" className="hidden md:flex   border-main-w/40  h-[200em] w-[80vw] top-[10%] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
              <CardContent>
            
                  
              <div  className="homeimg w-full h-full absolute left-0" >
              </div>


              </CardContent>
        </Card>
    </div>
    
</div>

</section>
        </>
    )
}