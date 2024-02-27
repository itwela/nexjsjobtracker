import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import CoverLetterCard from './coverLetterCard';




const CoverLetterGen = () => {
  return (
    <>
      <div className=' flex flex-col w-[100%] gap-3 pb-4'>
          
          <Card className="w-[100%] border-transparent ">
                
                <CardHeader>
                  <CardTitle >Add A Job Description</CardTitle>
                  <CardDescription className='text-main-w/50'>Start generationg your Cover Letter by first adding a relevant job description</CardDescription>
                </CardHeader>

                <CardContent>

                  <CoverLetterCard/>

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