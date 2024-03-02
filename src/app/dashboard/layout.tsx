import { auth, currentUser } from '@clerk/nextjs';
import { ReactNode } from 'react';
import prisma from '../libs/db';
import { getFirstData, getUserData } from '@/actions/databaseAc';
import { stripe } from '../libs/stripe';



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
    <div className="flex">
      <div className="flex">
        <main>{children}</main>
        <h1></h1>
      </div>
    </div>
  );
}
