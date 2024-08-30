'use client'

import { CardContent, CardTitle } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import { Card } from "../components/ui/card";
import { useEffect, useRef, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { SlEnvolopeLetter } from "react-icons/sl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@mui/material";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import pricingimg from '../app/assets/pricingimg.png'


gsap.registerPlugin(ScrollTrigger);

export default function HeroSectionThree() {

  const styles = { 
    "display": 'flex', 
    "padding": '2em', 
    "flexDirection": 'column', 
    "": '', 
    "": '', 
    "": '', 
  } as React.CSSProperties;
  
    return(
        <>
           <div className="w-full flex flex-col gap-8 place-items-center min-h-[100vh]">
            <Badge className="select-none  outline outline-[1px] outline-blue-500 text-blue-500 px-5 py-2 rounded-lg font-black">Pricing</Badge>
            <h1 className="text-[4em] font-black ">Start for free, today!</h1>
            <div className="flex flex-col sm:flex-row place-content-center w-full sm:h-[70vh]">
              <Card style={styles} className="outline outline-[#3b82f6] gap-[1em] outline-[1px] h-full overflow-y-scroll text-[#3b82f6] w-[100%] md:w-[30%]">
                <CardTitle>Starter</CardTitle>
                <CardContent className="p-0 m-0 flex flex-col gap-2">
                  
                  <h1 className="text-[2em] font-black">$0</h1>
                  <h1 className="text-[1em]">Pay nothing, start tracking jobs today.</h1>
                  <Link className="my-3" href="/sign-up"><button className="outline outline-[#3b82f6] outline-[1px] px-5 py-2 rounded-lg hover:bg-blue-100">Get Started</button></Link>
                  
                  <div className="w-full h-[0.5px] bg-[#3b82f6]"></div>
                  
                  <div className="flex flex-col gap-4 my-4">
                    <div className="w-full flex place-items-center gap-4"><FaCheck/> Track up to three jobs</div>
                    <div className="w-full flex place-items-center gap-4"><FaCheck/> Generate and optimize resumes</div>
                    <div className="w-full flex place-items-center gap-4"><FaCheck/> Generate and optimize resumes</div>
                    <div className="w-full flex place-items-center gap-4"><FaCheck/> Email Support</div>
                    <div className="w-full flex place-items-center gap-4"><FaCheck/> AI document optimization</div>
                    <div className="w-full flex place-items-center gap-4"><FaCheck/> Job search performance metrics</div>
                  </div>

                </CardContent>
              </Card>
     
              <Card style={styles} className="outline outline-[#3b82f6] gap-[1em] outline-[1px] h-full overflow-y-scroll text-[#3b82f6] w-[100%] md:w-[30%]">
                <CardTitle>Pro</CardTitle>
                <CardContent className="p-0 m-0 flex flex-col gap-2">
                  
                  <span className="flex gap-2 place-items-center"><h1 className="text-[2em] font-black">$15 /</h1> <span className="text-[1em]">month</span></span>
                  <h1 className="text-[1em]">For the serial job hunter.</h1>
                  <Link className="my-3" href="/sign-up"><button className="outline outline-[#3b82f6] outline-[1px] px-5 py-2 rounded-lg hover:bg-blue-100">Get Started</button></Link>
                  
                  <div className="w-full h-[0.5px] bg-[#3b82f6]"></div>

                  <div className="flex flex-col gap-4 my-4">
                  <div className="w-full flex place-items-center gap-4"><FaCheck/> Track unlimited jobs</div>
                    <div className="w-full flex place-items-center gap-4"><FaCheck/> Generate and optimize resumes</div>
                    <div className="w-full flex place-items-center gap-4"><FaCheck/> Generate and optimize resumes</div>
                    <div className="w-full flex place-items-center gap-4"><FaCheck/> Priority Support</div>
                    <div className="w-full flex place-items-center gap-4"><FaCheck/> AI document optimization</div>
                    <div className="w-full flex place-items-center gap-4"><FaCheck/> Job search performance metrics</div>
                  </div>

                </CardContent>
              </Card>

              <Card style={styles} className="outline  outline-white gap-[4em] sm:gap-[1em] outline-[1px] h-full overflow-y-scroll bg-blue-500 w-[100%] md:w-[30%]">
                <CardTitle className="text-white">Need even more features and capabilities for your specific needs?</CardTitle>
                <CardContent className="p-0 m-0 flex h-full flex-col relative gap-2">
                  
                  <Link className="my-3" href="/sign-up"><button className="bg-white px-5 py-2 rounded-lg">Contact Sales</button></Link>
                  
                  <div className="w-[300px] hidden sm:flex h-2/3 bg-white rounded-lg absolute bottom-10 left-0">
                    <img src={pricingimg.src} className="w-full h-full object-cover rounded-lg" alt="" />
                  </div>

                </CardContent>
              </Card>
            </div>
          </div>
        </>
    )
}