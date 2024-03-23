import { auth, currentUser } from '@clerk/nextjs';
import { ReactNode, Suspense } from 'react';
import prisma from '../libs/db';
import { getFirstData, getJobData, getUserData } from '@/actions/databaseAc';
import { stripe } from '../libs/stripe';
import spin from '../assets/system-solid-18-autorenew.gif'
import Dashboard from './page';



export default async function DashboardLayout() {
  try {
    const userdata = await currentUser();
    const jobdata = await getJobData();

    // Ensure userdata and jobdata are plain objects
    const plainUserData = JSON.parse(JSON.stringify(userdata));
    const plainJobData = JSON.parse(JSON.stringify(jobdata));

    return (
      <div className="flex">
        <div className="flex">
          <main><Dashboard userdata={plainUserData} jobdata={plainJobData}/></main>
          <h1></h1>
        </div>
      </div>
    );
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
    return null; // or render an error message
  }
}
