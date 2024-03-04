'use client';

import { CardContent, CardDescription } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import { Card, CardHeader, Link } from "@nextui-org/react";
import { CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import gsap from 'gsap'

export default function HomeSectionFour() {
    const triggerRef = useRef(null);

    useGSAP(() => {

        const trigger = triggerRef.current;
    
        let tl3 = gsap.timeline({
          defaults: {ease: 'power2.out', duration: 0.8},
          scrollTrigger: {
            trigger: trigger,
            start: "top 60%",
            end: "top 5%",
            // scrub: true,
            // markers: true,
            toggleActions: 'restart none none reverse'
          },
        })
    
        tl3.from([
          "#pricing", 
          "#card1", 
          "#card2", 

          "#basic", 
          "#free", 
          "#getstart", 
          
          "#pro", 
          "#fif", 
          "#per", 
        ],{
          opacity: 0,
          y:'39',
          stagger: 0.218
        })
    
    
    
      })

    return (
        <>
        <section ref={triggerRef} className="  w-[100vw] bg-main-wgap-3  px-8 flex flex-col md:flex-row place-items-center place-content-center min-h-[100vh] sm:py-[10vh] ">


                <div className="min-h-[100vh] translate-y-[-5vh] sm:translate-y-[-0vh] w-[100vw] justify-evenly flex place-items-center place-content-center flex-col text-center gap-2">
                    
                    <div className="flex flex-col w-[70%]  text-dprimary gap-5 place-items-start">

                        <h1 id="pricing" className="text-left text-5xl text-dprimary pb-5">
                            Pricing
                        </h1>
                        <div className="flex flex-col sm:flex-row w-full gap-4 min-h-[30vh] sm:min-h-[50vh]">
                            <Card id="card1" className="rounded-[0.6em] border-main-w/40 hover:border-main-w/70  justify-evenly flex flex-col text-left p-6  w-[100%] sm:w-[50%] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                                <span id="basic" className="flex w-[100%] justify-between">   
                                    <CardHeader className="sm:text-3xl p-0 text-dprimary/60">Basic</CardHeader>
                                    <span className="w-[40%] sm:w-[20%] mb-3 outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-content-center">
                                            <span className="text-sm sm:text-md">
                                                Popular
                                            </span>
                                    </span>
                                </span>
                                <CardHeader id="free" className="sm:text-5xl p-0 text-dprimary">Free</CardHeader>
                                <CardDescription id="getstart" className="text-dprimary/70">Get started today for free</CardDescription>
                                <span className="w-[100%] h-[0.2em] my-1 bg-main-w/30"></span>
                                
                                <CardContent className="p-0">
                                    <span className="flex flex-col text-dprimary">
                                        <span className=""> Track up to 3 jobs</span>
                                        <span className=" "> Generate up to 3 cover letters</span>
                                        <span className=""> Generate  up to 3 job introduction messages</span>
                                    </span>
                                </CardContent>

                                <span className="w-[100%] h-[0.2em] my-1 bg-main-w/30"></span>
                {/* get started */}
                                <CardContent className="p-0 mt-2 w-[100%] flex place-content-center">
                                <Link
                                    href='/sign-up'>

                                    <span className="w-full mb-3 text-dprimary  outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 flex gap-2 place-content-center">

                                        <span>
                                        Get Started
                                        </span>
                                    </span>
                                    </Link>
                                </CardContent>
                            </Card>
                                

                            <Card id="card2" className="rounded-[0.6em] border-main-w/40 hover:border-main-w/70 justify-evenly flex flex-col text-left p-6  w-[100%] sm:w-[50%] bg-gradient-to-t from-blue-500 to-blue-200 backdrop-blur-lg bg-opacity-75">
                                <span className="flex w-[100%] justify-between">   
                                <CardHeader id="pro" className="text-xl sm:text-3xl p-0 ">Pro</CardHeader>
                                    <span className="opacity-0 w-[30%] mb-3 outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-content-center">
                                            <span>
                                            Recommended
                                            </span>
                                    </span>
                                </span>
                                <span className="flex">   
                                    <CardHeader id="fif" className="sm:text-5xl p-0 m-0  ">
                                        $15.00 
                                        <span id="per" className=" text-[0.2em] h-full"> / month</span>
                                    </CardHeader>
                                </span>
                                <CardDescription className="">For the serial job hunters</CardDescription>
                                <span className="w-[100%] h-[0.2em] my-1 bg-main-w/30"></span>
                                <CardContent className="p-0">
                                <span className="flex flex-col  ">
                                    <span className="">Track an unlimited amount of jobs</span>
                                    <span className=""> Generate unlimited cover letters</span>
                                    <span className=""> Generate unlimited job introduction messages</span>
                                </span>
                                </CardContent>
                                <span className="w-[100%] h-[0.2em] my-1 bg-main-w/30"></span>
                {/* get started */}
                                <CardContent className="p-0 mt-2 w-[100%] flex place-content-center">
                                <Link
                                    href='/sign-up'>

                                    <span className="w-full mb-3    outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-content-center">

                                        <span>
                                        Subscribe
                                        </span>
                                    </span>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>


                    </div>

                </div>

        </section>
        </>
    )
}