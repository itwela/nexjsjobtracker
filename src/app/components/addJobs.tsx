'use client'

import React, { useEffect, useState, useRef }  from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// calender imports
import { format, formatDate } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
// select imports
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
// checkbox
import { Checkbox } from "@/components/ui/checkbox"
import { IoMdAddCircleOutline } from "react-icons/io";
// popup
import { toast } from "sonner"
// userId
import prisma from "../libs/db";
import { auth, currentUser } from "@clerk/nextjs";
// submit data
import { addJob } from '@/actions/addJob';
// 
import { FaPlus, FaPlusCircle } from 'react-icons/fa';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

interface CaroselForm {

  [key: string]: string;
}
// Define the type for formData
interface FormData {
  jobdata: {
      Company: string;
      DateApplied: string;
      Introduction: string | null;
      JobTitle: string;
      Keywords: string;
      Link: string;
      Referral: string;
      ReferralContact: string | null;
      ReferralName: string | null;
      ResumeUsed: string;
      Status: string;
      createdAt: string;
      id: string;
      updatedAt: string;
      userId: string;
      }
}

export function AddJobs() {
  
  // indexin form fields:

  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const fields = [
    { label: "Job Title", name: "JobTitle", type: "text" },
    { label: "Company", name: "Company", type: "text" },
    { label: "Date Applied", name: "DateApplied", type: "date" },
    { label: "Status", name: "Status", type: "select" },
    { label: "Link", name: "Link", type: "text" },
    { label: "Referral?", name: "Referral", type: "select" },
    { label: "Referral Name", name: "ReferralName", type: "text" },
    { label: "Referral Contact", name: "ReferralContact", type: "text" },
    { label: "Resume", name: "ResumeUsed", type: "file" },
    { label: "Keywords", name: "Keywords", type: "text" },
  ];

  const handleNext = () => {
    setCurrentFieldIndex((prevIndex) => prevIndex + 1);
  };

  const handleBack = () => {
    setCurrentFieldIndex((prevIndex) => prevIndex - 1);
  };
  
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({ jobdata: { Company: "", DateApplied: "", Introduction: null, JobTitle: "", Keywords: "", Link: "", Referral: "", ReferralContact: null, ReferralName: null, ResumeUsed: "", Status: "", createdAt: "", id: "", updatedAt: "", userId: "" } });
  const router = useRouter();


  // const handleSubmit = async () => {
  //   setFormData(formData); // Update the state
  //   console.log(formData); // Update the state

  //   try {
  //     const response = await fetch('/api/db/addjobs', {
  //         method: 'POST',
  //         next: {
  //           revalidate: 0
  //         },
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //             input: formData
  //         })
  //     });
  
  //     if (!response.ok) {
  //         throw new Error('Failed to fetch data');
  //     }
  
  
  // } catch (error) {
  //     // Handle error
  // }

     
  //    toast("Success!: New Job Created", {
  //        description: "Congratulations, you're one step closer to your next job!",
  //    });
     
  
  // }

  const handleShowForm = (e: any) => {
    setShowForm(!showForm);
  };  

      // Handle changes in input fields
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          jobdata: {
            ...prevState.jobdata,
            [name]: value
          }
        }));
      };

            // Handle changes in status fields
      const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          jobdata: {
            ...prevState.jobdata,
            Status: value
          }
        }));
      };
 
            // Handle changes in ref fields
      const handleRefStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          jobdata: {
            ...prevState.jobdata,
            Referral: value
          }
        }));
      };


