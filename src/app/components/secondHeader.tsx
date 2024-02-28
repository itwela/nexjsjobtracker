

import { auth, currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import Link from 'next/link';
import { FaRegCompass } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LuNewspaper } from "react-icons/lu";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { PiToolboxBold } from "react-icons/pi";
import prisma from '../libs/db';

// interface UserTable {
//   id: string   
//   name: string
//   email: string  
//   stripeCustomerId : string
// }

// interface UserTablePrps {
//   dbUser: UserTable[]
// }

async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      username: true
    }

  })
  return data;
}

async function getSubscriptionData(userId: string) {
  noStore(); 
  const data = await prisma.subscription.findUnique({
      where: {
        userId: userId
      },
      select: {
        status: true,
        user: {
          select: {
            stripeCustomerId: true,
          }
        }
      }

    })
    return data;
}

export default async function Secondspan ()  {
  noStore();
  auth();
  const user = await currentUser()
  const data = await getData(user?.id as string)
  const subscriptiondata = await getSubscriptionData(user?.id as string)



  if(subscriptiondata?.status != 'active') {
    return (
      <>
    
      <span className="">


      <span className=''>
        <span className='nav-wrapper pt-8 pb-8 bg-dprimary flex flex-col justify-between w-full h-screen '>
        
        <nav className='  flex flex-col place-items-start place-content-start  min-w-[20vw]    fixed justify-start  relative text-main-w'>
       
          {/* subscribe */}
          <Link href='/billing'>
            <span className=" pb-3 w-[20vw] flex place-content-center">
            <span className="w-[15vw] place-content-center bg-gradient-to-b from-blue-900 to-blue-400 outline outline-[1px] outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
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

          <span className='tools flex justify-between  '>
              <Link href='/tools'>
                <span className='flex  w-[20vw]  hover:bg-mprimary/70 p-5 text-main-w/60 hover:text-main-w  px-6 justify-between gap-4 '>
                    <p className=''>Tools</p>
                    <span className=''><PiToolboxBold className=''/>
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


        </span>

      </span>

      </span>
    
      
      </>
    )


        }

  return (
    <>

      <span className="">


        <span className='bg-dprimary h-screen '>
       
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

            <span className='tools flex justify-between  '>
                <Link href='/tools'>
                  <span className='flex  w-[20vw]  hover:bg-mprimary/70 p-5 text-main-w/60 hover:text-main-w  px-6 justify-between gap-4 '>
                      <span className=''>Tools</span>
                      <span className=''><PiToolboxBold className=''/>
                      </span>
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
};
