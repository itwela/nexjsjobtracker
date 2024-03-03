
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



export default async function Dashboard() {

  const user = await currentUser()
  // const userdata = await getUserData(user?.id as string)
  const jobdata = await getJobData(user?.id as string)
  // const subscriptiondata = await getSubscriptionData(user?.id as string)


  return (
    <>

          <div className="dashwrapper  flex  text-main-w">
                  {/* <div className="gradi  w-[100vw] flex place-items-center flex-col"> */}

            <div className="hidden md:flex min-h-screen   w-[100vw] ">
              
              
              <ResizablePanelGroup
                direction="horizontal"
                className="bg-gradient-to-b from-dprimary to-mprimary"
              >
                <ResizablePanel className="bg-dprimary"  defaultSize={20}>
                  
                  <div className="hidden md:flex md:w-[20vw] bg-dprimary relative">
                    <SecondHeader  />
                  </div>

                </ResizablePanel>

                <ResizableHandle  withHandle />

                <ResizablePanel className="min-w-[80vw]" defaultSize={80}>
                  

                  <div className="flex flex-col min-h-[92vh] min-w-[80vw] place-items-center place-content-start  gap-5 pb-5">

                    <Header />

                      
                    <div className="relative   px-4 min-w-[80vw]   h-full flex flex-col place-items-center gap-2">
                      <span className="w-full flex justify-between">
                        <Clock/>
                        <TopboxTwo />
                      </span>
                      <span className="w-[75vw] overflow-scroll flex place-items-start place-content-start">
                        <span className="flex gap-2 px-9">
                          <YourJobs/>
                          <TopboxOne />
                          <YourCoverLetter/>
                          <ComingSoon/>
                        </span>
                      </span>
                    </div>

                    <div className="relative flex   justify-between place-items-center">
                      <AddJobs />
                    </div>

                    <div className="relative flex pb-9 w-[80vw]  justify-between place-items-center place-content-center">
                      <JobsTable jobdata={jobdata} />
                    </div>


                    

                  </div>


                </ResizablePanel>

              </ResizablePanelGroup>




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

                    <Header />

                      
                    <div className="relative   px-4 w-[80vw]   h-full flex flex-col place-items-center gap-2">
                        <span className="w-full flex justify-between">
                          <Clock/>
                          <TopboxTwo />
                        </span>
                            <span className="w-[80vw] overflow-scroll flex place-items-start place-content-start">
                            <span className="flex gap-2 px-9">
                              <YourJobs/>
                              <TopboxOne />
                              <YourCoverLetter/>
                              <ComingSoon/>
                            </span>
                          </span>
                        </div>

                    <div className="relative flex   justify-between place-items-center">
                      <AddJobs />
                    </div>

                    <div className="relative flex pb-9 w-[80vw] px-4  justify-between place-items-center place-content-center">
                      <JobsTable jobdata={jobdata}/>
                    </div>


                    

                  </div>

                </ResizablePanel>

              </ResizablePanelGroup>




            </div>

          </div>
    </>
  );
};

