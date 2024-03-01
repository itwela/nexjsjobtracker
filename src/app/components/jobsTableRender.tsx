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
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

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


 function JobsTable({ jobdata }: JobsTableProps) {



  return (
    <>
      <div className="   w-[100%] flex flex-col rounded-[0.5em] shadow">
        <div className='w-[100%]'>
          {/* <h2 className="font-black">Your Jobs:</h2> */}
        </div>

        {jobdata?.length < 1 ? (
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
          <div className="jtable mt-4 px-6 w-[80vw] text-[0.8em]   min-h-[30vh] flex flex-col rounded-[0.5em] shadow place-items-center place-content-center">
            <div className="bg-mprimary w-[70vw] rounded-[2em] px-5  flex flex-col place-items-center place-content-center ">
              <span className="py-9">Your Jobs</span>
              <Table className="w-[70vw]">
                <TableHeader className="flex text-main-w justify-evenly gap-1">
                  
                  <TableHead className="w-[5em] text-main-w/70 truncate hover:text-clip">
                    Edit
                  </TableHead>
                  <TableHead className="w-[7em] truncate hover:text-clip">
                    Job Tttle
                  </TableHead>
                  <TableHead className="w-[7em] truncate hover:text-clip">
                    Company
                  </TableHead>
                  <TableHead className="w-[7em] truncate hover:text-clip">
                    Date Applied
                  </TableHead>
                  <TableHead className="w-[7em]">
                    Status
                  </TableHead>
                  <TableHead className="w-[7em]">
                    Link
                  </TableHead>
                  <TableHead className="w-[7em] truncate hover:text-clip">
                    Referral?
                  </TableHead>
                  <TableHead className="w-[7em] truncate hover:text-clip">
                    Ref Name
                  </TableHead>
                  <TableHead className="w-[7em] truncate hover:text-clip">
                    Ref Contact
                  </TableHead>
                  <TableHead className="w-[7em] truncate hover:text-clip">
                    Resume Used
                  </TableHead>
                  <TableHead className="w-[7em] truncate hover:text-clip">
                    Keywords
                  </TableHead>
           

                </TableHeader>


                <TableBody>

                  {/* pop up */}

                  {jobdata.map((item: any) => (
                    <TableRow key={item.id} className="flex nosb items-center gap-1 justify-evenly hover:bg-lprimary/50 text-main-w/60 hover:text-main-w border-transparent">
                      
                      <TableCell className="w-[5em]">
                        <div className="flex gap-2">

                          <form action={deleteJobData}>
                            <input type="hidden" name="jobId" value={item.id} />
                            <button className="text-red-400/50 hover:text-red-300"><FaRegTrashCan size={18} type="submit" /></button>
                          </form>

                          <Link href={`/dashboard/new/${item.id}`}>
                            <input type="hidden" name="jobId" value={item.id} />
                            <button className="hover:text-main-w text-slate-500"><FaRegEdit size={18} type="submit" /></button>
                          </Link>


                        </div>

                      </TableCell> {/* Add action button cell */}

                      <TableCell className="w-[7em]  font-medium  whitespace-nowrap overflow-auto ">
                        {item.JobTitle}
                      </TableCell>
                      <TableCell className="w-[7em]  font-medium  whitespace-nowrap overflow-auto ">
                        {item.Company}
                      </TableCell>
                      <TableCell className="w-[7em] font-medium  whitespace-nowrap overflow-auto ">
                        {item.DateApplied}
                      </TableCell>
                      <TableCell className={`w-[7em] font-medium whitespace-nowrap overflow-auto  
                                  ${item.Status.includes("Applied") ? "bg-blue-500/10" :
                          item.Status.includes("Inter") ? "bg-yellow-500/10" :
                            item.Status.includes("Offer") ? "bg-green-500/10" :
                              item.Status.includes("Rej") ? "bg-red-500/10" :
                                item.Status.includes("Ghosted") ? "bg-gray-500/10 text-muted-foreground" : ""
                        }`}>
                        <div className="">
                          {item.Status}
                        </div>

                      </TableCell>
                      <TableCell className="w-[7em] font-medium  whitespace-nowrap overflow-auto ">
                        {item.Link}
                      </TableCell>
                      <TableCell className="w-[7em] font-medium  whitespace-nowrap overflow-auto ">
                        {item.Referral}
                      </TableCell>
                      <TableCell className="w-[7em] font-medium  whitespace-nowrap overflow-auto ">
                        {item.ReferralName}
                      </TableCell>
                      <TableCell className="w-[7em] font-medium  whitespace-nowrap overflow-auto ">
                        {item.ReferralContact}
                      </TableCell>
                      <TableCell className="w-[7em] font-medium  whitespace-nowrap overflow-auto ">
                        {item.ResumeUsed}
                      </TableCell>
                      <TableCell className="w-[7em] font-medium  whitespace-nowrap overflow-auto ">
                        {item.Keywords}
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

export default dynamic (() => Promise.resolve(JobsTable), {ssr: false}) 