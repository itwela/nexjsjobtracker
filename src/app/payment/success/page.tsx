import Link from "next/link";
import { Header } from "../../components/header";
import SecondHeader from "../../components/secondHeader";


const Success = () => {
  
  return (
      <>
      <div className="flex bg-backback-col text-main-w/60">
        <SecondHeader/>

        <div className="flex min-h-screen flex-col place-items-center  w-[90vw] md:w-[80vw] justify-start">
          <Header/>
            <h1 className="text-main-w">Payment Complete!</h1>
            <p className="text-muted-foreground">Congrats on your subscription, please check your email for further instructions.</p>
        <div>
            <button className="bg-main-w/70 hover:bg-main-wtext-dprimary py-3 rounded-lg">
                <Link href='/dashboard'>Go back to Dashboard</Link>
            </button>
        </div>
        </div>

            
        </div>
      </>
    );
  };
  
  export default Success;