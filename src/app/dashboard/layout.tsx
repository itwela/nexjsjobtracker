import { auth, currentUser } from '@clerk/nextjs';
import { ReactNode } from 'react';
import prisma from '../libs/db';
import { getFirstData } from '@/actions/databaseAc';
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
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

async function getData({
  email,
  id,
  firstName,
  lastName,
  profileImage,
}: {
  email: string;
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  profileImage: string | undefined | null;
}) {
  noStore();
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      stripeCustomerId: true,
    },
  });

  if (!user) {
    const name = `${firstName ?? ""} ${lastName ?? ""}`;
    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: name,
      },
    });
  }

  if (!user?.stripeCustomerId) {
    const data = await stripe.customers.create({
      email: email,
    });

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        stripeCustomerId: data.id,
      },
    });
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const getUser  = auth();
  const user = await getUser;
  if (!user) {
    return redirect("/");
  }
  await getData({
    email: user.user?.emailAddresses[0]?.emailAddress as string,
    firstName: user.user?.firstName as string,
    id: user.user?.id as string,
    lastName: user.user?.lastName as string,
    profileImage: user.user?.imageUrl,
  });

  return (
    <div className="flex">
      <div className="flex">
        <main>{children}</main>
        <h1></h1>
      </div>
    </div>
  );
}
