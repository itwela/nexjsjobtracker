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
          
          {/* section 1 */}
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

          {/* section 2 */}
          <section className="w-[100vw] bg-dprimary gap-3  px-8 flex flex-col md:flex-row place-items-center place-content-center h-[100vh] ">

              <div className="h-[100vh] py-[10vh] w-[100vw] justify-start flex place-items-center place-content-center flex-col text-center gap-2">
                  
                  <div className="flex flex-col gap-5 place-items-center">

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

                  <h1 className="w-[70%] text-5xl bg-gradient-to-r from-main-w to-lprimary bg-clip-text text-transparent">
                      Save every application in one place
                  </h1>

                  <Card>
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

          </section>

          {/* section 3 */}
          <section className="w-[100vw] bg-dprimary gap-3  px-8 flex flex-col md:flex-row place-items-center place-content-center h-[100vh] ">

              <div className="h-[100vh] w-[100vw] justify-evenly flex place-items-center place-content-center flex-col text-center gap-2">
                  
                  <div className="flex flex-col gap-5 place-items-center">

                      <h1 className="text-5xl bg-gradient-to-r from-main-w to-lprimary bg-clip-text text-transparent">
                        Made <em className="hover:text-main-w">by</em> Job Seekers, <br />
                        <em className="hover:text-main-w">For</em> Job Seekers
                      </h1>

                      {/* button group */}
                      <div className="w-[70%] flex gap-4">

                          <span className="bg-gradient-to-b from-blue-900 to-blue-400 outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-1 place-items-center">
                              <span>
                                <BsStars/>
                              </span>
                              <span>
                                Cover Letters
                              </span>
                          </span>

                          <span className="bg-gradient-to-b from-blue-900 to-blue-400 outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-1 place-items-center">
                              <span>
                                <BsStars/>
                              </span>
                              <span>
                                Follow-up Messages
                              </span>
                          </span>

                          <span className="bg-gradient-to-b from-blue-900 to-blue-400 outline outline-[1px] hover:outline-[3px] ease-in outline-main-w/40 px-4 rounded-full p-2 select-none flex gap-1 place-items-center">
                              <span>
                                <BsStars/>
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

                  <h1 className="w-[70%] text-5xl bg-gradient-to-r from-main-w to-lprimary bg-clip-text text-transparent">
                      Save every application in one place
                  </h1>

                  <Card>
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

          </section>

      </div>
    </div>
    </>
  );
}
