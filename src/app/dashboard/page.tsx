'use client'

import { useState } from "react";
import AddJobForm from "../components/addJobForm";
import { AddJobs } from "../components/addJobs";
import Clock from "../components/clock";
import ComingSoon from "../components/comingsoon";
import GenResume from "../components/genresume";
import InterviewRate from "../components/interviewRate";
import JobsTable from "../components/jobsTableRender";
import TopboxOne from "../components/topbox1";
import TopboxTwo from "../components/topbox2";
import YourCoverLetter from "../components/yourcoverletter";


export default function Dashboard( {jobdata, userdata}: any ) {
  const [formOpen, setFormOpen] = useState(false);
  const handleFormOpen = () => setFormOpen(!formOpen);
  const handleFormClose = () => setFormOpen(false);



    return (
      <>
    
              <div className="flex min-h-screen w-full">
  
                    <div className="flex bg-gray-200 min-h-[92vh] w-full justify-between pt-4  ">
                      
                     
                        
                      <div className="flex px-4 h-full w-full gap-4 flex-col col-start-2 col-span-10 place-items-center ">
                        <div className="w-full">
                          <div className="relative   flex flex-col gap-2   ">
                          
                            <span className="flex py-9 w-full justify-between place-items-center place-content-center">
                              {/* greetings, time */}
                              <span className="w-full justify-between h-max flex flex-col place-items-start gap-1">
                                <TopboxTwo />
                                <Clock userdata={userdata}/>
                              </span>
                              {/* add job button */}
                              <AddJobs formopen={formOpen} handleFormOpen={handleFormOpen} handleFormClose={handleFormClose} />
                            </span>
                            {/* generate stuff */}  
                            <span className="h-[15vh] my-5 overflow-x-scroll overflow-y-hidden w-full ">
                              <span className="w-max flex gap-2 h-full overflow-y-hidden">
                                  <InterviewRate jobdata={jobdata} />
                                  <GenResume/>
                                  <YourCoverLetter/>
                                  <TopboxOne jobdata={jobdata} />
                                  <ComingSoon/>
                              </span>
                            </span>
                          </div>
                          {/* add job form */}
                          <AddJobForm formopen={formOpen} handleClose={handleFormClose} jobdata={jobdata} />
                        </div>

                        {/* job table */}
                        <div className="relative flex pb-9 w-full justify-between place-items-center place-content-center">
                          <JobsTable jobdata={jobdata} />
                        </div>
                      </div>
  
  
                      
                    </div>
  
              </div>
                  
      </>
    );



};

