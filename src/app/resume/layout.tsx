import { ReactNode, Suspense } from 'react';
import spin from '../assets/system-solid-18-autorenew.gif'
import CoverLetter from './page';
import { currentUser } from '@clerk/nextjs';
import { getJobData, getUserData } from '@/actions/databaseAc';
import SecondHeaderS from '../components/S_secondHeader';
import MyResume from './page';


export default async function MyResumeLayoutWithData() {
    
    const userdata = await getUserData()
    const jobdata = await getJobData()  

    return (
        <>

            <div className="flex">
                <div className="flex w-screen">
                    <main className=' flex w-full'>
                      <div className='sm:w-[20%]'>
                        <SecondHeaderS />
                      </div>
                      <div className='w-[100%] sm:w-[80%]'>
                        <MyResume jobdata={jobdata} userdata={userdata} />
                      </div>
                    </main>
                </div>
            </div>
        </>
    )
}