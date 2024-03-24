import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import CoverLetterCard from './coverLetterCard';
import prisma from "@/app/libs/db";
import { unstable_noStore as noStore } from "next/cache";
import { currentUser } from "@clerk/nextjs";




 const  CoverLetterGen = async ({jobdata}: {jobdata: any}) => {


  return (
    <>
      <div className=' flex flex-col w-[100%] gap-3 pb-4'>
          
          <Card className="w-[100%] border-transparent ">
                
                <CardHeader className="py-1">
                    <CardTitle className="text-[1em]" >Choose a job</CardTitle>
                </CardHeader>

                <CardContent className="">

                  <CoverLetterCard jobdata={jobdata}/>

                </CardContent>
                {/* <CardFooter>
                  <p>Card Footer</p>
                </CardFooter> */}

                {/* generate me a short cover letter for a software company */}
          </Card>
      </div>
    </>
  );
};

export default CoverLetterGen;