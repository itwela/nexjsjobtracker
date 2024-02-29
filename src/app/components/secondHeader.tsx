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

export default function Secondheader() {
  useEffect(() => {
 
    setIsOpen(false)
    gsap.set('#nacbar',{
      xPercent: '-9000'
    })

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
        // Accessing user data
        const user = data.user;
        console.log("User:", user);

        // Accessing job data
        const jobData = data.jobdata;
        console.log("Job Data:", jobData);

        // Accessing intro data
        const introData = data.introdata;
        console.log("Intro Data:", introData);

        // Accessing cover letter data
        const coverLetterData = data.coverletterdata;
        console.log("Cover Letter Data:", coverLetterData);

        // Accessing specific properties of user data
        const username = user.username;
        const firstName = user.firstName;
        const lastName = user.lastName;
        console.log("Username:", username);
        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
        console.log('thiss is user data:', data)

        setAllData(data)


      } catch {

      }

    }

    getTheUser();

  }, [])

  const handleButtonClick = async (e: any) => {
    setIsOpen(!isOpen);
    console.log(isOpen);
    toast('yo', {
      description: 'its working'
    })
  };

  const [subscriptionText, setSubscriptionText] = useState('');
  const [coverText, setCoverText] = useState('');
  const [coverLength, setCoverLength] = useState();
  const [introLength, setIntroLength] = useState();
  const [allData, setAllData] = useState();
  const [isOpen, setIsOpen] = useState(false);


  if(isOpen != false) {
    gsap.to('#nacbar',{
      xPercent: '0',
      opacity: 1
    })

  }  

  if(isOpen != true) {
    gsap.to('#nacbar',{
      xPercent: '-800',
      opacity: 0
    })

  }  

  


  if (subscriptionText != 'active') {

    return (
      <>
    
      <span className="">


      <span className=''>
        <span  className='hidden md:flex nav-wrapper pt-8 pb-8 bg-dprimary md:flex flex-col justify-between w-full h-screen '>
        
        <nav className='  flex-col place-items-start place-content-start hidden md:flex  min-w-[20vw]    fixed justify-start  relative text-main-w'>
       
          {/* subscribe */}
          <Link href='/billing'>
            <span className=" pb-3 w-[20vw] flex place-content-center">
            <span className="w-[15vw] place-content-center bg-gradient-to-b from-blue-900 to-blue-400 outline outline-[1px] outline-main-w/40 hover:outline-main-w/80 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                <span>Subscribe</span>
              </span>
            </span>
          </Link>
          
          {/* <span className='pt-3 p-5 px-6 bg-primary rounded-[0.5em] pb-3'><FaRegCompass/></span>   */}
          
          <span className='main  flex flex-col gap-4  min-h-[15vh]'>

          <span className='dashb  '>
                
                    <Link href='/dashboard'>
                        <span className='flex  justify-between gap-4 hover:bg-mprimary/70 p-5 px-6 justify-between text-main-w/60 hover:text-main-w   w-[20vw] '>
                              <p className='truncate'>Dashoard</p>
                              <span className=''><MdOutlineLibraryAdd/></span>
                        </span>     
                    </Link>
          </span>

          <span className='coverl flex justify-between  '>
                    <Link href='/coverletter'>
                    <span className='flex  w-[20vw]  justify-between gap-4 hover:bg-mprimary/70 p-5 justify-between text-main-w/60 hover:text-main-w  px-6 '>
                            <p className=' truncate'>Cover Letter</p>
                          <span className=''><LuNewspaper className=''/></span>
                      </span>
                    </Link>
          </span>

          
          <span className='mydoc   gap-4 hover:bg-mprimary/70 cursor-pointer flex gap-4'>
              <Link href='/mydocs'>
                <span className='flex w-[20vw]  p-5 text-main-w/60 hover:text-main-w  place-items-center  justify-between px-6  '>
                        <p className='70%] truncate'>My Docs</p>
                    <span className=''><IoDocumentTextOutline  className=''/>
                    </span>
                </span>
              </Link>
          </span>

          <span className='settings   gap-4 hover:bg-mprimary/70 cursor-pointer flex gap-4'>
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
                
                <span className='flex w-[20vw] text-[0.8em]  p-5 text-main-w/60  hover:bg-mprimary/70 select-none hover:text-main-w  place-items-center  justify-between px-6  '>
                        <p className='70%] truncate'>Cover Letters</p>
                    <span className=''> / 3
                    </span>
                </span>

                <span className='flex w-[20vw] text-[0.8em]  p-5 text-main-w/60  hover:bg-mprimary/70 select-none hover:text-main-w  place-items-center  justify-between px-6  '>
                        <p className='70%] truncate'>Introductions</p>
                    <span className=''> / 3
                    </span>
                </span>

                <span className='flex w-[20vw] text-[0.8em]  p-5 text-main-w/60  hover:bg-mprimary/70 select-none hover:text-main-w  place-items-center  justify-between px-6  '>
                        <p className='70%] truncate'>Tracked Jobs</p>
                    <span className=''> / 3
                    </span>
                </span>
          </span>

        </span>

      </span>

      </span>

        {/* mobile */}
      <span id='hamburger' onMouseUp={handleButtonClick} className='absolute md:hidden bottom-6 left-5 z-10'>  <MenuIcon  className='text-main-w/60 hover:text-main-w cursor-pointer'/></span> 

        <span className="">

          <span className=''>
            <span id="nacbar"   className='opacity-0 nav-wrapper  bg-gradient-to-b from-dprimary to-blue-500 flex-col absolute top-0 z-[100] place-items-center place-content-center h-screen pt-8 pb-8 md:hidden flex z-10  w-[100vw]  '>
            <span id='hamburger' onMouseUp={handleButtonClick} className='absolute top-6 left-10 z-10'>  <MenuIcon  className='text-main-w/60 hover:text-main-w cursor-pointer'/></span> 


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
                            <p className='70%] truncate'>My Docs</p>
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
                <span className="w-[30vw] text-main-w  place-content-center bg-gradient-to-b from-blue-900 to-blue-400 outline outline-[1px] outline-main-w/40 hover:outline-main-w/80 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                    <span>Subscribe</span>
                  </span>
                </span>
              </Link>

              <span className='count absolute bottom-10   gap-2 cursor-pointer flex flex-col '>
                    
                    <span className='flex  p-2 text-main-w/60  hover:bg-mprimary/70 select-none hover:text-main-w  place-items-center  justify-between px-6  '>
                            <p className='70%] truncate'>Cover Letters</p>
                        <span className=''> / 3
                        </span>
                    </span>

                    <span className='flex  p-2 text-main-w/60  hover:bg-mprimary/70 select-none hover:text-main-w  place-items-center  justify-between px-6 gap-2  '>
                            <p className='70%] truncate'>Introductions</p>
                        <span className=''> / 3
                        </span>
                    </span>

                    <span className='flex   p-2 text-main-w/60  hover:bg-mprimary/70 select-none hover:text-main-w  place-items-center  justify-between px-6  '>
                            <p className='70%] truncate'>Tracked Jobs</p>
                        <span className=''> / 3
                        </span>
                    </span>
              </span> 


            </span>

          </span>

        </span>

     
    
      
      </>
    )

  }


  return (
    <>
  
      <span className="">
  
  
        <span className='hidden sm:flex bg-dprimary h-screen '>
       
         <span className='py-7  flex flex-col place-items-start place-content-start  min-w-[20vw]   h-screen fixed justify-start bg-dprimary relative text-main-w'>
            <span className='pt-3 p-5 px-6 bg-primary rounded-[0.5em] pb-3'><FaRegCompass/></span>  
            
            <span className='main  flex flex-col gap-4  min-h-[15vh]'>
  
            <span className='dashb  '>
                  
                      <Link href='/dashboard'>
                      <span className='flex  justify-between gap-4 hover:bg-mprimary/70 p-5 px-6 justify-between text-main-w/60 hover:text-main-w  w-[20vw] '>
                                <span className='truncate'>Dashoard</span>
                                
                                             
                            <span className=''><MdOutlineLibraryAdd/></span>
                          </span>
                      </Link>
            </span>
  
            <span className='coverl flex justify-between  '>
                      <Link href='/coverletter'>
                      <span className='flex  w-[20vw]  justify-between gap-4 text-main-w/60 hover:text-main-w  p-5 justify-between px-6 '>
                              <span className=' truncate'>Cover Letter</span>
                            <span className=''><LuNewspaper className=''/></span>
                        </span>
                      </Link>
            </span>
  
            
  
            <span className='settings   gap-4 hover:bg-mprimary/70 cursor-pointer flex gap-4  h-[5%]'>
                <Link href='/billing'>
                  <span className='flex w-[20vw] place-items-center  p-5 text-main-w/60 hover:text-main-w  justify-between px-6  '>
                          <span className='70%] truncate'>Settings</span>
                      <span className=''><IoSettingsOutline  className=''/>
                      </span>
                  </span>
                </Link>
            </span>
  
            </span>
          </span>
  
  
        </span>
  
      </span>
    </>
  );


}

  

