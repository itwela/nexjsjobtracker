import { Header } from "../components/header"; 
import SecondHeader  from "../components/secondHeader";
import { unstable_noStore } from "next/cache";

const Settings = () => {
  
  return (
      <>
      <div className="flex">
        <SecondHeader/>

        <div className="flex min-h-screen flex-col place-items-center  w-[90vw] md:w-[80vw] justify-start">
          <Header/>
           <h1 className="text-slate-800">Settings</h1>
        </div>
        </div>
      </>
    );
  };
  
  export default Settings;