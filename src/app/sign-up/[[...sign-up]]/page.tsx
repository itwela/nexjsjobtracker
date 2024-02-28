import { SignUp } from '@clerk/nextjs';
import { Header } from "../../components/header";

const SignUpPage = () => {
  return (
    <>
    
      <div className="gradi h-[100vh] justify-between bg-gradient-to-b from-dprimary to-blue-500 w-[100vw] flex place-items-center flex-col">
      <Header/>
      <div className='h-[80vh]'>
      <SignUp />
      </div>
    </div>
    </>
  );
};
export default SignUpPage;