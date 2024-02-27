'use client'

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { EvervaultCard, Icon } from "../../components/ui/evervault-card";
import { GoStarFill } from "react-icons/go";
import { auth, currentUser } from "@clerk/nextjs";
import prisma from "../libs/db";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "sonner"
import { FaRegCompass } from "react-icons/fa";






export default function TopboxOne() {
  const [isGen, setIsGen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null); // State to hold response data

  const handlestate = async () => {
    setIsLoading(true);
    setIsGen(true);
    setData(null)
    const thanks = 'thank you!';
    const response = await fetch('/api/openai/intro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: thanks
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const responseData = await response.json(); // Get response data
      
      setIsLoading(false);

      setData(responseData.text); // Set response data to state

      toast("Success!: Introduction Generated!", {
        description: "Congratulations, you're one step closer to your next job!",
      });   


  };

  const backhandle = () => {
      setIsGen(false)
  }

  function copyText() {
    const element = document.getElementById("gen-text");
  
    if (element instanceof HTMLParagraphElement) {
      const textToCopy = element.innerText;
  
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          toast("Success!: Introduction Copied", {
            description: "Congratulations, you're one step closer to your next job!",
        });        
      })
        .catch(error => {
          console.error("Unable to copy text to clipboard: ", error);
        });
    }
  }
  

  return (
    <>
    {isGen && !isLoading && (
      <>
      <div className="border w-[80%]   relative   overflow-hidden bg-mprimary text-main-w font-black border-mprimary/[0.2] dark:border-white/[0.2] flex flex-col place-content-center  nosb   mx-auto rounded-[0.5em] relative  h-[95%] ">
        
        {/* Display response data */}
        <p id="gen-text" className="nosb text-ellipsis  py-[0.6em] h-[80%] px-[4em] w-full overflow-ellipsis overflow-y-scroll text-lg">{data}</p>
        <RiArrowGoBackFill size={40} onClick={backhandle} className="absolute bottom-0 left-3 cursor-pointer bg-mprimary text-main-w hover:bg-lprimary hover:text-mprimary/70 font-black p-2" />
        <FaRegCopy size={36} onMouseUp={copyText} className="absolute top-2 right-3 p-1 cursor-pointer text-main-w bg-mprimary rounded-[0.5em] hover:text-lprimary/70 font-black p-2" />
      </div>

      </>
      )}

      {!isGen && (
        <div className="border w-[100%]  px-2 py-2 border-main-w/[0.2] dark:border-white/[0.2] flex flex-col items-start  mx-auto rounded-[0.5em] relative  h-[95%] ">
          <GoStarFill className="absolute animate-spin-slow h-6 w-6 -top-3 -right-3 text-main-w" />
          
          <EvervaultCard text="Struggling to craft the perfect follow-up message?" text2=" Simply add a job and then click the compass for a tailored message ready to send to a recruiter!" className="text-center text-main-w" />
          <div className=' absolute bottom-2 left-2 z-10 flex place-items-end place-content-start'>
            <FaRegCompass size={40} className="text-main-w hover:text-main-w/60 font-black p-2 cursor-pointer"/>
          </div>
        </div>
      )}

      {isLoading && (
            <>
            <div className="border text-ellipsis relative   overflow-hidden bg-mprimary text-lprimary font-black border-mprimary/[0.2] dark:border-white/[0.2] flex flex-col place-items-center  nosb  max-w-sm mx-auto rounded-[0.5em] relative w-[50%] h-[95%] ">
              
              {/* Display loading data */}
              <div className="animate-pulse flex flex-col gap-2 py-[3em] h-[100%] w-[100%] place-items-center">
                  <p  className="nosb text-clip h-[20%] w-[70%] overflow-ellipsis bg-lprimary/30 overflow-y-scroll text-lg"/>
                  <p  className="nosb text-clip h-[10%] w-[70%]    overflow-ellipsis bg-lprimary/30 overflow-y-scroll text-lg"/>
                  <p  className="nosb text-clip h-[10%] w-[70%]    overflow-ellipsis bg-lprimary/30 overflow-y-scroll text-lg"/>
                  <p  className="nosb text-clip h-[10%] w-[70%]    overflow-ellipsis bg-lprimary/30 overflow-y-scroll text-lg"/>
                  
                  <p  className="nosb text-clip h-[20%] w-[70%] overflow-ellipsis bg-transparent overflow-y-scroll text-lg"/>
                  
                  <p  className="nosb text-clip h-[20%] w-[70%] overflow-ellipsis bg-lprimary/30 overflow-y-scroll text-lg"/>
                  <p  className="nosb text-clip h-[10%] w-[70%]    overflow-ellipsis bg-lprimary/30 overflow-y-scroll text-lg"/>
                  <p  className="nosb text-clip h-[10%] w-[70%]     overflow-ellipsis bg-lprimary/30 overflow-y-scroll text-lg"/>
                  <p  className="nosb text-clip h-[10%] w-[70%]    overflow-ellipsis bg-lprimary/30 overflow-y-scroll text-lg"/>

              </div>
              </div>

            </>
        )}
    </>
  );
}