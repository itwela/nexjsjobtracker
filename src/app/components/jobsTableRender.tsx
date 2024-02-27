'use client'

import { File } from "lucide-react";
import prisma from "../libs/db";
import { auth, currentUser } from "@clerk/nextjs";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FaRegTrashCan } from "react-icons/fa6";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { toast } from "sonner"
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ChangeEvent, useEffect, useState } from "react";
import { deleteJobData } from "@/actions/addJob";


// Define the type for formData
interface Job {
  id: string;
  JobTitle: string;
  Company: string;
  DateApplied: string | null;
  Status: string | null;
  Link: string;
  Referral: string;
  ReferralName: string | null;
  ReferralContact: string | null;
  // Add more properties if necessary
}

interface JobsTableProps {
  jobdata: Job[];
}



// const deleteJobData = async (formData: FormData) => {
//   noStore();

//   const jobId = formData.get('jobId') as string

//   await prisma.job.delete({
//     where: {
//       id: jobId
//     },
//   });

//   revalidatePath('/dashbard')
// }
         


export default function JobsTable(
  { jobdata }: JobsTableProps)  
  {
  
  
    // const handleDelete = async (formData: FormData) => {
    
    //   const jobId = formData.get('jobId') as string
    //   console.log(jobId, '<< yooooooooooooo')
    
    //   try {
    //     const response = await fetch('/api/db/deletejobs', {
    //         method: 'POST',
    //         next: {
    //           revalidate: 5
    //         },
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             input: jobId
    //         })
    //     });
    
    //     if (!response.ok) {
    //         throw new Error('Failed to fetch data');
    //     }
    
    
    // } catch (error) {
    //     // Handle error
    // }
    
    //     toast("Job Deleted", {
    //       description: "",
    //   });

    //   // revalidatePath('/dashboard/[slug]', 'page')

    
    //   // getJobStuff();

    // }

  

    return (
    <>
        <div className=" mt-[2em] space-y-1 bg-backback-col py-6 w-[100%] flex flex-col rounded-[0.5em] shadow">
             <div className='w-[100%]'>
                {/* <h2 className="font-black">Your Jobs:</h2> */}
             </div>

            {jobdata?.length < 1 ? (
            <div className="space-y-4 bg-backback-col p-6 py-6 w-[100%] min-h-[30vh] flex flex-col rounded-[0.5em] shadow place-items-center place-content-center">
                <div className="flex h-20 w-20 rounded-full items-center justify-center bg-dprimary/40">
                    <File className="w-10 h-10 text-muted-foreground"/>
                </div>
                
                <div className="flex flex-col gap-1 w-[100%] place-items-center text-center">
                    <h2 className="text-muted-foreground font-black">No jobs found.</h2>
                    <p className="text-muted-foreground w-[50%]">You dont have any jobs created yet. Please create some so that they will show here.</p>
                </div>
            </div>
            ) : (
                <div className="jtable space-y-4 bg-backback-col p-6 py-6  min-h-[30vh] flex flex-col rounded-[0.5em] shadow place-items-center place-content-center">
                  <div className=" w-[95%] flex flex-col place-items-center place-content-center ">
                    <div className="py-9">Your Jobs</div>
                    <Table className=" relative bg-red-30 place-items-center place-contnet-center">
                      <TableCaption className="pb-4">A list of your recent Job Applications.</TableCaption>
                        <TableHeader className="w-[100%] flex text-main-w justify-start gap-1">
                            <TableHead className="w-[6.5vw] truncate hover:text-clip">
                              Job Tttle
                            </TableHead>
                            <TableHead  className="w-[6.5vw] truncate hover:text-clip">
                              Company
                            </TableHead>
                            <TableHead  className="w-[6.5vw] truncate hover:text-clip">
                              Date Applied
                            </TableHead>
                            <TableHead  className="w-[6.5vw]">
                              Status
                            </TableHead>
                            <TableHead  className="w-[6.5vw]">
                              Link
                            </TableHead>
                            <TableHead  className="w-[6.5vw] truncate hover:text-clip">
                              Referral?
                            </TableHead>
                            <TableHead  className="w-[6.5vw] truncate hover:text-clip">
                              Ref Name
                            </TableHead>
                            <TableHead  className="w-[6.5vw] truncate hover:text-clip">
                              Ref Contact
                            </TableHead>
                            <TableHead  className="w-[6.5vw] truncate hover:text-clip">
                              Resume Used
                            </TableHead>
                            <TableHead  className="w-[6.5vw] truncate hover:text-clip">
                              Keywords
                            </TableHead>
                        </TableHeader>


                        <TableBody>

                        {/* pop up */}

                              {jobdata.map((item: any) => (                                          
                              <TableRow key={item.id} className="flex nosb items-center gap-1 hover:bg-lprimary text-main-w/60 hover:text-main-w border-transparent">
                                  <TableCell className="font-medium  whitespace-nowrap overflow-auto w-[6.5vw]">
                                    {item.JobTitle}
                                  </TableCell>                              
                                  <TableCell className="font-medium  whitespace-nowrap overflow-auto w-[6.5vw]">
                                    {item.Company}
                                  </TableCell>
                                  <TableCell className="font-medium  whitespace-nowrap overflow-auto w-[6.5vw]">
                                    {item.DateApplied}
                                  </TableCell>
                                  <TableCell className={`font-medium whitespace-nowrap overflow-auto w-[6.5vw] 
                                  ${
                                    item.Status.includes("Applied") ? "bg-blue-500/10" : 
                                    item.Status.includes("Inter") ? "bg-yellow-500/10" : 
                                    item.Status.includes("Offer") ? "bg-green-500/10" : 
                                    item.Status.includes("Rej") ? "bg-red-500/10" : 
                                    item.Status.includes("Ghosted") ? "bg-gray-500/10 text-muted-foreground" : ""
                                    }`}>
                                      <div className="">
                                    {item.Status}
                                    </div>

                                  </TableCell>                              
                                  <TableCell className="font-medium  whitespace-nowrap overflow-auto w-[6.5vw]">
                                      {item.Link}
                                  </TableCell>
                                  <TableCell className="font-medium  whitespace-nowrap overflow-auto w-[6.5vw]">
                                    {item.Referral}
                                  </TableCell>
                                  <TableCell className="font-medium  whitespace-nowrap overflow-auto w-[6.5vw]">
                                    {item.ReferralName}
                                  </TableCell>
                                  <TableCell className="font-medium  whitespace-nowrap overflow-auto w-[6.5vw]">
                                    {item.ReferralContact}
                                  </TableCell>
                                  <TableCell className="font-medium  whitespace-nowrap overflow-auto w-[6.5vw]">
                                    {item.ResumeUsed}
                                  </TableCell>
                                  <TableCell className="font-medium  whitespace-nowrap overflow-auto w-[6.5vw]">
                                    {item.Keywords}
                                  </TableCell>

                                  <TableCell>
                                  <div className="flex gap-2">

                                    <Link href={`/dashboard/new/${item.id}`}>
                                      <input type="hidden" name="jobId" value={item.id} />
                                      <button className="hover:text-main-w text-slate-500"><FaRegEdit size={18} type="submit"/></button>
                                    </Link>

                                    <form action={deleteJobData}>
                                      <input type="hidden" name="jobId" value={item.id} />
                                        <button className="text-red-400/50 hover:text-red-300"><FaRegTrashCan size={18} type="submit"/></button>
                                    </form>
                                  
                                  </div>

                                  </TableCell> {/* Add action button cell */}

                                </TableRow>
                              ))}

                        </TableBody>
                    </Table>
                    </div>                
                  </div>
                      )} 
              </div>
    </>
    )
}