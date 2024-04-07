import { SignIn } from '@clerk/nextjs';
import { Header } from "../../components/header";


const SignInPage = () => {
  return (
    <>

        <div className="gradi h-[100vh]  justify-between bg-gray-200 w-[100vw] flex place-items-center place-content-center flex-col">
        <Header/>
        <div className='h-[70vh] scale-[80%] md:scale-[100%] '>
        <SignIn
          appearance={{
            elements: {
              card: 'bg-white shadow-none',
              formButtonPrimary: 'bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-400 hover:to-blue-200',
            }
          }}
        />
        </div>
      </div>

    </>
  );
};
export default SignInPage;