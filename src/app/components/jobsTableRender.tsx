'use client'

import { deleteJobData } from "@/actions/databaseAc";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa";
import router from "next/router";


interface JobData {
  Company: string;
  coverLetters?: Array<{
    id: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    jobId: string;
  }>;
  DateApplied: string | null; // Update the type to string | null
  JobTitle: string;
  Keywords: string | null;
  Link: string;
  Referral: string;
  ReferralContact: string | null;
  ReferralName: string | null;
  ResumeUsed: string | null;
  Status: string | null;
  createdAt: Date;
  id: string;
  updatedAt: Date;
  userId: string;
}

type JobDataProps = {
  jobdata: JobData[];
}





 export default function JobsTable({jobdata}: JobDataProps) {

   useEffect(() => {
    //  getAllJobs();
   }, []) 

  //  const [jobData, setJobData] = useState<JobData[]>([]);

  // const getAllJobs = async () => {
  //   const hello = 'hi api for cover letter job id'

  //   try {
  //     const response = await fetch('/api/db/getalljobs', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         input: hello
  //       })
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }

  //     const data = await response.json();
  //     // console.log('Fetched data:', data); // Log the fetched data
  //     setJobData(data.jobdata); 
  //     console.log(jobData)

  //   } catch {

  //   }

  // }

  const handleReload  = async  () => {
    router.reload();
  }

  return (
    <>
      <div className="   w-[100%] flex flex-col rounded-[0.5em] shadow">
        <div className='w-[100%]'>
          {/* <h2 className="font-black">Your Jobs:</h2> */}
        </div>

        {jobdata?.length === 0 ? (
          <div className="space-y-4  p-6 py-6 w-[100%] min-h-[30vh] flex flex-col rounded-[0.5em] shadow place-items-center place-content-center">
            <div className="flex h-20 w-20 rounded-full items-center justify-center bg-dprimary/40">
              <File className="w-10 h-10 text-main-w/60" />
            </div>

            <div className="flex flex-col text-[0.8em] gap-1 w-[100%] place-items-center text-center">
              <h2 className="text-main-w font-black">No jobs found.</h2>
              <p className="text-main-w/60 w-[50%]">You dont have any jobs created yet. Please create some so that they will show here.</p>
            </div>
          </div>
        ) : (
          <div className="jtable mt-4 px-4  w-full text-[0.6em] sm:text-[1em]   min-h-[30vh] flex flex-col rounded-[0.5em] shadow place-items-center place-content-center">
            <div className="bg-mprimary  w-full rounded-[2em]  flex flex-col px-9 place-content-center ">
              <span className="py-9">Your Jobs</span>
                <Table className="w-full">
                  <TableHeader className="flex text-main-w justify-evenly gap-1">
                
                    <TableHead className="flex place-content-center place-items-center w-[5em] text-main-w/70 truncate hover:text-clip">
                      Edit
                    </TableHead>
                    <TableHead className=" flex place-content-center place-items-center w-[7em] truncate hover:text-clip">
                      Job Tttle
                    </TableHead>
                    <TableHead className="flex place-content-center place-items-center w-[7em] truncate hover:text-clip">
                      Company
                    </TableHead>
                    <TableHead className="flex place-content-center place-items-center w-[7em] truncate hover:text-clip">
                      Date Applied
                    </TableHead>
                    <TableHead className="flex place-content-center place-items-center w-[7em]">
                      Status
                    </TableHead>
                    <TableHead className="flex place-content-center place-items-center w-[7em]">
                      Link
                    </TableHead>
                      <TableHead className="flex place-content-center place-items-center bg-dprimary w-[7em] truncate hover:text-clip">
                        Referral?
                      </TableHead>
                      <TableHead className="flex place-content-center place-items-center bg-dprimary w-[7em] truncate hover:text-clip">
                        Ref'd By
                      </TableHead>
                      <TableHead className="flex place-content-center place-items-center bg-dprimary w-[7em] truncate hover:text-clip">
                        Contact
                      </TableHead>
                    <TableHead className="flex place-content-center place-items-center w-[7em] truncate hover:text-clip">
                      Resume Used
                    </TableHead>
                    <TableHead className="flex place-content-center place-items-center w-[7em] truncate hover:text-clip">
                      Keywords
                    </TableHead>
                    <TableHead className="flex place-content-center place-items-center w-[7em] truncate hover:text-clip">
                      Cover letter
                    </TableHead>
                  </TableHeader>
                  <TableBody>
                    {/* pop up */}
                    {jobdata.map((job) => (
                      <TableRow key={job.id} className="flex nosb items-center gap-1 justify-evenly hover:bg-lprimary/50 text-main-w/60 hover:text-main-w border-transparent">
                
                        <TableCell className="w-[5em]">
                          <div className="flex gap-2">
                            <form action={deleteJobData}>
                              <input type="hidden" name="jobId" value={job.id} />
                              <button  className="text-red-400/50 hover:text-red-300"><FaRegTrashCan size={18} type="submit" /></button>
                            </form>
                            <Link href={`/dashboard/new/${job.id}`}>
                              <input type="hidden" name="jobId" value={job.id} />
                              <button className="hover:text-main-w text-slate-500"><FaRegEdit size={18} type="submit" /></button>
                            </Link>
                          </div>
                        </TableCell>
                        <TableCell className="w-[7em]  font-medium  whitespace-nowrap overflow-auto ">
                          {job.JobTitle}
                        </TableCell>
                        <TableCell className="w-[7em]  font-medium  whitespace-nowrap overflow-auto ">
                          {job.Company}
                        </TableCell>
                        <TableCell className="w-[7em] font-medium  whitespace-nowrap overflow-auto ">
                           {job.DateApplied}
                        </TableCell>
                        <TableCell className={`w-[7em] font-medium whitespace-nowrap overflow-auto ${
                          job?.Status?.includes("Applied") ? "bg-blue-500/10" :
                        job?.Status?.includes("Inter") ? "bg-yellow-500/10" :
                          job?.Status?.includes("Offer") ? "bg-green-500/10" :
                            job?.Status?.includes("Rej") ? "bg-red-500/10" :
                              job?.Status?.includes("Ghosted") ? "bg-gray-500/10 text-muted-foreground" : ""
                      }`}>
                      <div className="">
                        {job?.Status}
                      </div>
                    </TableCell>
                        <TableCell className="w-[7em] font-medium  whitespace-nowrap overflow-auto ">
                          {job.Link}
                        </TableCell>
                        <TableCell className="w-[7em] font-medium  whitespace-nowrap overflow-auto ">
                          {job.Referral}
                        </TableCell>
                        <TableCell className="w-[7em] font-medium  whitespace-nowrap overflow-auto ">
                          {job.ReferralName}
                        </TableCell>
                        <TableCell className="w-[7em] font-medium  whitespace-nowrap overflow-auto ">
                          {job.ReferralContact}
                        </TableCell>
                        <TableCell className="w-[7em] font-medium  whitespace-nowrap overflow-auto ">
                          {job.ResumeUsed}
                        </TableCell>
                        <TableCell className="w-[7em] font-medium  whitespace-nowrap overflow-auto ">
                          {job.Keywords}
                        </TableCell>
                        <TableCell className="w-[7em] font-medium flex place-items-center place-content-center gap-2 whitespace-nowrap overflow-auto">
                          <Link href={`/coverletter/job/${job.id}`}>
                                <input type="hidden" name="jobId" value={job.id} />
                                <button className="hover:text-main-w text-slate-500"><FaRegEnvelope size={18} type="submit" /></button>
                          </Link>
                          <Link href={`/coverletter/`}>
                                <input type="hidden" name="jobId" value={job.id} />
                                <button className="hover:text-main-w text-slate-500"><FaPlus size={18} type="submit" /></button>
                          </Link>
                        </TableCell>
                      </TableRow>
                      ))}
                  </TableBody>
                </Table>
              <span className="py-6 text-main-w/50">A list of your recent Job Applications.</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

