import Link from "next/link";
import { FaRegNewspaper } from "react-icons/fa6";

export default function YourCoverLetter() {
    return (


        <>
          <Link href='/coverletter' className="w-[15em] sm:w-[20em] px-1 relative h-full ">
              <span  className="coverletter-card relative justify-evenly flex  text-white rounded-[0.5em] w-full h-full place-content-center place-items-center  mx-auto ">
                    <span className="w-[40%] h-[70%]  rounded-lg  flex place-items-center place-content-center">
                       <FaRegNewspaper className="w-[80%] h-[80%] bg-blue-100/50 rounded-lg p-3"/>
                    </span>
                    <span className="flex flex-col gap-2 text-[1em]  ">
                        <span>
                            Generate <br /> Cover letter
                        </span>
                    </span>
              </span>
                </Link>       
        </>
  
        
  
  
     
    );
}