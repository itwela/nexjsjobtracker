// "use client"; // This is a client component 👈🏽

import { UserButton, auth } from '@clerk/nextjs';
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

      <div className="w-[100%]  ">


        <header className='flex     relative h-[8vh] place-content-center'>
          <nav className='flex z-10 rounded-xl  bg-gradient-to-b from-transparent via-transparent to-transparent backdrop-blur-lg bg-opacity-75 fixed min-w-[80vw] max-w-[100vw] py-5 justify-between place-contetn-center'>
          
          <div className='flex justify-between w-[100%] place-items-center place-content-center'>
            <Link href='/'>
              <h1 className='text-1xl pl-5 text-main-w/60 hover:text-main-w'>JobKompass</h1>
            </Link>
            <div className='flex  '>
                {!userId && (
                  <>
                    <Link
                      href='/sign-in'
                      className='text-main-w outline p-2 px-3 outline-[1px] rounded-full outline-main-w hover:text-main-w/60 mr-4'
                    >
                      Sign In
                    </Link>
                    <Link
                      href='/sign-up'
                      className='text-dprimary bg-main-w outline px-3 p-2 outline-[1px] rounded-full outline-main-w hover:text-dprimary/60 mr-4'
                    >
                      Sign Up
                    </Link>
                  </>
                )}
                {userId && (
                  <>
               
                  <Link href='/dashboard' className='text-main-w/60 hover:text-main-w text-sm mr-4 '>
                    Dashboard
                  </Link>
               

                  </>
                )}
            </div>
          </div>

          {userId && (
          <div className='flex place-items-center gap-2 px-5'>

            <Link href='/profile' className='text-main-w/60 hover:text-main-w text-sm mr-4'>
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
