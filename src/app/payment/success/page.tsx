import Link from "next/link";
import { Header } from "../../components/header";
import SecondHeader from "../../components/secondHeader";


const Success = () => {
  
  return (
      <>
      <div className="flex bg-backback-col text-main-w/60">
        <SecondHeader/>

        <div className="flex min-h-screen flex-col place-items-center  w-[100vw] md:w-[80vw] justify-start">
          <Header/>
          <div className="flex flex-col place-items-center text-center w-[80vw] pt-[40vh]">
            <h1 className="text-main-w">Payment Complete!</h1>
            <p className="text-muted-foreground w-[80%] hover:text-main-w">Congrats on becoming a JobKompass pro! You now have access to all JobKompass pro features!</p>
            </div>
        <div>
            <button className="mt-3 bg-main-w/70 hover:bg-main-w text-dprimary py-3 px-4 rounded-lg">
                <Link href='/dashboard'>Dashboard</Link>
            </button>
        </div>
        </div>

            
        </div>
      </>
    );
  };
  
  export default Success;