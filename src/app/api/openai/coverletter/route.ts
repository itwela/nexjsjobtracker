import { NextRequest } from "next/server";
import  OpenAI  from "openai";
import { coverletterInst } from "@/app/prompts";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import prisma from '../../../libs/db';
import { auth, currentUser } from "@clerk/nextjs";


async function getUserData(userId: string) {
    noStore();
    const data = prisma.user.findMany({
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

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_K,
});

export async function POST(request: any) {
    

    const requestBody = await request.json();
    noStore();  
    auth();
    const user = await currentUser()
    const userdata = await getUserData(user?.id as string)
    const jobdata = await getJobData(user?.id as string)
    const myname = userdata?.[0].name;
    const thejobDate = jobdata?.[0].DateApplied;

    const thePrompt = `

    Hi, here is some information that will be helpful
    in crafting my cover letter. 

    My name is '${myname}'.
    Todays date is '${thejobDate}'

    please put the name and date im giving you at the top of the cover letter.
    No matter what make the first letter in the name capital.
    no matter what, make the date i give you in the speeled out format. 
    so if i give you 01/01/2024
    the date you will put is 
    January 1, 2024.
    I want the date at the top in this format.

    Here is the job description. '${requestBody.input}'

    `

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `${coverletterInst}` },
            { role: "user", content: `${thePrompt}` },
    ],
    })

    const theResponse = completion.choices[0].message.content;



    return Response.json({ text: `${theResponse}` })

};

