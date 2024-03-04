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


export default async function Home() {

  const {sessionId} = auth()
  const user = currentUser()

  if(await sessionId) {

    return redirect('/dashboard')

  }




  return (
    <>
    <div className="flex text-dprimary  w-[100vw] place-content-center place-items-center">
      <div className="flex min-h-screen  flex-col place-content-center  place-items-start w-[100vw]">
          <span className="md:hidden">
          <Secondheader/>
          </span>

          {/* section 1 intro hero */}
          <section className="gradi  overflow-hidden flex place-content-center flex-col w-[100vw] h-[100vh]">
          
              <Sec1Bg/>
              <span className="translate-y-[5vh]"><Header/> </span>
              <FirstComponent/>

          </section>

            <HeroSectionTwo/>

        

          {/* section 4 - pricing */} 

            <HomeSectionFour/>

          {/* section 5 - faq */} 
          <section className="flex w-[100vw] gap-3  px-8 flex flex-col md:flex-row place-items-center sm:place-content-center h-[100vh] py-[10vh] ">
          {/* <section className="w-[100vw] bg-gradient-to-b from-dprimary to-mprimary gap-3  px-8 flex flex-col md:flex-row place-items-center place-content-center h-[100vh] py-[10vh] "> */}

              <div className="h-[100vh] w-[100vw] justify-evenly flex place-items-center place-content-center flex-col text-center gap-2">
                  
                  <div className="flex flex-col w-[70%] place-content-center h-full  gap-7">

                      <h1 className="pt-9 sm-pt-0 text-center sm:text-4xl ">
                          Frequently Asked Questions
                        </h1>

                       

                        
                        <div className="flex w-full gap-4 h-[50vh]">
                          <Card className=" h-full flex place-items-center border-main-w/30 w-[100%] ">
                              <CardContent className="w-[100%]">
                                <Accordion type="single" collapsible className="w-[100%] sm:px-3 text-left text-[0.5em] sm:text-lg">
                                  
                                  <AccordionItem value="item-1">
                                    <AccordionTrigger>What is a JobKompass?</AccordionTrigger>
                                    
                                    <AccordionContent className="text-dprimary">
                                    <span className="hover:text-dprimary/80">
                                      JobKompass is a software application designed to help
                                      individuals manage and streamline their job search process. I
                                      t includes features such as job listing aggregation,
                                       application tracking, cover letter and introductino generation.
                                    </span>
                                    </AccordionContent>

                                  </AccordionItem>

                                  <AccordionItem value="item-2">
                                    <AccordionTrigger>How can a JobKompass benefit me?</AccordionTrigger>
                                    <AccordionContent className="text-dprimary">
                                        <span className="hover:text-dprimary/80">It helps you keep track of job applications, deadlines, and application statuses in one centralized location.</span> <br />
                                        {/* <span className="hover:text-dprimary/80">It streamlines the job search process by providing easy access to job listings from various sources.</span> <br /> */}
                                        <span className="hover:text-dprimary/80">It saves time by automating repetitive tasks, such as finding the right words to say to a recruiter and generating cover letters.</span> <br />
                                        <span className="hover:text-dprimary/80">It provides insights and analytics to help you assess your job search progress and optimize your strategy.</span> <br />
                                    </AccordionContent>
                                  </AccordionItem>

                                  <AccordionItem value="item-3">
                                    <AccordionTrigger>How does the AI cover letter generation feature work?</AccordionTrigger>
                                    <AccordionContent className="text-dprimary">
                                        <span className="hover:text-dprimary/80">
                                        The AI cover letter generation feature utilizes artificial intelligence 
                                        algorithms to analyze job descriptions and user-provided information.
                                        It then generates personalized cover letters tailored to each 
                                        job application, highlighting relevant skills, experiences, 
                                        and achievements.      
                                        </span> <br />
                                    </AccordionContent>
                                  </AccordionItem>

                                  <AccordionItem value="item-4">
                                    <AccordionTrigger>Can I customize the cover letters generated by the AI?</AccordionTrigger>
                                    <AccordionContent className="text-dprimary">
                                        <span className="hover:text-dprimary/80">
                                        Yes, you have the option to customize the cover letters generated 
                                        by the AI. You can edit the content and  format to better 
                                        reflect your personality and preferences. The AI serves as a starting point, 
                                        providing a foundation that you can modify as needed.
                                        </span> <br />
                                    </AccordionContent>
                                  </AccordionItem>

                                </Accordion>
                              </CardContent>
                          </Card>
                        </div>


                  </div>

              </div>

          </section>

      </div>
    </div>
    </>
  );
}
