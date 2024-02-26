

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

export default async function SecondHeader ()  {
  noStore();
  auth();
  const user = await currentUser()
  const data = await getData(user?.id as string)




  return (
    <>

      <div className="">


        <header className=' min-20vw] min-h-screen'>
          <nav className='py-7  flex flex-col place-items-center place-content-center  min-w-[20vw]   min-h-screen justify-start bg-dprimary text-main-w'>
            <button className='bg-primary rounded-[0.5em] pb-3'>{data?.name}</button>  
            
            <div className='main  flex flex-col gap-4  min-h-[15vh]'>

            <div className='dashb  '>
                  
                      <Link href='/dashboard'>
                      <div className='flex hover:bg-mprimary/70 p-5 px-6 justify-between hover:text-main-w/70  20vw]'>
                                <p className='70%] truncate'>Dashoard</p>
                                
                                             
                            <button className=''><MdOutlineLibraryAdd/></button>
                          </div>
                      </Link>
            </div>

            <div className='coverl flex justify-between  '>
                      <Link href='/coverletter'>
                      <div className='flex hover:bg-mprimary/70 p-5 justify-between hover:text-main-w/70 px-6 20vw] '>
                              <p className=' 70%] truncate'>Cove Letterr</p>
                            <button className=''><LuNewspaper className=''/></button>
                        </div>
                      </Link>
            </div>

            <div className='tools flex justify-between  '>
                <Link href='/tools'>
                <div className='flex hover:bg-mprimary/70 p-5 hover:text-main-w/70 px-6 justify-between  20vw] '>
                      <p className=''>Tools</p>
                  <button className=''><PiToolboxBold className=''/>
                  </button>
                  </div>
                </Link>
            </div>

            </div>
            <div className='settings 100%]  cursor-pointer flex gap-4  h-[5%]'>
                <Link href='/billing'>
                  <div className='flex hover:bg-mprimary/70 p-5 hover:text-main-w/70 justify-between px-6 20vw] '>
                          <p className='70%] truncate'>Settings</p>
                      <button className=''><IoSettingsOutline  className=''/>
                      </button>
                  </div>
                </Link>
            </div>
          </nav>
        </header>

      </div>
    </>
  );
};
