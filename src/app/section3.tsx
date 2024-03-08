'use client'

import { CardContent } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import { Card } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { SlEnvolopeLetter } from "react-icons/sl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSectionThree() {

  // Hovering -----------------



  // ScrollTrigger ---------
  const triggerRef = useRef(null);

  useGSAP(() => {

    const trigger = triggerRef.current;

    let tl2 = gsap.timeline({
      defaults: {ease: 'power2.out', duration: 0.5},
      scrollTrigger: {
        trigger: trigger,
        start: "top 60%",
        end: "top 5%",
        // scrub: true,
        // markers: true,
        toggleActions: 'restart none none reverse'
      },
    })



  })


  const [isHovered, setIsHovered] = useState(null);

  const handleHover = (id: any) => {
    setIsHovered(id);
  };

  
  
    return(
        <>
           {/* section 2 made by for */}
           <section ref={triggerRef} className="second-wrapper w-[100vw] overflow-hidden bg-dprimary  h-[100vh] ">

            <div className="h-[100vh] hidden w-[100%] px-[2em] pt-[2em] pb-[3em] overflow-hidden  justify-start lg:flex flex-col text-center">
                
                <div className="flex flex-col gap-2  place-items-start text-main-w">
                    <h1  id='madeby' className="text-center text-7xl ">
                    Become a Success Story   
                    </h1>

                </div>

                  <div className="h-[95%]  flex">
                  

                    <div className="h-full w-[100%] flex gap-2 nosb overflow-x-auto nosb   ">
                      
                      <div className="flex w-full pt-9 place-content-center gap-9 ">
                        
                          <div className="flex flex-col gap-9 w-[45%] place-items-start text-left">
                            <div
                              onMouseEnter={() => handleHover("bluesmall")}
                              onMouseLeave={() => handleHover(null)}
                              id="appliedcard" className="flex overflow-hidden rounded-[2em] flex-col w-full float  h-[80%]">
                                  <img className="scale-[400%] " src="https://images.unsplash.com/photo-1507207908229-c59ddb730e40?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

                            </div>
                            <h2 className="text-main-w ">OAcjAMcrLFbCd7vYhSUXhh8 </h2>
                          </div>

                          <div className="flex flex-col gap-9 w-[45%] place-items-start text-left">
                            <div
                            onMouseEnter={() => handleHover("bluesmall")}
                            onMouseLeave={() => handleHover(null)}
                            id="appliedcard" className="flex blur-md  overflow-hidden flex-col float2 rounded-[2em] w-full  h-[80%]">
                                <img className="scale-[400%]" src="https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            </div>
                            <h2 className="text-main-w 	 w-[80%]">OAcjAMcrLFbCd7vYhSUXh </h2>
                          </div>

                      </div>
                      
                    
                    </div>

                  </div>

            </div>

          </section>
        </>
    )
}