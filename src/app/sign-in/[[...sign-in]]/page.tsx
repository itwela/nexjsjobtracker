import { SignIn } from '@clerk/nextjs';
import { Header } from "../../components/header";


const SignInPage = () => {
  return (
    <>

        <div className="gradi h-[100vh]  justify-between bg-gray-200 w-[100vw] flex place-items-center place-content-center flex-col">
        <Header/>
        <div className='h-[70vh] scale-[80%] md:scale-[100%] '>
        <SignIn />
        </div>
      </div>

    </>
  );
};
export default SignInPage;