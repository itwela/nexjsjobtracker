import CoverLetterGen from "../components/coverLetterComp";
import { Header } from "../components/header";
import SecondHeader from "../components/secondHeader";


const CoverLetter = () => {
  
  return (
      <>
      <div className="flex ">
             <div className="bg-dprimary relative">
              <SecondHeader/>
              </div>

        <div className="flex bg-gradient-to-b from-dprimary to-mprimary flex-col min-h-screen w-[100vw] md:w-[80vw] place-items-center justify-items-center text-main-w">

              <Header/>
              <div className="flex flex-col px-[3.5em] w-[100%] py-5">
                <h1 className="text-4xl font-bold text-main-w">Create a cover letter</h1>
                <h2 className='text-main-w/50 text-[0.6em] sm:text-[0.8em]'>Start generationg your cover letter by choosing a job and adding a relevant job description</h2>
              </div>
              <div className="px-9 w-[100%]">
              <CoverLetterGen/>
              </div>
          </div>
        </div>
      </>
    );
  };
  
  export default CoverLetter;