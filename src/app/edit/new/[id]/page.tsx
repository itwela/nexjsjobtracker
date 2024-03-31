
'use client'

import { updateJobData } from "@/actions/databaseAc";
import Secondheader from "@/app/components/secondHeader";
import { JobData, JobDataProps } from "@/app/types/JobTypes";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { FaRightLong } from "react-icons/fa6";
import { toast } from "sonner";
import { date } from "zod";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import Popover from "@mui/material/Popover";
import { IoArrowBack } from "react-icons/io5";

// Define the type for formData
interface FormData {
    jobdata: JobData
}

interface EditJobProps {
    jobdata: JobData[];
    jobId: string;
}


export default function EditJob({ jobdata }: any, { jobId }: any) {


    const [formData, setFormData] = useState<FormData>({
        jobdata: jobdata
    });

    const [statusValue, setStatusValue] = useState('');
    const [referralValue, setReferralValue] = useState('');
    const [linkValue, setLinkValue] = useState('');

    // Get the last segment of the path, which represents the end of the URL

    const initialDate = jobdata.DateApplied
    const [datevalue, setdateValue] = useState(initialDate);
    // const [datevalue, setdateValue] = React.useState<Dayjs | null>(dayjs(Date.now()));
    console.log(datevalue);

    // Handle changes in the input fields
    // Handle changes in input fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            text: {
                ...prevState.jobdata,
                [name]: value
            }
        }));
    };

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Remove "https://" from the beginning of the value, if present
        const cleanedValue = value.replace(/^https:\/\//i, '');
        setLinkValue(cleanedValue);

        setFormData(prevState => ({
            ...prevState,
            text: {
                ...prevState.jobdata,
                [name]: linkValue
            }
        }));
    };

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
    

    const handleDateChange = (duedate: any) => {
        const theduedate = dayjs(duedate).format('YYYY-MM-DD');
        setdateValue(theduedate)
        console.log(datevalue);
        setFormData(prevState => ({
            ...prevState,
            jobdata: {
                ...prevState.jobdata,
                DateApplied: datevalue
            }
        }))
    };

    // Handle changes in status fields
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        // console.log("Name:", name);
        // console.log("Value:", value);
        setFormData(prevState => ({
            ...prevState,
            text: {
                ...prevState.jobdata,
                Status: value // Here use 'Status' or [name] depending on your naming convention
            }
        }));
    };

    // Handle changes in status fields
    const handleRefStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        // console.log("Name:", name);
        // console.log("Value:", value);
        setFormData(prevState => ({
            ...prevState,
            text: {
                ...prevState.jobdata,
                Referral: value // Here use 'Status' or [name] depending on your naming convention
            }
        }));
    };

    const successUpdate = () => {
        
        setTimeout(() => {           
            toast.success('Job updated successfully', {
                description: "Congragulations, you're one step closer to your next job!",
                id: "jobupdatesuccess",
                style: {
                  backgroundColor: '#22c55e',
                }
                });
            }, 1618);
            
    };

    const test = () => {
        console.log(jobdata);
    }
    
    return (
        <>   
                <h2 className="text-2xl font-bold mb-5">{jobdata.JobTitle}</h2>
                <form  action={updateJobData} className='w-[100%] h-[100%] flex flex-col gap-2'>

                    {/* jobid */}
                    <input type="hidden" name="jobId" value={jobdata.id} />

                    {/* job title */}
                    <div className=''>
                        <label htmlFor="JobTitle" className='font-bold'>Edit {jobdata.JobTitle}</label>
                        <Input className="border-transparent bg-white " type="text" id="JobTitle" onChange={handleInputChange} name="JobTitle" defaultValue={jobdata.JobTitle as string ? jobdata.JobTitle : ''} />
                    </div>

                    {/* company */}
                    <div className='mb-2'>
                        <label className='font-bold' htmlFor="Company">Edit Company</label>
                        <Input className="border-transparent bg-white" type="text" id="Company" onChange={handleInputChange} name="Company" defaultValue={jobdata.Company as string ? jobdata.Company : ''} />
                    </div>

                    <div className="mb-2">
                        {/* Date Applied */}
                        <label className='font-bold' htmlFor="DateApplied">Edit Date Applied</label>
                        <input type="hidden" name="DateApplied" value={dayjs(datevalue).format('YYYY-MM-DD')} />
                                                    <button onClick={handleDateClick} className='rounded-lg bg-white px-2 py-2 flex place-items-start  w-[100%]  '>{dayjs(datevalue).format('DD/MM/YYYY')}</button>
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
                                    <span className="bg-slate-100 hover:bg-slate-200 p-2 py-2 rounded-lg cursor-pointer" onClick={handleDateClose}>Cancel</span>
                                    <span className="min-w-[5em] bg-blue-500 place-content-center place-items-center cursor-pointer flex p-2 py-2 text-white rounded-lg" onClick={handleDateClose}>Ok</span>
                                </span>
                            </span>
                        </Popover>
                    </div>

                    {/* <div className='mb-2   py-2 px-3 rounded-[0.6em] flex justify-start gap-3 place-items-center bg-white'>
                        <input type="hidden" name="DateApplied" value={dayjs(datevalue).format('YYYY-MM-DD')} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                className=""
                                onChange={(datevalue) => handleDateChange(datevalue)}
                            >
                            </DateCalendar>

                        </LocalizationProvider>
                    </div> */}

                    <label className='font-bold' htmlFor="status">Status</label>
                    <div className='mb-2  py-2 px-3 rounded-[0.6em] bg-white flex justify-start gap-3 place-items-center'>
                        <select id="status" onChange={handleStatusChange} className='rounded-[0.2em] px-2 bg-white w-full' name="status" defaultValue={jobdata.Status as string} >
                            <option value="">Select a Status</option>
                            <option value="Interested">Interested</option>
                            <option value="Applied">Applied</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Ghosted">Ghosted</option>
                        </select>
                    </div>

                    <div>
                        <label className='font-bold' htmlFor="Link">Edit Link</label>
                        <Input type="text" className="border-transparent bg-white" onChange={handleLinkChange} id="Link" name="Link" defaultValue={jobdata.Link ? jobdata.Link : ''} />
                    </div>

                    {/* <div className='cursor-pointer flex place-items-center gap-3 justify-between'>
                        <label className='font-bold' htmlFor="referral">Referral?</label>
                    </div> */}


                    <div className='flex flex-col gap-2'>
                        <label className='font-bold ' htmlFor="ResumeUsed">Add Resume</label>
                        <Input autoComplete="off" className='bg-white cursor-pointer ' onChange={handleInputChange} type="file" id="ResumeUsed" name="ResumeUsed" placeholder='Resume Used?' />
                    </div>

                    <div className='mb-2'>
                        <label className='font-bold' htmlFor="Keywords">Edit Keywords</label>
                        <Input className="border-transparent bg-white" type="text" id="Keywords" name="Keywords" onChange={handleInputChange} defaultValue={jobdata.Keywords ? jobdata.Keywords : ''} />
                    </div>

                    <div className='w-[100%] pt-2 flex place-items-end place-content-end '>
                        <Button className='bg-blue-500/80 hover:bg-blue-500 text-white' type="submit">Update</Button>
                    </div>

                </form>
        </>
    );
};


