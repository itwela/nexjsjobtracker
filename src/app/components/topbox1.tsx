'use client'

import { useEffect, useState } from 'react';
import { FaRegCopy } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { toast } from "sonner";
import { EvervaultCard } from "../../components/ui/evervault-card";
// import { error } from 'console';






export default function TopboxOne() {
  const [isGen, setIsGen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  // Define the handlestate function outside the component
  const handlestate = async () => {
    setIsLoading(true);
    setIsGen(true);
    setData(null);
    const thanks = 'thank you!';
    try {
      
      const response = await fetch('/api/openai/intro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: thanks
        })
      });

      if(!response.ok) {
        
        toast("No jobs added!", {
          description: "You must add a job to use this feature.",
        });
        
      }

      const responseData = await response.json();
      setIsLoading(false);
      setData(responseData.text);
      toast("Success!: Introduction Generated!", {
        description: "Congratulations, you're one step closer to your next job!",
      });
      
    } catch(error) {
        console.error('Heres where you messed up:', error);
    }
  };

  const handleBack = async () =>{
    setIsGen(false)
    setIsLoading(false)
    setData(null);
  }

  // Define the copyText function outside the component
  const copyText = () => {
    const element = document.getElementById("gen-text");

    if (element instanceof HTMLSpanElement) {
      const textToCopy = element.innerText;

      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          toast("Success!: Introduction Copied", {
            description: "Congratulations, you're one step closer to your next job!",
          });
        })
        .catch(error => {
          console.error('Unable to copy text: ', error);
          toast("Error: Copying Failed", {
            description: "An error occurred while copying the introduction.",
          });
        });
    }
  };

  // Attach event listeners only on the client-side
    const handleCopy = () => copyText();
    // document.getElementById("copy-button")?.addEventListener("mouseup", handleCopy);



  if(isGen == true && !isLoading ) {
    return (
    <>
      <span className="border  hover:border-main-w/40 w-[80%] relative overflow-hidden bg-mprimary text-main-w font-black border-mprimary/[0.2] dark:border-white/[0.2] flex flex-col place-content-center nosb mx-auto rounded-[0.5em] relative h-[15vh] ">

        <span id="gen-text" className="nosb text-ellipsis py-[0.6em] h-[80%] px-[4em] w-full overflow-ellipsis overflow-y-scroll text-lg">{data}</span>
        <RiArrowGoBackFill size={40} onClick={handleBack} className="absolute bottom-0 left-1 cursor-pointer bg-mprimary text-main-w/60 hover:text-main-w font-black p-2" />
        {/* Add an id to the copy button */}
        <FaRegCopy onMouseDown={copyText} id="copy-button" size={36} className="absolute top-2 right-3 p-1 z-10 cursor-pointer text-main-w/60 hover:text-main-w bg-mprimary rounded-[0.5em] hover:text-main-w/70 font-black p-2" />
      </span>

    </>
    )
    }

    if(isLoading == true) {
      return (
        <>
        <span className="border hover:border-main-w/40 text-ellipsis relative overflow-hidden bg-mprimary text-lprimary font-black border-mprimary/[0.2] dark:border-white/[0.2] flex flex-col place-items-center nosb mx-auto rounded-[0.5em] relative w-[80%] h-[15vh] ">

          <span className=" flex flex-col gap-2 py-[3em] h-[100%] w-[100%] place-items-center place-content-center">
           
          <RiArrowGoBackFill size={40} onClick={handleBack} className="absolute bottom-0 left-0 cursor-pointer bg-mprimary text-main-w/60 hover:text-main-w font-black p-2" />
           <span className="animate-pulse nosb place-content-center flex text-clip h-[80%] w-[70%] place-content-center overflow-ellipsis text-blue-500/40 overflow-y-scroll">
                Intro Loading.....
            </span>

          </span>
        </span>

      </>
      )
      }

  return (


      <>
        <span onMouseUp={handlestate} className="border w-[80%] px-2 hover:border-main-w/60  border-main-w/[0.2] flex flex-col place-content-center mx-auto rounded-[0.5em] relative min-h-[8em] sm:min-h-[15vh] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75 ">

          <EvervaultCard text="Struggling to craft the perfect follow-up message?" text2=" Simply add a job and then click this box for a tailored message ready to send to a recruiter!" className="text-center text-main-w/70 hover:text-main-w" />
          <span className=' absolute bottom-2 left-2 z-10 flex place-items-end place-content-start'>
          </span>
        </span>
      </>

      


   
  );
  
}