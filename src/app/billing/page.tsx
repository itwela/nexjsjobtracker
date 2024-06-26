import { auth, currentUser } from "@clerk/nextjs";
import { Header } from "../components/header"; 
import SecondHeader  from "../components/secondHeader";
import prisma from "@/app/libs/db";
import { getStripeSession, stripe } from "@/app/libs/stripe";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { unstable_noStore as noStore } from "next/cache";
import { FaRegCheckCircle } from "react-icons/fa";



async function getData(userId: string) {
  noStore(); 
  const data = await prisma.subscription.findUnique({
      where: {
        userId: userId
      },
      select: {
        status: true,
        user: {
          select: {
            stripeCustomerId: true,
          }
        }
      }

    })
    return data;
}

export default async function Billing() {
  noStore(); 
  auth();
  const user = await currentUser()
  const data = await getData(user?.id as string)

  async function createSubscription() {
    'use server';

const dbUser = await prisma.user.findUnique({
  where: {
    id: user?.id
  },
  select: {
    stripeCustomerId: true
  }
})
 
    if (!dbUser?.stripeCustomerId){
      throw new Error('Cant get customer id')
    }

    const subscriptionUrl = await getStripeSession({
      customerId: dbUser.stripeCustomerId,
      domainUrl: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL as string : 'http://localhost:3000',
      priceId: process.env.STRIPE_P_ID as string,
    })

    return redirect(subscriptionUrl)
  }

  async function createCustomerPortal() {
    'use server'
    const session = await stripe.billingPortal.sessions.create({
      customer: data?.user.stripeCustomerId as string,
      return_url: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL as string : 'http://localhost:3000/dashboard'
    })
    return redirect(session.url)
  }

  if(data?.status === 'active') {
    return(
      <>


      <div className="flex py-[4em] bg-gray-200 min-h-screen flex-col place-items-center w-full pb-5  justify-start">
        <div className="grid grid-cols-1 grid-rows-2 gap-4  w-[80%] h-[65vh] ">
          <div className="flex">

            <div className="w-full py-5">
              <h1 className="text-4xl  font-bold">Subscription</h1>
              <h1 className="">Settings regarding your subscription</h1>
            </div>
          </div>

          <Card className="w-[100%] place-self-start bg-white">
            <CardHeader>
              <CardTitle className="text-2xl">Manage Billing</CardTitle>
              <CardDescription>
                <span className="flex flex-col gap-2">
                    <span >Here you can</span>
                  <span className="">Mange billing and payment information</span>
                  <span className="">Update billing and payment information</span>
                  <span className="">Cancel subscription</span>
                </span>
                </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={createCustomerPortal}>
                <Button className='text-white bg-gradient-to-r from-blue-600 to-blue-100 outline outline-[1px] outline-transparent hover:outline-main-w/80'>Launch portal</Button>
              </form>
            </CardContent>
            {/* <CardFooter>
              <p>Card Footer</p>
            </CardFooter> */}
          </Card>

        </div>
      </div>

    </>
    )
  }

  
  return (
      <>


        <div className="flex bg-gray-200 min-h-screen flex-col place-items-center w-full py-[4em] px-5 justify-start">
            <div className="w-[100%] ">
                <h1 className="text-4xl font-bold">Billing</h1>
                  <div className="flex flex-col w-[100%] place-items-center place-content-center h-[80vh]">

                  <Card className="w-[80%] border-transparent   bg-white ">
                        <CardHeader>
                          <CardTitle>Subscribe to JobKompass</CardTitle>
                          <CardDescription>Looking to upgrade?</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="p-3 rounded-lg  w-full h-full flex place-items-start flex-col">
                              
                              <div className="w-full pb-3 h-full flex-col flex place-items-center">
                                <span className="  flex gap-2 w-full justify-start"><FaRegCheckCircle/> Unlimited cover letters</span>
                                <span className="flex  gap-2 w-full  justify-start"><FaRegCheckCircle/> Unlimited generated introductions</span>
                                <span className="flex  gap-2 w-full  justify-start"><FaRegCheckCircle/> Track an unlimited amount of jobs</span>
                              </div> 

                              <form action={createSubscription}>
                                <Button className="text-white bg-gradient-to-r from-blue-600 to-blue-100 outline outline-[1px] outline-transparent hover:outline-main-w/80"> Create Subscription</Button>
                              </form>
                            </div>

                        </CardContent>
       
                      </Card>


                  </div>
              </div>
        </div>
      </>
    );

}

