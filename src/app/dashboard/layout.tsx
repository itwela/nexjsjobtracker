import { auth, currentUser } from '@clerk/nextjs';
import { ReactNode, Suspense } from 'react';
import prisma from '../libs/db';
import { getFirstData, getUserData } from '@/actions/databaseAc';
import { stripe } from '../libs/stripe';
import spin from '../assets/system-solid-18-autorenew.gif'



export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const sessionId  = auth();
  const userfunc = currentUser()
  const user = await userfunc 
  // const userDa = await getUserData(user?.id as string)
  console.log(user)

    try {

          const find = await prisma.user.findUnique({
            where:  {
              id: user?.id
            } ,
            select: { 
              id: true, 
              stripeCustomerId: true
              }
          })

          if (!find) {      
              console.log('new user detected')      
              const userData = {
              email: user?.emailAddresses[0]?.emailAddress as string,
              firstName: user?.firstName as string,
              username: user?.username as string,
              id: user?.id as string,
              lastName: user?.lastName as string,
              profileImg: user?.imageUrl,
                // email: 'email'
              };
            await getFirstData(userData);
          }

    } catch (error) {
      console.log(`
        possible error with user detection
        check is user is in database.
      `)
    }



  if (!user) {
    return (
      <>
        <div className='flex place-items-center w-[100vw] h-[100svh] h-screen '>
            <p>
              no user
            </p>
        </div>
      </>
    )
  }

  return (
    <Suspense fallback={
        
      <div className='w-screen h-screen bg-lprimary flex-col flex place-content-center place-items-center'>
        <span className="w-full text-main-w pb-5 flex place-items-center place-content-center">
          JobKompass
        </span>
        <span className="flex gap-3 place-items-center place-content-center">
        <p className='text-main-w'>Your jobs are loading...</p>
        <img src={spin.src} alt="" className="w-[20px]"/>
        </span>
      </div>
    
    }>

    <div className="flex">
      <div className="flex">
        <main>{children}</main>
        <h1></h1>
      </div>
    </div>

    </Suspense>
  );
}
