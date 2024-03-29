
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";

const MyResume = ({ jobdata, userdata }: { jobdata: any; userdata: any }) => {



  const convertToPDF = async (markdownContent: string) => {

    try {
      const response = await fetch('/api/makepdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          markdown: markdownContent
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to convert Markdown to PDF');
      }

      // Assuming the response is a PDF file, you can download it
      const blob = await response.blob();
      setPdfBlob(blob);

    } catch (error) {
      console.error('Error:', error);
    }
  }



  const [pdfBlob, setPdfBlob] = useState<Blob>(new Blob([]));


  const [jobDescription, setJobDescription] = useState('');

  const nameMarkdown = `## ${userdata.firstName} ${userdata.lastName}`


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
                <option value="">Select a Job</option>
                {/* Populate options with job data */}
                {jobdata.map((job: any) => (
                  <option key={job.id} value={job.id}>
                    <span className="flex"><span>{job.JobTitle}</span> - <span className="italic text-main-w/70">{job.Company}</span></span>
                  </option>
                ))}
              </select>
            </div>

            <div className='w-full flex place-content-end my-2'>
              <span className='cursor-pointer '>Add Job Description</span>      
            </div>

            <div id="" className='w-full flex gap-8 bg-white rounded-lg p-4'>

              <div id='markdown' className="prose w-full">

                {/* name  and intro section */}
                <div className='w-full flex flex-col place-items-center'>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{nameMarkdown}</ReactMarkdown>
                  <p>{userdata.email}</p>
                </div>

                {/* summary */}
                <div className='w-full h-max flex flex-col'>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{summaryMarkdownHeader}</ReactMarkdown>

                  {resSummary === '' && summaryIsActive != true && (
                    <>
                      <div className='w-full flex gap-3'>
                        <p onClick={() => setSummaryIsActive(true)} className='py-3 cursor-pointer'> Edit</p>
                        <p onClick={() => setSummaryIsActive(true)} className='py-3 cursor-pointer'> Generate</p>
                      </div>
                    </>
                  )}

                  {summaryIsActive != false && (
                    <>

                      <textarea defaultValue={resSummary} className='w-full outline-none min-h-[200px] bg-slate-100/30 rounded-lg p-3' onChange={(e) => setResSummary(e.target.value)} name="" id="" />
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
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{skillsMarkdownHeader}</ReactMarkdown>
                  {skillsContent === '' && skillsIsActive !== true && (
                    <>
                      <div className='w-full flex gap-3'>
                        <p onClick={() => setSkillsIsActive(true)} className='py-3 cursor-pointer'> Edit</p>
                        <p onClick={() => setSkillsIsActive(true)} className='py-3 cursor-pointer'> Generate</p>
                      </div>
                    </>
                  )}
                  {skillsIsActive !== false && (
                    <>
                      <textarea
                        defaultValue={skillsContent}
                        className="w-full outline-none min-h-[200px] bg-slate-100/30 rounded-lg p-3"
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
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{experienceMarkdownHeader}</ReactMarkdown>

                  {experienceContent === '' && experienceIsActive !== true && (
                    <>
                      <div className='w-full flex gap-3'>
                        <p onClick={() => setExperienceIsActive(true)} className='py-3 cursor-pointer'> Edit</p>
                        <p onClick={() => setExperienceIsActive(true)} className='py-3 cursor-pointer'> Generate</p>
                      </div>
                    </>
                  )}

                  {experienceIsActive !== false && (
                    <>
                      <textarea
                        defaultValue={experienceContent}
                        className="w-full outline-none min-h-[200px] bg-slate-100/30 rounded-lg p-3"
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
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{educationMarkdownHeader}</ReactMarkdown>
                  {educationContent === '' && educationIsActive !== true && (
                    <>
                      <div className='w-full flex gap-3'>
                        <p onClick={() => setEducationIsActive(true)} className='py-3 cursor-pointer'> Edit</p>
                        <p onClick={() => setEducationIsActive(true)} className='py-3 cursor-pointer'> Generate</p>
                      </div>
                    </>
                  )}
                  {educationIsActive !== false && (
                    <>
                      <textarea
                        defaultValue={educationContent}
                        className="w-full outline-none min-h-[200px] bg-slate-100/30 rounded-lg p-3"
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
