'use client'

import { addJob } from "@/actions/databaseAc";
import { Carousel, CarouselPrevious, CarouselContent, CarouselItem, CarouselNext } from "@/components/ui/carousel";
import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import Popover from "@mui/material/Popover";


// Define the type for formData
interface FormData {
    jobdata: {
        Company: string;
        DateApplied: string;
        Introduction: string | null;
        JobTitle: string;
        Keywords: string;
        Link: string;
        Referral: string | null;
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


export default function AddJobForm({ formopen, handleClose }: { formopen: any; handleClose: any }) {
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

    const [formData, setFormData] = useState<FormData>({ jobdata: { Company: "", DateApplied: "", Introduction: null, JobTitle: "", Keywords: "", Link: "", Referral: null, ReferralContact: null, ReferralName: null, ResumeUsed: "", Status: "", createdAt: "", id: "", updatedAt: "", userId: "" } });

    // Hndle date
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleDateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDateClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const [datevalue, setdateValue] = React.useState<Dayjs | null>(dayjs(Date.now()));
    const handleDateChange = (duedate: any) => {
        duedate = dayjs(duedate).format('YYYY-MM-DD');
        setdateValue(duedate)
        setFormData(prevState => ({
            ...prevState,
            jobdata: {
                ...prevState.jobdata,
                DateApplied: duedate
            }
        }))
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

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // Remove "https://" from the beginning of the value
        const cleanedValue = value.replace(/^https:\/\//, '');
    
        setFormData(prevState => ({
            ...prevState,
            text: {
                ...prevState.jobdata,
                [name]: cleanedValue
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


    return (
        <>
            {formopen && (
                <div className='flex flex-col place-items-center'>
                    <p className='text-[0.5em] mb-7 sm:mb-0 sm:text-sm /50'>*Tip: Pressing the left or right keys will move you along!</p>

                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        orientation="horizontal"
                        className="w-[70%] flex pt-2  place-items-center place-content-center"
                    >
                        <CarouselPrevious className="bg-white" />
                        <form action={addJob} className=''>
                            <CarouselContent className="w-[70vw]  sm:w-[40vw] flex  place-items-center place-content-start  z-5">
                                <CarouselItem className='w-full'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="JobTitle" className='font-bold'>Add Job Title</label>
                                        <Input autoComplete="off" onChange={handleInputChange} className='bg-white' type="text" id="JobTitle" name="JobTitle" placeholder="Add Job Title" required />
                                    </div>
                                </CarouselItem>

                                <CarouselItem className='w-full'>
                                    <div className='flex flex-col gap-2 '>
                                        <label className='font-bold' htmlFor="Company">Add Company</label>
                                        <Input autoComplete="off" onChange={handleInputChange} className='bg-white' type="text" id="Company" name="Company" placeholder="Name of Company?" required />
                                    </div>
                                </CarouselItem>

                                <CarouselItem>
                                    <div className='flex flex-col gap-2'>
                                        <label className='font-bold' htmlFor="DateApplied">Date Applied - {datevalue ? dayjs(datevalue).format('DD/MM/YYYY') : ""}</label>
                                        <div className='  py-1 px-3  rounded-[0.6em] flex justify-start gap-3 place-items-center'>
                                            <input type="hidden" name="DateApplied" value={dayjs(datevalue).format('YYYY-MM-DD')} />
                                            <button onClick={handleDateClick} className='rounded-lg bg-white px-2 py-2 flex place-items-start  w-[100%]  '>Pick a Date</button>
                                            <Popover
                                                id={id}
                                                open={open}
                                                onClose={handleDateClose}
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >
                                                <span className="flex flex-col pb-5 place-items-center">

                                                    {/* date */}
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DateCalendar
                                                            onChange={(datevalue) => handleDateChange(datevalue)}
                                                        >
                                                        </DateCalendar>

                                                    </LocalizationProvider>

                                                    <span className="flex gap-4">
                                                        <span  className="bg-slate-100 hover:bg-slate-200 p-2 py-2 rounded-lg cursor-pointer" onClick={handleDateClose}>Cancel</span> 
                                                        <span className="min-w-[5em] bg-blue-500 place-content-center place-items-center cursor-pointer flex p-2 py-2 text-white rounded-lg" onClick={handleDateClose}>Ok</span>
                                                    </span>
                                                </span>
                                            </Popover>

                                        </div>
                                        </div>
                            </CarouselItem>

                            <CarouselItem>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold' htmlFor="status">Status</label>
                                    <div className='  py-1 px-3 rounded-[0.6em]  flex justify-start gap-3 place-items-center w-full'>
                                        <select onChange={handleStatusChange} id="status" className='rounded-[0.2em] px-2 py-2  w-full' name="status" required>
                                            <option value="">Select a Status</option>
                                            <option value="Interested">Interested</option>
                                            <option value="Applied">Applied</option>
                                            <option value="Interviewing">Interviewing</option>
                                            <option value="Offer">Offer</option>
                                            <option value="Rejected">Rejected</option>
                                            <option value="Ghosted">Ghosted</option>
                                        </select>
                                    </div>
                                </div>
                            </CarouselItem>

                            <CarouselItem>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold' htmlFor="Link">Link</label>
                                    <Input autoComplete="off" className='bg-white' onChange={handleLinkChange} type="text" id="Link" name="Link" placeholder="Link" required />
                                </div>
                            </CarouselItem>

                            <CarouselItem>
                                <div className='cursor-pointer flex flex-col gap-2 justify-between'>
                                    <label onMouseUp={handleReferralCheckboxChange} className='font-bold ' htmlFor="Referral">Referral?</label>
                                    <div className='  w-full py-1 px-3 rounded-[0.6em] flex justify-start gap-3 place-items-center'>
                                        <select onChange={handleRefStatusChange} className='rounded-[0.2em] px-2 py-2 w-full ' id="referral" name="referral" defaultValue="No">
                                            <option value="">Yes or No?</option>
                                            <option value="Yes" >Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                            </CarouselItem>

                            <CarouselItem>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold' htmlFor="ReferralName">Referral Name</label>
                                    <Input autoComplete="off" className='bg-white' onChange={handleInputChange} type="text" id="ReferralName" name="ReferralName" placeholder="Referral Name" />
                                </div>
                            </CarouselItem>

                            <CarouselItem>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold' htmlFor="ReferralContact">Referral Contact</label>
                                    <Input autoComplete="off" className='bg-white' onChange={handleInputChange} type="text" id="ReferralContact" name="ReferralContact" placeholder="Referral Contact" />
                                </div>
                            </CarouselItem>

                            <CarouselItem>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold ' htmlFor="ResumeUsed">Add Resume</label>
                                    <Input autoComplete="off" className='bg-white cursor-pointer ' onChange={handleInputChange} type="file" id="ResumeUsed" name="ResumeUsed" placeholder='Resume Used?' />
                                </div>
                            </CarouselItem>

                            <CarouselItem>
                                <div className=' flex flex-col gap-2'>
                                    <label className='font-bold' htmlFor="Keywords">Add Keywords</label>
                                    <Input autoComplete="off" className='bg-white' onChange={handleInputChange} type="text" id="Keywords" name="Keywords" placeholder="Keywords" />
                                </div>
                            </CarouselItem>

                            <CarouselItem>
                                <div className='w-[100%] flex flex-col place-items-center place-content-center justify-between'>
                                    <Button className='bg-main-w hover:bg-main-w/80 text-mprimary' type="submit">Submit</Button>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </form>
                    <CarouselNext className="bg-white" />
                </Carousel>
    
                </div >
            )
}
        </>
    );
    
}