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
                          
                          <span className="bg-gradient-to-b from-blue-900 to-blue-400 outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-2 place-items-center">
                              <span>
                                <BsStars/>
                              </span>
                              <span>
                                Powered by Ai
                              </span>
                          </span>

                          <h1 className="text-7xl">
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

                      <h1 className="text-5xl bg-gradient-to-r from-main-w to-lprimary bg-clip-text text-transparent">
                        Made <em className="hover:text-main-w">by</em> Job Seekers, <br />
                        <em className="hover:text-main-w">For</em> Job Seekers
                      </h1>

                      {/* button group */}
                      <div className="w-[70%] flex gap-4">

                          <span className="h-[50px] text-main-w/60 hover:text-main-w leading-[1em] bg-gradient-to-b from-dprimary to-lprimary outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-1 place-items-center">
                              <span>
                                <SlEnvolopeLetter/>
                              </span>
                              <span>
                                Cover Letters
                              </span>
                          </span>

                          <span className="h-[50px] text-main-w/60 hover:text-main-w leading-[1em] bg-gradient-to-b from-dprimary to-lprimary outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-1 place-items-center">
                              <span>
                                <LuMessagesSquare/>
                              </span>
                              <span>
                                Follow-up Messages
                              </span>
                          </span>

                          <span className="h-[50px] text-main-w/60 hover:text-main-w leading-[1em] bg-gradient-to-b from-dprimary to-lprimary outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-1 place-items-center">
                              <span>
                                <FaRegCheckCircle/>
                              </span>
                              <span>
                                Application Tracking
                              </span>
                          </span>

                      </div>

                      {/* tired of ..... */}
                      <span className="pt-5 w-[70%]">
                          <h2 className="hover:text-main-w text-main-w/60">
                              Tired of rewriting cover letters? What about crafting messages to 
                              follow up on applications? Cant keep track of the 
                              job you applied to 3 weeks ago?
                          </h2>
                      </span>

                  </div>

                  <div className="h-[50vh] relative flex place-content-start place-items-center flex-col">
                      <h1 className="w-[70%] text-5xl bg-gradient-to-r from-main-w to-lprimary bg-clip-text text-transparent">
                          Save every application in one place
                      </h1>

                      <Card className="absolute top-[35%] h-[200em] w-[80vw] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
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

                      <h1 className="text-left text-5xl bg-gradient-to-r from-main-w to-lprimary bg-clip-text text-transparent">
                        Made <em className="hover:text-main-w">by</em> Job Seekers, <br />
                        <em className="hover:text-main-w">For</em> Job Seekers
                      </h1>

                      <Carousel
                          opts={{
                            align: "start",
                          }}
                          orientation="horizontal"
                          className="w-full mt-5 h-[50vh] flex   place-items-center place-content-center"
                        >
                                <CarouselPrevious />        
                                <CarouselNext />

                                <CarouselContent className="flex h-[50vh]  place-items-center place-content-start">
                                                              
                                        <CarouselItem className='w-[80vw] flex gap-2  h-full'>
                                             
                                           <Card className="h-full w-[50%] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                                              <CardHeader></CardHeader>
                                              <CardDescription></CardDescription>
                                              <CardContent></CardContent>
                                            </Card>


                                              <span className="flex flex-col h-full gap-2 w-[50%]">
                                                
                                              <Card className="h-full w-full bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                                                  <CardHeader></CardHeader>
                                                  <CardDescription></CardDescription>
                                                  <CardContent></CardContent>
                                                </Card>

                                                <Card className="h-full w-full bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                                                  <CardHeader></CardHeader>
                                                  <CardDescription></CardDescription>
                                                  <CardContent></CardContent>
                                                </Card>
                                              </span>
                                        </CarouselItem>

                                        <CarouselItem className='w-[80vw] flex flex-col gap-2  h-full'>
                                             
                                              <Card className="h-[50%] w-full bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75 ">
                                                <CardHeader></CardHeader>
                                                <CardDescription></CardDescription>
                                                <CardContent></CardContent>
                                              </Card>

                                              <span className="flex h-[50%] gap-2 w-full">
                                                
                                                <Card className="w-full h-full bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75 ">
                                                  <CardHeader></CardHeader>
                                                  <CardDescription></CardDescription>
                                                  <CardContent></CardContent>
                                                </Card>

                                                <Card className="w-full h-full bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75 ">
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
                        <div className="flex w-full gap-4 h-[50vh]">
                          <Card className="h-full w-[50%] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                                                <CardHeader></CardHeader>
                                                <CardDescription></CardDescription>
                                                <CardContent></CardContent>
                          </Card>

                          <Card className="h-full w-[50%] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                                                <CardHeader></CardHeader>
                                                <CardDescription></CardDescription>
                                                <CardContent></CardContent>
                          </Card>
                        </div>


                  </div>

              </div>

          </section>

          {/* section 5 - faq */} 
          <section className="w-[100vw] bg-gradient-to-b from-dprimary to-mprimary gap-3  px-8 flex flex-col md:flex-row place-items-center place-content-center h-[100vh] py-[10vh] ">

              <div className="h-[100vh] w-[100vw] justify-evenly flex place-items-center place-content-center flex-col text-center gap-2">
                  
                  <div className="flex flex-col w-[70%] place-items-center gap-7">

                      <h1 className="text-center text-4xl text-main-w">
                          Frequently Asked Questions
                        </h1>
                        <div className="flex w-full gap-4 h-[50vh]">
                          <Card className="h-full w-[100%] bg-gradient-to-b from-gray-100/20 via-transparent to-transparent backdrop-blur-lg bg-opacity-75">
                                                <CardHeader></CardHeader>
                                                <CardDescription></CardDescription>
                                                <CardContent></CardContent>
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
