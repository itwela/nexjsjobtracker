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
         <section ref={triggerRef} className=" second-wrapper w-[100vw] overflow-hidden bg-mprimary  h-[100vh] ">


                <div className="hidden min-h-[100vh] w-[100vw] justify-evenly lg:flex place-items-center place-content-center flex-col text-center gap-2">
                    
                    <div className="flex flex-col w-[70%]  text-main-w gap-5 place-items-start">

                        <h1 id="pricing" className="text-left text-5xl pb-5">
                            Pricing
                        </h1>
                        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full justify-evenly  min-h-[70vh]">
                            <Card id="card1" className="float2 rounded-[2em] border-main-w/40 hover:border-main-w/70  justify-evenly flex flex-col place-items-center place-content-center p-6 px-[11%]  w-[100%] bg-lprimary">
                                <span id="basic" className="flex w-max justify-between">   
                                    <CardHeader className="sm:text-3xl w-max p-0 text-main-w/60">Basic</CardHeader>
                                    
                                </span>
                                <CardHeader id="free" className="sm:text-5xl p-0 text-main-w w-max">Free</CardHeader>
                                <CardDescription id="getstart" className="text-main-w/70">Get started today for free</CardDescription>
                                
                               

                {/* get started */}
                                <CardContent className="p-0 mt-2 w-[100%] flex place-content-center">
                                <Link
                                    href='/sign-up'>

                                    <span className="w-full mb-3 text-main-w  outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 flex gap-2 place-content-center">

                                        <span>
                                        Get Started
                                        </span>
                                    </span>
                                    </Link>
                                </CardContent>
                            </Card>
                            <Card id="card1" className="float col-start-2 rounded-[2em] border-main-w/40 hover:border-main-w/70  justify-evenly flex flex-col text-left p-6 px-[11%]   bg-dprimary">
                                <CardContent className="p-0 relative text-sm">
                                    <span className="flex flex-col text-main-w">
                                        <span className=""> Track up to 3 jobs</span>
                                        <span className=" "> Generate up to 3 cover letters</span>
                                        <span className=""> Generate  up to 3 job introduction messages</span>
                                    </span>
                                </CardContent>
                                <span className="w-[5%] h-[5%] absolute bg-lprimary z-[3]  rounded-full  left-4 top-5"></span>    
                                <span className="w-[5%] h-[5%] absolute bg-lprimary z-[3]  rounded-full  left-4 top-[12%]"></span>    

                            
                            </Card>
                                
                            <Card id="card1" className="float row-start-2 rounded-[2em] border-main-w/40 hover:border-main-w/70  justify-evenly flex flex-col text-left p-6 px-[11%]   bg-dprimary">
                            <CardContent className="p-0 relative text-sm">
                                <span className="flex flex-col  ">
                                    <span className="">Track an unlimited amount of jobs</span>
                                    <span className=""> Generate unlimited cover letters</span>
                                    <span className=""> Generate unlimited job introduction messages</span>
                                </span>
                                </CardContent>
                                <span className="w-[5%] h-[5%] absolute bg-blue-500 z-[3] rounded-full  right-4 top-5"></span>    
                                <span className="w-[5%] h-[5%] absolute bg-blue-500 z-[3] rounded-full  right-4 top-[12%]"></span>    


                            </Card>
                            <Card id="card2" className="float2 col-start-2 row-start-2 rounded-[2em] border-main-w/40 hover:border-main-w/70 justify-evenly flex flex-col place-items-center place-content-center p-6 px-[11%]  w-[100%]  bg-blue-500">
                                <span className="flex w-max justify-between">   
                                <CardHeader id="pro" className="text-xl sm:text-3xl p-0 ">Pro</CardHeader>
                                   
                                </span>
                                <span className="flex w-max">   
                                    <CardHeader id="fif" className="sm:text-5xl p-0 m-0 w-max  ">
                                        $15.00 
                                        <span id="per" className=" text-[0.2em] h-full"> / month</span>
                                    </CardHeader>
                                </span>
                                <CardDescription className="">For the serial job hunters</CardDescription>

                                

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

