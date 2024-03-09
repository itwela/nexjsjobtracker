'use client'

import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { ScrollParallax } from "react-just-parallax";
import { CiCircleCheck } from "react-icons/ci";
import BgGradJk from "./assets/svgs";
import bg from './assets/bgmap.png'
import { Card, CardContent } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";


export default function FirstComponent() {
   
  const handleAnim = () => {
    
  
      let tl = gsap.timeline({defaults: {ease: 'sine.out', duration: 0.3}})
      
  //  
  
      tl.from('#sectionwpadding', {
        paddingTop: '0',
        paddingLeft: '0',
        paddingRight: '0',
        paddingBottom: '0',
      }).from('#circlecont', {
        y: '200',
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      }).from(
        ['#black1', '#black2', '#black3',
        '#gsb', '#fasttrack', '#yjobs', '#learn',],
{
        xPercent: '-200',
        opacity: 0,
        duration: 1.2,
        stagger: 0.1
      })
      
  }

  useGSAP(() => {
    handleAnim();
  }, [])


  return (
        <>
      
          {/* lg screen */}
          <div className="hidden lg:block">

                    
                    <div className="w-[100vw] px-[1em] pt-[1em] pb-[4em] bg-dprimary overflow-hiddden relative bg h-[100vh]   flex flex-col text-center gap-2">


                        <div className=" rounded-[3em]  w-full h-[100%] ">
                            
                              
                              
                            <div className="relative  w-full h-full flex place-items-end justify-between pr-3">
                            
                            {/* large  ----------------- start*/}

                            {/* svg background */}
                              <svg className="flex opacity-70 rounded-[3vw]  z-[1] absolute w-full h-full" viewBox="0 0 1744 901" fill="none" preserveAspectRatio="xMidYMax slice" >
                                <defs>
                                  <clipPath id="maskPath">
                                  <path d="M0 0 L3935 0 L3935 3018 L0 2018 Z" fill="#D9D9D9" />                                  
                                  </clipPath>
                                </defs>
  
                                  <image className="w-full translate-y-[-50%]" xlinkHref="https://cdn.dribbble.com/users/1770290/screenshots/6144278/bg_74.gif" clipPath="url(#maskPath)" />
                              </svg>
                              
                              <div className="flex flex-col text-main-w  relative place-content-end relative z-[2] w-[60vw]   h-[40%]  ">          
                                  
                                  <div id="black1" className="flex place-items-center  place-content-start w-max pr-6 h-max pt-3 rounded-tr-[2em] bg-dprimary">
                                    <a href="/sign-up" className="w-full  h-full">
                                      <button id="gsb" className="text-[0.8vw] px-8 py-2 w-full h-full bg-blue-500 text-main-w rounded-lg">
                                        Get Started
                                      </button>
                                    </a>
                                  </div>
                                  
                                  <div id="black2" className="select-none overflow-hidden flex place-content-start place-items-center  w-[65%] h-[30%] rounded-tr-[2em] bg-dprimary">
                                    <h1 id='fasttrack' className="m-0 text-[6.7vw] pt-3">Fast-Track</h1>
                                  </div>

                                  <div id="black3" className="select-none text-left  flex place-content-start place-items-start  flex-col w-[100%] h-[40%] rounded-tr-[2em] bg-dprimary">
                                    <h1 id="yjobs" className="text-[4.5vw]">Your Job Search, Today</h1>
                                    <h2 id="learn" className="text-[1vw] w-[90%]">Learn from established developers, gain insights into your job application performance, including application success rates, interview conversion rates, and areas for improvement</h2>
                                  </div>
                              </div>

                              <div id='circlecont' className="flex float relative place-content-center place-items-end pb-[7vh] pr-3 relative z-[2] w-[40vw]   h-[60%]  ">
                                        
                                  <div className="w-[90%] bg-dprimary/60 p-[10%] h-max rounded-[2em]  text-main-w">
                                    
                                    <div className="flex select-none place-content-start place-items-start text-left w-full h-max flex-col  gap-3">
                                        <div className="text-blue-500 w-max text-[2.2vw] h-max flex place-items-center font-black  gap-4"><FaRegUser/> About us</div>
                                        <div className="w-full flex flex-col gap-3 justify-evenly h-max ">
                                          <span>
                                            JobKompass is a web app built due to frustration
                                            in finding a job in the software engineering market.
                                          </span>
                                          <span>
                                            If you have trouble keeping up with ANY kind of application or writing
                                            professional content that highlights your stregths, you have come to the
                                            right place!
                                          </span>
                                          <span className="text-[1.1vw] italic place-self-end opacity-[70%]">This is a open source project actively maintained by Itwela Ibomu.</span>
                                        </div>
                                    </div>
                                  
                                  </div>
                                        
                              </div>

                              


                            

                            {/* large  ----------------- end*/}


                            </div>

                        </div>
                    </div>

          </div>

          <div className="hidden sm:block lg:hidden">


            <div id="sectionwpadding" className="w-[100vw] px-[1em] pt-[1em] pb-[2em] bg-dprimary overflow-hiddden relative bg h-[100vh]   flex flex-col text-center gap-2">


              <div className=" rounded-[3em]  w-full h-[100%] ">


             
                <div className="relative  w-full h-full flex place-items-end justify-between pr-3">

                  {/* md  ----------------- start*/}

                  {/* svg background */}
                  <svg className="flex opacity-70  z-[1] absolute w-full h-full rounded-[2vw]" viewBox="0 0 1744 901" fill="none" preserveAspectRatio="xMidYMax slice" >
                    <defs>
                      <clipPath id="maskPath">
                        <path d="M0 0 L3935 0 L3935 3018 L0 2018 Z" fill="#D9D9D9" /> 
                      </clipPath>
                    </defs>

                    <image className="w-full translate-y-[-50%]" xlinkHref="https://cdn.dribbble.com/users/1770290/screenshots/6144278/bg_74.gif" clipPath="url(#maskPath)" />
                  </svg>

                  <div className="flex flex-col text-main-w  relative place-content-end relative z-[2] w-[60vw]   h-max ">

                    <div id="black1" className="flex place-items-center py-2  place-content-start w-max pr-6 h-max rounded-tr-[2em] bg-dprimary">
                      <a href="/sign-up" className="w-full  h-full">
                        <button id="gsb" className="text-[1.8vw] px-3 w-full h-full bg-blue-500 text-main-w rounded-lg">
                          Get Started
                        </button>
                      </a>
                    </div>

                    <div id="black2" className="select-none overflow-hidden flex place-content-start place-items-center  w-[65%] h-max rounded-tr-[2em] bg-dprimary ">
                      <h1 id='fasttrack' className="m-0 text-[6.7vw]">Fast-Track</h1>
                    </div>

                    <div id="black3" className="select-none text-left  flex place-content-center place-items-start  flex-col w-[90%] h-max py-2 rounded-tr-[2em] bg-dprimary">
                      <h1 id="yjobs" className="text-[4.1vw] pr-3">Your Job Search, Today</h1>
                      <h2 id="learn" className="text-[1.4vw] w-[90%]">Learn from established developers, gain insights into your job application performance, including application success rates, interview conversion rates, and areas for improvement</h2>
                    </div>
                  </div>

                  <div  className="flex  float relative place-content-center place-items-end pb-[5vh] pr-3 relative z-[2] w-[40vw]   h-[60%]  ">

                    <div id='circlecont' className="w-[99%] h-max rounded-[2em] bg-dprimary/60 text-main-w px-9 py-9 text-left">
                      <div className="text-blue-500 w-max text-[3vw] h-max  flex place-items-center place-content-start font-black pb-2 gap-3"><FaRegUser /> About us</div>
                      <div className="w-full  flex flex-col gap-3 justify-evenly h-full text-[1.5vw]  ">
                        <span>
                          JobKompass is a web app built due to frustration
                          in finding a job in the software engineering market.
                        </span>
                        <span>
                          If you have trouble keeping up with ANY kind of application or writing
                          professional content that highlights your stregths, you have come to the
                          right place!
                        </span>
                        <span className=" italic place-self-end opacity-[70%]">This is a open source project actively maintained by Itwela Ibomu.</span>
                      </div>

                    </div>


                  </div>






                  {/* medium  ----------------- end*/}


                </div>

              </div>

            </div>

          </div>

{/* --------------- small - start */}
          <div className="sm:hidden">


            <div className="w-[100vw] px-[0.5em] pt-[1em] pb-[1em] bg-dprimary overflow-hiddden relative bg h-[100vh]   flex flex-col text-center gap-2">


              <div className=" rounded-[3em]  w-full h-[100%] ">


                
                <div className="relative  w-full h-full flex place-items-end justify-between">

                  {/* small  ----------------- start*/}

                  {/* svg background */}
                  <svg className="flex  z-[1] top-0 absolute w-full h-full" viewBox="0 0 1744 901" fill="none" preserveAspectRatio="xMidYMax slice" >
                    <defs>
                      <clipPath id="maskPath">
                        <path d="M0 0 L3935 0 L3935 3018 L0 2018 Z" fill="#D9D9D9" />
                      </clipPath>
                    </defs>

                    <image className="w-full translate-y-[-50%]" xlinkHref="https://cdn.dribbble.com/users/1770290/screenshots/6144278/bg_74.gif" clipPath="url(#maskPath)" />
                  </svg>

                  <div className="flex flex-col text-main-w  relative place-content-end relative z-[2] w-[100%]   h-max  ">

                  <a href="/sign-up" className="w-max h-max mb-3 ml-2">
                        <button id="gsb" className="text-[4.8vw] px-4 py-2 w-full h-full bg-blue-500 text-main-w rounded-2xl">
                          Get Started
                        </button>
                      </a>

                    <div id="black2" className="select-none overflow-hidden flex place-content-start place-items-center  w-max pr-8 h-max rounded-tr-[2em] bg-dprimary">
                      <h1 id='fasttrack' className=" text-[10.7vw]">Fast-Track</h1>
                    </div>

                    <div id="black3" className="select-none text-left  flex place-content-center place-items-start  flex-col w-max pr-8 h-max py-2 rounded-tr-[2em] bg-dprimary">
                      <h1 id="yjobs" className="text-[7.5vw]">Your Job Search, Today</h1>
                    </div>

                    <div id='circlecont' className="flex py-2 pb-9  bg-dprimary relative place-content-center place-items-center  relative z-[2] w-[100%]   h-max  ">

                      <div className="w-[90%] h-max rounded-[2em] mt-2 bg-lprimary/60 text-main-w px-[3em] py-[3em] text-left">
                        <div className="text-blue-500 w-max text-[4vw] h-max  flex place-items-start place-content-start font-black  gap-2"><FaRegUser /> About us</div>
                        <div className="w-full  flex flex-col gap-2 justify-evenly h-full ">
                          <span>
                            JobKompass is a web app built due to frustration
                            in finding a job in the software engineering market.
                          </span>
                          <span>
                            If you have trouble keeping up with ANY kind of application or writing
                            professional content that highlights your stregths, you have come to the
                            right place!
                          </span>
                          <span className=" italic place-self-end opacity-[70%]">This is a open source project actively maintained by Itwela Ibomu.</span>
                        </div>

                      </div>

                    </div>

                  </div>







                  {/* small  ----------------- end*/}


                </div>

              </div>

            </div>

          </div>
        </>
    )
}