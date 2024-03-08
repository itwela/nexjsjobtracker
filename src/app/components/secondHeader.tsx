'use client';

import { useEffect, useState } from "react";
import { FaRegCompass } from "react-icons/fa";
import { IoDocumentTextOutline, IoSettingsOutline } from "react-icons/io5";
import { LuNewspaper } from "react-icons/lu";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { MouseEvent } from 'react';
import { MenuIcon } from "lucide-react";
import { toast } from "sonner";
import gsap from "gsap";
import { Link } from "@nextui-org/react";

interface UserData {
  username: string;
}

interface JobData {
  id: string;
  JobTitle: string;
  Company: string;
  DateApplied: string;
  Status: string;
  Link: string;
  Referral: string;
  ReferralName: string | null;
  ReferralContact: string | null;
  Keywords: string | null;
  CoverLetter: string | null;

  // Define other properties
}

interface IntroData {
  id: string;
  text: string;
  // Define other properties
}

interface CoverLetterData {
  id: string;
  text: string;
  // Define other properties
}

interface SubscriptionData {
  status: string | null | undefined;
}

export default function Secondheader() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [jobData, setJobData] = useState<JobData[]>([]);
  const [introData, setIntroData] = useState<IntroData[]>([]);
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData[]>([]);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null >(null);
  
  useEffect(() => {
    setIsOpen(false); // Set isOpen to false initially
    getTheUser();
    gsap.set('#nacbar', {
      yPercent: '-900'
    });
  }, []);
  
  const handleButtonClick = async (e: any) => {
    setIsOpen(!isOpen);
  };

  const getTheUser = async () => {
    const hello = 'hi api for header'

    try {
      const response = await fetch('/api/db/getusername', {
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
      setUserData(data.userData)
      setCoverLetterData(data.coverletterdata)
      setIntroData(data.introdata)
      setSubscriptionData(data.subscriptiondata)
      setJobData(data.jobdata)
      // console.log('all the data', data)
      
    } catch {

    }

  }


  const [allData, setAllData] = useState();
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    if (isOpen) {
      gsap.to('#nacbar', {
        yPercent: '0',
        opacity: 1,
        ease: 'power4.inOut'
      });
    } else {
      gsap.to('#nacbar', {
        yPercent: '-800',
        opacity: 0,
      });
    }
  }, [isOpen]);

  
  // console.log('You have successfully logged the user data to frontend',userData)
  // console.log('You have successfully logged the jobdata to the frontend', jobData)
  // console.log('You have successfully logged the cover letter dat to the frontend',  coverLetterData)
  // console.log('You have successfully logged the subscription status data to the frontend',  subscriptionData)

  // if (subscriptionText != 'active') {
  if ( subscriptionData?.status != 'active') {

    return (
      <>
    
      <span className="">


      <span className=''>
        <span  className='hidden md:flex nav-wrapper pt-8 pb-8 bg-dprimary md:flex flex-col justify-between w-full h-screen '>
        
        <nav className='  flex-col place-items-start place-content-start hidden md:flex  min-w-[20vw]    fixed justify-start  relative text-main-w'>
       
          {/* subscribe */}
          <Link href='/billing'>
            <span className=" pb-3 w-[20vw] flex place-content-center">
            <span className="w-[15vw] place-content-center bg-gradient-to-l from-blue-900 to-blue-400 text-[0.8em] outline outline-[1px] outline-transparent hover:outline-main-w/80 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                <span>Subscribe</span>
              </span>
            </span>
          </Link>
          
          {/* <span className='pt-3 p-5 px-6 bg-primary rounded-[0.5em] pb-3'><FaRegCompass/></span>   */}
          
          <span className='main  flex flex-col gap-4  min-h-[15vh]'>

          <span className='dashb text-[0.8em]  '>
                
                    <Link href='/dashboard'>
                        <span className='flex  justify-between gap-4 hover:bg-mprimary/70 p-5 px-6 justify-between text-main-w/60 hover:text-main-w   w-[20vw] '>
                              <p className='truncate'>Dashoard</p>
                              <span className=''><MdOutlineLibraryAdd/></span>
                        </span>     
                    </Link>
          </span>

          <span className='coverl text-[0.8em] flex justify-between  '>
                    <Link href='/coverletter'>
                    <span className='flex  w-[20vw]  justify-between gap-4 hover:bg-mprimary/70 p-5 justify-between text-main-w/60 hover:text-main-w  px-6 '>
                            <p className=' truncate'>Cover Letter</p>
                          <span className=''><LuNewspaper className=''/></span>
                      </span>
                    </Link>
          </span>

          
          <span className='mydoc text-[0.8em]  gap-4 hover:bg-mprimary/70 cursor-pointer flex gap-4'>
              <Link href='/mydocs'>
                <span className='flex w-[20vw]  p-5 text-main-w/60 hover:text-main-w  place-items-center  justify-between px-6  '>
                        <p className='70%] truncate'>My docs</p>
                    <span className=''><IoDocumentTextOutline  className=''/>
                    </span>
                </span>
              </Link>
          </span>

          <span className='settings text-[0.8em]  gap-4 hover:bg-mprimary/70 cursor-pointer flex gap-4'>
              <Link href='/billing'>
                <span className='flex w-[20vw]  p-5 text-main-w/60 hover:text-main-w  place-items-center  justify-between px-6  '>
                        <p className='70%] truncate'>Settings</p>
                    <span className=''><IoSettingsOutline  className=''/>
                    </span>
                </span>
              </Link>
          </span>

          </span>



        </nav>

          <span className='count absolute bottom-10   gap-4 cursor-pointer flex flex-col gap-4'>
                
                <span className='text-[0.5em] flex gap-3 w-[20vw]  p-5 text-main-w/60  hover:bg-mprimary/70 select-none hover:text-main-w  place-items-center  justify-between px-6  '>
                        <p className='70%] truncate'>Cover Letters</p>
                    <span className=''>{coverLetterData.length} <span className="text-blue-500">/ 3</span>
                    </span>
                </span>

                <span className='flex w-[20vw] text-[0.5em] gap-3   p-5 text-main-w/60  hover:bg-mprimary/70 select-none hover:text-main-w  place-items-center  justify-between px-6  '>
                        <p className='70%] truncate'>Introductions</p>
                    <span className=''> {introData.length} <span className="text-blue-500">/ 3</span>
                    </span>
                </span>

                <span className='flex w-[20vw] text-[0.5em] gap-3    p-5 text-main-w/60  hover:bg-mprimary/70 select-none hover:text-main-w  place-items-center  justify-between px-6  '>
                        <p className='70%] truncate'>Tracked Jobs</p>
                    <span className=''>{jobData.length} <span className="text-blue-500">/ 3</span>
                    </span>
                </span>
          </span>

        </span>

      </span>

      </span>

        {/* mobile */}
      <span id='hamburger' onClick={handleButtonClick} className='fixed md:hidden bottom-6 left-5 z-10'>  <MenuIcon  className='text-main-w/60 hover:text-main-w cursor-pointer'/></span> 

        <span className="">

          <span className=''>
            <span id="nacbar"   className='opacity-0 nav-wrapper  bg-gradient-to-b from-dprimary to-blue-500 flex-col fixed top-0 z-[100] place-items-center place-content-center h-screen pt-8 pb-8 md:hidden flex z-10  w-[100vw]  '>
            <span id='hamburger' onClick={handleButtonClick} className='absolute bottom-6 left-10 z-10'>  <MenuIcon  className='text-main-w/60 hover:text-main-w cursor-pointer'/></span> 
            <span className="w-[100vw] h-[10vh] fixed top-0 flex place-items-center z-10 place-content-center text-main-w">JobKompass</span>

              <Link href='/dashboard'>
                <span className='dashb  '>
                      
                <span  className='flex justify-between gap-4 hover:bg-mprimary/70 p-5 justify-between text-main-w/60 hover:text-main-w  px-6 '>
                                    <p    className=''>Dashoard</p>
                                    <button   className=''><MdOutlineLibraryAdd/></button>
                              </span>     
                </span>
              </Link> 

              <span className='coverl  flex justify-between  '>
                        <Link href='/coverletter'>
                        <span className='flex justify-between gap-4 hover:bg-mprimary/70 p-5 justify-between text-main-w/60 hover:text-main-w  px-6 '>
                                <p className=' truncate'>Cover Letter</p>
                              <span className=''><LuNewspaper className=''/></span>
                          </span>
                        </Link>
              </span>
              
                  <Link href='/mydocs'>
                  <span className='flex justify-between gap-4 hover:bg-mprimary/70 p-5 justify-between text-main-w/60 hover:text-main-w  px-6 '>
                            <p className='70%] truncate'>My docs</p>
                        <span className=''><IoDocumentTextOutline  className=''/>
                        </span>
                    </span>
                  </Link>

                  <Link href='/billing'>
                  <span className='flex justify-between gap-4 hover:bg-mprimary/70 p-5 justify-between text-main-w/60 hover:text-main-w  px-6 '>
                            <p className='70%] truncate'>Settings</p>
                        <span className=''><IoSettingsOutline  className=''/>
                        </span>
                    </span>
                  </Link>

                      {/* subscribe */}
              <Link href='/billing' className="p-5">
                <span className=" pb-3 w-[20vw] flex place-content-center">
                <span className="w-[30vw] text-main-w  place-content-center bg-gradient-to-l from-blue-900 to-blue-400 outline outline-[1px] outline-transparent text-[0.8em] hover:outline-main-w/80 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                    <span>Subscribe</span>
                  </span>
                </span>
              </Link>

              <span className='count absolute bottom-10   gap-2 cursor-pointer flex flex-col '>
                    
                    <span className='flex  p-2 text-main-w/60  hover:bg-mprimary/70 select-none hover:text-main-w  place-items-center  justify-between px-6  '>
                            <p className='70%] truncate'>Cover Letters</p>
                        <span className=''>{coverLetterData.length} <span>/ 3</span>
                        </span>
                    </span>

                    <span className='flex  p-2 text-main-w/60  hover:bg-mprimary/70 select-none hover:text-main-w  place-items-center  justify-between px-6 gap-2  '>
                            <p className='70%] truncate'>Introductions</p>
                        <span className=''>{introData.length} <span>/ 3</span>
                        </span>
                    </span>

                    <span className='flex   p-2 text-main-w/60  hover:bg-mprimary/70 select-none hover:text-main-w  place-items-center  justify-between px-6  '>
                            <p className='70%] truncate'>Tracked Jobs</p>
                        <span className=''>{jobData.length} <span>/ 3</span>
                        </span>
                    </span>
              </span> 


            </span>

          </span>

        </span>

     
    
      
      </>
    )

  }


  // pro
  return (
    <>
    
    <span className="bg-dprimary">


    <span className=''>
      <span  className='hidden md:flex nav-wrapper pt-8 pb-8 bg-dprimary md:flex flex-col justify-between w-full h-screen '>
      
      <nav className='  flex-col place-items-start place-content-start hidden md:flex  min-w-[20vw]    fixed justify-start  relative text-main-w'>
     
        {/* Pro */}
        <Link href='/billing'>
          <span className=" pb-3 w-[20vw] flex place-content-center">
          <span className="w-[15vw] text-main-w place-content-center bg-gradient-to-l from-lprimary to-dprimary outline outline-[1px] outline-transparent text-[0.8em] hover:outline-main-w/80 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
              <span>Pro</span>
            </span>
          </span>
        </Link>
        
        {/* <span className='pt-3 p-5 px-6 bg-primary rounded-[0.5em] pb-3'><FaRegCompass/></span>   */}
        
        <span className='main  flex flex-col gap-4  min-h-[15vh]'>

        <span className='dashb text-[0.8em] '>
              
                  <Link href='/dashboard'>
                      <span className='flex  justify-between gap-4 hover:bg-mprimary/70 p-5 px-6 justify-between text-main-w/60 hover:text-main-w   w-[20vw] '>
                            <p className='truncate'>Dashoard</p>
                            <span className=''><MdOutlineLibraryAdd/></span>
                      </span>     
                  </Link>
        </span>

        <span className='coverl text-[0.8em] flex justify-between  '>
                  <Link href='/coverletter'>
                  <span className='flex  w-[20vw]  justify-between gap-4 hover:bg-mprimary/70 p-5 justify-between text-main-w/60 hover:text-main-w  px-6 '>
                          <p className=' truncate'>Cover Letter</p>
                        <span className=''><LuNewspaper className=''/></span>
                    </span>
                  </Link>
        </span>

        
        <span className='mydoc text-[0.8em]  gap-4 hover:bg-mprimary/70 cursor-pointer flex gap-4'>
            <Link href='/mydocs'>
              <span className='flex w-[20vw]  p-5 text-main-w/60 hover:text-main-w  place-items-center  justify-between px-6  '>
                      <p className='70%] truncate'>My docs</p>
                  <span className=''><IoDocumentTextOutline  className=''/>
                  </span>
              </span>
            </Link>
        </span>

        <span className='settings text-[0.8em]  gap-4 hover:bg-mprimary/70 cursor-pointer flex gap-4'>
            <Link href='/billing'>
              <span className='flex w-[20vw]  p-5 text-main-w/60 hover:text-main-w  place-items-center  justify-between px-6  '>
                      <p className='70%] truncate'>Settings</p>
                  <span className=''><IoSettingsOutline  className=''/>
                  </span>
              </span>
            </Link>
        </span>

        </span>



      </nav>


      </span>

    </span>

    </span>

      {/* mobile */}
    <span id='hamburger' onClick={handleButtonClick} className='fixed md:hidden bottom-6 left-5 z-10'>  <MenuIcon  className='text-main-w/60 hover:text-main-w cursor-pointer'/></span> 

      <span className="">

        <span className=''>
          <span id="nacbar"   className='opacity-0 nav-wrapper  bg-gradient-to-b from-dprimary to-blue-500 flex-col fixed top-0 z-[100] place-items-center place-content-center h-screen pt-8 pb-8 md:hidden flex z-10  w-[100vw]  '>
          <span id='hamburger' onClick={handleButtonClick} className='absolute bottom-6 left-10 z-10'>  <MenuIcon  className='text-main-w/60 hover:text-main-w cursor-pointer'/></span> 
          <span className="w-[100vw] h-[10vh] fixed top-0 flex place-items-center z-10 place-content-center text-main-w">JobKompass</span>

            <Link href='/dashboard'>
              <span className='dashb  '>
                    
              <span  className='flex justify-between gap-4 hover:bg-mprimary/70 p-5 justify-between text-main-w/60 hover:text-main-w  px-6 '>
                                  <p    className=''>Dashoard</p>
                                  <button   className=''><MdOutlineLibraryAdd/></button>
                            </span>     
              </span>
            </Link> 

            <span className='coverl  flex justify-between  '>
                      <Link href='/coverletter'>
                      <span className='flex justify-between gap-4 hover:bg-mprimary/70 p-5 justify-between text-main-w/60 hover:text-main-w  px-6 '>
                              <p className=' truncate'>Cover Letter</p>
                            <span className=''><LuNewspaper className=''/></span>
                        </span>
                      </Link>
            </span>
            
                <Link href='/mydocs'>
                <span className='flex justify-between gap-4 hover:bg-mprimary/70 p-5 justify-between text-main-w/60 hover:text-main-w  px-6 '>
                          <p className='70%] truncate'>My docs</p>
                      <span className=''><IoDocumentTextOutline  className=''/>
                      </span>
                  </span>
                </Link>

                <Link href='/billing'>
                <span className='flex justify-between gap-4 hover:bg-mprimary/70 p-5 justify-between text-main-w/60 hover:text-main-w  px-6 '>
                          <p className='70%] truncate'>Settings</p>
                      <span className=''><IoSettingsOutline  className=''/>
                      </span>
                  </span>
                </Link>

                    {/* pro */}
            <Link href='/billing' className="p-5">
              <span className=" pb-3 w-[20vw] flex place-content-center">
              <span className="w-[15vw] text-main-w place-content-center bg-gradient-to-l from-lprimary to-dprimary outline outline-[1px] outline-transparent text-[0.8em] hover:outline-main-w/80 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                  <span>Pro</span>
                </span>
              </span>
            </Link>

            


          </span>

        </span>

      </span>

   
  
    
    </>
  );


}

  

