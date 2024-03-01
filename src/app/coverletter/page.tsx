import CoverLetterGen from "../components/coverLetterComp";
import { Header } from "../components/header";
import SecondHeader from "../components/secondHeader";


const CoverLetter = () => {
  
  return (
      <>
      <div className="flex ">
             <div className="hidden sm:flex w-[20vw] bg-dprimary relative">
              <SecondHeader/>
              </div>

        <div className="flex bg-gradient-to-b from-dprimary to-mprimary flex-col min-h-screen w-[100vw] sm:w-[80vw] place-items-center justify-items-center text-main-w">

              <Header/>
              <div className="flex px-[3.5em] w-[100%] py-5">
                <h1 className="text-4xl font-bold text-main-w/70">Create A Cover Letter</h1>
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