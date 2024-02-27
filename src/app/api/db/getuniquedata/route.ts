'use server'

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/app/libs/db";
import { getUniqueJobData, getUserData } from "@/actions/databaseAc";




export async function POST(request: any) {
    const requestBody = await request.json();
    noStore();  
    auth();
    const user = await currentUser()
    const userdata = await getUserData(user?.id as string)
    const jobdata = await getUniqueJobData(requestBody.input as string)

    return Response.json({ userdata, jobdata })
  }







  
  
