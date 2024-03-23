// "use client"; // This is a client component 👈🏽

import { UserButton, auth } from '@clerk/nextjs';
import { MenuIcon } from 'lucide-react';
import { unstable_noStore as noStore } from "next/cache";
import Link from 'next/link';
import React from 'react';

interface DropdownProps {
  title: string; // Specify the type of the 'title' prop
  children: React.ReactNode; // Specify the type of the 'children' prop
}


export const Header = () => {

  noStore();

  // -------
  const { userId } = auth();
  // -------

  
  const handleToolClick = () => {
  }

  // useGSAP (() => {
  
  //   // gsap.set("#navbox", {
  //   //   xPercent: '-1000'
  //   // })


  // }, [])


  return (
    <>

      <div className="w-full  ">


        <header className='flex   text-[0.8em]  relative h-[8vh] place-content-center'>
          <nav className='flex z-10 rounded-xl  bg-gradient-to-b from-transparent via-transparent to-transparent backdrop-blur-lg bg-opacity-75 fixed w-full py-5 justify-between place-contetn-center'>
          
          <div className='flex justify-between gap-7 w-full place-items-center place-content-center'>
            
            <span className='flex place-items-center gap-1'>
            <Link href='/'>
              <h1 id='header-name' className='text-sm sm:text-1xl pl-5  '>JobKompass</h1>
            </Link>
            </span>
            <div className='flex  '>
                {!userId && (
                  <>
                    <Link
                    id='signin'
                      href='/sign-in'
                      className=' text-sm text-main-w outline p-2 px-3 outline-[1px] rounded-full outline-main-w hover: mr-4'
                    >
                      Sign In
                    </Link>
                    <Link
                    id='signup'
                      href='/sign-up'
                      className='text-sm text-dprimary bg-main-w outline px-3 p-2 outline-[1px] rounded-full outline-main-w hover:text-dprimary/60 mr-4'
                    >
                      Sign Up
                    </Link>
                  </>
                )}
                {userId && (
                  <>
               
                  <Link href='/dashboard' className='hidden md:flex   text-sm mr-4 '>
                    Home
                  </Link>
               

                  </>
                )}
            </div>
          </div>

          {userId && (
          <div className='flex place-items-center gap-2 px-5'>

            <Link href='/profile' className='  text-sm mr-4'>
              Profile
            </Link>
            <div className='ml-auto'>
              <UserButton afterSignOutUrl='/' />
            </div>

          </div>
          )}
          
          </nav>
        </header>

      </div>
    </>
  );
};
