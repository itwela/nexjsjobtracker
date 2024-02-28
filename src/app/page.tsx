import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Header } from "./components/header";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BsStars } from "react-icons/bs";
import { SlEnvolopeLetter } from "react-icons/sl";
import { LuMessagesSquare } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "react-day-picker";
import { CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";





export default async function Home() {

  const {sessionId} = auth()
  const user = currentUser()

  if(await sessionId) {

    return redirect('/dashboard')

  }



  return (
    <>
    <div className="flex text-main-w  w-[100vw] place-content-center place-items-center">
      <div className="flex min-h-screen  flex-col place-content-center  place-items-center w-[100vw]">
          
          {/* section 1 intro hero */}
          <section className="gradi bg-gradient-to-b from-dprimary to-blue-500 w-[100vw] flex place-items-center flex-col">
              
              <Header/>
              
              <div className="w-[100vw]  translate-y-[-10vh] gap-3 max-w-7xl px-8 flex flex-col md:flex-row place-items-center place-content-center h-screen ">
                    
                    <div className="w-[100vw] h-[100vh] place-items-center place-content-center flex flex-col text-center gap-2">
                          
                          <span className="scale-[70%] sm:scale-[100%] mb-3 bg-gradient-to-b from-blue-900 to-blue-400 outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                              <span>
                                <BsStars/>
                              </span>
                              <span>
                                Powered by Ai
                              </span>
                          </span>

                          <h1 className="text-5xl sm:text-7xl">
                            JobKompass
                          </h1>
                          <h2 className="text-main-w/50 hover:text-main-w text-lg">
                            optimize your job search today
                          </h2>
                          <Link
                          href='/sign-up'>
                        <button className="mt-4 text-dprimary bg-main-w p-3 rounded-full hover:text-dprimary/60 shadow-outline-white">
                          Get Started
                        </button>

                          </Link>

                    </div>

              </div>

          </section>

          {/* section 2 made by for */}
          <section className="w-[100vw] overflow-hidden bg-dprimary gap-3  px-8 flex flex-col md:flex-row place-items-center place-content-center h-[100vh] ">

              <div className="h-[100vh] pt-[10vh] w-[100vw] justify-start flex place-items-center place-content-center flex-col text-center gap-2">
                  
                  <div className="flex flex-col gap-5 place-items-center h-[50vh]">

                      <h1 className="text-left sm:text-center text-3xl sm:text-5xl bg-gradient-to-r from-main-w to-lprimary bg-clip-text text-transparent">
                        Made <em className="text-main-w pr-3">by </em> job seekers, <br />
                        <em className="text-main-w pr-3">for </em> job seekers
                      </h1>

                      {/* button group */}
                      <div className="w-[90%] sm:w-[70%] flex flex-col sm:flex-row place-items-start sm:place-items-center place-content-center gap-4">

                          <span className="h-[50px] text-main-w/60 hover:text-main-w leading-[1em] bg-gradient-to-b from-dprimary to-lprimary outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                              <span>
                                <SlEnvolopeLetter/>
                              </span>
                              <span>
                                Cover Letters
                              </span>
                          </span>

                          <span className="h-[50px] text-main-w/60 hover:text-main-w leading-[1em] bg-gradient-to-b from-dprimary to-lprimary outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                              <span>
                                <LuMessagesSquare/>
                              </span>
                              <span>
                                Follow-up Messages
                              </span>
                          </span>

                          <span className="h-[50px] text-main-w/60 hover:text-main-w leading-[1em] bg-gradient-to-b from-dprimary to-lprimary outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                              <span>
                                <FaRegCheckCircle/>
                              </span>
                              <span>
                                Application Tracking
                              </span>
                          </span>

                      </div>

                      {/* tired of ..... */}
                      <span className="pt-5 w-[90%] sm:w-[70%]">
                          <h2 className="text-sm sm:text-md text-left sm:text-center hover:text-main-w text-main-w/60">
                              Tired of rewriting cover letters? What about crafting messages to 
                              follow up on applications? Cant keep track of the 
                              job you applied to 3 weeks ago?
                          </h2>
                      </span>

                  </div>

                  <div className="h-[50vh] relative flex place-content-start place-items-center flex-col">
                      <h1 className="hidden sm:flex w-[70%] text-5xl bg-gradient-to-r from-main-w to-lprimary bg-clip-text text-transparent">
                          Save every application in one place
                      </h1>

                      <Card className="absolute border-main-w/40 top-[35%] h-[200em] w-[80vw] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                        <CardHeader>
                              <CardTitle>Track your job applications</CardTitle>
                              <CardDescription>Use ai to streamline your application process</CardDescription>
                            </CardHeader>
                            <CardContent>
                          
                                
                                    <div className="">
                                      img
                                    </div>

                            </CardContent>
                      </Card>
                  </div>
                  
              </div>

          </section>

          {/* section 3 - features */} 
          <section className="w-[100vw] bg-gradient-to-b from-dprimary to-blue-500 gap-3  px-8 flex flex-col md:flex-row place-items-center place-content-center h-[100vh] py-[10vh] ">

              <div className="h-[100vh] w-[100vw] justify-evenly flex place-items-center place-content-center flex-col text-center gap-2">
                  
                  <div className="flex flex-col w-[70%] gap-5 place-items-start">

                      <h1 className="text-left text-5xl text-main-w">
                        Features
                      </h1>

                      <Carousel
                          opts={{
                            align: "start",
                          }}
                          orientation="horizontal"
                          className="w-full mt-5 h-[70vh] flex   place-items-center place-content-center"
                        >
                                <CarouselPrevious />        
                                <CarouselNext />

                                <CarouselContent className="flex h-[50vh]  place-items-center place-content-start">
                                                              
                                        <CarouselItem className='w-[80vw] flex gap-2  h-full'>
                                             
                                           <Card className="h-full border-main-w/40 w-[50%] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                                              <CardHeader></CardHeader>
                                              <CardDescription></CardDescription>
                                              <CardContent></CardContent>
                                            </Card>


                                              <span className="flex flex-col h-full gap-2 w-[50%]">
                                                
                                              <Card className="h-full border-main-w/40 w-full bg-gradient-to-r from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                                                  <CardHeader></CardHeader>
                                                  <CardDescription></CardDescription>
                                                  <CardContent></CardContent>
                                                </Card>

                                                <Card className="h-full border-main-w/40 w-full bg-gradient-to-l from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                                                  <CardHeader></CardHeader>
                                                  <CardDescription></CardDescription>
                                                  <CardContent></CardContent>
                                                </Card>
                                              </span>
                                        </CarouselItem>

                                        <CarouselItem className='w-[80vw] flex flex-col gap-2  h-full'>
                                             
                                              <Card className="h-[50%] border-main-w/40 w-full bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75 ">
                                                <CardHeader></CardHeader>
                                                <CardDescription></CardDescription>
                                                <CardContent></CardContent>
                                              </Card>

                                              <span className="flex h-[50%] gap-2 w-full">
                                                
                                                <Card className="w-full border-main-w/40 h-full bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75 ">
                                                  <CardHeader></CardHeader>
                                                  <CardDescription></CardDescription>
                                                  <CardContent></CardContent>
                                                </Card>

                                                <Card className="w-full border-main-w/40 h-full bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75 ">
                                                  <CardHeader></CardHeader>
                                                  <CardDescription></CardDescription>
                                                  <CardContent></CardContent>
                                                </Card>
                                              </span>
                                        </CarouselItem>
                        
                                          
                              </CarouselContent>
                      </Carousel>


                  </div>

              </div>


          </section>

          {/* section 4 - pricing */} 
          <section className="w-[100vw] bg-gradient-to-b from-blue-500 to-dprimary gap-3  px-8 flex flex-col md:flex-row place-items-center place-content-center h-[100vh] py-[10vh] ">

              <div className="h-[100vh] w-[100vw] justify-evenly flex place-items-center place-content-center flex-col text-center gap-2">
                  
                  <div className="flex flex-col w-[70%] gap-5 place-items-start">

                      <h1 className="text-left text-5xl text-main-w">
                          Pricing
                        </h1>
                        <div className="flex flex-col sm:flex-row w-full gap-4 h-[60vh] sm:h-[50vh]">
                          <Card className="h-full border-main-w/40 hover:border-main-w/70  justify-evenly flex flex-col text-left p-6  w-[100%] sm:w-[50%] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                                <span className="flex w-[100%] justify-between">   
                                  <CardHeader className="text-3xl p-0 text-main-w/60">Basic</CardHeader>
                                    <span className="w-[20%] mb-3 outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-content-center">
                                            <span>
                                              Popular
                                            </span>
                                    </span>
                                  </span>
                                <CardHeader className="text-5xl p-0 text-main-w">Free</CardHeader>
                                <CardDescription className="text-main-w/70">Get started today for free</CardDescription>
                                <span className="w-[100%] h-[0.5%] bg-main-w/30"></span>
                                <CardContent className="p-0">
                                  <span className="flex flex-col py-2 gap-5">
                                      <span className="flex gap-2"> <CheckCircle2/>Track up to 3 jobs</span>
                                      <span className="flex gap-2"> <CheckCircle2/>Generate up to 3 cover letters</span>
                                      <span className="flex gap-2"> <CheckCircle2/>Generate  up to 3 job introduction messages</span>
                                  </span>
                                </CardContent>
                                <span className="w-[100%] mb-2 h-[0.5%] bg-main-w/30"></span>
{/* get started */}
                                <CardContent className="p-0 mt-2 w-[100%] flex place-content-center">
                                <Link
                                  href='/sign-up'>

                                  <span className="w-full mb-3 bg-gradient-to-b from-blue-900 to-blue-400 outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-content-center">
          
                                      <span>
                                        Get Started
                                      </span>
                                  </span>
                                  </Link>
                                </CardContent>
                          </Card>
                              

                          <Card className="h-full border-main-w/40 hover:border-main-w/70 justify-evenly flex flex-col text-left p-6  w-[100%] sm:w-[50%] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                              <span className="flex w-[100%] justify-between">   
                                <CardHeader className="text-3xl p-0 text-main-w/60">Pro</CardHeader>
                                  <span className="opacity-0 w-[30%] mb-3 outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-content-center">
                                          <span>
                                            Recommended
                                          </span>
                                  </span>
                                </span>
                                <span className="flex gap-4">   
                                    <CardHeader className="text-5xl p-0 text-main-w">$15.00</CardHeader>
                                    <span className="text-main-w/70"> / month</span>
                                </span>
                              <CardDescription className="text-main-w/70">For the serial job hunters</CardDescription>
                              <span className="w-[100%] h-[0.5%] bg-main-w/30"></span>
                              <CardContent className="p-0">
                                <span className="flex flex-col py-2 gap-5">
                                    <span className="flex gap-2"> <CheckCircle2/>Track an unlimited amount of jobs</span>
                                    <span className="flex gap-2"> <CheckCircle2/>Generate unlimited cover letters</span>
                                    <span className="flex gap-2"> <CheckCircle2/>Generate unlimited job introduction messages</span>
                                </span>
                              </CardContent>
                              <span className="w-[100%] mb-2 h-[0.5%] bg-main-w/30"></span>
    {/* get started */}
                              <CardContent className="p-0 mt-2 w-[100%] flex place-content-center">
                              <Link
                                  href='/sign-up'>

                                  <span className="w-full mb-3 bg-gradient-to-b from-blue-900 to-blue-400 outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-content-center">
          
                                      <span>
                                        Subscribe
                                      </span>
                                  </span>
                                  </Link>
                              </CardContent>
                          </Card>
                        </div>


                  </div>

              </div>

          </section>

          {/* section 5 - faq */} 
          <section className="w-[100vw] bg-gradient-to-b from-dprimary to-mprimary gap-3  px-8 flex flex-col md:flex-row place-items-center place-content-center h-[100vh] py-[10vh] ">

              <div className="min-h-[100vh] w-[100vw] justify-evenly flex place-items-center place-content-center flex-col text-center gap-2">
                  
                  <div className="flex flex-col w-[70%] place-items-center gap-7">

                      <h1 className="text-center text-4xl text-main-w">
                          Frequently Asked Questions
                        </h1>
                        <div className="flex w-full gap-4 h-[50vh]">
                          <Card className="h-full flex place-items-center border-main-w/30 w-[100%] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                              <CardHeader></CardHeader>
                              <CardDescription></CardDescription>
                              <CardContent className="w-[90%]">
                                <Accordion type="single" collapsible className="w-[100%] px-3 text-left">
                                  
                                  <AccordionItem value="item-1">
                                    <AccordionTrigger>What is a JobKompass?</AccordionTrigger>
                                    
                                    <AccordionContent className="text-main-w/40">
                                    <span className="hover:text-main-w/80">
                                      JobKompass is a software application designed to help
                                      individuals manage and streamline their job search process. I
                                      t includes features such as job listing aggregation,
                                       application tracking, cover letter and introductino generation.
                                    </span>
                                    </AccordionContent>

                                  </AccordionItem>

                                  <AccordionItem value="item-2">
                                    <AccordionTrigger>How can a JobKompass benefit me?</AccordionTrigger>
                                    <AccordionContent className="text-main-w/40">
                                        <span className="hover:text-main-w/80">It helps you keep track of job applications, deadlines, and application statuses in one centralized location.</span> <br />
                                        {/* <span className="hover:text-main-w/80">It streamlines the job search process by providing easy access to job listings from various sources.</span> <br /> */}
                                        <span className="hover:text-main-w/80">It saves time by automating repetitive tasks, such as finding the right words to say to a recruiter and generating cover letters.</span> <br />
                                        <span className="hover:text-main-w/80">It provides insights and analytics to help you assess your job search progress and optimize your strategy.</span> <br />
                                    </AccordionContent>
                                  </AccordionItem>

                                  <AccordionItem value="item-3">
                                    <AccordionTrigger>How does the AI cover letter generation feature work?</AccordionTrigger>
                                    <AccordionContent className="text-main-w/40">
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
                                    <AccordionTrigger>Can I customize the cover letters generated by the AI?</AccordionTrigger>
                                    <AccordionContent className="text-main-w/40">
                                        <span className="hover:text-main-w/80">
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
