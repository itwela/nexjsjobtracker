
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

// Define the type for formData
interface FormData {
    jobdata: JobData
}




export default function EditJob({ jobdata }: any) {
    const router = useRouter();
    const refr = router.refresh();
    
    const [formData, setFormData] = useState<FormData>({
        jobdata: jobdata
    });

    const [statusValue, setStatusValue] = useState('');
    const [referralValue, setReferralValue] = useState('');
    const [linkValue, setLinkValue] = useState('');

    const fullPath = window.location.pathname;
    // Split the path by '/' to get an array of path segments
    const pathSegments = fullPath.split('/');

    // Get the last segment of the path, which represents the end of the URL
    const endOfUrl = pathSegments[pathSegments.length - 1];

    const filteredJob = jobdata.filter((job: JobData) => job.id === endOfUrl);
    const initialDate = filteredJob.find((job: JobData) => job.id === endOfUrl)?.DateApplied;
    const [datevalue, setdateValue] = React.useState<Dayjs | null>(initialDate);
    // const [datevalue, setdateValue] = React.useState<Dayjs | null>(dayjs(Date.now()));


    const handleSubmit = async () => {

        toast("Success!: Job Update Complete!", {
            description: "Congragulations, you're one steop closer to your next job!",
        })

        // Delay the navigation by 2 seconds (2000 milliseconds)
        setTimeout(() => {
            router.push('/dashboard');
        }, 1000); // Adjust the delay time as needed

    }

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

    const handleDateChange = (duedate: any) => {
        duedate = dayjs(duedate).format('YYYY-MM-DD');
        setdateValue(duedate)
        console.log(duedate);
        setFormData(prevState => ({
            ...prevState,
            jobdata: {
                ...prevState.jobdata,
                DateApplied: duedate
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


    return (
        <>

            {filteredJob.map((job: JobData) => (
                <div  className="flex">

                    <div className="flex  bg-gray-200 min-h-screen flex-col place-items-center    justify-items-start">

                        <div className='flex   w-[100%] py-5 place-items-start place-content-start absolute justify-items-start justify-content-start px-5'>
                            <Link href='/dashboard'>
                                <h1 className='text-3xl hover:text-main-w/80'>JobKompass</h1>
                            </Link>
                            <div className='flex px-5 pt-2'>
                            </div>
                        </div>


                        <div className="pagewrapper flex place-content-center w-[100vw] pt-[6em]">

                            <Card className="mb-7 w-[70%] ">
                                <CardHeader>
                                    <div className="flex py-3 justify-between place-items-start ">
                                        <div>
                                            <CardTitle>Edit Job</CardTitle>
                                            <CardDescription className="w-[70%] pt-2 ">Customize job status, keywords, company details, and more to suit your needs.</CardDescription>
                                        </div>
                                        <Link href="/dashboard">
                                            <FaRightLong size={25} className='scale-x-[-100%]' />
                                        </Link>
                                    </div>
                                </CardHeader>

                                <CardContent>

                                    <form key={endOfUrl} action={updateJobData} className='w-[100%] flex flex-col gap-2'>

                                        {/* jobid */}
                                        <input type="hidden" name="jobId" value={job.id} />

                                        {/* job title */}
                                        <div className=''>
                                            <label htmlFor="JobTitle" className='font-bold'>Edit Job Title</label>
                                            <Input className="border-transparent bg-white " type="text" id="JobTitle" onChange={handleInputChange} name="JobTitle" defaultValue={job.JobTitle as string ? job.JobTitle : ''} />
                                        </div>

                                        {/* company */}
                                        <div className='mb-2'>
                                            <label className='font-bold' htmlFor="Company">Edit Company</label>
                                            <Input className="border-transparent bg-white" type="text" id="Company" onChange={handleInputChange} name="Company" defaultValue={job.Company as string ? job.Company : ''} />
                                        </div>

                                        {/* Date Applied */}
                                        <label className='font-bold' htmlFor="DateApplied">Date Applied - {initialDate}</label>
                                        <div className='mb-2   py-2 px-3 rounded-[0.6em] flex justify-start gap-3 place-items-center bg-white'>
                                            <input type="hidden" name="DateApplied" value={dayjs(datevalue).format('YYYY-MM-DD')} />
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateCalendar
                                                    className=""
                                                    onChange={(datevalue) => handleDateChange(datevalue)}
                                                >
                                                </DateCalendar>

                                            </LocalizationProvider> 
                                        </div>

                                        <label className='font-bold' htmlFor="status">Status</label>
                                        <div className='mb-2  py-2 px-3 rounded-[0.6em] bg-white flex justify-start gap-3 place-items-center'>
                                            <select id="status" onChange={handleStatusChange} className='rounded-[0.2em] px-2 bg-white w-full' name="status" defaultValue={job.Status as string} >
                                                <option value="">Select a Status</option>
                                                <option value="Applied">Applied</option>
                                                <option value="Interviewing">Interviewing</option>
                                                <option value="Offer">Offer</option>
                                                <option value="Rejected">Rejected</option>
                                                <option value="Ghosted">Ghosted</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className='font-bold' htmlFor="Link">Edit Link</label>
                                            <Input type="text" className="border-transparent bg-white" onChange={handleLinkChange} id="Link" name="Link" defaultValue={job.Link ? job.Link : ''} />
                                        </div> 

                                        <div className='cursor-pointer flex place-items-center gap-3 justify-between'>
                                            <label className='font-bold' htmlFor="referral">Referral?</label>
                                        </div>

                                        <div className='mb-2  bg-white py-2 px-3 rounded-[0.6em] flex justify-start gap-3 place-items-center'>
                                            <select onChange={handleRefStatusChange} className='rounded-[0.2em] bg-white px-2 w-full' id="referral" name="referral" defaultValue={job.Referral as string ? job.Referral : ''}>
                                                <option value="">Yes or No?</option>
                                                <option value="Yes" >Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>


                                        <div>
                                            <label className='font-bold' htmlFor="ReferralName">Edit Referral Name</label>
                                            <Input className="border-transparent bg-white" type="text" onChange={handleInputChange} id="ReferralName" name="ReferralName" defaultValue={job.ReferralName ? job.ReferralName : ''} />
                                        </div>

                                        <div>
                                            <label className='font-bold' htmlFor="ReferralContact">Edit Referral Contact</label>
                                            <Input className="border-transparent bg-white" type="text" onChange={handleInputChange} id="ReferralContact" name="ReferralContact" defaultValue={job.ReferralContact ? job.ReferralContact : ''} />
                                        </div>


                                        <div className='mb-2'>
                                            <label className='font-bold' htmlFor="Keywords">Edit Keywords</label>
                                            <Input className="border-transparent bg-white" type="text" id="Keywords" name="Keywords" onChange={handleInputChange} defaultValue={job.Keywords ? job.Keywords : ''} />
                                        </div>

                                        <div className='w-[100%] pt-2 flex place-items-center place-content-center justify-between'>
                                            <Link href="/dashboard">
                                                <Button className='bg-[#fd3330] hover:bg-[#fd3330]/80 text-white'>Back</Button>
                                            </Link>
                                            <Button className='bg-main-w hover:bg-main-w/80 text-dprimary' type="submit">Update</Button>
                                        </div>
                                    </form>

                                </CardContent>

                            </Card>
                        </div>

                    </div>
                </div>
            ))}
        </>
    );
};


