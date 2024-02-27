

import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { LuNewspaper } from "react-icons/lu";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { PiToolboxBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegCreditCard } from "react-icons/fa";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import prisma from '../libs/db'
import DashboardLayout from '../dashboard/layout';
import Link from 'next/link'
import { string } from 'zod';
import { auth, currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import { FaRegCompass } from "react-icons/fa";


async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      name: true
    }

  })
  return data;
}

export default async function SecondHeader ({ dbUser }: any)  {
  noStore();
  auth();
  const user = await currentUser()
  const data = await getData(user?.id as string)

  if (!dbUser?.stripeCustomerId){
      return(
        <>
                <div className="">


                  <header className='bg-dprimary '>
                    <nav className='py-7  flex flex-col place-items-start place-content-start  min-w-[20vw]   min-h-screen fixed justify-start bg-dprimary relative text-main-w'>
                      <button className='pt-3 p-5 px-6 bg-primary rounded-[0.5em] pb-3'><FaRegCompass/></button>  
                      
                      <div className='main  flex flex-col gap-4  min-h-[15vh]'>

                      <div className='dashb  '>
                            
                                <Link href='/dashboard'>
                                <div className='flex  justify-between gap-4 hover:bg-mprimary/70 p-5 px-6 justify-between hover:text-main-w/70  w-[20vw] '>
                                          <p className='truncate'>Dashoard</p>
                                          
                                                      
                                      <button className=''><MdOutlineLibraryAdd/></button>
                                    </div>
                                </Link>
                      </div>

                      <div className='coverl flex justify-between  '>
                                <Link href='/coverletter'>
                                <div className='flex  w-[20vw]  justify-between gap-4 hover:bg-mprimary/70 p-5 justify-between hover:text-main-w/70 px-6 '>
                                        <p className=' truncate'>Cove Letterr</p>
                                      <button className=''><LuNewspaper className=''/></button>
                                  </div>
                                </Link>
                      </div>

                      <div className='tools flex justify-between  '>
                          <Link href='/tools'>
                            <div className='flex  w-[20vw]  hover:bg-mprimary/70 p-5 hover:text-main-w/70 px-6 justify-between gap-4 '>
                                <p className=''>Tools</p>
                                <button className=''><PiToolboxBold className=''/>
                                </button>
                            </div>
                          </Link>
                      </div>

                      <div className='settings   gap-4 hover:bg-mprimary/70 cursor-pointer flex gap-4  h-[5%]'>
                          <Link href='/billing'>
                            <div className='flex w-[20vw]  p-5 hover:text-main-w/70 justify-between px-6  '>
                                    <p className='70%] truncate'>Settings</p>
                                <button className=''><IoSettingsOutline  className=''/>
                                </button>
                            </div>
                          </Link>
                      </div>

                      </div>

                      <div className='subscribe fixed bottom-10 gap-4 cursor-pointer flex place-content-center w-[20vw] gap-4 h-[5%]'>
                        <Link href='/billing'>
                          <div className='flex w-[15vw] p-4 justify-evenly px-6 bg-gradient-to-r from-blue-400 to-purple-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700 rounded-lg'>
                            <p className='truncate text-white'>Subscribe</p>
                          </div>
                        </Link>
                      </div>

                    </nav>


                  </header>

                </div>
        </>
      )

    }


  return (
    <>

      <div className="">


        <header className='bg-dprimary '>
          <nav className='py-7  flex flex-col place-items-start place-content-start  min-w-[20vw]   min-h-screen fixed justify-start bg-dprimary relative text-main-w'>
            <button className='pt-3 p-5 px-6 bg-primary rounded-[0.5em] pb-3'><FaRegCompass/></button>  
            
            <div className='main  flex flex-col gap-4  min-h-[15vh]'>

            <div className='dashb  '>
                  
                      <Link href='/dashboard'>
                      <div className='flex  justify-between gap-4 hover:bg-mprimary/70 p-5 px-6 justify-between hover:text-main-w/70  w-[20vw] '>
                                <p className='truncate'>Dashoard</p>
                                
                                             
                            <button className=''><MdOutlineLibraryAdd/></button>
                          </div>
                      </Link>
            </div>

            <div className='coverl flex justify-between  '>
                      <Link href='/coverletter'>
                      <div className='flex  w-[20vw]  justify-between gap-4 hover:bg-mprimary/70 p-5 justify-between hover:text-main-w/70 px-6 '>
                              <p className=' truncate'>Cove Letterr</p>
                            <button className=''><LuNewspaper className=''/></button>
                        </div>
                      </Link>
            </div>

            <div className='tools flex justify-between  '>
                <Link href='/tools'>
                  <div className='flex  w-[20vw]  hover:bg-mprimary/70 p-5 hover:text-main-w/70 px-6 justify-between gap-4 '>
                      <p className=''>Tools</p>
                      <button className=''><PiToolboxBold className=''/>
                      </button>
                  </div>
                </Link>
            </div>

            <div className='settings   gap-4 hover:bg-mprimary/70 cursor-pointer flex gap-4  h-[5%]'>
                <Link href='/billing'>
                  <div className='flex w-[20vw]  p-5 hover:text-main-w/70 justify-between px-6  '>
                          <p className='70%] truncate'>Settings</p>
                      <button className=''><IoSettingsOutline  className=''/>
                      </button>
                  </div>
                </Link>
            </div>

            </div>
          </nav>


        </header>

      </div>
    </>
  );
};
