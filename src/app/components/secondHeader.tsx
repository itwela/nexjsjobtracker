'use client';

import { useEffect, useState } from "react";
import { FaHome, FaRegCompass } from "react-icons/fa";
import { IoDocumentTextOutline, IoSettingsOutline } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa6";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { MouseEvent } from 'react';
import { MenuIcon } from "lucide-react";
import { toast } from "sonner";
import gsap from "gsap";
import { Link } from "@nextui-org/react";
import { FaRegMessage } from "react-icons/fa6";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import MenuIntroModalC from "./introCli";
import { BsStars } from "react-icons/bs";

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

export default function Secondheader({ userdata, userauth, jobdata }: { userdata: any; userauth: any; jobdata: any }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [jobData, setJobData] = useState<JobData[]>([]);
  const [introData, setIntroData] = useState<IntroData[]>([]);
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData[]>([]);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);

  const [menuModalOpen, setmenuModalOpen] = React.useState(false);
  const handleMenuModalOpen = () => setmenuModalOpen(!menuModalOpen);
  const handleMenuModalClose = () => setmenuModalOpen(false);


  useEffect(() => {
    setIsOpen(false); // Set isOpen to false initially
    getTheUser();
    gsap.set('#nacbar', {
      xPercent: '-900'
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
        xPercent: '0',
        opacity: 1,
        ease: 'power4.inOut'
      });
    } else {
      gsap.to('#nacbar', {
        xPercent: '-800',
        opacity: 0,
      });
    }
  }, [isOpen]);

  if (
    // 
    subscriptionData?.status != 'active' &&
    userdata?.username != 'Oudane'
  ) {

    return (
      <>



        <span className='hidden sm:flex nav-wrapper  bg-dprimary md:flex flex-col justify-between w-full h-full '>

          <nav className='  flex-col  hidden sm:flex  w-full h-full   fixed  relative text-main-w'>

            <span className='main w-full  p-4 flex flex-col gap-4 h-full justify-between'>

              {/* top */}
              <span className="flex flex-col gap-4">

                <span className="jk">
                  <span className="flex py-4 justify-between gap-4  place-items-center  justify-between text-main-w hover:text-main-w   w-full">
                    <span className="w-[60%] truncate">{userdata?.email}</span>
                    {/* {userauth != null && (
                        <> */}
                    <span ><UserButton /></span>
                    {/* </> 
                      )} */}
                  </span>
                </span>

                {/* home */}
                <Link className="p-1 w-full py-2  flex justify-between gap-4" href='/dashboard'>
                  <p className='truncate'>Home</p>
                  <span className=''><FaHome /></span>
                </Link>

                {/* features */}
                <span className="flex flex-col gap-4 my-4">

                  <span className="font-bold py-4 ">Features</span>

                  <Link className="p-1 w-full cursor-pointer  flex justify-between gap-4" href='/generate'>
                    <p className=' truncate'>Generate</p>
                    <span className=''><BsStars className='' /></span>
                  </Link>

                  {/* <Link className="p-1 w-full cursor-pointer  flex justify-between gap-4" href='/coverletter'>
                    <p className=' truncate'>Cover Letter</p>
                    <span className=''><FaRegNewspaper className='' /></span>
                  </Link> */}

                  <span onClick={handleMenuModalOpen} className="p-1 w-full cursor-pointer  flex justify-between gap-4">
                    <p className=' truncate'>Introduction</p>
                    <span className=''><FaRegMessage className='' /></span>
                  </span>

                  {menuModalOpen && (
                    <MenuIntroModalC menuModalOpen={menuModalOpen} handleMenuModalClose={handleMenuModalClose} jobdata={jobdata} />
                  )}

                  <Link className="p-1 w-full cursor-pointer  flex justify-between gap-4" href='/mydocs'>
                    <p className=' truncate'>My docs</p>
                    <span className=''><IoDocumentTextOutline className='' /></span>
                  </Link>
                </span>
              </span>

              <span className="flex flex-col gap-4 py-8">
                <Link className="w-full  flex justify-between gap-4" href='/profile'>
                  <p className=' truncate'>Profile</p>
                  <span className=''><IoSettingsOutline className='' /></span>
                </Link>

                <Link className="w-full  flex justify-between gap-4" href='/billing'>
                  <p className=' truncate'>Settings</p>
                  <span className=''><IoSettingsOutline className='' /></span>
                </Link>

                <Link href='/billing'>
                  <span className="rounded-lg py-4 w-full bg-gradient-to-r from-blue-600 to-blue-100 flex justify-center place-items-center place-content-center gap-4">
                    <span className="text-center text-white">
                      Subscribe
                    </span>
                  </span>
                </Link>

              </span>


            </span>



          </nav>

        </span>



        {/* mobile */}
        <span id='hamburger' onClick={handleButtonClick} className='fixed sm:hidden top-[1.5%] left-4 z-10'>  <MenuIcon className=' cursor-pointer' /></span>

        <span className="">

          <span className=''>
            <span id="nacbar" className='opacity-0 nav-wrapper fixed top-0 z-[100] place-items-center place-content-center h-screen pt-8 pb-8 sm:hidden flex z-10  w-[100vw]  justify-between '>
              <span id='hamburger' onClick={handleButtonClick} className='absolute top-4 left-3 z-10'>  <MenuIcon className='text-main-w hover:text-main-w cursor-pointer' /></span>

              <span className="w-[60%] bg-dprimary h-screen flex flex-col pt-5">
                <span className='main w-full text-white  p-4 flex flex-col gap-4 h-screen justify-between'>
                  {/* top */}
                  <span className="flex flex-col gap-4">

                    <span className="jk">
                      <span className="flex py-4 justify-between gap-4  place-items-center  justify-between text-main-w hover:text-main-w   w-full">
                        <span className="w-[60%] truncate">{userdata?.email}</span>
                        {/* {userauth != null && (
                              <> */}
                        <span ><UserButton /></span>
                        {/* </>
                            )} */}
                      </span>
                    </span>
                    {/* home */}
                    <Link className="p-1 w-full py-2  flex justify-between gap-4" href='/dashboard'>
                      <p className='truncate'>Home</p>
                      <span className=''><FaHome /></span>
                    </Link>
                    {/* features */}
                    <span className="flex flex-col gap-4 my-4">

                      <span className="font-bold py-4 ">Features</span>

                      <Link className="p-1 w-full cursor-pointer  flex justify-between gap-4" href='/generate'>
                        <p className=' truncate'>Generate Resume</p>
                        <span className=''><BsStars className='' /></span>
                      </Link>

                      {/* <Link className="p-1 w-full  flex justify-between gap-4" href='/coverletter'>
                        <p className=' truncate'>Cover Letter</p>
                        <span className=''><FaRegNewspaper className='' /></span>
                      </Link> */}

                      <span onClick={handleMenuModalOpen} className="p-1 w-full cursor-pointer  flex justify-between gap-4">
                        <p className=' truncate'>Introduction</p>
                        <span className=''><FaRegMessage className='' /></span>
                      </span>

                      {menuModalOpen && (
                        <MenuIntroModalC menuModalOpen={menuModalOpen} handleMenuModalClose={handleMenuModalClose} jobdata={jobdata} />
                      )}


                      <Link className="w-full  flex justify-between gap-4" href='/mydocs'>
                        <p className=' truncate'>My docs</p>
                        <span className=''><IoDocumentTextOutline className='' /></span>
                      </Link>
                    </span>
                  </span>
                  <span className="flex flex-col gap-4 py-8">
                    <Link className="w-full  flex justify-between gap-4" href='/profile'>
                      <p className=' truncate'>Profile</p>
                      <span className=''><IoSettingsOutline className='' /></span>
                    </Link>

                    <Link className="w-full  flex justify-between gap-4" href='/billing'>
                      <p className=' truncate'>Settings</p>
                      <span className=''><IoSettingsOutline className='' /></span>
                    </Link>

                    <span className='gap-2 w-full cursor-pointer flex flex-col'>

                      <span className='flex w-full pt-5  text-main-w   select-none hover:text-main-w  place-items-center  justify-between '>
                        <p className=' truncate'>Cover Letters</p>
                        <span className=''>{coverLetterData.length} <span>/ 3</span>
                        </span>
                      </span>
                      <span className='flex w-full  text-main-w   select-none hover:text-main-w  place-items-center  justify-between  gap-2  '>
                        <p className=' truncate'>Introductions</p>
                        <span className=''>{introData.length} <span>/ 3</span>
                        </span>
                      </span>
                      <span className='flex w-full  text-main-w   select-none hover:text-main-w  place-items-center  justify-between  '>
                        <p className=' truncate'>Tracked Jobs</p>
                        <span className=''>{jobData.length} <span>/ 3</span>
                        </span>
                      </span>
                    </span>

                    <Link href='/billing'>
                      <span className="rounded-lg py-4 w-full bg-gradient-to-r from-blue-600 to-blue-100 flex justify-center place-items-center place-content-center gap-4">
                        <span className="text-center text-white">
                          Subscribe
                        </span>
                      </span>
                    </Link>

                  </span>
                </span>
              </span>

              <span className="w-[40%] bg-dprimary/70 h-screen"></span>

            </span>

          </span>

        </span>




      </>
    )

  }


  // pro
  return (
    <>

      <span className='hidden sm:flex nav-wrapper  bg-dprimary md:flex flex-col justify-between w-full h-full '>

        <nav className='  flex-col  hidden sm:flex  w-full justify-between h-full   fixed  relative text-main-w'>



          <span className='main w-full  p-4 flex flex-col gap-4 h-full justify-between'>

            {/* top */}
            <span className="flex flex-col gap-4">

              <span className="jk">
                <span className="flex py-4 justify-between gap-4  place-items-center  justify-between text-main-w hover:text-main-w   w-full">
                  <span className="w-[60%] truncate">{userdata?.email}</span>
                  {/* {userauth != null && (
                        <> */}
                  <span ><UserButton /></span>
                  {/* </> 
                      )} */}
                </span>
              </span>

              {/* home */}
              <Link className="p-1 w-full py-2  flex justify-between gap-4" href='/dashboard'>
                <p className='truncate'>Home</p>
                <span className=''><FaHome /></span>
              </Link>

              {/* features */}
              <span className="flex flex-col gap-4 my-4">

                <span className="font-bold py-4 ">Features</span>

                <Link className="p-1 w-full cursor-pointer  flex justify-between gap-4" href='/generate'>
                    <p className=' truncate'>Generate</p>
                    <span className=''><BsStars className='' /></span>
                  </Link>

                  
                {/* <Link className="p-1 w-full  flex justify-between gap-4" href='/coverletter'>
                  <p className=' truncate'>Cover Letter</p>
                  <span className=''><FaRegNewspaper className='' /></span>
                </Link> */}

                <span onClick={handleMenuModalOpen} className="p-1 w-full cursor-pointer  flex justify-between gap-4">
                  <p className=' truncate'>Introduction</p>
                  <span className=''><FaRegMessage className='' /></span>
                </span>

                {menuModalOpen && (
                  <MenuIntroModalC menuModalOpen={menuModalOpen} handleMenuModalClose={handleMenuModalClose} jobdata={jobdata} />
                )}


                <Link className="p-1 w-full  flex justify-between gap-4" href='/mydocs'>
                  <p className=' truncate'>My docs</p>
                  <span className=''><IoDocumentTextOutline className='' /></span>
                </Link>
              </span>
            </span>

            <span className="flex flex-col gap-4 py-8">
              <Link className="w-full  flex justify-between gap-4" href='/profile'>
                <p className=' truncate'>Profile</p>
                <span className=''><IoSettingsOutline className='' /></span>
              </Link>

              <Link className="w-full  flex justify-between gap-4" href='/billing'>
                <p className=' truncate'>Settings</p>
                <span className=''><IoSettingsOutline className='' /></span>
              </Link>

              <span className=" py-4 w-full select-none flex justify-center place-items-center place-content-center gap-4">
                <span className="bg-gradient-to-r text-center from-blue-600 to-blue-100 text-transparent bg-clip-text">
                  JobKompass Pro
                </span>
              </span>
            </span>

          </span>



        </nav>

      </span>

      {/* mobile */}
      <span id='hamburger' onClick={handleButtonClick} className='fixed sm:hidden top-[1.5%] left-4 z-10'>  <MenuIcon className=' cursor-pointer' /></span>

      <span className="">

        <span className=''>
          <span id="nacbar" className='opacity-0 nav-wrapper fixed top-0 z-[100] place-items-center place-content-center h-screen pt-8 pb-8 sm:hidden flex z-10  w-[100vw]  justify-between '>
            <span id='hamburger' onClick={handleButtonClick} className='absolute top-4 left-3 z-10'>  <MenuIcon className='text-main-w hover:text-main-w cursor-pointer' /></span>

            <span className="w-[60%] bg-dprimary h-screen flex flex-col pt-5">
              <span className='main w-full text-white  p-4 flex flex-col gap-4 h-screen justify-between'>
                {/* top */}
                <span className="flex flex-col gap-4">

                  <span className="jk">
                    <span className="flex py-4 justify-between gap-4  place-items-center  justify-between text-main-w hover:text-main-w   w-full">
                      <span className="w-[60%] truncate">{userdata?.email}</span>
                      {/* {userauth != null && (
                              <> */}
                      <span ><UserButton /></span>
                      {/* </>
                            )} */}
                    </span>
                  </span>
                  {/* home */}
                  <Link className="p-1 w-full py-2  flex justify-between gap-4" href='/dashboard'>
                    <p className='truncate'>Home</p>
                    <span className=''><FaHome /></span>
                  </Link>
                  {/* features */}
                  <span className="flex flex-col gap-4 my-4">

                    <span className="font-bold py-4 ">Features</span>

                    <Link className="p-1 w-full cursor-pointer  flex justify-between gap-4" href='/generate'>
                      <p className=' truncate'>Generate</p>
                      <span className=''><BsStars className='' /></span>
                    </Link>

                    {/* <Link className="p-1 w-full  flex justify-between gap-4" href='/coverletter'>
                      <p className=' truncate'>Cover Letter</p>
                      <span className=''><FaRegNewspaper className='' /></span>
                    </Link> */}

                    <span onClick={handleMenuModalOpen} className="p-1 w-full cursor-pointer  flex justify-between gap-4">
                      <p className=' truncate'>Introduction</p>
                      <span className=''><FaRegMessage className='' /></span>
                    </span>

                    {menuModalOpen && (
                      <MenuIntroModalC menuModalOpen={menuModalOpen} handleMenuModalClose={handleMenuModalClose} jobdata={jobdata} />
                    )}


                    <Link className="w-full  flex justify-between gap-4" href='/mydocs'>
                      <p className=' truncate'>My docs</p>
                      <span className=''><IoDocumentTextOutline className='' /></span>
                    </Link>
                  </span>
                </span>
                <span className="flex flex-col gap-4 py-8">
                  <Link className="w-full  flex justify-between gap-4" href='/profile'>
                    <p className=' truncate'>Profile</p>
                    <span className=''><IoSettingsOutline className='' /></span>
                  </Link>

                  <Link className="w-full  flex justify-between gap-4" href='/billing'>
                    <p className=' truncate'>Settings</p>
                    <span className=''><IoSettingsOutline className='' /></span>
                  </Link>

                  <span className='gap-2 w-full cursor-pointer flex flex-col'>

                    <span className='flex w-full pt-5  text-main-w   select-none hover:text-main-w  place-items-center  justify-between '>
                      <p className=' truncate'>Cover Letters</p>
                      <span className=''>{coverLetterData.length} <span></span>
                      </span>
                    </span>
                    <span className='flex w-full  text-main-w   select-none hover:text-main-w  place-items-center  justify-between  gap-2  '>
                      <p className=' truncate'>Introductions</p>
                      <span className=''>{introData.length} <span></span>
                      </span>
                    </span>
                    <span className='flex w-full  text-main-w   select-none hover:text-main-w  place-items-center  justify-between  '>
                      <p className=' truncate'>Tracked Jobs</p>
                      <span className=''>{jobData.length} <span></span>
                      </span>
                    </span>
                  </span>

                  <Link href='/billing'>
                    <span className="rounded-lg py-4 w-full  flex justify-center place-items-center place-content-center gap-4">
                      <span className="text-center text-transparent font-bold bg-gradient-to-r from-blue-600 to-blue-100 bg-clip-text">
                        JobKompass Pro
                      </span>
                    </span>
                  </Link>

                </span>
              </span>
            </span>

            <span className="w-[40%] bg-dprimary/70 h-screen"></span>

          </span>

        </span>

      </span>


    </>
  );


}



