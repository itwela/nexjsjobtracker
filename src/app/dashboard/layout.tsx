import { ReactNode } from 'react';
import prisma from '../libs/db'
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { stripe } from '../libs/stripe';
import { unstable_noStore as noStore, revalidatePath } from "next/cache";




export async function getData(
  {id, firstName, lastName, email }
  : 
  {id: string; firstName: string | undefined | null; lastName: string | undefined | null; email: string}
  ) { 
    noStore();
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      stripeCustomerId: true
    }
  });

  if(!user) {
    const name = `${firstName ?? ''} ${lastName ?? ''}`
    await prisma.user.create({
      data: {
        id: id,
        name: name,
        email: email,
      }
    })
  }

  if(!user?.stripeCustomerId) {
    const data = await stripe.customers.create({
      email: email,
    });

    await prisma.user.update({
      where: {
        id: id
      },
      data: {
        stripeCustomerId: data.id
      }
    })
  }
}

async function getJobData(userId: string) {
  noStore();
  const data = prisma.job.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return data;
}



export default async function DashboardLayout({ children}: { children: ReactNode }) {
  noStore();
  // const { getUser } = currentUser();
  const user = await currentUser();
  if (!user) {
    return redirect('/')
  }
  

  return (
    <>
            <div className="flex">
                <div className="flex">
                    <main >{children}</main>
                    <h1></h1>
                </div>
            </div>
        </>
    )
}