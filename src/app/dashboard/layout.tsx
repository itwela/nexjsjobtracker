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


async function getJobData(userId: string) {
  try {
    const data = await prisma.job.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    return data;
  } catch (error) {
    console.error('Error in getJobData:', error);
    throw error;
  }
}

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { sessionId } = auth();
  const user = await currentUser() as { id: string; username: string; emailAddresses?: { emailAddress: string }[] } | null;


  if (user) {
    const userData = {
      id: user.id,
      name: user.username, // Adjust this according to the actual property name
      // email: user.emailAddresses?.[0].emailAddress as string
      email: 'email'
    };
    console.log(userData)

    try {
      await getFirstData(userData);
      // Continue rendering the dashboard layout
    } catch (error) {
      console.error('Error while fetching user data:', error);
      // Handle the error appropriately
    }
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
