import { getJobData } from '@/actions/databaseAc'; // Assuming `getUserData` is not used
import prisma from "@/app/libs/db";
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from "next/cache";
import SecondHeaderS from '../components/S_secondHeader';
import { stripe } from "../libs/stripe";
import Dashboard from './page';
import { Suspense } from 'react';


async function fetchData() {

  const clerkuser = await currentUser();

  // find user in database
  const user = await prisma.user.findUnique({
    where: {
      id: clerkuser?.id,
    },
    select: {
      id: true,
      stripeCustomerId: true,
    },
  });

  // create user in database
  if (!user) {
    await prisma.user.create({
      data: {
        id: clerkuser?.id as string,
        email: clerkuser?.emailAddresses[0].emailAddress as string,
        firstName: clerkuser?.firstName as string,
        lastName: clerkuser?.lastName as string,
      },
    });
  }

  // crete stip customer in database
  if (!user?.stripeCustomerId) {
    const data = await stripe.customers.create({
      email: clerkuser?.emailAddresses[0].emailAddress as string,
    });

    await prisma.user.update({
      where: {
        id: clerkuser?.id,
      },
      data: {
        stripeCustomerId: data.id,
      },
    });
  }


}

export default async function DashboardWithData() {

  
  try {
    await fetchData();
      const userdata = await currentUser();
      const jobdata = await getJobData();
  
      // Ensure userdata and jobdata are plain objects
      const plainUserData = JSON.parse(JSON.stringify(userdata));
      const plainJobData = Array.isArray(jobdata) ? jobdata : [];
  
      return (
        <Suspense fallback={
          <div className='bg-gray-200 w-screen h-screen flex place-content-center place-items-center'>
          <h1 className='text-2xl animate-pulse'>JobKompass</h1>
        </div>
          }>
          <div className="flex w-screen">
            <div className="flex w-full">
              <main className='w-full flex'>
                <div className="flex bg-dprimary relative sm:w-[20%] ">
                    <SecondHeaderS  />
                </div>
                <div className="flex sm:w-[80%] w-[100%]">
                  <Dashboard userdata={plainUserData} jobdata={plainJobData}  />
                </div>
              </main>
              <h1></h1> {/* Make sure to add content */}
            </div>
          </div>
        </Suspense>
      );
    } catch (error) {
      // Handle errors here
      console.error('Error fetching data:', error);
      return (
        <div className="flex flex-col gap-4 w-screen h-screen place-items-center place-content-center bg-gray-200 justify-center">
          <h1 className='text-4xl font-bold'>JobKompass</h1>
          <span>We're sorry, but something went wrong. Please try refreshing the page in a few seconds..</span>
          <button className='bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white'>Try Again</button>
  
        </div> 
  
)
}
}
