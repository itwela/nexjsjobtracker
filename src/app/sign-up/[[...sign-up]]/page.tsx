import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <>
    <div className='flex place-items-center w-full h-screen'>
      <SignUp />
    </div>
    </>
  );
};
export default SignUpPage;