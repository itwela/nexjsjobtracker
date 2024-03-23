'use client'

import React, { useEffect, useState, useRef }  from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// checkbox
// submit data
import { addJob } from '@/actions/databaseAc';
// 
import { FaPlus, FaPlusCircle } from 'react-icons/fa';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import router from "next/router";
import AddJobForm from './addJobForm';


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

export function AddJobs({handleFormOpen, handleFormClose}: {handleFormOpen: any; handleFormClose: any}) {
  
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({ jobdata: { Company: "", DateApplied: "", Introduction: null, JobTitle: "", Keywords: "", Link: "", Referral: "", ReferralContact: null, ReferralName: null, ResumeUsed: "", Status: "", createdAt: "", id: "", updatedAt: "", userId: "" } });


  const [carosData, setCarosData] = useState<CaroselForm>({
    field1: '',
    field2: '',
    // Add more fields as needed
  });
  

        
  return (
    <>
          <div className="flex  text-[0.8em] flex-col w-full place-items-end place-content-center  gap-4">
            <div  onClick={handleFormOpen} className='cursor-pointer  p-4 px-6  w-max rounded-lg bg-gradient-to-l from-blue-900 to-blue-400 hover:outline outline-[1px] hover:outline-[1px] ease-in outline-main-w/40  place-items-center flex justify-between'>
              <button className='flex text-white w gap-2 place-items-center' 
              >
                <h2><FaPlus className=' font-black' size={18}/></h2>
                <h2 className='font-black '>Add Job</h2>
              </button>

            </div>
           </div>

        
    </>
  );
}

