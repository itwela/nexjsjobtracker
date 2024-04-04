'use server';

import prisma from "@/app/libs/db";
import { auth, currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { stripe } from "@/app/libs/stripe";
import formidable from 'formidable';


let theId = ''



async function getTheUser() {
  const theUser = await currentUser();
  const theUserId = theUser?.id;
  if (theUserId) {
    theId = theUserId;
  } else {
    throw new Error("User ID is undefined");
    // or provide a default value: theId = "defaultUserId";
  }
}
//  this gets userId
export async function getUserData() {
  noStore();
  await getTheUser();
  const data = prisma.user.findUnique({
    where: {
      id: theId
    },
  });
  
  return data;
}

// this gets all job data from a user
export async function getJobWithCl() {
  noStore();
  await getTheUser();
  const data = await prisma.job.findMany({
    where: {
      userId: theId
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

// this gets all job data with cover letter from a user
export async function getJobDataWithCl() {
  noStore();
  await getTheUser();
  const data = await prisma.job.findMany({
    where: {
      userId: theId as string
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

export async function getJobData() {
  noStore();
  await getTheUser();
  const user = await currentUser()
  const data = await prisma.job.findMany({
    where: {
      userId: theId as string
  },
  orderBy: {
      DateApplied: 'desc'
  },
});
  
  return data;
}



// this gets a unique job for a user
export async function getUniqueJobData(id: any) {
  noStore();
  await getTheUser();
  const data = prisma.job.findUnique({
    where: {
      id: theId
    },
  });
  
  return data;
}

  // this get subscription data from user
export async function getSubscriptionData() {
  noStore(); 
  await getTheUser();
  const data = await prisma.subscription.findUnique({
      where: {
        userId: theId
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
export async function getCoverLetterData() {
  noStore(); 
  await getTheUser();
  const data = prisma.coverLetter.findMany({
    where: {
      userId: theId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return data;
}

// this get cover letter data from user
export async function getClByJobId(jobId: string) {
  noStore(); 
  await getTheUser();
  const data = prisma.job.findUnique({
    where: {
      userId: theId,
      id: jobId
    },
  });
  
  return data;
}

  // this get introduction data from user
export async function getIntroductionData() {
  noStore(); 
  await getTheUser();
  const data = prisma.introduction.findMany({
    where: {
      userId: theId
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
  
    const user = await currentUser()
    const data = await getJobData()
    const sub = await getSubscriptionData()
    
    if(!user) {
      throw new Error("Not Authorized")
    }
  
      
    const formJobTitle = formData.get('JobTitle') as string;
    const formCompany = formData.get('Company') as string;
    const formDateApplied = formData.get('DateApplied') as string;
    const formStatus = formData.get('status') as string;
    let formLink = formData.get('Link') as string;
    const formReferral = formData.get('referral') as string;
    const formKeywords = formData.get('Keywords') as string;    //   const formCompany = requestBody.Company as string
    const resumeFile = formData.get('ResumeUsed') as File;
    const formReferralName = formData.get('ReferralName') as string;    //   const formCompany = requestBody.Company as string
    const formReferralContact = formData.get('ReferralContact') as string;    //   const formCompany = requestBody.Company as string
    const resumeFileName = resumeFile.name;        //   const formattedDate = requestBody.DateApplied as string
    formLink = formLink.replace(/^https:\/\//i, '');

    if(
          sub?.status === 'active' 
          || data.length < 3
          || user?.firstName === 'Itwela'
          ) {  
        const apiAdd = await prisma?.job.create({
            data: {
                  User: {
                    connect: { id: user?.id }
                },                JobTitle: formJobTitle,
                Company: formCompany,
                DateApplied: formDateApplied,
                Status: formStatus,
                Link: formLink,
                ResumeUsed: resumeFileName,
                Keywords: formKeywords,    
            }
            
          })

          revalidatePath("/")
        }


        if(data.length > 2 && sub?.status != 'active') {  
          revalidatePath("/")
        }
        

        revalidatePath("/")
        
      
          
}

export async function updateJobData(formData: FormData) {
  noStore();

  const formJobId = formData.get('jobId') as string;
  const formJobTitle = formData.get('JobTitle') as string;
  const formCompany = formData.get('Company') as string;
  const formDateApplied = formData.get('DateApplied') as string;
  const formStatus = formData.get('status') as string;
  let formLink = formData.get('Link') as string;
  const formReferral = formData.get('referral') as string;
  const formKeywords = formData.get('Keywords') as string;    //   const formCompany = requestBody.Company as string
  const resumeFile = formData.get('ResumeUsed') as File;
  const formReferralName = formData.get('ReferralName') as string;    //   const formCompany = requestBody.Company as string
  const formReferralContact = formData.get('ReferralContact') as string;    //   const formCompany = requestBody.Company as string
  const resumeFileName = resumeFile.name;        //   const formattedDate = requestBody.DateApplied as string
  formLink = formLink.replace(/^https:\/\//i, '');
  console.log('the date applied:', formDateApplied)

  let taskData: any = {
    // userId: theId,
      User: {
        connect: { id: theId }
    },                
    JobTitle: formJobTitle,
    Company: formCompany,
    DateApplied: formDateApplied,
    Status: formStatus,
    Link: formLink,
    Keywords: formKeywords,    

  };

  console.log('the resume file:', resumeFile)

  if (resumeFile.size > 0) {
    taskData.ResumeUsed = resumeFileName;
  }


  const apiAdd = await prisma?.job.update({

    where: {
        id: formJobId,
    },
    data: taskData
})

    revalidatePath("/")
}

export async function toggleInterviewStatus(formData: FormData) {
  noStore();

  try {  
    const formJobId = formData.get('jobId') as string;
    const formInterviewStatus = formData.get('interviewStatus') as string;
    let taskData: any = {
      userId: theId,
    };
  
    if (formInterviewStatus === 'yes') {
      taskData.Interviewed = true;
    } else {
      taskData.Interviewed = false;
    }
  
    const apiAdd = await prisma?.job.update({
  
      where: {
          id: formJobId,
      },
      data: taskData
  })
  
    revalidatePath("/")
  } catch (error) {
    revalidatePath("/")
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
  console.log("the cover letter id:",jobId)
  await prisma.coverLetter.deleteMany({
    where: {
      id: jobId,
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

export async function getUsername() {
  noStore();
  await getTheUser();
  const data = await prisma.user.findUnique({
    where: {
      id: theId
    },
    select: {
      username: true,
    },
  })
  return data;
}




  

