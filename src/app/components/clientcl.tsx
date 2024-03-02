'use client'




import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { FaRegCopy } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { toast } from "sonner";



interface JobData {
  Company: string;
  CoverLetters: Array<{
    id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    jobId: string;
  }> | null;
  DateApplied: string;
  Introduction: string | null;
  JobTitle: string;
  Keywords: string | null;
  Link: string;
  Referral: string;
  ReferralContact: string | null;
  ReferralName: string | null;
  ResumeUsed: string | null;
  Status: string;
  createdAt: string;
  id: string;
  updatedAt: string;
  userId: string;
}

export interface Pokedex {
  cldata: Cldatum[];
}

export interface Cldatum {
  coverLetters: CoverLetter[];
}

export interface CoverLetter {
  id:        string;
  text:      string;
  createdAt: Date;
  updatedAt: Date;
  userId:    string;
  jobId:     string;
}





export default function NewClCard() {
    
  useEffect(() => {
      getJobId()
    }, [])  

    const [isLoading, setIsLoading] = useState(false)
    const [coverText, setCoverText] = useState()
    const [inputText, setInputText] = useState('')
    const [jobData, setJobData] = useState<JobData[]>([]);
    const [clData, setClData] = useState<Pokedex>({ cldata: [] });
    const [jobId, setJobId] = useState('')
    const [jobIdFromUrl, setJobIdFromUrl] = useState('') 
    const [selectedJobId, setSelectedJobId] = useState<string>('');

    const handleInputChange = (event: any) => {
        setInputText(event.target.value);
        console.log(inputText)
    }

    const handleSubmit = async (event: any) => {
        
        const jobDescription = inputText // Assuming your textarea has the name 'input'
        const jobId = jobIdFromUrl
        try {
            const response = await fetch('/api/openai/coverletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    input: jobDescription,
                    id: jobId
                })
            });
        
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
        
            const data = await response.json();
            const { text } = data;
            console.log(text)
            const lines = text.split('\n');
            const formattedText = lines.map((line:any, index:any) => (
                <p key={index}>{line}</p>
            ));

            // Add extra space after the first 3 lines
            if (lines.length > 3) {
                formattedText.splice(3, 0, <br key="extra-space-1" />);
            }

            // Add extra space before the 3rd to last line
            if (lines.length > 4) {
                formattedText.splice(formattedText.length - 3, 0, <br key="extra-space-2" />);
            }
            setCoverText(formattedText); // Set the formatted text in your state variable

            toast("Success!: Cover Letter Generated",{
                description: "Congragulations, you're one steop closer to your next job!",
              })

        } catch (error) {
            // Handle error
        }


    };

    // function copyText() {
    //     const element = document.getElementById("editcov-text");
      
    //     if (element instanceof HTMLTextAreaElement) {
    //       const textToCopy = element.innerText;
      
    //       navigator.clipboard.writeText(textToCopy)
    //     }

    //       toast("Success!: Cover Letter Copied", {
    //         description: "Congratulations, you're one step closer to your next job!",
    //     });        

    // }

    const getJobId = async () => {

      const fullPath = window.location.pathname;
      // Split the path by '/' to get an array of path segments
      const pathSegments = fullPath.split('/');

      // Get the last segment of the path, which represents the end of the URL
      const endOfUrl = pathSegments[pathSegments.length - 1];

      setJobIdFromUrl(endOfUrl)

        const hello = 'hi api for cover letter job id'
    
        try {
          const response = await fetch('/api/db/getalljobs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              input: hello
            })
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
    
          const data = await response.json();
          console.log('Fetched data:', data); // Log the fetched data
          setJobData(data.jobdata); 

        } catch {
    
        }
    
      

        try {
          const response = await fetch('/api/db/getjobwithcl', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              input: hello
            })
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
    
          const cldata = await response.json();
          console.log('Fetched data:', cldata); // Log the fetched data
          setClData(cldata); 
        } catch {
    
        }

    
      }

      const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newJobId = e.target.value; // Get the new jobId from the selected option's value
        const { value } = e.target
        setJobId(newJobId); // Update the jobId state with the new value
        setSelectedJobId(value);
    };

    // Find the selected job in the jobData array
    const selectedJob = jobData.find(job => job.id === jobIdFromUrl);

    // Get the CoverLetter text of the selected job
    const jobtitle = selectedJob?.JobTitle || ''
    const joblink = selectedJob?.Link || ''; // Assuming selectedJob?.Link contains the relative URL

    // Remove any leading slash to prevent double slashes
    const linkWithoutLeadingSlash = joblink.replace(/^\//, '');
    
    // Construct the full URL pathname
    const companyname = selectedJob?.Company || ''
    const coverlettertext = clData.cldata[0]?.coverLetters[0]?.text || '';
    return (
        <>

              <div className="flex  w-[90%] py-5">
                <h1 className="text-4xl font-bold text-main-w/70">{companyname} cover letter</h1>
              </div>

                <form action={handleSubmit} className=' flex flex-col gap-2 '>
                    <span id="status" className='border-transparent justify-between flex rounded-[0.2em] p-2 bg-lprimary w-full'>
                       <span className="text-transparent">Link - </span>
                       <span className="flex gap-2">
                         {joblink}
                         <FaLink/>
                       </span> 
                    </span>
                        <span className="relative">
                          <Textarea onChange={handleInputChange} name="" id="editcov-text" defaultValue={coverlettertext}  className='min-h-[70vh]  border-transparent'>
                          </Textarea>
                          {/* <FaRegCopy size={36} onClick={copyText} className="absolute cursor-pointer top-3 right-3 cursor-pointer text-main-w/70 hover:text-main-w font-black p-2 bg-lprimary" /> */}
                        </span>
                </form>
                  
        </>
    )
}