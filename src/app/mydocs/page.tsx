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
  import { getCoverLetterData, getJobData } from "@/actions/databaseAc";  
  import { getIntroductionData } from "@/actions/databaseAc";
//   import { toast } from "sonner";
// import { FaRegCopy } from "react-icons/fa";
import spin from '../assets/system-solid-18-autorenew.gif'
import { Suspense } from "react";


  export default async function Mydocs ()  {
    noStore();
    auth();
    const user = await currentUser()
    const jobData = await getJobData(user?.id as string)
    const coverlData = await getCoverLetterData(user?.id as string)
    const introData = await getIntroductionData(user?.id as string)


    
    return (
        <>
                   <Suspense fallback={
        
        <div className='w-screen h-screen bg-gradient-to-b from-dprimary to-mprimary flex-col flex place-content-center place-items-center'>
          <span className="w-full text-main-w pb-5 flex place-items-center place-content-center">
            JobKompass
          </span>
          <span className="flex gap-3 place-items-center place-content-center">
          <p className='text-main-w'>Data is loading, please wait a moment...</p>
          <img src={spin.src} alt="" className="w-[20px]"/>
          </span>
        </div>
      
      }>

        
        <div className="flex bg-gradient-to-b from-dprimary to-mprimary">
          {/* drift */}
  
          <div className="w-[0vw] md:w-[20vw] sm:flex">
          <SecondHeader/>
          </div>
  
          <div className="flex  min-h-screen flex-col place-items-center  w-[100vw] md:w-[80vw] px-6 justify-items-start">
            <Header/>
  
            <div className="pagewrapper  px-4 text-main-w  w-[100vw] sm:w-[80vw]">
  
                    <div className="flex flex-col w-[100%] py-5 gap-3">
                        <h1 className="text-4xl font-bold">My Documents</h1>
                        <h2 className="text-main-w/50">Just in case you forgot to copy something, you can access it here!</h2>
                    </div>

                      <Accordion type="single" collapsible className=" px-3">
                        <AccordionItem value="item-1" className="">
                          <AccordionTrigger>My Cover Letters</AccordionTrigger>
                          <AccordionContent className="rounded-[1em] ">
                              <div className="flex gap-5 justify-start h-[25vh] p-3 overflow-x-scroll ">    
                              {jobData
                                    // Filter jobs with cover letters   
                                    .filter((job: any) => job.coverLetters && job.coverLetters.length > 0)
                                    // Map over filtered jobs
                                    .map((job: any) => (
                                      <div
                                        key={job.id}
                                        className="min-w-[40%] relative overflow-scroll p-5  text-left bg-mprimary"
                                      >

                                        {/* Render job details */}
                                        <span className="flex flex-col md:flex-row gap-2 w-full justify-between py-4">
                                          <p>
                                            {job.JobTitle}, <span className="text-main-w/60">{job.Company}</span>
                                          </p>
                                          <p className="absolute top-2 right-4">{job.DateApplied}</p>
                                        </span>
                                        {/* Map over cover letters */}
                                        {job.coverLetters.map((coverLetter: any) => (
                                          <p className="text-main-w/60" key={coverLetter.id}>
                                            {coverLetter.text}
                                          </p>
                                        ))}
                                      </div>
                                    ))}    

                                </div>   
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>My Introductions</AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-3">
                                   <div className="flex gap-5 justify-start w-[100%] h-[25vh] p-3 ">
                                {/* Iterate over jobData and access coverLetters */}
                                
                              {introData.map((item: any) => (
                                        <div key={item.id} className="w-[100%] h-max  p-5 text-left  bg-mprimary">
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

          </Suspense>
        </>
      );
    };
    
