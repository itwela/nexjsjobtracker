import Link from "next/link";
import { Header } from "../../components/header"; 
import  SecondHeader  from "../../components/secondHeader";


const Cancelled = () => {
  
  return (
      <>
      <div className="flex bg-backback-col text-main-w/60">
        <SecondHeader/>

        <div className="flex min-h-screen flex-col place-items-center  w-[90vw] md:w-[80vw] justify-start">
          <Header/>
            <h1 className="text-main-w">Payment Failed</h1>
            <p className="text-muted-foreground">No worries, you won't be charged. Please try again.</p>
        <div>
            <button>
                <Link href='/dashboard'>Go back to Dashboard</Link>
            </button>
        </div>
        </div>

            
        </div>
      </>
    );
  };
  
  export default Cancelled;