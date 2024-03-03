import { ReactNode, Suspense } from 'react';
import spin from '../assets/system-solid-18-autorenew.gif'


export default async function BillingLayout({ children}: { children: ReactNode }) {
    
    return (
        <>
                           <Suspense fallback={
        
        <div className='w-screen h-screen bg-gradient-to-b from-dprimary to-mprimary flex-col flex place-content-center place-items-center'>
          <span className="w-full text-main-w pb-5 flex place-items-center place-content-center">
            JobKompass
          </span>
          <span className="flex gap-3 place-items-center place-content-center">
          <p className='text-main-w'>Data is loading, please wait a moment...</p>
          <img src={spin.src} alt="" className="w-[20px]"/>
          </span>
        </div>
      
      }>


            <div className="flex">
                <div className="flex">
                    <main>{children}</main>
                </div>
            </div>

            </Suspense>
        </>
    )
}