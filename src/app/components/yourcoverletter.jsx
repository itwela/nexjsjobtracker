import Link from "next/link";

export default function YourCoverLetter() {
    return (


        <>
          <Link href='/coverletter' className="w-[10em] sm:w-[20em] px-1 relative min-h-[8em] sm:min-h-[25vh] ">
              <span  className="bg-mprimary   flex flex-col  rounded-[0.5em] w-full h-full place-content-center place-items-center text-main-w/70 hover:text-main-w mx-auto ">
                    <span className="flex flex-col gap-2 text-[0.6em] sm:text-[1em]  ">
                        <span>
                            Start a new cover letter
                        </span>
                    </span>
                <span className=' absolute bottom-2 left-2 z-10 flex place-items-end place-content-start'>
                </span>
              </span>
                </Link>       
        </>
  
        
  
  
     
    );
}