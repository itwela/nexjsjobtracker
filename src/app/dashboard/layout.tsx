import { ReactNode, Suspense } from 'react';
import { currentUser } from '@clerk/nextjs';
import { getJobData } from '@/actions/databaseAc'; // Assuming `getUserData` is not used
import Dashboard from './page';
import spin from '../assets/system-solid-18-autorenew.gif';
import SecondHeaderS from '../components/S_secondHeader';

export default function DashboardLayout() {
  return (
    <Suspense fallback={<div className="flex w-screen h-screen place-items-center place-content-center bg-gray-200 justify-center">
      <div className='flex flex-col gap-4 place-items-center place-content-center'>
        <span className='font-bold'>JobKompass</span>
        <span>Loading.....</span>
      </div>
      </div>}>
      <DashboardWithData />
    </Suspense>
  );
}

async function DashboardWithData() {
  try {
    const userdata = await currentUser();
    const jobdata = await getJobData();

    // Ensure userdata and jobdata are plain objects
    const plainUserData = JSON.parse(JSON.stringify(userdata));
    const plainJobData = Array.isArray(jobdata) ? jobdata : [];

    return (
      <div className="flex w-screen">
        <div className="flex w-full">
          <main className='w-full flex'>
             <div className="flex bg-dprimary relative sm:w-[20%] ">
                <SecondHeaderS  />
            </div>
            <div className="flex sm:w-[80%] w-[100%]">
              <Dashboard userdata={plainUserData} jobdata={plainJobData} />
            </div>
          </main>
          <h1></h1> {/* Make sure to add content */}
        </div>
      </div>
    );
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
    return <div>Error fetching data. Please try again later.</div>; // Render an error message
  }
}
