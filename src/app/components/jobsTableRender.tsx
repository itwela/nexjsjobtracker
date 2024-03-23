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





 export default function JobsTable({jobdata}: any) {


  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5; // Adjust this value as needed
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobdata.slice(indexOfFirstJob, indexOfLastJob);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  
  const handleReload  = async  () => {
    router.reload();
  }

  return (
    <>
      <div className=" w-[100%] flex flex-col rounded-[0.5em] shadow">
        <div className='w-[100%]'>
          {/* <h2 className="font-black">Your Jobs:</h2> */}
        </div>

        {jobdata?.length === 0 ? (
          <div className=" py-6 w-[100%] min-h-[30vh] flex flex-col rounded-[0.5em] shadow place-items-center place-content-center">
            <div className="flex h-20 w-20 rounded-full items-center justify-center /40">
              <File className="w-10 h-10 " />
            </div>

            <div className="flex flex-col text-[0.8em] gap-1 w-[100%] place-items-center text-center">
              <h2 className=" font-black">No jobs found.</h2>
              <p className=" w-[50%]">You dont have any jobs created yet. Please create some so that they will show here.</p>
            </div>
          </div>
        ) : (
          <div className="jtable mt-4  w-full text-[0.6em] sm:text-[1em]   min-h-[30vh] flex flex-col rounded-[0.5em] shadow place-items-center place-content-center">
            <div className="  w-full rounded-lg bg-white  flex flex-col px-9 place-content-center ">
              <span className="flex justify-between w-full">
                <span className="py-9">Your Jobs</span>
                <div className="flex justify-center my-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className=" py-2 px-4 rounded-l"
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={indexOfLastJob >= jobdata.length}
                    className=" py-2 px-4 rounded-l"
                  >
                    Next
                  </button>
                </div>
              </span>
                <Table className="w-full">
                  <TableHeader className="flex border-b border-main-w/50  justify-evenly gap-1">
                
                    <TableHead className="flex place-content-center place-items-center w-[5em] /70 truncate hover:text-clip">
                      Edit
                    </TableHead>
                    <TableHead className=" flex place-content-center place-items-center w-[2em] truncate hover:text-clip">
                      #
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

                      <TableHead className="flex place-content-center place-items-center  w-[7em] truncate hover:text-clip">
                        Referral?
                      </TableHead>
                      <TableHead className="flex place-content-center place-items-center  w-[7em] truncate hover:text-clip">
                        Ref'd By
                      </TableHead>
                      <TableHead className="flex place-content-center place-items-center  w-[7em] truncate hover:text-clip">
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
                    {currentJobs.map((job: JobData, index: number) => (
                      <TableRow key={job.id} className="flex nosb items-center gap-1 justify-evenly hover:bg-slate-100  border-transparent">
                
                        <TableCell className="w-[5em]">
                          <div className="flex gap-2">
                            <form action={deleteJobData}>
                              <input type="hidden" name="jobId" value={job.id} />
                              <button  className="text-red-400/50 hover:text-red-300"><FaRegTrashCan size={18} type="submit" /></button>
                            </form>
                            <Link href={`/dashboard/new/${job.id}`}>
                              <input type="hidden" name="jobId" value={job.id} />
                              <button className="hover: text-slate-500"><FaRegEdit size={18} type="submit" /></button>
                            </Link>
                          </div>
                        </TableCell>

                        <TableCell className="w-[2em] hover:  font-medium  whitespace-nowrap overflow-auto ">
                          {indexOfFirstJob + index + 1}
                        </TableCell>
                        <TableCell className="w-[7em] hover:  font-medium  whitespace-nowrap overflow-auto ">
                          {job.JobTitle}
                        </TableCell>
                        <TableCell className="w-[7em] hover:  font-medium  whitespace-nowrap overflow-auto ">
                          {job.Company}
                        </TableCell>
                        <TableCell className="w-[7em] hover: font-medium  whitespace-nowrap overflow-auto ">
                           {job.DateApplied}
                        </TableCell>
                        <TableCell className={`w-[7em] hover: font-medium whitespace-nowrap overflow-auto ${
                          job?.Status?.includes("Applied") ? "bg-blue-500/10" :
                        job?.Status?.includes("Interviewing") ? "bg-yellow-500/10" :
                          job?.Status?.includes("Offer") ? "bg-green-500/10" :
                            job?.Status?.includes("Rej") ? "bg-red-500/10" :
                              job?.Status?.includes("Ghosted") ? "bg-gray-500/10 text-muted-foreground" : ""
                      }`}>
                      <div className="">
                        {job?.Status}
                      </div>
                    </TableCell>
                        <TableCell className="w-[7em] hover: font-medium  whitespace-nowrap overflow-auto ">
                          {job.Link}
                        </TableCell>
                        <TableCell className="w-[7em] hover: font-medium  whitespace-nowrap overflow-auto ">
                          {job.Referral}
                        </TableCell>
                        <TableCell className="w-[7em] hover: font-medium  whitespace-nowrap overflow-auto ">
                          {job.ReferralName}
                        </TableCell>
                        <TableCell className="w-[7em] hover: font-medium  whitespace-nowrap overflow-auto ">
                          {job.ReferralContact}
                        </TableCell>
                        <TableCell className="w-[7em] hover: font-medium  whitespace-nowrap overflow-auto ">
                          {job.ResumeUsed}
                        </TableCell>
                        <TableCell className="w-[7em] hover: font-medium  whitespace-nowrap overflow-auto ">
                          {job.Keywords}
                        </TableCell>
                        <TableCell className="w-[7em] hover: font-medium flex place-items-center place-content-center gap-2 whitespace-nowrap overflow-auto">
                          <Link href={`/coverletter/job/${job.id}`}>
                                <input type="hidden" name="jobId" value={job.id} />
                                <button className="hover: text-slate-500"><FaRegEnvelope size={18} type="submit" /></button>
                          </Link>
                          <Link href={`/coverletter/`}>
                                <input type="hidden" name="jobId" value={job.id} />
                                <button className="hover: text-slate-500"><FaPlus size={18} type="submit" /></button>
                          </Link>
                        </TableCell>
                      </TableRow>
                      ))}
                  </TableBody>
                </Table>
              <span className="py-6 /50">A list of your recent Job Applications.</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

