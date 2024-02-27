import { SignUp } from '@clerk/nextjs';
import { Header } from "../../components/header"; 

const SignUpPage = () => {
  return (
    <>
      <div className='bg-dprimary'>
      <Header/>
      </div>
    <div className='flex place-items-center place-content-center w-[100vw] bg-dprimary h-screen'>

      <SignUp />
    </div>
    </>
  );
};
export default SignUpPage;