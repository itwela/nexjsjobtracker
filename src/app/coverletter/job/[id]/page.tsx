import CoverLetterGen from "../../../components/coverLetterComp";
import { Header } from "../../../components/header";
import SecondHeader from "../../../components/secondHeader";
import NewClCard from "../../../components/clientcl";


const NewCoverLetter = () => {
  
  return (
      <>
      <div className="flex ">
             <div className="hidden sm:flex w-[20vw] bg-dprimary relative">
              <SecondHeader/>
              </div>

        <div className="flex bg-gradient-to-b from-dprimary to-mprimary flex-col min-h-screen w-[100vw] sm:w-[80vw] place-items-center justify-items-center text-main-w">

              <Header/>
              <div className="px-9 w-[100%]">
                <NewClCard/>
              </div>
          </div>
        </div>
      </>
    );
  };
  
  export default NewCoverLetter;