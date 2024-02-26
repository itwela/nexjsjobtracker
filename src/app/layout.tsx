"use client"; // This is a client component 👈🏽

import { ClerkProvider} from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect } from 'react'; // Remove useState import
import { Toaster } from "@/components/ui/sonner"



const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {


  useEffect(() => {
    // Your useEffect logic here
    return () => {
      // Cleanup logic if necessary
    };
  }, []);

  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signOutUrl="/sign-out"
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        {/* <body className={inter.className}> */}
        <body className='bg-main-w text-slate-800'>
          <main className="container mx-auto">
            <div className="flex items-start justify-center min-h-screen">
              <div className="">{children}</div>
              <Toaster />
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
