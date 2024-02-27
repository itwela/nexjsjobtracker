import { UserProfile } from '@clerk/nextjs';
import { Header } from "../components/header"; 
import  SecondHeader  from "../components/secondHeader";


const ProfilePage = () => {
  return (
    <>
      <div className="flex">
        {/* <SecondHeader/> */}

        <div className=" bg-backback-col flex min-h-screen flex-col place-content-center  w-[100vw]  pb-5 px-5 ">
          <Header/>
          
          <div className='w-[100vw] flex place-content-center'>
          <UserProfile />
          </div>
        </div>
        </div>

    </>
  );
};

export default ProfilePage;