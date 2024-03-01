
'use client'

import Secondheader from "@/app/components/secondHeader";
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
import { useEffect, useState } from "react";
import { FaRightLong } from "react-icons/fa6";
import { toast } from "sonner";



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


  
  
export default  function  EditJob() {
    const [formData, setFormData] = useState<FormData>({ jobdata: { Company: "", DateApplied: "", Introduction: null, JobTitle: "", Keywords: "", Link: "", Referral: "", ReferralContact: null, ReferralName: null, ResumeUsed: "", Status: "", createdAt: "", id: "", updatedAt: "", userId: "" } });
    const [statusValue, setStatusValue] = useState('');
    const [referralValue, setReferralValue] = useState('');
    const router = useRouter();

    useEffect(() => {

        const getFormstuff = async () => {
            
            const fullPath = window.location.pathname;
            // Split the path by '/' to get an array of path segments
            const pathSegments = fullPath.split('/');
    
            // Get the last segment of the path, which represents the end of the URL
            const endOfUrl = pathSegments[pathSegments.length - 1];
    
            // console.log(endOfUrl)

            try {
                    const response = await fetch('/api/db/getuniquedata', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            input: endOfUrl
                        })
                    });
                
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                
                    const data = await response.json();
                    setFormData(data); // Set the form data in state   
                    // console.log(data)


            
            
                    toast("How's the Job Search?",{
                        description: "Use this page to update Status, Contact information and much more!",
                      })
                      
                
                    } catch (error) {
                    // Handle error
                }
        }


        getFormstuff();

        // Get the full path of the current URL



    }, [])

    const handleSubmit = async () => {

        const fullPath = window.location.pathname;
        // Split the path by '/' to get an array of path segments
        const pathSegments = fullPath.split('/');

        // Get the last segment of the path, which represents the end of the URL
        const endOfUrl = pathSegments[pathSegments.length - 1];
        
        const updatedFormData = { ...formData }; // Create a copy of formData
        updatedFormData.jobdata.id = endOfUrl; // Update the id field
        setFormData(updatedFormData); // Update the state

        try {
            const response = await fetch('/api/db/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    input: updatedFormData
                })
            });
        
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            
    
            toast("Success!: Job Update Complete!",{
                description: "Congragulations, you're one steop closer to your next job!",
              })

        revalidatePath('/dashboard');

        } catch (error) {
            // Handle error
        }

        // Delay the navigation by 2 seconds (2000 milliseconds)
        setTimeout(() => {
            router.push('/dashboard');
        }, 4000); // Adjust the delay time as needed
        
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
                {/* <Secondheader/> */}

    <div className="flex">

    <div className="flex text-main-w  bg-backback-col min-h-screen flex-col place-items-center    justify-items-start">

            <div className='flex  bg-backback-col w-[100%] py-5 place-items-start place-content-start absolute justify-items-start justify-content-start px-5'>
                <Link href='/dashboard'>
                <h1 className='text-3xl hover:text-main-w/80'>JobKompass</h1>
                </Link>
                <div className='flex px-5 pt-2'>
                </div>
            </div>


        <div className="pagewrapper flex place-content-center w-[100vw] pt-[6em]">

                <Card className="mb-7 w-[70%] border-lprimary">
                    <CardHeader>
                        <div className="flex py-3 justify-between place-items-start ">
                                <div>
                                    <CardTitle>Edit Job</CardTitle>
                                    <CardDescription className="w-[70%] pt-2 text-main-w/60">Customize job status, keywords, company details, and more to suit your needs.</CardDescription>                       
                                </div>
                                <Link href="/dashboard">
                                <FaRightLong size={25} className='scale-x-[-100%] text-main-w hover:text-mprimary/70'/>
                                </Link>
                        </div>
                    </CardHeader>
                    
                        <CardContent>
                    
                        <form action={handleSubmit} className='w-[100%] flex flex-col gap-2'>
            
                                {/* job title */}
                                <div className=''>
                                <label htmlFor="JobTitle" className='font-bold test-main-w'>Edit Job Title</label>
                                <Input className="border-transparent " type="text" id="JobTitle" onChange={handleInputChange} name="JobTitle" defaultValue={formData?.jobdata.JobTitle} />
                                </div>

                            {/* company */}
                                <div className='mb-2'>
                                <label className='font-bold test-main-w' htmlFor="Company">Edit Company</label>
                                <Input className="border-transparent" type="text" id="Company" onChange={handleInputChange} name="Company" defaultValue={formData?.jobdata.Company} />
                                </div>

                                <label className='font-bold test-main-w' htmlFor="DateApplied">Date Applied</label>
                                <div className='mb-2   py-2 px-3 rounded-[0.6em] flex justify-start gap-3 place-items-center bg-lprimary'>
                                <input  type="date" id="DateApplied" onChange={handleInputChange} name="DateApplied" className='rounded-[0.2em] px-2 bg-lprimary w-full'   />
                                </div>

                                <label className='font-bold test-main-w' htmlFor="status">Status</label>
                                <div className='mb-2  py-2 px-3 rounded-[0.6em] bg-lprimary flex justify-start gap-3 place-items-center'>
                                <select id="status" onChange={handleStatusChange} className='rounded-[0.2em] px-2 bg-lprimary w-full' name="status" >
                                    <option value="">Select a Status</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Interviewing">Interviewing</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Ghosted">Ghosted</option>
                                </select>
                                </div>

                                <div>
                                <label  className='font-bold test-main-w' htmlFor="Link">Edit Link</label>
                                <Input type="text" className="border-transparent" onChange={handleInputChange} id="Link" name="Link" defaultValue={formData?.jobdata.Link}  />
                                </div>

                                <div className='cursor-pointer flex place-items-center gap-3 justify-between'>
                                <label className='font-bold test-main-w' htmlFor="referral">Referral?</label>
                                </div>

                                <div className='mb-2  bg-lprimary py-2 px-3 rounded-[0.6em] flex justify-start gap-3 place-items-center'>
                                <select onChange={handleRefStatusChange} className='rounded-[0.2em] bg-lprimary px-2 w-full' id="referral" name="referral">
                                    <option value="">Yes or No?</option>
                                    <option value="Yes" >Yes</option>
                                    <option value="No">No</option>
                                </select>
                                </div>


                                    <div>
                                    <label className='font-bold test-main-w' htmlFor="ReferralName">Edit Referral Name</label>
                                    <Input className="border-transparent" type="text" onChange={handleInputChange} id="ReferralName" name="ReferralName" defaultValue={formData?.jobdata.ReferralName ? formData?.jobdata.ReferralName : ''} />
                                    </div>

                                    <div>
                                    <label className='font-bold test-main-w' htmlFor="ReferralContact">Edit Referral Contact</label>
                                    <Input className="border-transparent" type="text" onChange={handleInputChange} id="ReferralContact" name="ReferralContact"  defaultValue={formData?.jobdata.ReferralContact ? formData?.jobdata.ReferralContact : ''} />
                                    </div>


                            <div>
                            <label className='font-bold test-main-w' htmlFor="ResumeUsed">Edit Resume</label>
                            <Input className='cursor-pointer border-transparent' onChange={handleInputChange} type="file" id="ResumeUsed" name="ResumeUsed" />
                            </div>

                            <div className='mb-2'>
                            <label className='font-bold test-main-w' htmlFor="Keywords">Edit Keywords</label>
                            <Input className="border-transparent"  type="text" id="Keywords" name="Keywords" onChange={handleInputChange}  defaultValue={formData?.jobdata.Keywords ? formData?.jobdata.Keywords : ''} />
                            </div>

                            <div className='w-[100%] pt-2 flex place-items-center place-content-center justify-between'>
                                <Link href="/dashboard">
                                    <Button className='bg-[#fd3330] hover:bg-[#fd3330]/80'>Back</Button>  
                                </Link>
                                <Button className='bg-main-w hover:bg-main-w/80 text-dprimary' type="submit">Update</Button>
                            </div>
                        </form>

                    </CardContent>

                </Card>
        </div>

        </div>
    </div>
    </>
);
};
  

