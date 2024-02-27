'use client'

import { useEffect, useState } from 'react';
import { FaRegCopy } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { toast } from "sonner";
import { EvervaultCard } from "../../components/ui/evervault-card";






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
  };

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
    document.getElementById("copy-button")?.addEventListener("mouseup", handleCopy);



  if(isGen == true && !isLoading ) {
    return (
    <>
      <span className="border w-[80%] relative overflow-hidden bg-mprimary text-main-w font-black border-mprimary/[0.2] dark:border-white/[0.2] flex flex-col place-content-center nosb mx-auto rounded-[0.5em] relative h-[15vh] ">

        <span id="gen-text" className="nosb text-ellipsis py-[0.6em] h-[80%] px-[4em] w-full overflow-ellipsis overflow-y-scroll text-lg">{data}</span>
        <RiArrowGoBackFill size={40} onClick={() => setIsGen(false)} className="absolute bottom-0 left-3 cursor-pointer bg-mprimary text-main-w hover:text-main-w/70 font-black p-2" />
        {/* Add an id to the copy button */}
        <FaRegCopy onMouseDown={copyText} id="copy-button" size={36} className="absolute top-2 right-3 p-1 z-10 cursor-pointer text-main-w bg-mprimary rounded-[0.5em] hover:text-main-w/70 font-black p-2" />
      </span>

    </>
    )
    }

    if(isLoading == true) {
      return (
        <>
        <span className="border text-ellipsis relative overflow-hidden bg-mprimary text-lprimary font-black border-mprimary/[0.2] dark:border-white/[0.2] flex flex-col place-items-center nosb mx-auto rounded-[0.5em] relative w-[80%] h-[15vh] ">

          <span className="animate-pulse flex flex-col gap-2 py-[3em] h-[100%] w-[100%] place-items-center">
            <span className="nosb text-clip h-[20%] w-[70%] overflow-ellipsis bg-main-w/40 overflow-y-scroll text-lg" />
            <span className="nosb text-clip h-[10%] w-[70%] overflow-ellipsis bg-main-w/40 overflow-y-scroll text-lg" />
            <span className="nosb text-clip h-[10%] w-[70%] overflow-ellipsis bg-main-w/40 overflow-y-scroll text-lg" />
            <span className="nosb text-clip h-[10%] w-[70%] overflow-ellipsis bg-main-w/40 overflow-y-scroll text-lg" />

            <span className="nosb text-clip h-[20%] w-[70%] overflow-ellipsis bg-transparent overflow-y-scroll text-lg" />

            <span className="nosb text-clip h-[20%] w-[70%] overflow-ellipsis bg-main-w/40 overflow-y-scroll text-lg" />
            <span className="nosb text-clip h-[10%] w-[70%] overflow-ellipsis bg-main-w/40 overflow-y-scroll text-lg" />
            <span className="nosb text-clip h-[10%] w-[70%] overflow-ellipsis bg-main-w/40 overflow-y-scroll text-lg" />
            <span className="nosb text-clip h-[10%] w-[70%] overflow-ellipsis bg-main-w/40 overflow-y-scroll text-lg" />

          </span>
        </span>

      </>
      )
      }

  return (


      <>
        <span onMouseUp={handlestate} className="border w-[80%] px-2 py-2 border-main-w/[0.2] dark:border-white/[0.2] flex flex-col items-start mx-auto rounded-[0.5em] relative h-[15vh] ">

          <EvervaultCard text="Struggling to craft the perfect follow-up message?" text2=" Simply add a job and then click this box for a tailored message ready to send to a recruiter!" className="text-center text-main-w" />
          <span className=' absolute bottom-2 left-2 z-10 flex place-items-end place-content-start'>
          </span>
        </span>
      </>

      


   
  );
  
}