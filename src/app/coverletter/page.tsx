import CoverLetterGen from "../components/coverLetterComp";
import { Header } from "../components/header";
import SecondHeader from "../components/secondHeader";


const CoverLetter = (jobdata: any) => {
  
  return (
      <>
      <div className="flex w-full">

        <div className="flex py-8 bg-gray-200 flex-col min-h-screen w-full place-items-center justify-items-center ">

              <div className="px-6 flex flex-col w-[100%] py-5">
                <h1 className="text-4xl font-bold ">Create a cover letter</h1>
                <h2 className=' text-[0.6em] sm:text-[0.8em]'>Start generating your cover letter by choosing a job and adding a relevant job description</h2>
              </div>
              <div className=" w-[100%]">
              <CoverLetterGen jobdata={jobdata}/> 
              </div>
          </div>
        </div>
      </>
    );
  };
  
  export default CoverLetter;