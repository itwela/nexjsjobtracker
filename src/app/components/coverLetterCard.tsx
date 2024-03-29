'use client'




import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from 'react';
import { FaPlus, FaRegCopy } from "react-icons/fa";
import { toast } from "sonner";
import { IoCheckmarkDone } from "react-icons/io5";



interface JobData {

  Company: string;
  CoverLetter: {
    id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    jobId: string;
  } | null;
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


export default function CoverLetterCard({ jobdata }: { jobdata: any }) {

  useEffect(() => {
    getJobId()
    setJobId('')
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const [coverText, setCoverText] = useState()
  const [inputText, setInputText] = useState('')
  const [jobData, setJobData] = useState<JobData[]>([]);
  const [jobId, setJobId] = useState('')
  const [selectedJobId, setSelectedJobId] = useState<string>('');

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
    console.log(inputText)
  }

  const handleSubmit = async () => {

    setIsLoading(true)
    const jobDescription = inputText // Assuming your textarea has the name 'input'

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
      const formattedText = lines.map((line: any, index: any) => (
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

      setIsLoading(false)
      toast("Success!: Cover Letter Generated", {
        description: "Congragulations, you're one steop closer to your next job!",
        id: "coversuccess",
        style: {
          backgroundColor: '#22c55e',
        }
      })

    } catch (error) {
      toast("Error.", {
        description: "There was an error generating your cover letter, Please try again later",
        id: "covererror",
        style: {
          backgroundColor: '#ef4444',
        }
      })    }


  };

  function copyText() {
    const element = document.getElementById("cov-text");

    if (element instanceof HTMLSpanElement) {
      const textToCopy = element.innerText;

      navigator.clipboard.writeText(textToCopy)
    }

    toast("Success!: Cover Letter Copied", {
      description: "Congratulations, you're one step closer to your next job!",
    });

  }

  const getJobId = async () => {
    const thejob = jobId

    try {
      const response = await fetch('/api/db/getalljobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: thejob
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      // console.log('Fetched data:', data); // Log the fetched data
      setJobData(data.jobdata);

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
  const selectedJob = jobData.find(job => job.id === selectedJobId);

  // Get the CoverLetter text of the selected job
  const coverLetterText = selectedJob?.CoverLetter?.text || ''

  return (
    <>
      {/* <CardHeader className="py-1"> */}
      {/* </CardHeader> */}

      <div className='w-full flex flex-col gap-4'>
        <select id="status" onChange={handleStatusChange} className='border-transparent rounded-[0.2em] p-2 bg-white w-full' name="status" required>
          <option value="">Select a Job</option>
          {/* Populate options with job data */}
          {jobData.map((job) => (
            <option key={job.id} value={job.id}>
              <span className="flex"><span>{job.JobTitle}</span> - <span className="italic text-main-w/70">{job.Company}</span></span>
            </option>
          ))}
        </select>
        <Popover>
          <PopoverTrigger className='w-full truncate p-2 bg-white  rounded-lg'>
            <span className='flex gap-2 place-items-center justify-between '>
              <span className='cursor-pointer flex gap-2 place-items-center text-left'><FaPlus />  Job Description</span>
              {inputText !== '' && (
                <IoCheckmarkDone className="bg-green-500 text-white p-1 rounded-full"/>
              )}
            </span> 
          </PopoverTrigger>
          <PopoverContent className='bg-white w-full'>
            <span className='w-full flex flex-col gap-2'>
              <p>Paste or type your job description below:</p>
              <p className="text-slate-400">click the green checkmark when done.</p>
              <textarea defaultValue={inputText} className='w-full outline-none h-[10em] bg-slate-100 rounded-lg p-2' onChange={handleInputChange} name="" id="" />
            </span>
          </PopoverContent>
        </Popover>
      </div>

      {inputText !== '' && (
        <>
        {isLoading != true && (
          <div className='w-full flex place-content-end'><Button className='bg-blue-500 text-white my-4 ' onClick={handleSubmit}>Submit</Button></div>
        )}

        {isLoading != false && (
          <div className='w-full flex place-content-end'><Button className='bg-blue-500 text-white my-4 animate-pulse '>Loading..</Button></div>
        )}
        </>
      )}

      {isLoading != true && (     
        <div className='relative min-h-[50vh] my-8 w-[100%] nosb border-main-w/40 hover:border-main-w/70   text-left  bg-white p-5 rounded-[1em]'>
          <FaRegCopy size={36} onClick={copyText} className="absolute cursor-pointer top-2 right-3 cursor-pointer font-black p-2" />

          <h1 className='text-[1.5em] font-semibold  leading-none tracking-tight my-4'>
            Your cover letter:
          </h1>
          <span id='cov-text'>{coverText}</span>
        </div>
      )}

      {isLoading != false && (
        <div className='relative min-h-[50vh] my-8 w-[100%] nosb border-main-w/40 hover:border-main-w/70   text-left  bg-white p-5 rounded-[1em]'>
        <FaRegCopy size={36} onClick={copyText} className="absolute cursor-pointer top-2 right-3 cursor-pointer font-black p-2" />

        <h1 className='animate-pulse text-[1.5em] font-semibold  leading-none tracking-tight my-4'>
          Loading...
        </h1>
      </div>
      )}

    </>
  )
}