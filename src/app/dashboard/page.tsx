'use client'

import prisma from "@/app/libs/db";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import { AddJobs } from "../components/addJobs";
import { Header } from "../components/header";
import JobsTable from "../components/jobsTableRender";
import SecondHeader from "../components/secondHeader";
import TopboxOne from "../components/topbox1";
import TopboxTwo from "../components/topbox2";
import Clock from "../components/clock";
import { getJobData } from "@/actions/databaseAc";
import { Suspense } from "react";
import YourJobs from "../components/yourjobs";
import YourCoverLetter from "../components/yourcoverletter";
import ComingSoon from "../components/comingsoon";
import spin from '../assets/system-solid-18-autorenew.gif'
import AddJobForm from "../components/addJobForm";
import React from "react";

// async function getUserData(userId: string) {
//   noStore();
//   const data = prisma.user.findUnique({
//     where: {
//       id: userId
//     },
//   });

//   return data;
// }

// async function getJobData(userId: string) {
//   noStore();
//   const data = prisma.job.findMany({
//     where: {
//       userId: userId
//     },
//     include: {
//       CoverLetter: true
//     },
//     orderBy: {
//       createdAt: 'desc'
//     }
//   });

//   return data;
// }

// async function getSubscriptionData(userId: string) {
//   noStore();
//   const data = await prisma.subscription.findUnique({
//     where: {
//       userId: userId
//     },
//     select: {
//       status: true,
//       user: {
//         select: {
//           stripeCustomerId: true,
//         }
//       }
//     }

//   })
//   return data;
// }



export default function Dashboard({jobdata, userdata}: {jobdata: any, userdata: any}) {
  const [formOpen, setFormOpen] = React.useState(false);
  const handleFormOpen = () => setFormOpen(!formOpen);
  const handleFormClose = () => setFormOpen(false);

    return (
      <>
    
              <div className="hidden md:flex min-h-screen w-[100vw]">
  
                    <div className="grid grid-cols-5 grid-rows-1 bg-gray-200 min-h-[92vh] justify-content-start ">
                      
                      <div className="flex bg-dprimary relative">
                        <SecondHeader  />
                      </div>
                        
                      <div className="flex px-4 h-full w-full gap-4 flex-col col-start-2 col-span-5 place-items-center place-content-start">
                        <div className="relative   flex flex-col gap-2  w-full ">
                        
                          <span className="flex py-9 w-full justify-between place-items-center place-content-center">
                            {/* greetings, time */}
                            <span className="w-full justify-between h-max flex flex-col place-items-start gap-1">
                              <TopboxTwo />
                              <Clock userdata={userdata}/>
                            </span>
                            {/* add job button */}
                            <AddJobs handleFormOpen={handleFormOpen} handleFormClose={handleFormClose} />
                          </span>

                          {/* generate stuff */}
                          <span className="h-[15vh] overflow-x-scroll w-full ">
                            <span className="w-max flex  gap-2 h-full">
                                <YourCoverLetter/>
                                <TopboxOne jobdata={jobdata} />
                                {/* <YourJobs/> */}
                                <ComingSoon/>
                            </span>
                          </span>

                        </div>

                        {/* add job form */}
                        <AddJobForm formopen={formOpen} handleClose={handleFormClose}/>

                        {/* job table */}
                        <div className="relative flex pb-9 w-full justify-between place-items-center place-content-center">
                          <JobsTable jobdata={jobdata} />
                        </div>
                      </div>
  
  
                      
                    </div>
  
              </div>
                
              {/* mobile */}
              <div className="md:hidden  min-h-screen   w-[100vw] ">
                
                
                <ResizablePanelGroup
                  direction="horizontal"
                  className="bg-gradient-to-b from-dprimary to-mprimary"
                >
                  <SecondHeader  />
                  <ResizablePanel  defaultSize={0}>
                    {/* <div className="hidden md:w-[20vw] bg-dprimary relative">
                    </div> */}
                  </ResizablePanel>
  
                  <ResizableHandle  withHandle />
  
                  <ResizablePanel className="min-w-[80vw]" defaultSize={80}>
                    
                    <div className="flex flex-col min-h-[92vh] min-w-[80vw] place-items-center place-content-start  gap-5 pb-5">
    
                      
                      <div className="relative   px-4 w-[80vw]   h-full flex flex-col place-items-center gap-2">
                          <span className="w-full flex justify-between">
                            <Clock userdata={userdata}/>
                            <TopboxTwo />
                          </span>
                              <span className="w-[80vw] overflow-scroll flex place-items-start place-content-start">
                              <span className="flex gap-2 px-9">
                                <YourJobs/>
                                <TopboxOne jobdata={jobdata} />
                                <YourCoverLetter/>
                                <ComingSoon/>
                              </span>
                            </span>
                          </div>
  
                      <div className="relative flex   justify-between place-items-center">
                        <AddJobs  handleFormOpen={handleFormOpen} handleFormClose={handleFormClose}/>
                      </div>
  
                      <div className="relative flex pb-9 w-[80vw] px-4  justify-between place-items-center place-content-center">
                        <JobsTable jobdata={jobdata}/>
                      </div>
  
  
                      
  
                    </div>
  
                  </ResizablePanel>
  
                </ResizablePanelGroup>
  
  
  
  
              </div>
  
      </>
    );



};

