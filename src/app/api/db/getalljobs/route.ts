'use server'

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/app/libs/db";
import { getUserData } from "@/actions/databaseAc";
import { getJobData } from "@/actions/databaseAc";



export async function POST(request: any) {
    const requestBody = await request.json();
    noStore();  
    auth();
    const user = await currentUser()
    const userdata = await getUserData()
    const jobdata = await getJobData()
    
    return Response.json({jobdata })
  }
  






  
  
