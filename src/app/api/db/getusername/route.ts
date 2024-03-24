import { getCoverLetterData, getIntroductionData, getJobData, getSubscriptionData, getUsername } from "@/actions/databaseAc";
import { auth, currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";


export async function POST(request: any){
    noStore();
    auth();
    const user = await currentUser()
    const data = await getUsername()
    const subscriptiondata = await getSubscriptionData()
    const introdata = await getIntroductionData()
    const coverletterdata = await getCoverLetterData()
    const jobdata = await getJobData()
  

    return Response.json(
      { user, jobdata ,data, subscriptiondata,  introdata, coverletterdata,})
  }