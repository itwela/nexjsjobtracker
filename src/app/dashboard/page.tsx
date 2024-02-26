
import { AddJobs } from "../components/addJobs";
import Clock from "../components/clock";
import { Header } from "../components/header"; 
import JobsTable from "../components/jobsTableRender";
import SecondHeader from "../components/secondHeader";
import TopboxOne from "../components/topbox1";
import TopboxTwo from "../components/topbox2";
import { useState } from "react";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/app/libs/db";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

async function getUserData(userId: string) {
    noStore();
    const data = prisma.user.findUnique({
      where: {
        id: userId
      },
    });
    
    return data;
  }

async function getJobData(userId: string) {
    noStore();
    const data = prisma.job.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return data;
  }


  
  
  
  
  
  
  
  
  
  
  
  
  
 export default async function Dashboard()  {
    
    const user = await currentUser()
    const userdata = await getUserData(user?.id as string)
    const jobdata = await getJobData(user?.id as string)
  
    return (
      <>
      <div className="dashwrapper flex bg-backback-col text-main-w">

        <div className="flex min-h-screen   w-[100vw] min-h-screen">
          <ResizablePanelGroup
                direction="horizontal"
                className="h-full"
              >
                <ResizablePanel defaultSize={20}>
                      <div className="flex flex-col min-h-[92vh] justify-start gap-5 pb-5">
                          <SecondHeader/>   
                      </div>
                </ResizablePanel>

                <ResizableHandle withHandle />
               
                <ResizablePanel className="min-w-[80vw]" defaultSize={80}>
                    <div className="flex flex-col min-h-[92vh] min-w-[80vw] place-items-center place-content-center  gap-5 pb-5">
                        
                        <Header/>

                        <div className="relative w-full flex  justify-between place-items-center">    
                          <JobsTable jobdata={jobdata}/>
                        </div>   
                      
                        <div className="relative full px-4   h-[34vh] flex place-items-center gap-4">    
                          <Clock/>
                          <TopboxOne/>
                          <TopboxTwo/>
                        </div>        
                        
                            

                        <div className="relative flex  justify-between place-items-center">    
                          <AddJobs/>
                        </div> 

                      </div>
                </ResizablePanel>
              </ResizablePanelGroup>

           
            
           
        </div>
        </div>
      </>
    );
  };
  
