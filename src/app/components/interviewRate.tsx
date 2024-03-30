import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { JobData, JobDataProps, JobsTableProps } from '../types/JobTypes';
import { useState } from 'react';


export default function InterviewRate({ jobdata }: any) {

    const interestedJobs = jobdata.filter((job: JobData) => job.Status === "Interested")
    const appliedJobs = jobdata.filter((job: JobData) => job.Status === "Applied")
    const interviewingJobs = jobdata.filter((job: JobData) => job.Status === "Interviewing");
    const offeredJobs = jobdata.filter((job: JobData) => job.Status === "Offer");
    const rejectedJobs = jobdata.filter((job: JobData) => job.Status === "Rejected");
    const ghostedJobs = jobdata.filter((job: JobData) => job.Status === "Ghosted");
    const successfulInterviews = jobdata.filter((job: JobData) => job.Interviewed === true);
    
    const successfulInterviewsInteresed = jobdata.filter((job: JobData) => job.Interviewed === true && job.Status === "Interested");
    const successfulInterviewsApplied = jobdata.filter((job: JobData) => job.Interviewed === true && job.Status === "Applied");
    const successfulInterviewsInterviewing = jobdata.filter((job: JobData) => job.Interviewed === true && job.Status === "Interviewing");
    const successfulInterviewsOffered = jobdata.filter((job: JobData) => job.Interviewed === true && job.Status === "Offer");
    const successfulInterviewsRejected = jobdata.filter((job: JobData) => job.Interviewed === true && job.Status === "Rejected");
    const successfulInterviewsGhosted = jobdata.filter((job: JobData) => job.Interviewed === true && job.Status === "Ghosted");

    const totalJobs = jobdata.length
    const success = successfulInterviews.length

    function successAlgo(a: number, b: number): number {
        return a - b;
    }

    const interested = successAlgo(interestedJobs.length, successfulInterviewsInteresed.length);
    const applied = successAlgo(appliedJobs.length, successfulInterviewsApplied.length);    
    const interviewing = successAlgo(interviewingJobs.length, successfulInterviewsInterviewing.length);
    const offered = successAlgo(offeredJobs.length, successfulInterviewsOffered.length);
    const rejected = successAlgo(rejectedJobs.length, successfulInterviewsRejected.length);
    const ghosted = successAlgo(ghostedJobs.length, successfulInterviewsGhosted.length);
    
    const interviewSuccessrate = ((success / totalJobs) * 100).toFixed(0)

    const data = {
        datasets: [{
            data: [interested, applied, interviewing, success, offered, rejected, ghosted],
            backgroundColor: [
                // light grey
                'rgba(236, 239, 241, 0.7)',
                // blue
                'rgba(59, 130, 246, 0.7)',
                // yellow
                'rgba(234, 179, 8, 0.7)',
                // green
                'rgba(34, 197, 94, 0.7)',
                // green
                'rgba(34, 197, 94, 0.7)',
                // red 
                'rgba(239, 68, 68, 0.7)',
                // gray
                'rgba(120, 113, 108, 0.7)',
            ],
            hoverBackgroundColor: [
                // light grey
                'rgba(236, 239, 241, 0.9)',
                // blue
                'rgba(59, 130, 246, 0.9)',
                // yellow
                'rgba(234, 179, 8, 0.9)',
                // green
                'rgba(34, 197, 94, 0.9)',
                // green
                'rgba(34, 197, 94, 0.9)',
                // red
                'rgba(239, 68, 68, 0.9)',
                // gray
                'rgba(120, 113, 108, 0.9)',
            ],
        }],
    };

    return (
        <span className="px-4 gap-2 min-w-[5em] interview-rate-card bg-white relative justify-evenly flex rounded-[0.5em] h-full place-content-center place-items-start flex-col  mx-auto ">
            <span className="flex justify-evenly place-items-center place-content-center  gap-5 text-[1em] h-[70%] w-full">
                <div className="w-1/2 h-full">
                    <div className="chart-container pb-2 " style={{ position: 'relative', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <Doughnut
                            data={data}
                        />
                    </div>
                </div>
                
                {interviewSuccessrate  != '0' && (
                    <>
                    <div className="w-1/2 text-left h-full flex flex-col place-items-start place-content-center">
                        <div className="font-bold">{interviewSuccessrate}% <em><span className='text-slate-400 text-[0.8em]'>ITA</span></em></div>
                        <div className='text-[0.8em]'>Interview to Application Ratio</div>
                    </div>
                    </>
                )}
               
               {interviewSuccessrate === '0' && (                   
                    <div className="w-1/2 text-left h-full flex flex-col place-items-start place-content-center">
                        <div>{totalJobs} Jobs</div>
                        <div>Tracked </div>
                    </div>
               )}
            </span>
        </span>
    );
}
