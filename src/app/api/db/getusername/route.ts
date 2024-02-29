import { getCoverLetterData, getIntroductionData, getJobData, getSubscriptionData, getUsername } from "@/actions/databaseAc";
import { auth, currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";


export async function POST(request: any){
    noStore();
    auth();
    const user = await currentUser()
    const data = await getUsername(user?.id as string)
    const subscriptiondata = await getSubscriptionData(user?.id as string)
    const introdata = await getIntroductionData(user?.id as string)
    const coverletterdata = await getCoverLetterData(user?.id as string)
    const jobdata = await getJobData(user?.id as string)
  
    console.log({
      'This is cover letter data' : coverletterdata,
       'This is intro  data' : introdata, 
       'This is subscription data' : subscriptiondata, 
      })

    return Response.json(
      { user, jobdata,data, subscriptiondata,  introdata, coverletterdata,})
  }