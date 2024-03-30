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
  ResumeUsed: string | number | readonly string[] | undefined
  Status: string | null;
  Interviewed: boolean | undefined
  createdAt: Date;
  id: string;
  updatedAt: Date;
  userId: string;
}
  
export type JobDataProps = JobData[];

export interface JobsTableProps {
  jobdata: JobDataProps;
}
