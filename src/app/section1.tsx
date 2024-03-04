'use client'

import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { ScrollParallax } from "react-just-parallax";
import { CiCircleCheck } from "react-icons/ci";


export default function FirstComponent() {
    return (
        <>
          <div className="w-[100vw]  translate-y-[-10vh] gap-3 max-w-7xl px-8 flex flex-col md:flex-row place-items-center place-content-center h-screen ">
                    
                    <div className="w-[100vw] h-[100vh] place-items-center place-content-center flex flex-col text-center gap-2">
                          
                          <span className="max-w-[80%] flex flex-col place-items-start">
                          <ScrollParallax>
                              <span id='pbai' className="mb-6 max-w-max scale-[70%] sm:scale-[100%]  mb-2 bg-gradient-to-r from-blue-400  to-transparent outline outline-[0px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                                  <span>
                                    <BsStars/>
                                  </span>
                                  <span>
                                    Powered by Ai
                                  </span>
                              </span>
                            </ScrollParallax>

                            <h2 id="optimize" className="text-5xl sm:text-7xl text-main-w ">
                              Optimize your job search today.
                            </h2>
                          </span>
                     
                            <Link
                            href='/sign-up'>
                              <button id="herogsb" className="mt-4 z-[10] text-dprimary bg-main-w p-3 px-4 rounded-full shadow-outline-white">
                                Try JobKmpass
                              </button>
                            </Link>

                        <ScrollParallax strength={0.10} lerpEase={0.05} isAbsolutelyPositioned zIndex={-1}>
                          <span id="cardc" className="float  hidden bg-main-w gap-2 text-[0.6em] p-6 sm:flex flex-col place-items-center rounded-[0.8em] min-w-[30%] max-h-max text-mprimary absolute right-[5%] top-[25%]">
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

                          <span className="flex w-full text-dprimary/50  gap-2">
                            <span>
                              Good job!  
                            </span>
                          </span>
                          
                        </span></ScrollParallax>

{/* ----------------------------------------------- */}
                        {/* <ScrollParallax strength={0.06} lerpEase={0.03} isAbsolutelyPositioned zIndex={-1}><span className="float hidden bg-main-w text-[0.6em] p-6 sm:flex flex-col gap-2 place-items-center rounded-[0.8em] min-w-[30%] max-h-max text-mprimary absolute left-[5%] bottom-[25%]">
                          
                          <span className="flex w-full gap-2">
                            <span>
                              You've applied to  
                            </span>

                         

                          </span>

                          <span className="w-full font-black text-[2em] flex place-items-center justify-between">
                            <span>
                              10 jobs
                            </span>
                            <span className="  rounded-full  text-green-500/80"><CiCircleCheck size={30}/></span>
                          </span>

                          <span className="flex w-full text-dprimary/50  gap-2">
                            <span>
                              Good job!  
                            </span>
                          </span>
                        
                        </span></ScrollParallax> */}


                    </div>


              </div>
        </>
    )
}