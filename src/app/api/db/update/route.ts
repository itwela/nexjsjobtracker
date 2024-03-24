// 'use server'

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/app/libs/db";
import { redirect } from "next/navigation";
import { getUniqueJobData } from "@/actions/databaseAc";
import { getUserData } from "@/actions/databaseAc";



export async function POST(request: any) {

const requestBody = await request.json();
// console.log(requestBody)
noStore();  
const user = await currentUser()
const jobId = requestBody.jobId


async function postUserData() {
            
    if(!user) {
    throw new Error("Not Authorized")
    }

    const formJobTitle = requestBody.input.text.JobTitle as string
    const formCompany = requestBody.input.text.Company as string
    const formattedDate = requestBody.input.text.DateApplied as string
    const formStatus = requestBody.input.text.Status as string
    const formLink = requestBody.input.text.Link as string
    const formReferral = requestBody.input.text.Referral as string
    const formReferralName = requestBody.input.text.ReferralName as string
    const formReferralContact = requestBody.input.text.ReferralContact as string
    const formKeywords = requestBody.input.text.Keywords as string
    const resumeFileName = requestBody.input.text.ResumeUsed.split('\\').pop() as string;
    

    const apiAdd = await prisma?.job.update({
        where: {
            id: jobId,
            userId: user?.id
        },
        data: {
        JobTitle: formJobTitle,
        Company: formCompany,
        DateApplied: formattedDate,
        Status: formStatus,
        Link: formLink,
        Referral: formReferral,
        ReferralName: formReferralName,
        ReferralContact: formReferralContact,
        ResumeUsed: resumeFileName,
        Keywords: formKeywords,    
        }
    })

    revalidatePath('/')

    
}

postUserData();

revalidatePath('/')

return Response.json({ text: `success` })

};





  
  
