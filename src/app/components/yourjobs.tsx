import { getJobData } from "@/actions/databaseAc";
import { auth, currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

// export default async function YourJobs() {

//     noStore();
//     auth();
//     const user = await currentUser()
//     const jobdata = await getJobData()
    
//     // Filter jobs
//     const appliedJobs = jobdata.filter((job) => job.Status === "Applied");
//     const interestedJobs = jobdata.filter((job) => job.Status === "Interested");
//     const interviewingJobs = jobdata.filter((job) => job.Status === "Interviewing");
//     const offerJobs = jobdata.filter((job) => job.Status === "Offer");
//     const rejectedJobs = jobdata.filter((job) => job.Status === "Rejected");
//     const ghostedJobs = jobdata.filter((job) => job.Status === "Ghosted");

//     // Get the count of applied jobs
//     const appliedJobsCount = appliedJobs.length;
//     const interestedJobsCount = interestedJobs.length;
//     const interviewingJobsCount = interviewingJobs.length;
//     const offerJobsCount = offerJobs.length;
//     const rejectedJobsCount = rejectedJobs.length;
//     const ghostedJobsCOunt = ghostedJobs.length;

//     if(jobdata.length === 1) {

//         return (
    
    
//             <>
//             <div className="rounded-[0.5em] bg-white w-[10em] sm:w-[20em] px-1   flex flex-col place-content-center place-items-center mx-auto  relative min-h-[8em] sm:min-h-[28vh]">
//                 <span className="flex flex-col gap-2 text-center w-[90%] px-1 flex-col gap-1 text-[0.6em] sm:text-[1em] z-1 ">
//                     <span className="text-md sm:text-4xl  ">
//                         You tracked your first Job!
//                     </span> 

//                     <span className="text-[0.6em] sm:text-[0.8em]">
//                         {/* interested */}
//                             <span className="w-full  px-[0.3em]   flex justify-between">
//                                 <span>Interested:</span> {interestedJobsCount}
//                             </span>
//                             {/* Applied  */}
//                             <span className="w-full bg-blue-500/10 px-[0.3em]   flex justify-between">
//                                 <span>Applied:</span> {appliedJobsCount}
//                             </span>
//                             {/* Interviewing  */}
//                             <span className="w-full bg-yellow-500/10 px-[0.3em]   flex justify-between">
//                                 <span>Interviewing:</span> {interviewingJobsCount}
//                             </span>
//                             {/* Offer  */}
//                             <span className="w-full bg-green-500/10 px-[0.3em]   flex justify-between">
//                                 <span>Offer:</span> {offerJobsCount}
//                             </span>
//                             {/* Rejected  */}
//                             <span className="w-full bg-red-500/10 px-[0.3em]   flex justify-between">
                            
//                                  <span>Rejected:</span> {rejectedJobsCount}
//                             </span>
//                             {/* Ghosted  */}
//                             <span className="w-full bg-gray-500/10 px-[0.3em]   flex justify-between">
//                                 <span>Ghosted:</span> {ghostedJobsCOunt}
//                             </span>
//                     </span>  
//                 </span>
                
//                 <span className=' absolute bottom-2 left-2 z-10 flex place-items-end place-content-start'>
//                 </span>
//             </div>
//         </>
      
            
      
      
         
//         );

//     }

//     if(jobdata.length > 1) {
//         return (
        
        
//             <>
//                 <div className="rounded-[0.5em] bg-white w-[10em] sm:w-[20em] px-1   flex flex-col place-content-center place-items-center mx-auto  relative h-full">
//                     <span className="flex flex-col gap-2 text-center w-[90%] px-1 flex-col gap-1 text-[0.6em] sm:text-[1em] z-1 ">
//                         <span className="text-md sm:text-4xl  ">
//                             You've tracked <em className="">{jobdata.length}</em> jobs!
//                         </span> 

//                         <span className="text-[0.6em] sm:text-[0.8em]">
//                             {/* interested */}
//                                 <span className="w-full  px-[0.3em]   flex justify-between">
//                                     <span>Interested:</span> {interestedJobsCount}
//                                 </span>
//                                 {/* Applied  */}
//                                 <span className="w-full bg-blue-500/10 px-[0.3em]   flex justify-between">
//                                     <span>Applied:</span> {appliedJobsCount}
//                                 </span>
//                                 {/* Interviewing  */}
//                                 <span className="w-full bg-yellow-500/10 px-[0.3em]   flex justify-between">
//                                     <span>Interviewing:</span> {interviewingJobsCount}
//                                 </span>
//                                 {/* Offer  */}
//                                 <span className="w-full bg-green-500/10 px-[0.3em]   flex justify-between">
//                                     <span>Offer:</span> {offerJobsCount}
//                                 </span>
//                                 {/* Rejected  */}
//                                 <span className="w-full bg-red-500/10 px-[0.3em]   flex justify-between">
                                
//                                      <span>Rejected:</span> {rejectedJobsCount}
//                                 </span>
//                                 {/* Ghosted  */}
//                                 <span className="w-full bg-gray-500/10 px-[0.3em]   flex justify-between">
//                                     <span>Ghosted:</span> {ghostedJobsCOunt}
//                                 </span>
//                         </span>  
//                     </span>
                    
//                     <span className=' absolute bottom-2 left-2 z-10 flex place-items-end place-content-start'>
//                     </span>
//                 </div>
//             </>
      
            
      
      
         
//         );
//     }



  

// }

export default function YourJobs() {

return (
    <></>
)
  

}