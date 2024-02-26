'use server'

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/app/libs/db";

async function getUserData(userId: string) {
    noStore();
    const data = prisma.user.findUnique({
      where: {
        id: userId
      },
    });
    
    return data;
  }

async function getJobData(userId: string) {
    noStore();
    const data = prisma.job.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return data;
  }

export async function POST(request: any) {
    const requestBody = await request.json();
    noStore();  
    auth();
    const user = await currentUser()
    const userdata = await getUserData(user?.id as string)
    const jobdata = await getJobData(user?.id as string)

    return Response.json({ userdata, jobdata })
  }
  






  
  
