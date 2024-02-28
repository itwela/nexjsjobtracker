"use client"; // This is a client component 👈🏽

import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from '@clerk/nextjs';
import { Bricolage_Grotesque, Darker_Grotesque, Familjen_Grotesk, Inter } from 'next/font/google';
import { useEffect } from 'react'; // Remove useState import
import './globals.css';


// const bricol = Bricolage_Grotesque({ subsets: ['latin'] });
// const bricol = Darker_Grotesque({ subsets: ['latin'] });
const bricol = Familjen_Grotesk({ subsets: ['latin'] });



export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {



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
