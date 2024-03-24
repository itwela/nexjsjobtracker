import { SignUp } from '@clerk/nextjs';
import { Header } from "../../components/header";

const SignUpPage = () => {
  return (
    <>
    
      <div className="gradi h-[100vh] justify-between bg-gray-200 w-[100vw] flex place-items-center flex-col">
      <Header/>
      <div className='h-[80vh] scale-[80%] md:scale-[100%] '>
      <SignUp />
      </div>
    </div>
    </>
  );
};
export default SignUpPage;