{/* ------------------ medium screen */}
                <div className="hidden min-h-[100vh] w-[100vw] justify-evenly sm:flex place-items-center place-content-center flex-col text-center gap-2">
                    
                    <div className="flex flex-col w-[70%]  text-main-w gap-5 place-items-start">

                        <h1 id="pricing" className="text-left text-5xl pb-5">
                            Pricing
                        </h1>

                        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full justify-evenly min-h-[70vh]">
                            
                            <Card id="card1" className="rounded-[2em] border-main-w/40 hover:border-main-w/70 place-content-center place-items-center flex flex-col text-center gap-2 p-6 px-[11%]   bg-lprimary">
                                
                                <span id="basic" className="flex w-max">   
                                    <CardHeader className="text-xl p-0 text-main-w/60">Basic</CardHeader>              
                                </span>
                                <CardHeader id="free" className="text-2xl p-0 text-main-w w-max">Free</CardHeader>
                                <CardDescription id="getstart" className="text-main-w/70">Get started today for free</CardDescription>
                                <CardContent className="p-0 mt-2 w-[100%] flex place-content-center">
                                <Link
                                    href='/sign-up'>

                                    <span className="w-full mb-3 text-main-w  outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 flex gap-2 place-content-center">

                                        <span>
                                        Get Started
                                        </span>
                                    </span>
                                    </Link>
                                </CardContent>
                          
                            </Card>
                            <Card id="card1" className="col-start-2 rounded-[2em] border-main-w/40 hover:border-main-w/70  justify-evenly flex flex-col text-left p-6 px-[11%]   bg-dprimary">
                                <CardContent className="p-0 relative text-sm">
                                    <span className="flex flex-col text-main-w">
                                        <span className=""> Track up to 3 jobs</span>
                                        <span className=" "> Generate up to 3 cover letters</span>
                                        <span className=""> Generate  up to 3 job introduction messages</span>
                                    </span>
                                </CardContent>
                                <span className="w-[5%] h-[5%] absolute bg-lprimary z-[3]  rounded-full  left-4 top-5"></span>    
                                <span className="w-[5%] h-[5%] absolute bg-lprimary z-[3]  rounded-full  left-[11%] top-5"></span>    
                                <span className="w-[5%] h-[5%] absolute bg-lprimary z-[3]  rounded-full  left-4 top-[12%]"></span>    

                            
                            </Card>

                            {/* row 2 */}

                            <Card id="card1" className="row-start-2 rounded-[2em] border-main-w/40 hover:border-main-w/70  justify-evenly flex flex-col text-left p-6 px-[11%]   bg-dprimary">
                            <CardContent className="p-0 relative text-sm">
                                <span className="flex flex-col  ">
                                    <span className="">Track an unlimited amount of jobs</span>
                                    <span className=""> Generate unlimited cover letters</span>
                                    <span className=""> Generate unlimited job introduction messages</span>
                                </span>
                                </CardContent>
                                <span className="w-[5%] h-[5%] absolute bg-blue-500 z-[3] rounded-full  right-4 top-5"></span>    
                                <span className="w-[5%] h-[5%] absolute bg-blue-500 z-[3] rounded-full  right-[11%] top-5"></span>    
                                <span className="w-[5%] h-[5%] absolute bg-blue-500 z-[3] rounded-full  right-4 top-[12%]"></span>    


                            </Card>
                            <Card id="card2" className=" col-start-2 row-start-2 rounded-[2em] border-main-w/40 hover:border-main-w/70 place-content-center place-items-center text-left p-6 px-[11%]  bg-blue-500">
                                <CardHeader id="pro" className="text-2xl p-0 w-max">Pro</CardHeader>
                                
                                
                                <span className="flex">   
                                    <CardHeader id="fif" className="text-2xl p-0 m-0  ">
                                        $15.00 
                                        <span id="per" className=" text-[0.7em] h-full"> / month</span>
                                    </CardHeader>
                                </span>
                                <CardDescription className="">For the serial job hunters</CardDescription>

                                <CardContent className="p-0  mt-2 w-[100%] flex place-content-center">
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

{/* ------------------ small screen */}
                <div className="min-h-[100vh] w-[100vw] justify-evenly sm:hidden place-items-center place-content-center flex-col text-center gap-2">
                    
                    <div className="flex flex-col w-[100%] py-5 px-7  text-main-w gap-5">

                        <h1 id="pricing" className="text-left text-5xl pb-5">
                            Pricing
                        </h1>

                        <div className="grid grid-cols-1 grid-rows-2 gap-4 w-full justify-evenly min-h-[70vh]">
                            
                            <Card id="card1" className="rounded-[2em] border-main-w/40 hover:border-main-w/70 place-content-center place-items-center flex flex-col text-center gap-2 p-6 px-[11%]   bg-lprimary">
                                
                                <span id="basic" className="flex w-max">   
                                    <CardHeader className="text-xl p-0 text-main-w/60">Basic</CardHeader>              
                                </span>
                                <CardHeader id="free" className="text-2xl p-0 text-main-w w-max">Free</CardHeader>
                                <CardDescription id="getstart" className="text-main-w/70">Get started today for free</CardDescription>
                                <CardContent className="p-0 mt-2 w-[100%] flex place-content-center">
                                <Link
                                    href='/sign-up'>

                                    <span className="w-full mb-3 text-main-w  outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 flex gap-2 place-content-center">

                                        <span>
                                        Get Started
                                        </span>
                                    </span>
                                    </Link>
                                </CardContent>
                          
                            </Card>

                            <Card id="card2" className=" rounded-[2em] border-main-w/40 hover:border-main-w/70 place-content-center place-items-center text-left p-6 px-[11%]  bg-blue-500">
                                <CardHeader id="pro" className="text-2xl p-0 w-max">Pro</CardHeader>
                                
                                
                                <span className="flex">   
                                    <CardHeader id="fif" className="text-2xl p-0 m-0  ">
                                        $15.00 
                                        <span id="per" className=" text-[0.7em] h-full"> / month</span>
                                    </CardHeader>
                                </span>
                                <CardDescription className="">For the serial job hunters</CardDescription>

                                <CardContent className="p-0  mt-2 w-[100%] flex place-content-center">
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