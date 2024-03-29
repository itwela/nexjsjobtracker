'use client'

import { useEffect, useState } from 'react';
import { FaRegCopy } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { toast } from "sonner";
import { FaRightLong } from "react-icons/fa6";
import { EvervaultCard } from "../../components/ui/evervault-card";
import { FaRegMessage } from "react-icons/fa6";
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { WiStars } from "react-icons/wi";
import AiBadge from './aibadge';

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



export default function MenuIntroModalC({jobdata, menuModalOpen, handleMenuModalClose}: {jobdata: any; menuModalOpen: any; handleMenuModalClose: any}) {


  const [isGen, setIsGen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [theJId, setTheJId] = useState('')

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    maxWidth: 400,
    height: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    border: "none",
    p: 2,
  };




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




  return (


      <>
              <Modal
        open={menuModalOpen}
        onClose={handleMenuModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=''
      >
        <Box sx={style}>
        
        {isLoading == false && isGen == false && (  
          <span className="bg-white  w-full h-full  px-1  flex flex-col place-content-center place-items-center mx-auto rounded-lg relative  ">

            {/* <EvervaultCard text="" text2="" className=" text-[0.8em]  " /> */}
            
              <span className='flex flex-col w-full h-full gap-2 justify-between py-6'>
                  <span className='w-full flex flex-col gap-2'>
                    <span className='w-full flex place-items-end place-content-end '>
                      <AiBadge/>
                    </span>
                  </span>
                      
                  <span className='w-full flex flex-col gap-2'>
                    <span className='font-bold w-full  px-2'>Generate a introduction for</span>
                    <select onChange={handleSwap} id="status" className='rounded-[0.2em] px-2 py-1  w-full' name="status" required>
                      <option value="">Choose a job</option>
                      {jobdata.map((job: any) => (
                        <>
                        <option key={job.id} value={job.id}>
                              <span className="flex">
                                <span className="italic ">{job.Company} - </span></span>
                                <span>{job.JobTitle}</span>
                        </option>
                        </>
                        ))}
                    </select>
                    <button onClick={handlestate} className='w-[60%] flex place-self-center p-1 px-3 sm:p-2 sm:px-6 sm:mt-3 rounded-full bg-blue-300 hover:bg-blue-500 text-white place-content-center'>Go</button>
                  </span>

                  <span className='w-full flex place-items-center place-content-end'>JobKompass</span>
              </span>

          </span>
        )}

        {isLoading != false && isGen != false && (
            <span className="bg-white  w-full h-full  px-1  flex flex-col place-content-center place-items-center mx-auto rounded-lg relative  ">
                <span className="animate-pulse">Your Introduction is Loading....</span>
            </span> 
        )}

        {isLoading == false && isGen != false && (
            <span className="bg-white  w-full h-full  px-1  flex flex-col place-content-center place-items-center mx-auto rounded-lg relative  ">
                    <span id="gen-text" className="nosb flex place-content-center place-items-center text-ellipsis h-[80%] px-[4em] w-full overflow-ellipsis overflow-y-scroll text-[0.6em] sm:text-[1em]">{data}</span>
                    <FaRightLong size={36} onClick={handleBack} className="absolute scale-x-[-100%] bottom-0 left-1 cursor-pointer bg-white   font-black p-2" />
                    <FaRegCopy onClick={copyText} id="copy-button" size={36} className="absolute top-2 right-3 p-1 z-10 cursor-pointer   bg-white rounded-[0.5em] hover: font-black p-2" />
            </span> 
        )}

        </Box>
              </Modal>
      </>
   
  );
  
}