'use server'


import prisma from "../../../libs/db";
import { auth, currentUser } from "@clerk/nextjs";
import { format } from "date-fns"
import { toast } from "sonner";
import { z } from "zod";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { getJobData } from "@/actions/databaseAc";



// Define a submit handler.
export async function POST(request: any) {
  noStore();
  const requestBody = await request.json();
  console.log(requestBody)

  const user = await currentUser()
  const data = await getJobData()
  
  
  if(!user) {
    throw new Error("Not Authorized")
  }


     async function postUserData() {
            
        if(!user) {
        throw new Error("Not Authorized")
        }
    
        const formJobTitle = requestBody.input.jobdata.JobTitle as string
        const formCompany = requestBody.input.jobdata.Company as string
        const formattedDate = requestBody.input.jobdata.DateApplied as string
        const formStatus = requestBody.input.jobdata.Status as string
        const formLink = requestBody.input.jobdata.Link as string
        const formReferral = requestBody.input.jobdata.Referral as string
        const formReferralName = requestBody.input.jobdata.ReferralName as string
        const formReferralContact = requestBody.input.jobdata.ReferralContact as string
        const formKeywords = requestBody.input.jobdata.Keywords as string
        const resumeFileName = requestBody.input.jobdata.ResumeUsed.split('\\').pop() as string;
        const uniiId = requestBody.input.jobdata.id

        console.log('yooooooooooo',formJobTitle)
        
    
        const apiAdd = await prisma?.job.create({
            data: {
              userId: user?.id,
              JobTitle: formJobTitle,
              Company: formCompany,
              DateApplied: formattedDate,
              Status: formStatus,
              Link: formLink,
              ResumeUsed: resumeFileName,
              Keywords: formKeywords,    
            }

          })
    
    
        
    }

    postUserData();



    return Response.json({ text: `success` })
    
    
  }

