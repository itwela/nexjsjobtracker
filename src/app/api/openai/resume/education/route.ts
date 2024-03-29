import { NextRequest } from "next/server";
import  OpenAI  from "openai";
import { resExperienceInst } from "@/app/prompts";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import prisma from '../../../../libs/db';
import { auth, currentUser } from "@clerk/nextjs";
import { getClByJobId, getCoverLetterData, getUniqueJobData, getUserData } from "@/actions/databaseAc";
import { getJobData } from "@/actions/databaseAc";
import { getSubscriptionData } from "@/actions/databaseAc";



  
export async function POST(request: any) {
    
    const openai = new OpenAI({
        apiKey: process.env.OPEN_AI_K,
    });

    const requestBody = await request.json();
    noStore();  
    auth();
    const user = await currentUser()
    const userdata = await getUserData()
    const jobdata = await getUniqueJobData(requestBody.theJobId)

    const thePrompt = `

    Hi, here is some information that will be helpful
    in crafting my resume education section. 

    Here is the job description. '${requestBody.theJobDesc}'
    Here is my previous resume. '${requestBody.theResu}'
    `

 

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `${resExperienceInst}` },
            { role: "user", content: `${thePrompt}` },
    ],
    })

    const theResponse = completion.choices[0].message.content;

    return Response.json({ text: `${theResponse}` })

};

