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
  import { getCoverLetterData } from "@/actions/databaseAc";  
  import { getIntroductionData } from "@/actions/databaseAc";
  
  export default async function Mydocs ()  {
    noStore();
    auth();
    const user = await currentUser()
    const coverlData = await getCoverLetterData(user?.id as string)
    const introData = await getIntroductionData(user?.id as string)

    
  
    
    return (
        <>
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

                      <Accordion type="single" collapsible className="w-[100%] px-3">
                        <AccordionItem value="item-1" className="">
                          <AccordionTrigger>My Cover Letters</AccordionTrigger>
                          <AccordionContent className="rounded-[1em] overflow-hidden">
                              <div className="flex gap-5 justify-start w-[100%] h-[25vh] ">    
                                {coverlData.map((item: any) => (
                                    <div key={item.id} className="w-[100%] sm:w-[30%] h-[100%] p-5 border-main-w/40 hover:border-main-w/70   text-left  bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
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
                          <AccordionContent className="flex flex-col gap-3">
                          {introData.map((item: any) => (
                                    <div key={item.id} className="w-[100%] h-[10%] p-5 border-main-w/40 hover:border-main-w/70   text-left  bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                                            <p>
                                                {item.text}
                                            </p>
                                    </div>

                                ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
            </div>
  
            </div>
          </div>
        </>
      );
    };
    
