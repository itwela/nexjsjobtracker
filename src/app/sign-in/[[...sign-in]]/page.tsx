import { SignIn } from '@clerk/nextjs';
import { Header } from "../../components/header";


const SignInPage = () => {
  return (
    <>

        <div className="gradi h-[100vh] justify-between bg-gradient-to-b from-dprimary to-blue-500 w-[100vw] flex place-items-center flex-col">
        <Header/>
        <div className='h-[70vh]'>
        <SignIn />
        </div>
      </div>

    </>
  );
};
export default SignInPage;