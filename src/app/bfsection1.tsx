'use client'

import { CiCircleCheck } from "react-icons/ci";
import { ScrollParallax } from "react-just-parallax";

export default function Sec1Bg() {
    return (
        <>
             <div className="absolute bg-gradient-to-b from-dprimary to-mprimary w-full h-[100vh]">
                            
                            <ScrollParallax strength={0.10} lerpEase={0.05} isAbsolutelyPositioned >
                            <span id="cardc" className="float  hidden bg-lprimary gap-2 text-[0.6em] p-6 sm:flex flex-col place-items-center rounded-[0.8em] min-w-[30%] max-h-max text-main-w absolute right-[5%] bottom-[48%]">
                          <span className="flex gap-2 w-full">
                              <span>
                                You've applied to
                              </span>
                          
                            </span>
                            <span className="w-full font-black text-[2em] flex place-items-center justify-between">
                              <span >
                                10 jobs
                              </span>
                              <span className="  rounded-full  text-green-500/80"><CiCircleCheck size={30}/></span>
                            </span>
                            <span className="flex w-full text-main-w/50  gap-2">
                              <span>
                                Good job!
                              </span>
                            </span>
                          
                            </span></ScrollParallax>
       
                        </div>
        </>
    )
}