// state to show refereeal details
  const [showReferralDetails, setShowReferralDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const referralCheckboxRef = useRef<HTMLButtonElement>(null);

  
  const handleReferralCheckboxChange = (e: any) => {
    setShowReferralDetails(!showReferralDetails);
  };  
  
  const [carosData, setCarosData] = useState<CaroselForm>({
    field1: '',
    field2: '',
    // Add more fields as needed
  });


                // <div className="  overflow-scroll  bottom-10  space-y-4 bg-backback-col px-6 py-2  w-[80vw]  flex flex-col rounded-[0.5em] shadow place-items-center place-content-start">
                //   <form action={addJob} className='w-[100%] flex flex-col gap-2'>
                    
                //     {/* job title */}
                //     <div className=''>
                //       {/* <label htmlFor="JobTitle" className='font-bold'>Add Job Title</label> */}
                //       <Input onChange={handleInputChange} className='border-main-w/30' type="text" id="JobTitle" name="JobTitle" placeholder="Add Job Title" required />
                //     </div>
    
                //   {/* company */}
                //     <div className='mb-2'>
                //       {/* <label className='font-bold' htmlFor="Company">Add Company</label> */}
                //       <Input onChange={handleInputChange} className='border-main-w/30' type="text" id="Company" name="Company" placeholder="Name of Company?" required />
                //     </div>
    
                //     {/* <label className='font-bold' htmlFor="DateApplied">Date Applied</label> */}
                //     <div className='mb-2  outline outline-[1px] outline-main-w/30 py-2 px-3 bg-lprimary rounded-[0.6em] flex justify-start gap-3 place-items-center'>
                //       <input onChange={handleInputChange} type="date" id="DateApplied" name="DateApplied" className='rounded-[0.2em] px-2 bg-lprimary w-[100%] text-main-w ' required />
                //     </div>
    
                //     {/* <label className='font-bold' htmlFor="status">Status</label> */}
                //     <div className='mb-2 outline outline-[1px] outline-main-w/30 py-2 px-3 rounded-[0.6em] bg-lprimary flex justify-start gap-3 place-items-center'>
                //       <select onChange={handleStatusChange} id="status" className='rounded-[0.2em] px-2 bg-lprimary' name="status" required>
                //         <option value="">Select a Status</option>
                //         <option value="Applied">Applied</option>
                //         <option value="Interviewing">Interviewing</option>
                //         <option value="Offer">Offer</option>
                //         <option value="Rejected">Rejected</option>
                //         <option value="Ghosted">Ghosted</option>
                //       </select>
                //     </div>
    
                //     <div>
                //       {/* <label  className='font-bold' htmlFor="Link">Add Link</label> */}
                //       <Input className='border-main-w/30' onChange={handleInputChange} type="text" id="Link" name="Link" placeholder="Link" required />
                //     </div>
    
                //     <div className='cursor-pointer flex place-items-center gap-3 justify-between'>
                //       <label className='font-bold' htmlFor="referral">Referral?</label>
                //       <p onMouseUp={handleReferralCheckboxChange} className='text-muted-foreground hover:text-mprimary text-sm'><em>CLick me to add more information about the referral!</em> </p>
                //     </div>
                //     <div className='mb-2 bg-lprimary outline outline-[1px] outline-main-w/30 py-2 px-3 rounded-[0.6em] flex justify-start gap-3 place-items-center'>
                //       <select onChange={handleRefStatusChange} className='rounded-[0.2em] px-2 bg-lprimary' id="referral" name="referral">
                //         <option value="">Yes or No?</option>
                //         <option value="Yes" >Yes</option>
                //         <option value="No">No</option>
                //       </select>
                //     </div>
    
    
                //     {showReferralDetails && (
                //       <>
                //         <div>
                //           {/* <label className='font-bold' htmlFor="ReferralName">Add Referral Name</label> */}
                //           <Input className='border-main-w/30' onChange={handleInputChange} type="text" id="ReferralName" name="ReferralName" placeholder="Referral Name" />
                //         </div>
    
                //         <div>
                //           {/* <label className='font-bold' htmlFor="ReferralContact">Add Referral Contact</label> */}
                //           <Input className='border-main-w/30' onChange={handleInputChange} type="text" id="ReferralContact" name="ReferralContact" placeholder="Referral Contact" />
                //         </div>
                //       </>
                //     )}
    
                // <div>
                //   <label className='font-bold' htmlFor="ResumeUsed">Add Resume</label>
                //   <Input className='border-main-w/30 cursor-pointer text-main-w' onChange={handleInputChange}  type="file" id="ResumeUsed" name="ResumeUsed" placeholder='Resume Used?' />
                // </div>
    
                // <div className='mb-2'>
                //   <label className='font-bold' htmlFor="Keywords">Add Keywords</label>
                //   <Input className='border-main-w/30' onChange={handleInputChange} type="text" id="Keywords" name="Keywords" placeholder="Keywords" />
                // </div>
    
                // <div className='w-[100%] flex place-items-center place-content-center justify-between'>
                //   <Button className='bg-mprimary hover:bg-mprimary/80' type="submit">Submit</Button>
                //   <Button className='bg-[#fd3330] hover:bg-[#fd3330]/80' onMouseUp={handleShowForm}>Close</Button>
                // </div>
                //   </form>
                // </div>

  return (
    <>

      {!showForm && (
          <>

          <div className="flex text-main-w/30 hover:text-main-w/80   flex-col max-w-[80vw] place-items-center place-content-center  gap-4">
            <div className=' bg-backback-col p-6  w-full rounded-[2.5em] outline outline-lprimary  place-items-center flex justify-between'>
              <button className='flex gap-2 place-items-center' 
              onMouseUp={handleShowForm}
              >
                <h2><FaPlus className=' font-black' size={18}/></h2>
                <h2 className='font-black '>Add Job</h2>
              </button>

            </div>
           </div>
            </>

        )} 
        

        {showForm && (
          <>

        
          
          <Carousel
              opts={{
                align: "start",
              }}
              orientation="horizontal"
              className="w-[30vw]  place-items-center place-content-center"
            >
                <CarouselPrevious />        
                      <form action={addJob} className=''>
                      <CarouselContent className="-mt-1 h-[12vh] flex w-full place-items-center  ">
                            
                           
                            {/* job title */}
                            <CarouselItem>

                            <div className=''>
                              {/* <label htmlFor="JobTitle" className='font-bold'>Add Job Title</label> */}
                              <Input onChange={handleInputChange} className='border-main-w/30' type="text" id="JobTitle" name="JobTitle" placeholder="Add Job Title" required />
                            </div>

                            </CarouselItem>
            
                          {/* company */}
                            <CarouselItem>

                            <div className='mb-2'>
                              {/* <label className='font-bold' htmlFor="Company">Add Company</label> */}
                              <Input onChange={handleInputChange} className='border-main-w/30' type="text" id="Company" name="Company" placeholder="Name of Company?" required />
                            </div>

                            </CarouselItem>

                            {/* <label className='font-bold' htmlFor="DateApplied">Date Applied</label> */}
                            <CarouselItem>
            
                            <div className='mb-2  outline outline-[1px] outline-main-w/30 py-2 px-3 bg-lprimary rounded-[0.6em] flex justify-start gap-3 place-items-center'>
                              <input onChange={handleInputChange} type="date" id="DateApplied" name="DateApplied" className='rounded-[0.2em] px-2 bg-lprimary w-[100%] text-main-w ' required />
                            </div>
                            </CarouselItem>
          
                            {/* <label className='font-bold' htmlFor="status">Status</label> */}
                            <CarouselItem>
                            <div className='mb-2 outline outline-[1px] outline-main-w/30 py-2 px-3 rounded-[0.6em] bg-lprimary flex justify-start gap-3 place-items-center'>
                              <select onChange={handleStatusChange} id="status" className='rounded-[0.2em] px-2 bg-lprimary' name="status" required>
                                <option value="">Select a Status</option>
                                <option value="Applied">Applied</option>
                                <option value="Interviewing">Interviewing</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Ghosted">Ghosted</option>
                              </select>
                            </div>
                            </CarouselItem>

                          {/* <label  className='font-bold' htmlFor="Link">Add Link</label> */}
                            <CarouselItem>

                            <div>
                              <Input className='border-main-w/30' onChange={handleInputChange} type="text" id="Link" name="Link" placeholder="Link" required />
                            </div>
                            </CarouselItem>
       
                            <div className='cursor-pointer flex place-items-center gap-3 justify-between'>
                              <label className='font-bold' htmlFor="referral">Referral?</label>
                              <p onMouseUp={handleReferralCheckboxChange} className='text-muted-foreground hover:text-mprimary text-sm'><em>CLick me to add more information about the referral!</em> </p>
                            </div>
                            <div className='mb-2 bg-lprimary outline outline-[1px] outline-main-w/30 py-2 px-3 rounded-[0.6em] flex justify-start gap-3 place-items-center'>
                              <select onChange={handleRefStatusChange} className='rounded-[0.2em] px-2 bg-lprimary' id="referral" name="referral">
                                <option value="">Yes or No?</option>
                                <option value="Yes" >Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
            
            
                            {showReferralDetails && (
                              <>
                                <div>
                                  {/* <label className='font-bold' htmlFor="ReferralName">Add Referral Name</label> */}
                                  <Input className='border-main-w/30' onChange={handleInputChange} type="text" id="ReferralName" name="ReferralName" placeholder="Referral Name" />
                                </div>
            
                                <div>
                                  {/* <label className='font-bold' htmlFor="ReferralContact">Add Referral Contact</label> */}
                                  <Input className='border-main-w/30' onChange={handleInputChange} type="text" id="ReferralContact" name="ReferralContact" placeholder="Referral Contact" />
                                </div>
                              </>
                            )}
            
                        <div>
                          <label className='font-bold' htmlFor="ResumeUsed">Add Resume</label>
                          <Input className='border-main-w/30 cursor-pointer text-main-w' onChange={handleInputChange}  type="file" id="ResumeUsed" name="ResumeUsed" placeholder='Resume Used?' />
                        </div>
            
                        <div className='mb-2'>
                          <label className='font-bold' htmlFor="Keywords">Add Keywords</label>
                          <Input className='border-main-w/30' onChange={handleInputChange} type="text" id="Keywords" name="Keywords" placeholder="Keywords" />
                        </div>
            
                        <div className='w-[100%] flex place-items-center place-content-center justify-between'>
                          <Button className='bg-mprimary hover:bg-mprimary/80' type="submit">Submit</Button>
                          <Button className='bg-[#fd3330] hover:bg-[#fd3330]/80' onMouseUp={handleShowForm}>Close</Button>
                        </div>

                  
                  </CarouselContent>
                      </form>



              <CarouselNext />
          </Carousel>


          <div className="flex text-main-w/30 hover:text-main-w/80   flex-col w-[100%] place-items-center place-content-center  gap-4">
            <div className='fixed translate-x-[70%] translate-y-[-50%] bg-backback-col p-6  w-[75%] rounded-[2.5em] outline outline-lprimary  place-items-center flex justify-between'>
              <button className='flex gap-2 place-items-center' 
              onMouseUp={handleShowForm}
              >
                {/* <h2><FaPlus className=' font-black' size={18}/></h2> */}
                <h2 className='font-black '>Back</h2>
              </button>

            </div>
           </div>
            
          </>
          )} 


    </>
  );
}

