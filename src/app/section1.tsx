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
import React from "react";
import TextTransition, { presets } from 'react-text-transition';
import Marquee from "react-fast-marquee";
import jk1 from './assets/jkv21.png'
import jk2 from './assets/jkv22.png'

const TEXTS = ['Graduates', 'Job Seekers', 'Professionals', 'Students'];


export default function FirstComponent() {

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <>

      <div className="w-full flex flex-col place-items-start h-[40%]">

        <span className="flex flex-col gap-2 place-items-start w-full sm:w-[70%] ">
          <span className="font-bold text-4xl w-full sm:w-[60%] h-max">
            Finally, a <br /> job tracking tool built
            <span className="flex gap-2">for
                <TextTransition className=" text-blue-600" springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>.
            </span>
          </span>
          
          <span className="text-slate-400">Gain insights into your job application performance, including application 
          success rates
          ,
          interview conversion rates
          , and 
          areas for improvement
          .</span>
          <Link className="my-3" href="/sign-up"><button className="bg-gradient-to-r from-blue-500 to-blue-200 px-5 py-2 rounded-lg text-white">Get Started</button></Link>
        </span>

      </div>
      <div className="w-full h-[60vh] sm:p-5 overflow-hidden">
        {/* fast marquee */}
        <div className="w-full h-full scale-[138%]">
          <Marquee className="h-full overflow-hidden">
            {/* <img className="h-full w-full px-2" src="https://images.pexels.com/photos/9800033/pexels-photo-9800033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <img className="h-full w-full px-2" src={jk2.src} alt="" />
            <img className="h-full w-full px-2" src="https://images.pexels.com/photos/5992553/pexels-photo-5992553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <img className="h-full w-full px-2" src={jk1.src} alt="" />
            <img className="h-full w-full px-2" src="https://images.pexels.com/photos/17428121/pexels-photo-17428121/free-photo-of-cup-of-milk-by-airpods-case-on-book.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <img className="h-full w-full px-2" src="https://images.pexels.com/photos/1376696/pexels-photo-1376696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
            <div className="w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-500  rounded-lg mx-1 overflow-hidden">
              <img className="h-full w-full object-cover" src="https://images.pexels.com/photos/9800033/pexels-photo-9800033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
            <div className="hover:scale-105 transition-all duration-300 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-500 rounded-lg mx-1 overflow-hidden">
              <img className="h-full w-full object-cover" src={jk2.src} alt="" />
            </div>
            <div className="w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-500  rounded-lg mx-1 overflow-hidden">
              <img className="h-full w-full object-cover" src="https://images.pexels.com/photos/5992553/pexels-photo-5992553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
            <div className="hover:scale-105 transition-all duration-300 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-500  rounded-lg mx-1 overflow-hidden">
              <img className="h-full w-full object-cover" src={jk1.src} alt="" />
            </div>
            <div className="w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-500  rounded-lg mx-1 overflow-hidden">
              <img className="h-full w-full object-cover" src="https://images.pexels.com/photos/17428121/pexels-photo-17428121/free-photo-of-cup-of-milk-by-airpods-case-on-book.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
            <div className="w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-500  rounded-lg mx-1 overflow-hidden">
              <img className="h-full w-full object-cover" src="https://images.pexels.com/photos/1376696/pexels-photo-1376696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
          </Marquee>
        </div>
      </div>

      {/* this for scrolling cards */}
      {/* https://javascript.plainenglish.io/stacking-cards-with-pure-css-and-a-dash-of-javascript-45e1647d471d */}


    </>
  )
}