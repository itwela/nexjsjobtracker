import { auth, currentUser } from '@clerk/nextjs';
import { ReactNode } from 'react';
import prisma from '../libs/db';
import { getFirstData } from '@/actions/databaseAc';
// import { stripe } from '../libs/stripe';

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
  const user = await sessionId 
  console.log(user)


  if (user) {
    const userData = {
      email: user.user?.emailAddresses[0]?.emailAddress as string,
      firstName: user.user?.firstName as string,
      name: user.user?.username as string,
      id: user.user?.id as string,
      lastName: user.user?.lastName as string,
      profileImage: user.user?.imageUrl,
        // email: 'email'
    };

    try {
      await getFirstData(userData);
      // Continue rendering the dashboard layout
    } catch (error) {
      console.error('Error while fetching user data:', error);
      // Handle the error appropriately
    }
  }

  if (!user) {
    return (
      <>
        <div className='flex place-items-center w-[100vw] h-[100vh] bg-backback-col'>
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
