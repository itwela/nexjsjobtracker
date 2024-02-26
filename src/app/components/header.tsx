// "use client"; // This is a client component 👈🏽

import React from 'react';
import Link from 'next/link';
import { UserButton, auth } from '@clerk/nextjs';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { unstable_noStore as noStore } from "next/cache";

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


        <header className='flex   relative h-[8vh] place-content-center'>
          <nav className='flex fixed min-w-[80vw] max-w-[100vw] py-5 justify-between place-items-center'>
          
          <div className='flex place-items-center place-content-center justify-items-center justify-content-center px-5'>
            <Link href='/'>
              <h1 className='text-3xl text-main-w hover:text-main-w/80'>JobKompass</h1>
            </Link>
            <div className='flex px-5 pt-2'>
                {!userId && (
                  <>
                    <Link
                      href='/sign-in'
                      className='text-main-w hover:text-main-w/80 mr-4'
                    >
                      Sign In
                    </Link>
                    <Link
                      href='/sign-up'
                      className='text-main-w hover:text-main-w/80 mr-4'
                    >
                      Sign Up
                    </Link>
                  </>
                )}
                {userId && (
                  <>
               
                  <Link href='/dashboard' className='text-main-w hover:text-main-w/80 mr-4 '>
                    Dashboard
                  </Link>
               

                  </>
                )}
            </div>
          </div>

          {userId && (
          <div className='flex place-items-center gap-2 px-5'>

            <Link href='/profile' className='text-main-w hover:text-main-w/80 mr-4'>
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
