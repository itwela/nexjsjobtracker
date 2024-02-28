import Link from "next/link";
import { Header } from "../../components/header";
import SecondHeader from "../../components/secondHeader";


const Cancelled = () => {
  
  return (
      <>
      <div className="flex bg-backback-col text-main-w/60">
        <SecondHeader/>

        <div className="flex w-[80vw] flex-col place-items-center">
          <Header/>
        <div>
          <div className="h-[90vh] text-center flex flex-col place-content-center">
            <h1 className="text-main-w text-xl">Payment Failed</h1>
            <p className="text-muted-foreground pb-5">No worries, you won't be charged. Please try again.</p>
            <button className="bg-main-w/70 hover:bg-main-w text-dprimary py-3 rounded-lg">
                <Link href='/dashboard'>Go back to Dashboard</Link>
            </button>
        </div>
        </div>
        </div>

            
        </div>
      </>
    );
  };
  
  export default Cancelled;