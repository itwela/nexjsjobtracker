'use client'

import { useEffect, useState } from 'react';
import { FaRegCopy } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { toast } from "sonner";
import { FaRightLong } from "react-icons/fa6";
import { EvervaultCard } from "../../components/ui/evervault-card";
import { FaRegMessage } from "react-icons/fa6";

// import { error } from 'console';


interface JobData {
  Company: string;
  coverLetters?: Array<{
    id: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    jobId: string;
  }>;
  DateApplied: string | null; // Update the type to string | null
  JobTitle: string;
  Keywords: string | null;
  Link: string;
  Referral: string;
  ReferralContact: string | null;
  ReferralName: string | null;
  ResumeUsed: string | null;
  Status: string | null;
  createdAt: Date;
  id: string;
  updatedAt: Date;
  userId: string;
}

type JobDataProps = {
  jobdata: JobData[];
}



export default function TopboxOne({jobdata}: any) {


  const [isGen, setIsGen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [theJId, setTheJId] = useState('')




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
          input: thanks,
          id: theJId
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

  const handleCopy = () => copyText();

      // Handle changes in status fields
      const handleSwap = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTheJId(value)
      };



  if(isGen == true && !isLoading ) {
    return (
    <>
      <span className=" w-[10em] sm:w-[20em] relative overflow-hidden bg-white   font-black  flex flex-col place-content-center nosb mx-auto rounded-[0.5em] relative h-full ">

        <span id="gen-text" className="nosb text-ellipsis py-[0.6em] h-[80%] px-[4em] w-full overflow-ellipsis overflow-y-scroll text-[0.6em] sm:text-[1em]">{data}</span>
        <FaRightLong size={36} onClick={handleBack} className="absolute scale-x-[-100%] bottom-0 left-1 cursor-pointer bg-white text-main-w/60  font-black p-2" />
        {/* Add an id to the copy button */}
        <FaRegCopy onClick={copyText} id="copy-button" size={36} className="absolute top-2 right-3 p-1 z-10 cursor-pointer text-main-w/60  bg-white rounded-[0.5em] hover: font-black p-2" />
      </span>

    </>
    )
    }

    if(isLoading == true) {
      return (
        <>
        <span className=" text-ellipsis relative overflow-hidden bg-white  font-black place-content-center flex flex-col place-items-center nosb mx-auto rounded-[0.5em] relative  w-[10em] sm:w-[20em] h-full ">

          <span className=" flex flex-col gap-2 py-[3em] h-[100%] w-[100%] place-items-center place-content-center">
           
          <FaRightLong size={36} onClick={handleBack} className="absolute scale-x-[-100%] bottom-0 left-0 cursor-pointer bg-white text-main-w/60  font-black p-2" />
           <span className="animate-pulse text-[0.6em] sm:text-[1em] nosb place-content-center flex text-clip h-[80%] w-[70%] place-content-center overflow-ellipsis  overflow-y-scroll">
                Intro Loading.....
            </span>

          </span>
        </span>

      </>
      )
      }

  return (


      <>
              <span className='w-[10em] sm:w-[20em] px-1 relative h-full'>
                <span  className="bg-blue-400 relative justify-evenly flex  text-white rounded-[0.5em] w-full h-full place-content-center place-items-center  mx-auto ">
                    <span className="w-[40%] h-[70%]  rounded-lg  flex place-items-center place-content-center">
                        <FaRegMessage className="w-[80%] h-[80%] bg-blue-300/50 rounded-lg p-3 "/>
                    </span>
                    <span className="flex flex-col gap-2 text-[0.6em] sm:text-[1em]  ">
                        <span>
                            Generate <br /> Introduction
                        </span>
                    </span>
                </span>
              </span>
        {/* <span className="bg-white  w-[10em] sm:w-[20em]  px-1  flex flex-col place-content-center place-items-center mx-auto rounded-[0.5em] relative min-h-[8em] sm:min-h-full ">

          <EvervaultCard text="" text2="" className=" text-[0.8em]  " />
          
          <span className='text-[0.6em] translate-y-[-30%] sm:text-[0.8em] absolute w-[80%] text-center flex flex-col gap-1 z-[10] place-items-center place-content-center '>
            <span className='  px-2'>Generate a introduction for</span>
                 
            <select onChange={handleSwap} id="status" className='rounded-[0.2em] px-2 py-1  w-full' name="status" required>
              <option value="">Choose a job</option>
              {jobdata.map((job) => (
                <>
                <option key={job.id} value={job.id}>
                      <span className="flex">
                        <span className="italic ">{job.Company} - </span></span>
                        <span>{job.JobTitle}</span> 
                </option>
                </>
                ))}
            </select>

            <span className='  px-2'>Using the power of Ai</span>
          
          </span>

            <button onClick={handlestate} className='absolute bottom-12 p-1 px-3 sm:p-2 sm:px-6 sm:mt-3 rounded-full bg-main-w/70 hover:bg-main-w text-lprimary'>Go</button>
        </span> */}
      </>

      


   
  );
  
}