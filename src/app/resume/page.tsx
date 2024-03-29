
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

const MyResume = ({ jobdata, userdata }: { jobdata: any; userdata: any }) => {

  let [resumeText, setResumeText] = useState('');
  function exportHTML() {
    
    // Construct resume text
    const resumeText = `
    ${userName}\n\n
    ${userEmail}\n\n
    ${resSummary || ''}\n\n
    ${skillsContent || ''}\n\n
    ${experienceContent || ''}\n\n
    ${educationContent || ''}
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
  const summaryMarkdownHeader = `
### Summary
`
  const summaryMarkdown = `${resSummary}`

  const [experienceIsActive, setExperienceIsActive] = useState(false);
  const [experienceContent, setExperienceContent] = useState('');
  const experienceMarkdownHeader = `
### Experience
`
  const [educationIsActive, setEducationIsActive] = useState(false);
  const [educationContent, setEducationContent] = useState('');

  const educationMarkdownHeader = `
### Education
`

  const [skillsIsActive, setSkillsIsActive] = useState(false);
  const [skillsContent, setSkillsContent] = useState('');
  const skillsMarkdownHeader = `
### Skills
`;

  const [jobId, setJobId] = useState('')
  const [selectedJobId, setSelectedJobId] = useState<string>('');


  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newJobId = e.target.value; // Get the new jobId from the selected option's value
    const { value } = e.target
    setJobId(newJobId); // Update the jobId state with the new value
    setSelectedJobId(value);
  };


  return (
    <>
      <div className="flex w-full">
        <div className="flex px-6 py-8 bg-gray-200 flex-col min-h-screen w-full place-items-center justify-items-center">
          <div className=" flex flex-col w-[100%] py-5">
            <h1 className="text-4xl font-bold ">Create a resume</h1>
            <h2 className="text-[0.6em] sm:text-[0.8em]">Start generating your resume</h2>
          </div>
          <div className=" w-[100%]">

            <div className='w-full flex flex-col gap-3'>
              <p>Make a resume for:</p>
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

            <div className='w-max relative flex flex-col  my-6 place-items-end'>
              <span className='absolute top-[-30%] right-[-15%]'><AiBadge/></span>
              <Popover>
                <PopoverTrigger><span className='flex gap-2 place-items-center bg-white p-2 rounded-lg'><span className='cursor-pointer'>Add Job Description</span></span> </PopoverTrigger>
                <PopoverContent className='bg-white'>
                  <span className='flex flex-col gap-2'>
                    <p>Paste or type your job description below:</p>
                    <textarea className='w-full outline-none h-[10em] bg-slate-100 rounded-lg p-2' defaultValue={jobDescription} onChange={(e) => setJobDescription(e.target.value)} name="" id=""/>
                  </span>
                </PopoverContent>
              </Popover>
            </div>

            <div id="" className='w-full flex gap-8 bg-white rounded-lg p-6 my-6'>

              <div id='' className="prose w-full">

{/* start download button --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                {resSummary !== '' && (
                  <span className='w-full flex place-content-end'><button onClick={() => exportHTML()} className='bg-blue-500 text-white p-2 rounded-lg'>Download</button></span>
                  )}

                  {skillsContent !== '' && (
                    <span className='w-full flex place-content-end'><button onClick={() => exportHTML()} className='bg-blue-500 text-white p-2 rounded-lg'>Download</button></span>
                  )}

                  {experienceContent !== '' && (
                    <span className='w-full flex place-content-end'><button onClick={() => exportHTML()} className='bg-blue-500 text-white p-2 rounded-lg'>Download</button></span>
                  )}

                  {educationContent !== '' && (
                    <span className='w-full flex place-content-end'><button onClick={() => exportHTML()} className='bg-blue-500 text-white p-2 rounded-lg'>Download</button></span>
                  )}

{/* end download button --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                {/* name  and intro section */}
                <div className='w-full flex flex-col place-items-center'>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{nameMarkdown}</ReactMarkdown>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{emailMarkdown}</ReactMarkdown>
                </div>

                {/* summary */}
                <div className='w-full h-max flex flex-col'>
                  <div className='w-full flex justify-between'> 
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{summaryMarkdownHeader}</ReactMarkdown>
                    <p onClick={() => setSummaryIsActive(true)} className='py-3 cursor-pointer relative mr-[5%]'>
                      <span className='absolute top-[-5%] right-[-35%]'><AiBadge/></span>              
                        Generate
                    </p>
                  </div>

                  {resSummary === '' && summaryIsActive != true && (
                    <>
                      <div className='w-full flex gap-3'>
                        <p onClick={() => setSummaryIsActive(true)} className='py-3 cursor-pointer'> Edit</p>
                      </div>
                    </>
                  )}

                  {summaryIsActive != false && (
                    <>

                      <textarea defaultValue={resSummary} className='w-full outline-none min-h-[100px] bg-slate-100 rounded-lg p-3' onChange={(e) => setResSummary(e.target.value)} name="" id="" />
                      <span className='py-3 cursor-pointer' onClick={() => setSummaryIsActive(false)}>Looks good</span>

                    </>
                  )}

                  {summaryIsActive != true && resSummary !== '' && (
                    <>
                      <p className='py-3 cursor-pointer w-full break-words h-max' onClick={() => setSummaryIsActive(true)}>{resSummary}</p>
                    </>
                  )}

                </div>

                {/* Skills section */}
                <div className="w-full h-max flex flex-col">
                  <div className="w-full flex justify-between">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{skillsMarkdownHeader}</ReactMarkdown>
                    <p onClick={() => setSkillsIsActive(true)} className='py-3 cursor-pointer relative mr-[5%]'>
                      <span className='absolute top-[-5%] right-[-35%]'><AiBadge/></span>              
                        Generate
                    </p>
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
                      <span className="py-3 cursor-pointer" onClick={() => setSkillsIsActive(false)}>
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
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{experienceMarkdownHeader}</ReactMarkdown>
                    <p onClick={() => setExperienceIsActive(true)} className='py-3 cursor-pointer relative mr-[5%]'>
                      <span className='absolute top-[-5%] right-[-35%]'><AiBadge/></span>              
                        Generate
                    </p>
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
                        className="w-full outline-none min-h-[100px] bg-slate-100 rounded-lg p-3"
                        onChange={(e) => setExperienceContent(e.target.value)}
                      />
                      <span className="py-3 cursor-pointer" onClick={() => setExperienceIsActive(false)}>
                        Looks good
                      </span>
                    </>
                  )}

                  {experienceIsActive !== true && experienceContent !== '' && (
                    <>
                      <p className="py-3 cursor-pointer w-full break-words h-max" onClick={() => setExperienceIsActive(true)}>{experienceContent}</p>
                    </>
                  )}

                </div>

                {/* Education section */}
                <div className="w-full h-max flex flex-col">
                  <div className="w-full flex justify-between">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{educationMarkdownHeader}</ReactMarkdown>
                    <p onClick={() => setEducationIsActive(true)} className='py-3 cursor-pointer relative mr-[5%]'>
                      <span className='absolute top-[-5%] right-[-35%]'><AiBadge/></span>              
                        Generate
                    </p>
                  </div>
                  
                  {educationContent === '' && educationIsActive !== true && (
                    <>
                      <div className='w-full flex gap-3'>
                        <p onClick={() => setEducationIsActive(true)} className='py-3 cursor-pointer'> Edit</p>                    
                        </div>
                    </>
                  )}
                  {educationIsActive !== false && (
                    <>
                      <textarea
                        defaultValue={educationContent}
                        className="w-full outline-none min-h-[100px] bg-slate-100 rounded-lg p-3"
                        onChange={(e) => setEducationContent(e.target.value)}
                      />
                      <span className="py-3 cursor-pointer" onClick={() => setEducationIsActive(false)}>
                        Looks good
                      </span>
                    </>
                  )}
                  {educationIsActive !== true && educationContent !== '' && (
                    <>
                      <p className="py-3 cursor-pointer w-full break-words h-max" onClick={() => setEducationIsActive(true)}>{educationContent}</p>
                    </>
                  )}
                </div>


              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MyResume;
