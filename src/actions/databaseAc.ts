'use server';

import prisma from "@/app/libs/db";
import { auth, currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { stripe } from "@/app/libs/stripe";


//  this gets userId
export async function getUserData(userId: string) {
  noStore();
  const data = prisma.user.findUnique({
    where: {
      id: userId
    },
  });
  
  return data;
}

// this gets all job data from a user
export async function getJobWithCl(userId: string) {
  noStore();
  const data = await prisma.job.findMany({
    where: {
      userId: userId
  },
  select: {
      coverLetters: true // Include CoverLetter
  },
  orderBy: {
      createdAt: 'desc'
  },
});
  
  return data;
}

// this gets all job data from a user
export async function getJobData(userId: string) {
  noStore();
  const data = await prisma.job.findMany({
    where: {
      userId: userId
  },
  include: {
      coverLetters: true // Include CoverLetter
  },
  orderBy: {
      createdAt: 'desc'
  },
});
  
  return data;
}

// this gets a unique job for a user
export async function getUniqueJobData(userId: string) {
  noStore();
  const data = prisma.job.findUnique({
    where: {
      id: userId
    },
  });
  
  return data;
}

  // this get subscription data from user
export async function getSubscriptionData(userId: string) {
  noStore(); 
  const data = await prisma.subscription.findUnique({
      where: {
        userId: userId
      },
      select: {
        status: true,
        user: {
          select: {
            stripeCustomerId: true,
          }
        }
      }

    })
    return data;
}

  // this get cover letter data from user
export async function getCoverLetterData(userId: string) {
  noStore(); 
  const data = prisma.coverLetter.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return data;
}

// this get cover letter data from user
export async function getClByJobId(userId: string, jobId: string) {
  noStore(); 
  const data = prisma.job.findUnique({
    where: {
      userId: userId,
      id: jobId
    },
  });
  
  return data;
}

  // this get introduction data from user
export async function getIntroductionData(userId: string) {
  noStore(); 
  const data = prisma.introduction.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return data;
}


// this is the function to add jobs to the database based on user
export const addJob = async (formData: FormData) => {
    noStore();
    const requestBody = formData;
    console.log(requestBody)
  
    const user = await currentUser()
    const data = await getJobData(user?.id as string)
    const sub = await getSubscriptionData(user?.id as string)
    
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
  
          
        if(sub?.status === 'active') {  
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

        if(user?.firstName === 'Itwela') {  
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

        if(sub?.status != 'active' && data.length < 3) {  
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

        if(data.length > 2 && sub?.status != 'active') {  
          revalidatePath("/")
          console.log('please subscribe')
        }
        


        
      
          
}


//  this is the function to delete jobs
export const deleteJobData = async (formData: FormData) => {
  noStore();

  const jobId = formData.get('jobId') as string

  await prisma.coverLetter.deleteMany({
    where: {
      jobId: jobId,
    },
  });


  await prisma.job.delete({
    where: {
      id: jobId,
    },
  });

  revalidatePath('/dashbard')
  

}

//  this is the function to delete cover lettters
export const deleteCoverLetter = async (formData: FormData) => {
  noStore();

  const jobId = formData.get('jobId') as string

  await prisma.coverLetter.deleteMany({
    where: {
      jobId: jobId,
    },
  });

    revalidatePath('/dashbard')
  
}

//  this is the function to deleted jobs
export const deleteIntroduction = async (formData: FormData) => {
  noStore();

  const introid = formData.get('coverId') as string

  await prisma.introduction.deleteMany({
    where: {
      id: introid,
    },
  });

    revalidatePath('/dashbard')
  
}

export async function getFirstData({ 
  id, username, email, profileImg, firstName, lastName }: 
  { 
    id: string ; 
    username: string | null | undefined; 
    email: string, 
    firstName: string | null | undefined,
    lastName: string | null | undefined,
    profileImg: string | null | undefined,
  }) {
  try {

    // 1
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, stripeCustomerId: true }
    });

    // 2
    if (!user) {
      await prisma.user.create({ data: { id, email, firstName, lastName, profileImg, username,  } });
    }

    // 3
    if (!user?.stripeCustomerId) {
      const customer = await stripe.customers.create({ email });
      await prisma.user.update({ where: { id }, data: { stripeCustomerId: customer.id } });
    }

  } catch (error) {
    console.error('Error in getData action:', error);
    console.log('the email is:',email)
    throw error;
  }
}

export async function getUsername(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      username: true,
    },
  })
  return data;
}




  

