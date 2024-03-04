'use client'

import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { ScrollParallax } from "react-just-parallax";
import { CiCircleCheck } from "react-icons/ci";
import BgGradJk from "./assets/svgs";
import bg from './assets/bgmap.png'
import { Card, CardContent } from "@/components/ui/card";

export default function FirstComponent() {
    return (
        <>
      
          <div className="">

                    
                    <div className="w-full overflow-hiddden relative bg h-[100vh] place-items-center place-content-center justify-evenly flex flex-col text-center gap-2">
                          

                          <span className="max-w-[80%] flex flex-col place-items-start">
                          <ScrollParallax>
                              <span id='pbai' className="text-main-w mb-6 max-w-max scale-[70%] sm:scale-[100%]  mb-2 bg-gradient-to-r from-blue-400  to-transparent outline outline-[0px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                                  <span>
                                    <BsStars/>
                                  </span>
                                  <span>
                                    Powered by Ai
                                  </span>
                              </span>
                            </ScrollParallax>

                            <div className="flex flex-col w-full place-items-center place-content-center gap-2">
                              <h2 id="optimize" className="text-5xl sm:text-7xl text-main-w ">
                                Optimize your job search today.
                              </h2>
                              <Link
                              href='/sign-up'>
                                <button id="herogsb" className="mt-4 z-[10] text-dprimary bg-main-w p-3 px-4 rounded-full shadow-outline-white">
                                  Try JobKmpass
                                </button>
                              </Link>
                            </div>
                          </span>
                     

                            <span className="h-[30vh] max-w-max">
                              <Card id="cardpic" className="hidden md:flex   border-main-w/40  h-[200em] w-[80vw] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                                  <CardContent>
                              
                              
                                  <div  className="homeimg w-full h-full absolute left-0" >
                                  </div>
                                  </CardContent>
                              </Card>
                            </span>

                    </div>

              </div>
        </>
    )
}