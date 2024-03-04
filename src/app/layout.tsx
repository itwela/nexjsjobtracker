"use client"; // This is a client component 👈🏽

import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from '@clerk/nextjs';
import { Bricolage_Grotesque, Darker_Grotesque, Familjen_Grotesk, Inter } from 'next/font/google';
import { use, useEffect, useRef, useState } from 'react'; // Remove useState import
import './globals.css';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// const bricol = Bricolage_Grotesque({ subsets: ['latin'] });
// const bricol = Darker_Grotesque({ subsets: ['latin'] });
const bricol = Familjen_Grotesk({ subsets: ['latin'] });



       

      


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  
  useGSAP(()  => {

    let tl = gsap.timeline({defaults: {ease: 'power2.out', duration: 0.8}})
    
    tl.from(['#header-name', '#signin', '#signup'], {
      y: '-3000px',
      opacity: 0,
        stagger: 0.5,
    }).from(['#pbai', '#jkomp'], {
      y: '20px',
      opacity: 0,
      stagger: 0.5
    }).from('#optimize', {
      y: '-20px',
      opacity: 0,
    }).from('#cardc', {
      y: '25px',
      opacity: 0,
      duration: 1.2,
    }).from('#cardpic', {
    y: '25px',
    opacity: 0,
    duration: 3,
}).from('#herogsb', {
    y: '25px',
    opacity: 0,
    duration: 3,
  })
    
  }, [])


  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      // signOutUrl="/sign-out"
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        {/* <body className={inter.className}> */}
        <body className={`bg-main-w text-slate-800 font-main tracking-[0.9px]`}>
          <main className="container mx-auto">
            <div className="flex items-start justify-center min-h-[100svh] min-h-screen">
              <Toaster position="bottom-left" toastOptions={{ duration: 5000 }} />
              <div className="">{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
