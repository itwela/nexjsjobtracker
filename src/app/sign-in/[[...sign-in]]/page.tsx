import { SignIn } from '@clerk/nextjs';
import { Header } from "../../components/header";


const SignInPage = () => {
  return (
    <>
      <div className='bg-dprimary'>
        <Header/>
      </div>

      <div className='flex bg-dprimary place-items-center place-content-center w-[100vw] h-screen'>
        <SignIn />
      </div>

    </>
  );
};
export default SignInPage;