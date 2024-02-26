'use server';

import prisma from "@/app/libs/db";
import { auth, currentUser } from "@clerk/nextjs";
import { format } from "date-fns"
import { toast } from "sonner"
import { z } from "zod";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getData(userId: string) {
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

export const addJob = async (formData: FormData) => {
    noStore();
    const requestBody = formData;
    console.log(requestBody)
  
    const user = await currentUser()
    const data = await getData(user?.id as string)
    
    
    if(!user) {
      throw new Error("Not Authorized")
    }
  
      
    const formJobTitle = formData.get('JobTitle') as string;
    const formCompany = formData.get('Company') as string;
    const formDateApplied = formData.get('DateApplied') as string;
    const formStatus = formData.get('status') as string;
    const formLink = formData.get('Link') as string;
    const formReferral = formData.get('referral') as string;
    const formKeywords = formData.get('Keywords') as string;    //   const formCompany = requestBody.Company as string
    const resumeFile = formData.get('ResumeUsed') as File;
    const formReferralName = formData.get('ReferralName') as string;    //   const formCompany = requestBody.Company as string
    const formReferralContact = formData.get('ReferralContact') as string;    //   const formCompany = requestBody.Company as string
    const resumeFileName = resumeFile.name;        //   const formattedDate = requestBody.DateApplied as string
        //   const formStatus = requestBody.Status as string
        //   const formLink = requestBody.Link as string
        //   const formReferral = requestBody.Referral as string
        //   const formReferralName = requestBody.ReferralName as string
        //   const formReferralContact = requestBody.ReferralContact as string
        //   const formKeywords = requestBody.Keywords as string
        //   const uniiId = requestBody.id
  
          console.log('yooooooooooo',resumeFileName)
          
              
          const apiAdd = await prisma?.job.create({
            data: {
                userId: user?.id,
                JobTitle: formJobTitle,
                Company: formCompany,
                DateApplied: formDateApplied,
                Status: formStatus,
                Link: formLink,
                Referral: formReferral,
                ReferralName: formReferralName,
                ReferralContact: formReferralContact,
                ResumeUsed: resumeFileName,
                Keywords: formKeywords,    
            }
            
        })

        revalidatePath("/")
          
        
      
          
      }

export const deleteJobData = async (formData: FormData) => {
  noStore();

  const jobId = formData.get('jobId') as string

  await prisma.job.delete({
    where: {
      id: jobId
    },
  });

  revalidatePath('/dashbard')
}
  

