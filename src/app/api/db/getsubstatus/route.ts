import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/libs/db";
import { auth, currentUser } from "@clerk/nextjs";


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

async function getSub(userId: string) {
    noStore();

    
  }

  export async function POST(request: any) {
    const requestBody = await request.json();
    noStore();  
    auth();
    const user = await currentUser()
    const subscription = await getData(user?.id as string)
    // const jobdata = await getJobData(user?.id as string)
   
    const sub = await prisma.user.findUnique({
        where: {
          id: user?.id
        },
        select: {
          stripeCustomerId: true
        }
      })
      
    if (!sub?.stripeCustomerId){
    throw new Error('Cant get customer id')
    }

    return Response.json({ sub })
  }

