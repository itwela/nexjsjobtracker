
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

async function getSubscriptionData(userId: string) {
  noStore();
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        }
      }
    }

  })
  return data;
}












export default async function Dashboard() {

  const user = await currentUser()
  const userdata = await getUserData(user?.id as string)
  const jobdata = await getJobData(user?.id as string)
  const subscriptiondata = await getSubscriptionData(user?.id as string)

  // if(subscriptiondata?.status != 'active') {
  //   console.log('yooo')
  // }

  // if (!dbUser?.stripeCustomerId){
  //   return (
  //     <>
  //     <div className="dashwrapper flex bg-backback-col text-main-w">

  //       <div className="flex min-h-screen   w-[100vw] ">
  //         <ResizablePanelGroup
  //               direction="horizontal"
  //               className="h-full"
  //             >
  //               <ResizablePanel defaultSize={20}>
  //                     <div className="flex flex-col min-h-[92vh] justify-start gap-5 pb-5">
  //                         <SecondHeader subscription={dbUser}/>   
  //                     </div>
  //               </ResizablePanel>

  //               <ResizableHandle withHandle />

  //               <ResizablePanel className="min-w-[80vw]" defaultSize={80}>
  //                   <div className="flex flex-col min-h-[92vh] min-w-[80vw] place-items-center place-content-start  gap-5 pb-5">

  //                       <Header/>

  //                       <div className="relative h-[10vh]  px-4 min-w-[80vw] bg-red-   h-[34vh] flex flex-col place-items-center gap-4">    
  //                         {/* <Clock/> */}
  //                         <TopboxOne/>
  //                         <TopboxTwo/>
  //                       </div>      

  //                       <div className="relative flex  justify-between place-items-center place-content-center">    
  //                         <JobsTable jobdata={jobdata}/>
  //                       </div>   

  //                       {/* <div className="relative full px-4   h-[34vh] flex place-items-center gap-4">    
  //                         <Clock/>
  //                         <TopboxOne/>
  //                         <TopboxTwo/>
  //                       </div>         */}



  //                       <div className="relative flex  justify-between place-items-center">    
  //                         <AddJobs/>
  //                       </div> 

  //                     </div>
  //               </ResizablePanel>
  //             </ResizablePanelGroup>




  //       </div>
  //     </div>
  //     </>
  //   );
  // }

  // jkPRO

  return (
    <>
      <div className="dashwrapper flex  text-main-w">
              {/* <div className="gradi  w-[100vw] flex place-items-center flex-col"> */}

        <div className="flex min-h-screen   w-[100vw] ">
          
          
          <ResizablePanelGroup
            direction="horizontal"
            className="bg-gradient-to-b from-dprimary to-mprimary"
          >
            <ResizablePanel  defaultSize={20}>
            <div className="w-[20vw] bg-dprimary relative">
                <SecondHeader  />
              </div>
            </ResizablePanel>

            <ResizableHandle  withHandle />

            <ResizablePanel className="min-w-[80vw]" defaultSize={80}>
              <div className="flex flex-col min-h-[92vh] min-w-[80vw] place-items-center place-content-start  gap-5 pb-5">

                <Header />

                  
                <div className="relative   px-4 min-w-[80vw]   h-full flex flex-col place-items-center gap-2">
                  <TopboxOne />
                  <TopboxTwo />
                </div>

                <div className="relative flex   justify-between place-items-center">
                  <AddJobs />
                </div>

                <div className="relative flex pb-9  justify-between place-items-center place-content-center">
                  <JobsTable jobdata={jobdata} />
                </div>


                

              </div>
            </ResizablePanel>

          </ResizablePanelGroup>




        </div>
      </div>
    </>
  );
};

