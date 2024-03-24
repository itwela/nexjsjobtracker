import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Header } from "../components/header";
  import SecondHeader from "../components/secondHeader";
  import prisma from '../libs/db';
  import { auth, currentUser } from "@clerk/nextjs";
  import { unstable_noStore as noStore } from "next/cache";
  import { deleteCoverLetter, deleteIntroduction, getCoverLetterData, getJobData } from "@/actions/databaseAc";  
  import { getIntroductionData } from "@/actions/databaseAc";
//   import { toast } from "sonner";
// import { FaRegCopy } from "react-icons/fa";
import spin from '../assets/system-solid-18-autorenew.gif'
import { Suspense } from "react";
import Link from "next/link";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import SecondHeaderS from "../components/S_secondHeader";


  export default async function Mydocs ()  {
    noStore();
    auth();
    const user = await currentUser()
    const jobData = await getJobData()
    const coverlData = await getCoverLetterData()
    const introData = await getIntroductionData()


    
    return (
        <>
                   {/* <Suspense fallback={
        
        <div className='w-screen h-screen bg-gray-200  flex-col flex place-content-center place-items-center'>
          <span className="w-full  pb-5 flex place-items-center place-content-center">
            JobKompass
          </span>
          <span className="flex gap-3 place-items-center place-content-center">
          <p className=''>Data is loading, please wait a moment...</p>
          <img src={spin.src} alt="" className="w-[20px]"/>
          </span>
        </div>
      
      }> */}

        
        <div className="flex w-screen bg-gray-200 ">
          {/* drift */}
  
          <div className="sm:w-[20%] sm:flex">
          <SecondHeaderS/>
          </div>
  
          <div className="flex py-8 min-h-screen flex-col place-items-center  w-[100vw] md:w-[80vw] justify-items-start">
  
            <div className="pagewrapper  px-4   w-full">
  
                    <div className="flex flex-col w-[100%] py-5 gap-3">
                        <h1 className="text-4xl font-bold">My Documents</h1>
                        <h2 className="/50">Just in case you forgot to copy something, you can access it here!</h2>
                    </div>

                      <Accordion type="single" collapsible className=" px-3">
                        <AccordionItem value="item-1" className="">
                          <AccordionTrigger>My Cover Letters</AccordionTrigger>
                          
                          <AccordionContent className="rounded-[1em] ">
                              <div className="flex gap-5 justify-start h-[25vh] p-3 overflow-x-scroll  ">    
                              {coverlData.map((item: any) => (
                                  <div key={item.id} className="min-w-[80%] md:min-w-[40%] relative overflow-scroll p-5  text-left bg-white ">
                                         
                                           <div className="flex gap-2 absolute z-10 top-2 right-4">
                                          
                                            <form action={deleteCoverLetter}> 
                                              <input type="hidden" name="jobId" value={item.id} />
                                              <button  className="text-red-400/50 hover:text-yellow-300"><FaRegTrashCan size={18} type="submit" /></button>
                                            </form>

                                          </div>

                                          <p>
                                              {item.text}
                                          </p>
                                        </div>

                                    ))}
                              </div>
                          </AccordionContent>

                        </AccordionItem>

                        <AccordionItem value="item-2">
                          <AccordionTrigger>My Introductions</AccordionTrigger>
                          <AccordionContent className="">
                            <div className="flex gap-5 justify-start h-[25vh] p-3 overflow-x-scroll">
                                {/* Iterate over jobData and access coverLetters */}
                                
                              {introData.map((item: any) => (
                                  <div key={item.id} className="min-w-[80%] md:min-w-[40%] relative overflow-scroll p-5  text-left bg-white ">
                                         
                                           <div className="flex gap-2 absolute top-2 right-4">
                                          
                                            <form action={deleteIntroduction}> 
                                              <input type="hidden" name="coverId" value={item.id} />
                                              <button  className="text-red-400/50 hover:text-red-300"><FaRegTrashCan size={18} type="submit" /></button>
                                            </form>

                                          </div>

                                          <p>
                                              {item.text}
                                          </p>
                                        </div>

                                    ))}
                              </div>

                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
            </div>
  
            </div>
          </div>

          {/* </Suspense> */}
        </>
      );
    };
    
