import { NextRequest } from "next/server";
import  OpenAI  from "openai";
import { introInst } from "@/app/prompts";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import prisma from '../../../libs/db';
import { auth, currentUser } from "@clerk/nextjs";
import { getIntroductionData, getSubscriptionData, getUserData } from "@/actions/databaseAc";
import { getJobData } from "@/actions/databaseAc";



export async function POST(request: any) {
  noStore();  
  auth();
  const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_K,
  });
    const user = await currentUser()
    const userdata = await getUserData(user?.id as string)
    const jobdata = await getJobData(user?.id as string)
    const sub = await getSubscriptionData(user?.id as string)
    const introduction = await getIntroductionData(user?.id as string)

    const firstName = userdata?.firstName;
    const lastName = userdata?.lastName;
    const myname = `${firstName} ${lastName}`
    const jobtitle = jobdata?.[0].JobTitle;
    const companyname = jobdata?.[0].Company;
    const keywords = jobdata?.[0].Keywords;    
    const requestBody = await request.json();

    const thePrompt = `

    Hi, here is some information that will be helpful
    in crafting my introduction. 

    My name is '${myname}'.
    The job I applied to is '${jobtitle}'.
    The name of the company is '${companyname}'.
    The keywords as far as my experience goes is
    '${keywords}'.

    If you dont have any keywords, please just use
    afew things that would sound good based on the job title.

    '${requestBody.input}'

    `

    if(sub?.status === 'active') {  

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: `${introInst}` },
                { role: "user", content: `${thePrompt}` },
        ],
        })

        const theResponse = completion.choices[0].message.content;

        const apiAdd = await prisma?.introduction.create({
            data: {
                userId: user?.id,
                text: theResponse as string,
            }
            
          })

        return Response.json({ text: `${theResponse}` })
    }

    if(sub?.status != 'active' && introduction.length < 3) {  

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: `${introInst}` },
                { role: "user", content: `${thePrompt}` },
        ],
        })

        const theResponse = completion.choices[0].message.content;

        const apiAdd = await prisma?.introduction.create({
            data: {
                userId: user?.id,
                text: theResponse as string,
            }
            
          })

        return Response.json({ text: `${theResponse}` })

    }

    if(introduction.length > 2 && sub?.status != 'active') {  
        revalidatePath("/")
        console.log('please subscribe')
        return Response.json({ text: `Please Subscribe.` })
    }

    // If none of the conditions are met, return an empty response
    return Response.json({ text: '' });

};

