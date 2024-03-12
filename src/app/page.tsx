import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BsStars } from "react-icons/bs";
import { Header } from "./components/header";
import Secondheader from "./components/secondHeader";
import HeroSectionTwo from "./section2";
import { MouseParallax, ScrollParallax } from "react-just-parallax";
import FirstComponent from "./section1";
import Sec1Bg from "./bfsection1";
import HomeSectionFour from "./section4";
import NLoginHeader from "./homenav";
import HeroSectionThree from "./section3";
import HeroSectionFive from "./section5";
import Footer from "./footer";


export default async function Home() {

  const {sessionId} = auth()
  const user = currentUser()

  if(await sessionId) {

    return redirect('/dashboard')

  }




  return (
    <>
    <div className="flex relative w-[100vw] place-content-center place-items-center">
      <div className="flex min-h-screen w-[100vw]  flex-col place-content-center  place-items-start w-[100vw]">
          {/* mobile header */}
          <span className="md:hidden">
          <Secondheader/>
          </span>

{/* header */}

          <span className=" ">
            <NLoginHeader/>
          </span>

          {/* section 1 intro hero */}
          <section className="gradi   overflow-hidden flex place-content-center place-items-center flex-col w-[100vw] h-[100vh]">
          
              <FirstComponent/>

          </section>

            <HeroSectionTwo/>

            {/* <HeroSectionThree/> */}
        
          {/* section 4 - pricing */} 

            <HomeSectionFour/>

          {/* section 5 - faq */} 
          <section className="flex w-[100vw] gap-3 bg-dprimary px-8 flex flex-col md:flex-row place-items-center sm:place-content-center h-[100vh] py-[10vh] ">


              <div className="flex flex-col w-[90%] sm:w-[70%] place-content-center h-full  gap-7">

                <h1 className="pt-9 text-main-w sm-pt-0 text-center sm:text-4xl ">
                  Frequently Asked Questions
                </h1>






                <Card className="w-[100%] border-transparent sm:px-3 text-main-w text-left text-lg">
                  <Accordion type="single" collapsible className="w-[100%]  h-max text-left">

                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">What is a JobKompass?</AccordionTrigger>

                      <AccordionContent className="text-main-w">
                        <span className="hover:text-main-w/80 select-none">
                          JobKompass is a software application designed to help
                          individuals manage and streamline their job search process. It 
                          includes features such as job listing aggregation,
                          application tracking, cover letter and introductino generation.
                        </span>
                      </AccordionContent>

                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">How can a JobKompass benefit me?</AccordionTrigger>
                      <AccordionContent className="text-main-w">
                        <span className="hover:text-main-w/80">It helps you keep track of job applications, deadlines, and application statuses in one centralized location.</span> <br />
                        {/* <span className="hover:text-main-w/80">It streamlines the job search process by providing easy access to job listings from various sources.</span> <br /> */}
                        <span className="hover:text-main-w/80">It saves time by automating repetitive tasks, such as finding the right words to say to a recruiter and generating cover letters.</span> <br />
                        <span className="hover:text-main-w/80">It provides insights and analytics to help you assess your job search progress and optimize your strategy.</span> <br />
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">How does the AI cover letter generation feature work?</AccordionTrigger>
                      <AccordionContent className="text-main-w">
                        <span className="hover:text-main-w/80">
                          The AI cover letter generation feature utilizes artificial intelligence
                          algorithms to analyze job descriptions and user-provided information.
                          It then generates personalized cover letters tailored to each
                          job application, highlighting relevant skills, experiences,
                          and achievements.
                        </span> <br />
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">Can I customize the cover letters generated by the AI?</AccordionTrigger>
                      <AccordionContent className="text-main-w">
                        <span className="hover:text-main-w/80">
                          Yes, you have the option to customize the cover letters generated
                          by the AI. You can edit the content and format to better
                          reflect your personality and preferences. The AI serves as a starting point,
                          providing a foundation that you can modify as needed.
                        </span> <br />
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>
                </Card>




              </div>


          </section>
          <Footer/>
      </div>
    </div>
    </>
  );
}
