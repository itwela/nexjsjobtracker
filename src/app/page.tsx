import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Header } from "./components/header";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default async function Home() {

  const {sessionId} = auth()
  const user = currentUser()

  if(await sessionId) {

    return redirect('/dashboard')

  }



  return (
    <>
    <div className="flex text-main-w bg-mprimary w-[100vw] place-content-center">
      <div className="flex min-h-screen flex-col place-items-center w-[90vw]">
          <Header/>
          
          <div className="w-[100vw] gap-3 max-w-7xl px-8 flex flex-col md:flex-row place-items-center place-content-center h-[90vh] ">
                
                <div className="md:w-[50vw] md:h-[100vh]w-[100vw] h-[50vh] place-items-center place-content-center flex flex-col text-center gap-2">
                  <h1 className="text-7xl">
                    JobKompass
                  </h1>
                  <h2 className="text-main-w/50 text-2xl">
                    Optimize youre job search today
                  </h2>
                  <Link
                  href='/sign-up'>
                  <button className="mt-4 text-dprimary bg-main-w outline p-3 outline-[1px] rounded-lg outline-main-w hover:text-dprimary/60">
                    Get Started
                  </button>
                  </Link>
                </div>

                <div className="md:w-[50vw] md:h-[100vh] h-[50vh]  w-[100vw] flex place-items-center place-content-center flex-col text-center gap-2">
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

          </div>
      </div>
    </div>
    </>
  );
}
