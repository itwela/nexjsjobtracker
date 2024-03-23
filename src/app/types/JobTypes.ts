export interface JobData {
    Company: string;
    coverLetters?: Array<{
      id: string;
      text: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      jobId: string;
    }>;
    DateApplied: string | null;
    JobTitle: string;
    Keywords: string | null;
    Link: string;
    Referral: string;
    ReferralContact: string | null;
    ReferralName: string | null;
    ResumeUsed: string | number | readonly string[] | undefined
    Status: string | null;
    createdAt: Date;
    id: string;
    updatedAt: Date;
    userId: string;
  }
  
  export type JobDataProps = {
    jobdata: JobData[];
  }