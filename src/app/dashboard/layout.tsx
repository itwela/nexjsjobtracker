import { auth, currentUser } from '@clerk/nextjs';
import { ReactNode } from 'react';
import prisma from '../libs/db';
import { getFirstData, getUserData } from '@/actions/databaseAc';
import { stripe } from '../libs/stripe';

// export async function getData({ id, name, email }: { id: string ; name: string | null | undefined; email: string }) {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id },
//       select: { id: true, stripeCustomerId: true }
//     });

//     if (!user) {
//       await prisma.user.create({ data: { id, name, email } });
//     }

//     if (!user?.stripeCustomerId) {
//       const customer = await stripe.customers.create({ email });
//       await prisma.user.update({ where: { id }, data: { stripeCustomerId: customer.id } });
//     }
//   } catch (error) {
//     console.error('Error in getData:', error);
//     throw error;
//   }
// }


// async function getJobData(userId: string) {
//   try {
//     const data = await prisma.job.findMany({
//       where: { userId },
//       orderBy: { createdAt: 'desc' }
//     });
//     return data;
//   } catch (error) {
//     console.error('Error in getJobData:', error);
//     throw error;
//   }
// }

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const sessionId  = auth();
  const userfunc = currentUser()
  const user = await userfunc 
  const userDa = await getUserData(user?.id as string)
  console.log(user)

    try {

          const find = await prisma.user.findUnique({
            where:  {
              id: userDa?.id
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
        <div className='flex place-items-center w-[100vw] h-[100vh] '>
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
