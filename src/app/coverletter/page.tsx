import CoverLetterGen from "../components/coverLetterComp";
import { Header } from "../components/header";
import SecondHeader from "../components/secondHeader";


const CoverLetter = () => {
  
  return (
      <>
      <div className="flex ">
             <div className="w-[20vw] bg-dprimary relative">
              <SecondHeader/>
              </div>

        <div className="flex bg-backback-col flex-col min-h-screen w-[80vw] place-items-center justify-items-center text-main-w">

              <Header/>
              <div className="flex w-[100%] px-4 py-5">
                <h1 className="text-4xl font-bold text-main-w">Create A Cover Letter</h1>
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