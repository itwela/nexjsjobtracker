import { UserProfile } from '@clerk/nextjs';
import { Header } from "../components/header"; 
import  SecondHeader  from "../components/secondHeader";


const ProfilePage = () => {
  return (
    <>
      <div className="flex">
        {/* <SecondHeader/> */}

        <div className="flex min-h-screen flex-col place-items-center  w-[100vw]  pb-5 px-5 justify-start">
          <Header/>
          <div className='w-[100%]'>
          <UserProfile />
          </div>
        </div>
        </div>

    </>
  );
};

export default ProfilePage;