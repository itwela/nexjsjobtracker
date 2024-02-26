'use server'

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import prisma from "../../../libs/db";


const deleteJobData = async (jobId: string) => {
    noStore();
   
    await prisma.job.delete({
      where: {
        id: jobId
      },
    });
  
  }
  


export async function POST(request: any) {
    const requestBody = await request.json();
    noStore();  
    const jobdata = await deleteJobData(requestBody.input as string)

    
    return Response.json( jobdata )
    
  }
