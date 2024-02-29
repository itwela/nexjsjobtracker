"use client"; // This is a client component 👈🏽

import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from '@clerk/nextjs';
import { Bricolage_Grotesque, Darker_Grotesque, Familjen_Grotesk, Inter } from 'next/font/google';
import { use, useEffect, useState } from 'react'; // Remove useState import
import './globals.css';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// const bricol = Bricolage_Grotesque({ subsets: ['latin'] });
// const bricol = Darker_Grotesque({ subsets: ['latin'] });
const bricol = Familjen_Grotesk({ subsets: ['latin'] });



       

      


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  
  // const [isClicked, setIsCLicked] = useState(null)
  // useGSAP(() => {

  // const handleClick = (e: MouseEvent) => {
  //     console.log('YOOOOOOOO Button clicked!');
  //     setIsCLicked(!isClicked);
  //     console.log(isClicked)
  //   };

  //   const button = document.getElementById('hamburger');
  //   if (button) {
  //     button.addEventListener('click', handleClick);
  //   }

  // }, []); // Empty dependency array ensures this effect runs only once after initial render  

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
            <div className="flex items-start justify-center min-h-screen">
              <Toaster position="bottom-left" toastOptions={{ duration: 5000 }} />
              <div className="">{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
