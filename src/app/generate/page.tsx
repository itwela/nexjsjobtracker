
'use client'
import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { Document, Page, pdfjs, } from 'react-pdf';
import { BlobProvider } from '@react-pdf/renderer';
import ReactMarkdown from 'react-markdown';
import { renderToStaticMarkup } from 'react-dom/server';
import rehypeRaw from 'rehype-raw';
import { View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import AiBadge from '../components/aibadge';
import { FaDownload, FaPlus, FaRegCopy } from 'react-icons/fa';
import { JobData } from '../types/JobTypes';
import { toast } from "sonner";
import { FaSquareCheck } from 'react-icons/fa6';
import { IoCheckmarkDone, IoClose } from 'react-icons/io5';
import { FaAlignLeft } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import CoverLetter from '../coverletter/page';
import CoverLetterCard from '../components/coverLetterCard';
import { BsStar, BsStars } from 'react-icons/bs';



const GenerateStuff = ({jobdata, userdata}: any) => {

// Resume STUFF --------------------------------------------------

  let [resumeText, setResumeText] = useState('');
  let [coverletterText, setCoverletterText] = useState('');
  
  // function exporResumetHTML() {
    
  //   // Construct resume text
  //   const resumeText = `
  //   ${userName}\n\n
  //   ${userEmail}\n\n
  //   ${resSummary || ''}\n\n
  //   ${skillsContent || ''}\n\n
  //   ${experienceContent || ''}\n\n
  //   `;


  //   // Create Blob with resume text
  //   const blob = new Blob([resumeText], { type: 'text/plain' });

  //   // Create URL for the Blob
  //   const url = window.URL.createObjectURL(blob);

  //   // Create download link
  //   const fileDownload = document.createElement("a");
  //   fileDownload.href = url;
  //   fileDownload.download = 'resume.docx';
  //   document.body.appendChild(fileDownload);

  //   // Trigger download
  //   fileDownload.click();

  //   // Clean up
  //   document.body.removeChild(fileDownload);
  //   window.URL.revokeObjectURL(url);
  // }

  // function exportCoverletterHTML() {
  //   const coverletterText = `
  //   ${formattedText || ''}
  //   `

  //   // Create Blob with resume text
  //   const blob = new Blob([formattedText], { type: 'text/plain' });

  //   // Create URL for the Blob
  //   const url = window.URL.createObjectURL(blob);

  //   // Create download link
  //   const fileDownload = document.createElement("a");
  //   fileDownload.href = url;
  //   fileDownload.download = 'resume.docx';
  //   document.body.appendChild(fileDownload);

  //   // Trigger download
  //   fileDownload.click();

  //   // Clean up
  //   document.body.removeChild(fileDownload);
  //   window.URL.revokeObjectURL(url);
    
  // }

  const [jobDescription, setJobDescription] = useState('');

  const userName = `${userdata.firstName} ${userdata.lastName}`
  const userEmail = `${userdata.email}`
  const nameMarkdown = `### ${userName}`
  const emailMarkdown = `${userEmail}`

  const [summaryIsActive, setSummaryIsActive] = useState(false);
  const [resSummary, setResSummary] = useState('');
  const [summaryApi, setSummaryApi] = useState(false);
  const summaryMarkdownHeader = `
### Summary
`

  const [experienceIsActive, setExperienceIsActive] = useState(false);
  const [experienceContent, setExperienceContent] = useState('');
  const [experienceApi, setExperienceApi] = useState(false);
  const experienceMarkdownHeader = `
### Experience
`

  const [skillsIsActive, setSkillsIsActive] = useState(false);
  const [skillsContent, setSkillsContent] = useState('');
  const [skillsApi, setSkillsApi] = useState(false);
  const skillsMarkdownHeader = `
### Skills
`;



  const [jobId, setJobId] = useState('')
  const [selectedJobId, setSelectedJobId] = useState('');


  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newJobId = e.target.value; // Get the new jobId from the selected option's value
    const { value } = e.target
    setJobId(newJobId); // Update the jobId state with the new value
    setSelectedJobId(value);
  };

  const handleAllFieldsSubmit = async () => {
      handleSummarySubmit()
      handleExperienceSubmit()
      handleSkillsSubmit()
  }

  const handleSummarySubmit = async () => {

    setSummaryApi(true)

    try {
      const response = await fetch('/api/openai/resume/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          theJobDesc: jobDescription,
          theJobId: selectedJobId,
          theResu: resumeText
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      const { text } = data;
      console.log(text)
      setResSummary(text); // Set the formatted text in your state variable
      setSummaryApi(false)

      toast.success("Success!: Resume Summary Generated", {
        description: "Congragulations, you're one step closer to your next job!",
        id: "resumesummarysuccess",
        style: {
          backgroundColor: '#22c55e',
        }
      })

    } catch (error) {
      toast.error("Error.", {
        description: "There was an error generating your summary, Please try again later.",
        id: "resumesummaryerror",
        style: {
          backgroundColor: '#ef4444',
        }
      })
    }


  };

  const handleSkillsSubmit = async () => {

    setSkillsApi(true)

    try {
      const response = await fetch('/api/openai/resume/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          theJobDesc: jobDescription,
          theJobId: selectedJobId,
          theResu: resumeText
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      const { text } = data;
      console.log(text)
      setSkillsContent(text); // Set the formatted text in your state variable
      setSkillsApi(false)

      toast.success("Success!: Resume Skills Generated", {
        description: "Congragulations, you're one step closer to your next job!",
        id: "resumeskillsuccess",
        style: {
          backgroundColor: '#22c55e',
        }
      })

    } catch (error) {
      toast.error("Error.", {
        description: "There was an error generating your skills, Please try again later.",
        id: "resumeskillerror",
        style: {
          backgroundColor: '#ef4444',
        }
      })
    }


  };

  const handleExperienceSubmit = async () => {

    setExperienceApi(true)

    try {
      const response = await fetch('/api/openai/resume/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          theJobDesc: jobDescription,
          theJobId: selectedJobId,
          theResu: resumeText
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      const { text } = data;
      console.log(text)
      setExperienceContent(text); // Set the formatted text in your state variable
      setExperienceApi(false)

      toast.success("Success!: Resume Experience Generated", {
        description: "Congragulations, you're one step closer to your next job!",
        id: "resumexpsuccess",
        style: {
          backgroundColor: '#22c55e',
        }
      })

    } catch (error) {
      toast.error("Error.", {
        description: "There was an error generating your experience, Please try again later.",
        id: "resumexperror",
        style: {
          backgroundColor: '#ef4444',
        }
      })
    }


  };

  const [docChoice, setDocChoice] = useState('')

// Resume END --------------------------------------------------


// ----  ----  ---- --- -- ----  ----  ----  ---- --- -- ----  ----  ----  ---- --- -- ----  ----  ----  ---- --- -- ---- 


//  Cover Letter START --------------------------------------------------

const [isLoading, setIsLoading] = useState(false)
const [coverText, setCoverText] = useState('')
const [formattedText, setFormattedText] = useState('')
const [coverInputText, setCoverInputText] = useState('')


const handleCLSubmit = async () => {

  setIsLoading(true)
  const jd = jobDescription // Assuming your textarea has the name 'input'
  const ji = jobId
  const re = resumeText

  console.log(ji)
  console.log(jd)

  try {
    const response = await fetch('/api/openai/coverletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jobDescription: jd,
        resume: re,
        id: jobId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    const { text } = data;
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

//  Cover Letter END --------------------------------------------------
return (
    <>
      <div className="flex w-full">
        <div className="flex px-6 py-[3em] bg-gray-200 flex-col min-h-screen w-full place-items-center justify-items-center">
          
          {docChoice === '' && (
            <div className="flex flex-col place-items-center place-content-center w-full h-full">
              <h1 className='flex place-self-start text-4xl font-bold gap-2'>Generate <BsStars size={30}/></h1>
              <h1 className='flex place-self-start italic'>with JobKompass</h1>
              <div className="flex my-3 place-items-center gap-8 flex-col justify-center p-4 w-full h-full bg-white rounded-lg">
                <h2>Choose a document to get started:</h2>
                <div className='w-[50%] h-[30%] flex place-items-center place-content-center gap-8'>
                  
                  {/* resume */}
                  <div onClick={() => setDocChoice('resume')} className='cursor-pointer w-[50%] h-[50%] rounded-lg hover:text-blue-500 hover:outline-blue-500 hover:outline hover:outline-[1px] place-items-center place-content-center flex flex-col gap-2'>
                    <FaAlignLeft size={30}/>
                    <h2>Resume</h2>
                  </div>

                  {/* cover letter */}
                  <div onClick={() => setDocChoice('coverletter')} className='cursor-pointer w-[50%] h-[50%] rounded-lg hover:text-blue-500 hover:outline-blue-500 hover:outline hover:outline-[1px] place-items-center place-content-center flex flex-col gap-2'>
                    <FaRegNewspaper size={30}/>
                    <h2>Cover Letter</h2>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* resumes */}
          {docChoice === 'resume' && ( 
            <>    
              <div className=" flex flex-col w-[100%]">
                <div className='w-full flex place-items-center justify-between'>
                  <h1 className="text-4xl font-bold ">Create a Resume </h1>
                  
                  <div className='flex gap-4'>
                    <span className='text-blue-500 cursor-pointer' onClick={() => setDocChoice('resume')}><FaAlignLeft size={30}/></span>
                    <span className='cursor-pointer ' onClick={() => setDocChoice('coverletter')}><FaRegNewspaper size={30} /></span>
                  </div>

                </div>
                <h2 className="text-[0.6em] sm:text-[0.8em]">Start generating below</h2>
                <h2 className="my-2 text-[0.6em] sm:text-[0.8em] font-bold">*You must add add a Job Description and Resume before using the Ai Features.*</h2>
              </div>       
              <div className=" w-[100%]">

    {/* select job ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <div className='w-full flex flex-col gap-1'>
                  <p className='font-bold'>Choose a job:</p>
                  <select id="status" onChange={handleStatusChange} className='outline-none rounded-[0.2em] p-2 bg-white w-full' name="status" required>
                    <option  value="">Select a Job</option>
                    {/* Populate options with job data */}
                    {jobdata.map((job: any) => (
                      <option key={job.id} value={job.id}>
                        {job.JobTitle} - {job.Company}
                      </option>
                    ))}
                  </select>
                </div>
    {/* end select job ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

    {/* add job description and resume --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <div className='w-full flex gap-[10%]'>
                  {/* add job description --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                        <div className='w-[50%] relative flex flex-col  my-6 place-items-end'>
                          <Popover>
                            <PopoverTrigger className='w-full truncate p-2 bg-white  rounded-lg'>
                              <span className='flex gap-2 place-items-center justify-between '>
                                <span className='cursor-pointer flex gap-2 place-items-center text-left'><FaPlus />  Job Description</span>
                                {jobDescription !== "" && (                              
                                  <IoCheckmarkDone className="bg-green-500 text-white p-1 rounded-full"/>
                                )}
                              </span> 
                            </PopoverTrigger>
                            <PopoverContent className='bg-white'>
                              <span className='flex flex-col gap-2'>
                                <p>Paste or type your job description below:</p>
                                <p className="text-slate-400">click the green checkmark when done.</p>
                                <textarea className='w-full outline-none h-[10em] bg-slate-100 rounded-lg p-2' defaultValue={jobDescription} onChange={(e) => setJobDescription(e.target.value)} name="" id=""/>
                              </span>
                            </PopoverContent>
                          </Popover>
                        </div>
                  { /* end add job description --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            
                  {/* add resume --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                        <div className='w-[50%] relative flex flex-col  my-6 place-items-end'>
                            <Popover>
                              <PopoverTrigger className='w-full truncate p-2 bg-white  rounded-lg'>
                                <span className='flex gap-2 place-items-center bg-white  rounded-lg w-full justify-between'>
                                  <span className='cursor-pointer flex gap-2 place-items-center w-full '>
                                    <FaPlus /> Resume</span>
                                    {resumeText !== "" && (                              
                                      <IoCheckmarkDone className="bg-green-500 text-white p-1 rounded-full"/>
                                    )}
                                  </span> 
                              </PopoverTrigger>
                              <PopoverContent className='bg-white'>
                                <span className='flex flex-col gap-2'>
                                  <p>Paste or type your resume below:</p>
                                  <p className="text-slate-400">click the green checkmark when done.</p>
                                  <textarea className='w-full outline-none h-[10em] bg-slate-100 rounded-lg p-2' defaultValue={resumeText} onChange={(e) => setResumeText(e.target.value)} name="" id=""/>
                                </span>
                              </PopoverContent>
                            </Popover>
                        </div>
                  {/* end add resume --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                </div>
    {/* end of job description and resume --------------------------------------- */}

    {/* start of resume ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <div id="" className='w-full flex gap-5 bg-white rounded-lg p-6 my-1'>

                  <div id='' className=" w-full">
    {/* start download button --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                    {/* {resSummary !== '' && (
                      <span className='w-full flex place-content-end'><button onClick={() => exportHTML()} className='bg-blue-500 text-white p-2 rounded-lg text-[0.8em]'>Download</button></span>
                      )}

                      {skillsContent !== '' && (
                        <span className='w-full flex place-content-end'><button onClick={() => exportHTML()} className='bg-blue-500 text-white p-2 rounded-lg text-[0.8em]'>Download</button></span>
                      )}

                      {experienceContent !== '' && (
                        <span className='w-full flex place-content-end'><button onClick={() => exportHTML()} className='bg-blue-500 text-white p-2 rounded-lg text-[0.8em]'>Download</button></span>
                      )}
                    */}

    {/* end download button --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

    {/* generate all ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                {resumeText !== '' && jobDescription !== '' && (    
                    <p onClick={handleAllFieldsSubmit} className='py-3 cursor-pointer text-blue-500 relative mr-[5%] w-max h-max'>
                      <span className='absolute top-[-5%] right-[-15%]'><AiBadge /></span>
                      Generate All Fields
                    </p>
                )}
    {/* end generate all ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

    {/* name  and intro section ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                    <div className='w-full flex flex-col place-items-center my-5'>
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{nameMarkdown}</ReactMarkdown>
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{emailMarkdown}</ReactMarkdown>
                    </div>

                    {/* summary */}
                    <div className='w-full h-max flex flex-col'>
                      
                      
                      <div className='w-full flex place-items-center'> 
                        {summaryApi != false && (
                          <h2 className='animate-pulse h-[10em]'>Loading...</h2>
                        )}

                        {/* summry */}
                          <div className='w-full h-max flex flex-col gap-1'>
                            {summaryApi != true && (
                              <>
                              <div className='flex place-items-center justify-between'>
                                <p className='font-black text-lg'>Summary</p>
                                {resumeText !== '' && jobDescription !== '' && (
                                  <p onClick={handleSummarySubmit} className='py-1 cursor-pointer text-blue-500 relative mr-[5%]'>
                                    <span className='absolute top-[-35%] right-[-35%]'><AiBadge /></span>
                                    Generate
                                  </p>
                                )}
                              </div>
                              <div className='w-full h-[1px] bg-black'></div>
                              </>
                            )}
                            {resSummary === '' && summaryIsActive != true && summaryApi != true && (
                              <>
                                <p onClick={() => setSummaryIsActive(true)} className='h-[10em] flex w-full cursor-pointer'> Edit</p>
                              </>
                            )}
                          </div>

                      </div>


                      {summaryIsActive != false && (
                        <>

                          <div className='w-full h-[10em] max-h-[70em]'>
                            <textarea defaultValue={resSummary} className='w-full outline-none h-full rounded-lg p-3' onChange={(e) => setResSummary(e.target.value)} name="" id="" />
                          </div>
                          <span className='hover:underline my-2 cursor-pointer text-green-500 rounded-lg w-max h-max ' onClick={() => setSummaryIsActive(false)}>Looks good!</span>

                        </>
                      )}

                      {summaryIsActive != true && resSummary !== '' && (
                        <>
                          <p className=' cursor-pointer min-h-[10em] h-max w-full break-words' onClick={() => setSummaryIsActive(true)}>{resSummary}</p>
                        </>
                      )}

                    </div>

                    {/* Skills section */}
                    <div className="w-full h-max flex flex-col">

                      <div className='w-full flex place-items-center'>
                        {skillsApi != false && (
                          <h2 className='animate-pulse h-[10em]'>Loading...</h2>
                        )}

                        {/* summry */}
                        <div className='w-full h-max flex flex-col gap-1'>
                          {skillsApi != true && (
                            <>
                              <div className='flex place-items-center justify-between'>
                                <p className='font-black text-lg'>Skills</p>
                                {resumeText !== '' && jobDescription !== '' && (
                                  <p onClick={handleSkillsSubmit} className='py-1 cursor-pointer text-blue-500 relative mr-[5%]'>
                                    <span className='absolute top-[-35%] right-[-35%]'><AiBadge /></span>
                                    Generate
                                  </p>
                                )}
                              </div>
                              <div className='w-full h-[1px] bg-black'></div>
                            </>
                          )}
                          {skillsContent === '' && skillsIsActive != true && skillsApi != true && (
                            <>
                              <p onClick={() => setSkillsIsActive(true)} className='h-[10em] w-full cursor-pointer'> Edit</p>
                            </>
                          )}
                        </div>

                      </div>


                      {skillsIsActive != false && (
                        <>

                          <div className='w-full h-[10em] max-h-[70em]'>
                            <textarea defaultValue={skillsContent} className='w-full outline-none h-full rounded-lg p-3' onChange={(e) => setSkillsContent(e.target.value)} name="" id="" />
                          </div>
                          <span className='hover:underline my-2 cursor-pointer text-green-500 rounded-lg w-max h-max ' onClick={() => setSkillsIsActive(false)}>Looks good!</span>

                        </>
                      )}

                      {skillsIsActive != true && skillsContent !== '' && (
                        <>
                          <p className=' cursor-pointer min-h-[10em] h-max w-full break-words' onClick={() => setSkillsIsActive(true)}>{skillsContent}</p>
                        </>
                      )}

                    </div>

                    {/* Experience section */}
                    <div className="w-full h-max flex flex-col">

                    <div className='w-full flex place-items-center'>
                        {experienceApi != false && (
                          <h2 className='animate-pulse h-[10em]'>Loading...</h2>
                        )}

                        {/* experience */}
                        <div className='w-full h-max flex flex-col gap-1'>
                          {experienceApi != true && (
                            <>
                              <div className='flex place-items-center justify-between'>
                                <p className='font-black text-lg'>Experience</p>
                                {resumeText !== '' && jobDescription !== '' && (
                                  <p onClick={handleExperienceSubmit} className='py-1 cursor-pointer text-blue-500 relative mr-[5%]'>
                                    <span className='absolute top-[-35%] right-[-35%]'><AiBadge /></span>
                                    Generate
                                  </p>
                                )}
                              </div>
                              <div className='w-full h-[1px] bg-black'></div>
                            </>
                          )}
                          {experienceContent === '' && experienceIsActive != true && experienceApi != true && (
                            <>
                              <p onClick={() => setExperienceIsActive(true)} className='h-[10em] w-full cursor-pointer'> Edit</p>
                            </>
                          )}
                        </div>

                      </div>


                      {experienceIsActive != false && (
                        <>

                          <div className='w-full h-[10em] max-h-[70em]'>
                            <textarea defaultValue={experienceContent} className='w-full outline-none h-full rounded-lg p-3' onChange={(e) => setExperienceContent(e.target.value)} name="" id="" />
                          </div>
                          <span className='hover:underline my-2 cursor-pointer text-green-500 rounded-lg w-max h-max ' onClick={() => setExperienceIsActive(false)}>Looks good!</span>

                        </>
                      )}

                      {experienceIsActive != true && experienceContent !== '' && (
                        <>
                          <p className=' cursor-pointer min-h-[10em] h-max w-full break-words' onClick={() => setExperienceIsActive(true)}>{experienceContent}</p>
                        </>
                      )}

                    </div>

                  </div>
                </div>
    {/* end of resume --------------------------- */}
              </div>
            </>           
          )}

          {/* cover letter */}
          {docChoice === 'coverletter' && (
            <>
              <div className="flex flex-col w-[100%]">
                <div className='w-full flex place-items-center justify-between'>
                  <h1 className="text-4xl font-bold ">Create a Cover Letter</h1>
                  
                  <div className='flex gap-4'>
                    <span className='cursor-pointer' onClick={() => setDocChoice('resume')}><FaAlignLeft size={30}/></span>
                    <span className='cursor-pointer text-blue-500' onClick={() => setDocChoice('coverletter')}><FaRegNewspaper size={30} /></span>
                  </div>

                </div>              
                <h2 className="text-[0.6em] sm:text-[0.8em]">Start generating below</h2>
                <h2 className="my-2 text-[0.6em] sm:text-[0.8em] font-bold">*You must add add a Job Description and Resume before using the Ai Features.*</h2>
              </div>

              {/* select job ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
              <div className='w-full flex flex-col gap-1'>
                <p className='font-bold'>Choose a job:</p>
                <select id="status" onChange={handleStatusChange} className='outline-none rounded-[0.2em] p-2 bg-white w-full' name="status" required>
                  <option value="">Select a Job</option>
                  {/* Populate options with job data */}
                  {jobdata.map((job: any) => (
                    <option key={job.id} value={job.id}>
                      {job.JobTitle} - {job.Company}
                    </option>
                  ))}
                </select>
              </div>
              {/* end select job ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

              {/* add job description and resume --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
              <div className='w-full flex gap-[10%]'>
                {/* add job description --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <div className='w-[50%] relative flex flex-col  my-6 place-items-end'>
                  <Popover>
                    <PopoverTrigger className='w-full truncate p-2 bg-white  rounded-lg'>
                      <span className='flex gap-2 place-items-center justify-between '>
                        <span className='cursor-pointer flex gap-2 place-items-center text-left'><FaPlus />  Job Description</span>
                        {jobDescription !== "" && (
                          <IoCheckmarkDone className="bg-green-500 text-white p-1 rounded-full" />
                        )}
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className='bg-white'>
                      <span className='flex flex-col gap-2'>
                        <p>Paste or type your job description below:</p>
                        <p className="text-slate-400">click the green checkmark when done.</p>
                        <textarea className='w-full outline-none h-[10em] bg-slate-100 rounded-lg p-2' defaultValue={jobDescription} onChange={(e) => setJobDescription(e.target.value)} name="" id="" />
                      </span>
                    </PopoverContent>
                  </Popover>
                </div>
                { /* end add job description --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                {/* add resume --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <div className='w-[50%] relative flex flex-col  my-6 place-items-end'>
                  <Popover>
                    <PopoverTrigger className='w-full truncate p-2 bg-white  rounded-lg'>
                      <span className='flex gap-2 place-items-center bg-white  rounded-lg w-full justify-between'>
                        <span className='cursor-pointer flex gap-2 place-items-center w-full '>
                          <FaPlus /> Resume</span>
                        {resumeText !== "" && (
                          <IoCheckmarkDone className="bg-green-500 text-white p-1 rounded-full" />
                        )}
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className='bg-white'>
                      <span className='flex flex-col gap-2'>
                        <p>Paste or type your resume below:</p>
                        <p className="text-slate-400">click the green checkmark when done.</p>
                        <textarea className='w-full outline-none h-[10em] bg-slate-100 rounded-lg p-2' defaultValue={resumeText} onChange={(e) => setResumeText(e.target.value)} name="" id="" />
                      </span>
                    </PopoverContent>
                  </Popover>
                </div>
                {/* end add resume --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
              </div>
              {/* end of job description and resume --------------------------------------- */}
  

            {isLoading != true && (
              <>   
              <div className='relative h-full my-3 w-[100%] nosb border-main-w/40 hover:border-main-w/70   text-left  bg-white p-5 rounded-lg'>
                <div className='w-full flex justify-between'>
                  <div>
                    {jobDescription !== "" && resumeText !== "" && (
                      <p onClick={handleCLSubmit} className='py-1 cursor-pointer text-blue-500 relative'>
                        <span className='absolute top-[-35%] right-[-35%]'><AiBadge /></span>
                        Generate
                      </p>
                    )}
                  </div>
                  <div className='w-max flex'>
                    <FaRegCopy size={36} onClick={copyText} className="hover:text-blue-500 cursor-pointer  font-black p-2" />
                    {/* <span className='w-max '><button onClick={() => exportCoverletterHTML()} className='p-2 '><FaDownload className='hover:text-blue-500' size={16}/></button></span> */}
                  </div>
                </div>

                <p id='cov-text break-words'>{coverText}</p>
              </div>
              </>
            )}

            {isLoading != false && (
              <div className='relative h-full my-3 w-[100%] nosb border-main-w/40 hover:border-main-w/70   text-left  bg-white p-5 rounded-[1em]'>
                <div className='w-full flex justify-between'>
                    <p className='py-1'>
                      Loading..,
                    </p>
                  <FaRegCopy size={36} onClick={copyText} className="absolute cursor-pointer top-2 right-3 cursor-pointer font-black p-2" />
                </div>              
                </div>
            )}
         
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default GenerateStuff;
