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
import SecondHeaderS from "../components/S_secondHeader";
import { JobData } from "../types/JobTypes";
import GenResume from "../components/genresume";

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



export default function Dashboard( {jobdata, userdata}: any ) {
  const [formOpen, setFormOpen] = React.useState(false);
  const handleFormOpen = () => setFormOpen(!formOpen);
  const handleFormClose = () => setFormOpen(false);



    return (
      <>
    
              <div className="flex min-h-screen w-full">
  
                    <div className="flex bg-gray-200 min-h-[92vh] w-full justify-between pt-4  ">
                      
                     
                        
                      <div className="flex px-4 h-full w-full gap-4 flex-col col-start-2 col-span-10 place-items-center ">
                        <div className="w-full">
                          <div className="relative   flex flex-col gap-2   ">
                          
                            <span className="flex py-9 w-full justify-between place-items-center place-content-center">
                              {/* greetings, time */}
                              <span className="w-full justify-between h-max flex flex-col place-items-start gap-1">
                                <TopboxTwo />
                                <Clock userdata={userdata}/>
                              </span>
                              {/* add job button */}
                              <AddJobs formopen={formOpen} handleFormOpen={handleFormOpen} handleFormClose={handleFormClose} />
                            </span>
                            {/* generate stuff */}  
                            <span className="h-[15vh] my-5 overflow-x-scroll w-full ">
                              <span className="w-max flex gap-2 h-full">
                                  <GenResume/>
                                  <YourCoverLetter/>
                                    <TopboxOne jobdata={jobdata} />
                                  <ComingSoon/>
                              </span>
                            </span>
                          </div>
                          {/* add job form */}
                          <AddJobForm formopen={formOpen} handleClose={handleFormClose}/>
                        </div>

                        {/* job table */}
                        <div className="relative flex pb-9 w-full justify-between place-items-center place-content-center">
                          <JobsTable jobdata={jobdata} />
                        </div>
                      </div>
  
  
                      
                    </div>
  
              </div>
                  
      </>
    );



};

