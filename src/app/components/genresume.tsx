import Link from "next/link";
import { FaAlignLeft } from "react-icons/fa";

export default function GenResume() {
    return (


        <>
          <Link href='/generate' className="w-[15em] sm:w-[20em] px-1 relative h-full ">
              <span  className="resume-card relative justify-evenly flex  text-white rounded-[0.5em] w-full h-full place-content-center place-items-center  mx-auto ">
                    <span className="w-[40%] h-[70%]  rounded-lg  flex place-items-center place-content-center">
                       <FaAlignLeft className="w-[80%] h-[80%] bg-blue-100/50 rounded-lg p-3"/>
                    </span>
                    <span className="flex flex-col gap-2 text-[1em]  ">
                        <span>
                            Generate <br /> Resume
                        </span>
                    </span>
              </span>
                </Link>       
        </>
  
        
  
  
     
    );
}