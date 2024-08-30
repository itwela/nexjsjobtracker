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
import { Badge } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSectionTwo() {


  useGSAP(() => {


  })

    
    return(
        <>
           <div className="w-full flex flex-col place-items-center h-[100vh]">
            <Badge className="select-none outline outline-[1px] outline-blue-500 text-blue-500 px-5 py-2 rounded-lg font-black">Features</Badge>
          </div>
        </>
    )
}