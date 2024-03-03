'use client'

import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { ScrollParallax } from "react-just-parallax";

export default function FirstComponent() {
    return (
        <>
          <div className="w-[100vw]  translate-y-[-10vh] gap-3 max-w-7xl px-8 flex flex-col md:flex-row place-items-center place-content-center h-screen ">
                    
                    <div className="w-[100vw] h-[100vh] place-items-center place-content-center flex flex-col text-center gap-2">
                          
                          <span className="max-w-[80%] flex flex-col place-items-start">
                            <ScrollParallax>
                              <span id='pbai' className="mb-6 max-w-max scale-[70%] sm:scale-[100%]  mb-3 bg-gradient-to-r from-blue-400  to-transparent outline outline-[0px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
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
                        <button id="herogsb" className="mt-4 text-dprimary bg-main-w p-3 px-4 rounded-full shadow-outline-white">
                          Try JobKmpass
                        </button>

                          </Link>

                    </div>

              </div>
        </>
    )
}