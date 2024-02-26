import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <>
      <div className='flex place-items-center w-full h-screen'>
        <SignIn />
      </div>

    </>
  );
};
export default SignInPage;