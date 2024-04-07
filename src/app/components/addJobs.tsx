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
import { IoCloseCircle } from "react-icons/io5";


interface CaroselForm {
  [key: string]: string;
}



export function AddJobs({formopen, handleFormOpen, handleFormClose}: {formopen: any; handleFormOpen: any; handleFormClose: any}) {
  

        
  return (
    <>
          <div className="flex  text-[0.8em] flex-col w-full place-items-end place-content-center  gap-4">
            <div  onClick={handleFormOpen} className='cursor-pointer  p-1 w-max rounded-lg   place-items-center flex justify-between'>

                {formopen === true && (
                  <>
                  <button className='p-4 px-6 text-red-500 rounded-lg h-full w-full flex  gap-2 place-items-center' 
                    >
                    <h2><IoCloseCircle className=' font-black font-bold' size={18}/></h2>
                    <h2 className='font-black '>Close Form</h2>                  
                    </button>
                  </>
                )}

                {formopen === false && (
                  <>
                  <button className='bg-gradient-to-r from-blue-300 to-blue-300 p-4 px-6 rounded-lg h-full w-full flex text-white gap-2 place-items-center' 
                    >
                    <h2><FaPlus className=' font-black' size={18}/></h2>
                    <h2 className='font-black '>Add Job</h2>
                    </button>
                  </>
                )}

            </div>
           </div>

        
    </>
  );
}

