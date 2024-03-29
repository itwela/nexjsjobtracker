
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
import { FaPlus } from 'react-icons/fa';
import { JobData } from '../types/JobTypes';
import { toast } from "sonner";
import { FaSquareCheck } from 'react-icons/fa6';
import { IoCheckmarkDone, IoClose } from 'react-icons/io5';


const MyResume = ({jobdata, userdata}: any) => {

  let [resumeText, setResumeText] = useState('');
  function exportHTML() {
    
    // Construct resume text
    const resumeText = `
    ${userName}\n\n
    ${userEmail}\n\n
    ${resSummary || ''}\n\n
    ${skillsContent || ''}\n\n
    ${experienceContent || ''}\n\n
    `;

    // Create Blob with resume text
    const blob = new Blob([resumeText], { type: 'text/plain' });

    // Create URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create download link
    const fileDownload = document.createElement("a");
    fileDownload.href = url;
    fileDownload.download = 'resume.docx';
    document.body.appendChild(fileDownload);

    // Trigger download
    fileDownload.click();

    // Clean up
    document.body.removeChild(fileDownload);
    window.URL.revokeObjectURL(url);
  }

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



  return (
    <>
      <div className="flex w-full">
        <div className="flex px-6 py-8 bg-gray-200 flex-col min-h-screen w-full place-items-center justify-items-center">
          <div className=" flex flex-col w-[100%] py-5">
            <h1 className="text-4xl font-bold ">Create a resume</h1>
            <h2 className="text-[0.6em] sm:text-[0.8em]">Start generating your resume</h2>
            <h2 className="my-2 text-[0.6em] sm:text-[0.8em] font-bold">*You must add add a Job Description and Resume before using the Ai Features.*</h2>
          </div>
          <div className=" w-[100%]">

{/* select job ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            <div className='w-full flex flex-col gap-3'>
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
            <div id="" className='w-full flex gap-8 bg-white rounded-lg p-6 my-6'>

              <div id='' className="prose w-full">
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
                <div className='w-full flex flex-col place-items-center'>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{nameMarkdown}</ReactMarkdown>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{emailMarkdown}</ReactMarkdown>
                </div>

                {/* summary */}
                <div className='w-full h-max flex flex-col'>
                  
                  
                  <div className='w-full flex place-items-center justify-between'> 
                    {summaryApi != false && (
                      <h2 className='animate-pulse'>Loading...</h2>
                    )}

                    {summaryApi != true && (  
                    <h2>Summary</h2>
                    )}

                    {resumeText !== '' && jobDescription !== '' && (    
                      <p onClick={handleSummarySubmit} className='py-3 cursor-pointer text-blue-500 relative mr-[5%]'>
                        <span className='absolute top-[-5%] right-[-35%]'><AiBadge/></span>              
                          Generate
                      </p>
                    )}
                  </div>

                  {resSummary === '' && summaryIsActive != true && (
                    <>
                      <div className='w-full h-max flex gap-3 place-items-start'>
                        <p onClick={() => setSummaryIsActive(true)} className='py-1 w-full cursor-pointer'> Edit</p>
                      </div>
                    </>
                  )}

                  {summaryIsActive != false && (
                    <>

                      <textarea defaultValue={resSummary} className='w-full outline-none min-h-[100px] bg-slate-100 rounded-lg p-3' onChange={(e) => setResSummary(e.target.value)} name="" id="" />
                      <span className='py-1 px-3 my-2 cursor-pointer bg-green-500 text-white rounded-lg w-max h-max ' onClick={() => setSummaryIsActive(false)}>Looks good</span>

                    </>
                  )}

                  {summaryIsActive != true && resSummary !== '' && (
                    <>
                      <p className=' cursor-pointer w-full break-words' onClick={() => setSummaryIsActive(true)}>{resSummary}</p>
                    </>
                  )}

                </div>

                {/* Skills section */}
                <div className="w-full h-max flex flex-col">
                  <div className="w-full flex justify-between">
                  {skillsApi != false && (
                      <h2 className='animate-pulse'>Loading...</h2>
                    )}

                    {skillsApi != true && (  
                    <h2>Skills</h2>
                    )}                    
                    {resumeText !== '' && jobDescription !== '' && (    
                      <p onClick={handleSkillsSubmit} className='py-3 cursor-pointer text-blue-500 relative mr-[5%]'>
                        <span className='absolute top-[-5%] right-[-35%]'><AiBadge/></span>              
                          Generate
                      </p>
                    )}
                  </div>
                  
                  {skillsContent === '' && skillsIsActive !== true && (
                    <>
                      <div className='w-full flex gap-3'>
                        <p onClick={() => setSkillsIsActive(true)} className='py-3 cursor-pointer'> Edit</p>                    
                        </div>
                    </>
                  )}
                  {skillsIsActive !== false && (
                    <>
                      <textarea
                        defaultValue={skillsContent}
                        className="w-full outline-none min-h-[100px] bg-slate-100 rounded-lg p-3"
                        onChange={(e) => setSkillsContent(e.target.value)}
                      />
                      <span className="py-1 px-3 my-2 cursor-pointer bg-green-500 text-white rounded-lg w-max h-max " onClick={() => setSkillsIsActive(false)}>
                        Looks good
                      </span>
                    </>
                  )}
                  {skillsIsActive !== true && skillsContent !== '' && (
                    <>
                      <p className="py-3 cursor-pointer w-full break-words h-max" onClick={() => setSkillsIsActive(true)}>{skillsContent}</p>
                    </>
                  )}
                </div>

                {/* Experience section */}
                <div className="w-full h-max flex flex-col">
                  <div className="w-full flex justify-between">
                  {experienceApi != false && (
                      <h2 className='animate-pulse'>Loading...</h2>
                    )}

                    {experienceApi != true && (  
                    <h2>Experience</h2>
                    )}
                    
                    {resumeText !== '' && jobDescription !== '' && (    
                      <p onClick={handleExperienceSubmit} className='py-3 cursor-pointer text-blue-500 relative mr-[5%]'>
                        <span className='absolute top-[-5%] right-[-35%]'><AiBadge/></span>              
                          Generate
                      </p>
                    )}
                  </div>

                  {experienceContent === '' && experienceIsActive !== true && (
                    <>
                      <div className='w-full flex gap-3'>
                        <p onClick={() => setExperienceIsActive(true)} className='py-3 cursor-pointer'> Edit</p>
                     </div>
                    </>
                  )}

                  {experienceIsActive !== false && (
                    <>
                      <textarea
                        defaultValue={experienceContent}
                        className="w-full outline-none min-h-[300px] bg-slate-100 rounded-lg p-3"
                        onChange={(e) => setExperienceContent(e.target.value)}
                      />
                      <span className="py-1 px-3 my-2 cursor-pointer bg-green-500 text-white rounded-lg w-max h-max " onClick={() => setExperienceIsActive(false)}>
                        Looks good
                      </span>
                    </>
                  )}

                  {experienceIsActive !== true && experienceContent !== '' && (
                    <>
                      <p className="py-3 cursor-pointer w-full break-words h-max whitespace-pre-line" onClick={() => setExperienceIsActive(true)}>
                        {experienceContent}
                      </p>
                    </>
                  )}

                </div>

              </div>
            </div>
{/* end of resume --------------------------- */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyResume;
