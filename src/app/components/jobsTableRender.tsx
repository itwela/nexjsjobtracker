'use client'

import { deleteJobData, toggleInterviewStatus } from "@/actions/databaseAc";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
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
import { JobData } from "../types/JobTypes";
import { IoAtCircle, IoCheckmarkCircle, IoCloseCircleOutline } from "react-icons/io5";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import React from "react";
import EditJob from "../edit/new/[id]/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useFormStatus } from "react-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function JobsTable({ jobdata }: { jobdata: JobData[] }) {


  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5; // Adjust this value as needed
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;


  const handleReload = async () => {
    router.reload();
  }
 
  // Filter jobs
  const appliedJobs = jobdata.filter((job: any) => job.Status === "Applied");
  const interestedJobs = jobdata.filter((job: any) => job.Status === "Interested");
  const interviewingJobs = jobdata.filter((job: any) => job.Status === "Interviewing");
  const offerJobs = jobdata.filter((job: any) => job.Status === "Offer");
  const rejectedJobs = jobdata.filter((job: any) => job.Status === "Rejected");
  const ghostedJobs = jobdata.filter((job: any) => job.Status === "Ghosted");
  const interviewedJobs = jobdata.filter((job: any) => job.Interviewed === true);

  // Get the count of applied jobs
  const appliedJobsCount = appliedJobs.length ;
  const interestedJobsCount = interestedJobs.length ;
  const interviewingJobsCount = interviewingJobs.length ;
  const offerJobsCount = offerJobs.length ;
  const rejectedJobsCount = rejectedJobs.length ;
  const ghostedJobsCount = ghostedJobs.length ;
  const greeensuccesscount = interviewedJobs.length;

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredJobs = jobdata.filter((job: JobData) => {
    const lcSearchQuery = searchQuery.toLowerCase();
    const inteviewed = searchQuery;

    if (inteviewed === 'Interviewed') {
      return (
        job.Interviewed === true
      )
    }

    return (
      job.JobTitle.toLowerCase().includes(lcSearchQuery) ||
      job.Company.toLowerCase().includes(lcSearchQuery) ||
      job.DateApplied?.includes(searchQuery) || // assuming DateApplied is a string
      job.Status?.includes(searchQuery)
    );
  });

  // Paginate the filtered jobs
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };


  const [selectedJob, setSelectedJob] = useState<JobData>({} as JobData);
  const [formOpen, setFormOpen] = React.useState(false);
  const handleFormOpen = (thejob: JobData) => {
    setSelectedJob(thejob);

    setTimeout(() => {
      setFormOpen(!formOpen)
    }, 618)
  }
  const handleFormClose = () => setFormOpen(false);


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    maxWidth: 400,
    height: "80%",
    maxHeight: 600,
    overflow: 'y-scroll',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    border: "none",
    outline: "none",
    p: 2,
  };

  const DeleteButton = () => {
    const status = useFormStatus();
    
    if (status.pending != true) {
      return (
        <button className="text-red-600 hover:text-red-700"><FaRegTrashCan size={18} type="submit" /></button>
      )
    }

    if (status.pending === true) {
      return (
        <button className="text-gray-600 animate-pulse" disabled><FaRegTrashCan size={18} type="submit" /></button>
      )
    }
  }

  const notInterviewedButton = () => {
    const status = useFormStatus();

    if (status.pending != true) {
      return (
        <button className=""><IoAtCircle className="text-white outline outline-[1px] outline-black rounded-full" size={11} type="submit" /></button>
      )
    }

    if (status.pending === true) {
      return (
        <button className="text-gray-500"><IoCheckmarkCircle size={18} type="submit" /></button>
      )
    }

  }


  return (
    <>
      <div className=" w-[100%] flex flex-col rounded-[0.5em] ">
        <div className='w-[100%]'>
          {/* <h2 className="font-black">Your Jobs:</h2> */}
        </div>

        {jobdata?.length === 0 ? (
          <div className=" py-6 w-[100%] min-h-[30vh] flex flex-col rounded-[0.5em]  place-items-center place-content-center">
            <div className="flex h-20 w-20 rounded-full items-center justify-center /40">
              <File className="w-10 h-10 " />
            </div>

            <div className="flex flex-col text-[0.8em] gap-1 w-[100%] place-items-center text-center">
              <h2 className=" font-black">No jobs found.</h2>
              <p className=" w-[50%]">You dont have any jobs created yet. Please create some so that they will show here.</p>
            </div>
          </div>
        ) : (
          <div className="jtable mt-4  w-full text-[1em]   min-h-[30vh] flex flex-col rounded-[0.5em] place-items-center place-content-center">

            <span className="flex w-full gap-4 place-items-center">
              <input
                type="text"
                placeholder="Search jobs by title, company, date or status"
                value={searchQuery}
                onChange={handleSearchChange}
                className="rounded-lg w-full outline-none px-3 py-2 my-4"
              />

              {/* close button */}
              {searchQuery !== '' && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span onClick={() => setSearchQuery('')}><IoCloseCircleOutline className="cursor-pointer w-8 h-8 text-red-500" /></span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <p>Reset/ Show All Jobs</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

            </span>

            <span className="flex justify-between w-full">
              <span className="py-2 font-bold">All Jobs - {jobdata.length} </span>
              <div className="flex justify-center my-2">
                
                {currentPage === 1 && (
                    <button
                      onClick={handlePrevPage}
                      disabled
                      className="text-gray-500 py-2 px-4 rounded-l"
                    >
                      Prev
                    </button>
                )} 

                {currentPage > 1 && (
                    <button
                      onClick={handlePrevPage}
                      className=" py-2 px-4 rounded-l"
                    >
                      Prev
                    </button>
                )}

                {indexOfFirstJob >= filteredJobs.length && (                
                    <button
                      onClick={handleNextPage}
                      className="text-gray-500 py-2 px-4 rounded-l"
                      disabled
                    >
                      Next
                    </button>
                )}
      
                {indexOfFirstJob < filteredJobs.length && (    
                <button
                  onClick={handleNextPage}
                  className=" py-2 px-4 rounded-l"
                >
                  Next
                </button>
                )}

              </div>
            </span>

            <div className="w-full  flex flex-col  place-items-center ">

              {/* job counts */}
              <div className=" flex w-max place-content-center place-self-end h-max gap-3 select-none">
                <TooltipProvider>

                  {/* Interested */}
                  <Tooltip>
                    <TooltipTrigger>
                      <div onClick={() => setSearchQuery("Interested")} className="cursor-pointer rounded-full w-[2em] h-[2em] bg-white flex place-content-center place-items-center">{interestedJobsCount}</div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <p>Show Interested Jobs Only</p>
                    </TooltipContent>
                  </Tooltip>
               
                  {/* Applied */}
                  <Tooltip>
                    <TooltipTrigger>
                      <div onClick={() => setSearchQuery("Applied")} className="cursor-pointer rounded-full w-[2em] h-[2em] bg-blue-500/50 flex place-content-center place-items-center">{appliedJobsCount}</div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <p>Show Applied Jobs Only</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Interviewing */}
                  <Tooltip>
                    <TooltipTrigger>
                      <div onClick={() => setSearchQuery("Interviewing")} className="cursor-pointer rounded-full w-[2em] h-[2em] bg-yellow-500/50 flex place-content-center place-items-center">{interviewingJobsCount}</div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <p>Show Interviewing Jobs Only</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Successes */}
                  <Tooltip>
                    <TooltipTrigger>
                      <div onClick={() => setSearchQuery("Interviewed")} className="cursor-pointer rounded-full w-[2em] h-[2em] bg-green-500/50 flex place-content-center place-items-center">{greeensuccesscount}</div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <p>Show Offered & Interviewed Jobs Only</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Rejected */}
                  <Tooltip>
                    <TooltipTrigger>
                      <div onClick={() => setSearchQuery("Rejected")} className="cursor-pointer rounded-full w-[2em] h-[2em] bg-red-500/50 flex place-content-center place-items-center">{rejectedJobsCount}</div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <p>Show Rejected Jobs Only</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Ghosted */}
                  <Tooltip>
                    <TooltipTrigger>
                      <div onClick={() => setSearchQuery("Ghosted")} className="cursor-pointer rounded-full w-[2em] h-[2em] bg-gray-500/50 flex place-content-center place-items-center">{ghostedJobsCount}</div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <p>Show Ghosted Jobs Only</p>
                    </TooltipContent>
                  </Tooltip>

                </TooltipProvider>
              </div>

              {filteredJobs.length > 0 && (
                <Table className="w-full">

                  {/* header */}
                  <span className="flex my-4 justify-evenly gap-1 w-full">

                    <div className="flex place-content-center place-items-center w-[5em] /70 truncate hover:text-clip">
                      Edit
                    </div>
                    <div className=" flex place-content-center place-items-center w-[2em] truncate hover:text-clip">
                      #
                    </div>
                    <div className=" flex place-content-center place-items-center w-[7em] truncate hover:text-clip">
                      Job Tittle
                    </div>
                    <div className="flex place-content-center place-items-center w-[7em] truncate hover:text-clip">
                      Company
                    </div>
                    <div className="flex place-content-center place-items-center w-[7em] truncate hover:text-clip">
                      Date Applied
                    </div>
                    <div className="flex place-content-center place-items-center w-[7em]">
                      Status
                    </div>
                    <div className="flex place-content-center place-items-center w-[7em]">
                      Link
                    </div>

                    <div className="flex place-content-center place-items-center  w-[7em] truncate hover:text-clip">
                      Interviewed?
                    </div>

                    <div className="flex place-content-center place-items-center w-[7em] truncate hover:text-clip">
                      Resume Used
                    </div>

                    <div className="flex place-content-center place-items-center w-[7em] truncate hover:text-clip">
                      Keywords
                    </div>

                    <div className="flex place-content-center place-items-center w-[7em] truncate hover:text-clip">
                      Docs
                    </div>

                  </span>

                  <TableBody>
                    {/* pop up */}
                    {currentJobs.map((job: JobData, index: number) => (
                      <TableRow key={job.id} className="flex rounded-lg bg-white bg-opacity-70 hover:bg-opacity-100 my-2  nosb items-center gap-1 justify-evenly border-transparent">

                        <TableCell className="w-[5em]">
                          <div className="flex gap-2">


                            <form action={deleteJobData} className="w-full">
                              <input type="hidden" name="jobId" value={job.id} />
                              <DeleteButton />
                            </form>

                            <div>
                              <span onClick={() => handleFormOpen(job)} className="cursor-pointer text-blue-700"><FaRegEdit size={18} type="submit" /></span>
                            </div>

                            {/* Render the modal with EditJob component */}
                            <Modal
                              open={formOpen}
                              onClose={handleFormClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                              className=''
                            >
                              <Box sx={style}>
                                <span className="bg-white w-full h-full px-1 flex flex-col place-content-center place-items-center mx-auto rounded-lg relative">
                                  <span className='flex flex-col w-full h-full gap-2 justify-between py-6'>
                                    <span className='w-full h-[550px] overflow-scroll'>
                                      <EditJob jobdata={selectedJob} jobId={selectedJob.id} />
                                    </span>
                                    <span className='w-full flex place-items-center place-content-end'>JobKompass</span>
                                  </span>
                                </span>
                              </Box>
                            </Modal>



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
                        <TableCell className={`w-[7em] hover: font-medium whitespace-nowrap overflow-auto ${job?.Status?.includes("Applied") ? "bg-blue-500/50" :
                          job?.Status?.includes("Interviewing") ? "bg-yellow-500/50" :
                            job?.Status?.includes("Offer") ? "bg-green-500/50" :
                              job?.Status?.includes("Rej") ? "bg-red-500/50" :
                                job?.Status?.includes("Ghosted") ? "bg-gray-500/50 text-muted-foreground" : ""
                          }`}>
                          <div className="">
                            {job?.Status}
                          </div>
                        </TableCell>
                        <TableCell className="w-[7em] hover: font-medium  whitespace-nowrap overflow-auto ">
                          <a href={`https://${job.Link}`} target="_blank">{job.Link}</a>
                        </TableCell>
                        <TableCell className="w-[7em] hover: font-medium  whitespace-nowrap overflow-auto ">
                          {job.Interviewed != true && (
                            <form className="flex w-full h-full place-items-center place-content-center" action={toggleInterviewStatus}>
                              <input type="hidden" name="jobId" value={job.id} />
                              <input type="hidden" name="interviewStatus" value={'yes'} />
                              <button className=""><IoAtCircle className="text-white outline outline-[1px] outline-black rounded-full" size={11} type="submit" /></button>
                            </form>
                          )}
                          {job.Interviewed != false && (
                            <form className="flex w-full h-full place-items-center place-content-center" action={toggleInterviewStatus}>
                              <input type="hidden" name="jobId" value={job.id} />
                              <input type="hidden" name="interviewStatus" value={'no'} />
                              <button className="text-green-500"><IoCheckmarkCircle size={18} type="submit" /></button>
                            </form>
                          )}
                        </TableCell>
                        <TableCell className="w-[7em] hover: font-medium  whitespace-nowrap overflow-auto ">
                          {job.ResumeUsed}
                        </TableCell>
                        <TableCell className="w-[7em] hover: font-medium  whitespace-nowrap overflow-auto ">
                          {job.Keywords}
                        </TableCell>
                        <TableCell className="w-[7em] hover: font-medium flex place-items-center place-content-center gap-2 whitespace-nowrap overflow-auto">
                          <Link href={`/mydocs`}>
                            <input type="hidden" name="jobId" value={job.id} />
                            <button className="hover: text-blue-500"><FaRegEnvelope size={18} type="submit" /></button>
                          </Link>
                          <Link href={`/generate`}>
                            <input type="hidden" name="jobId" value={job.id} />
                            <button className="hover: text-blue-500"><FaPlus size={18} type="submit" /></button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              )}

              {indexOfFirstJob >= filteredJobs.length && filteredJobs.length == 0 && (                
                <div className="flex w-max py-9 place-items-center place-content-center h-[10m]">
                  <div className="flex place-items-center flex-col gap-2">
                    <h2 className="cursor-pointer py-3 px-4 bg-white rounded-lg " onClick={() => { 
                      setCurrentPage(1); 
                      setSearchQuery(''); 
                    }}>Go Back
                    </h2>
                    <h2 className="select-none">You've reached the end of the list.</h2>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}
      </div>
    </>
  )
}

