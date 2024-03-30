import { getJobData } from "@/actions/databaseAc";
import EditJob from "./page";
import { Suspense } from "react";


export default async function EditSWithData() {
    const jobdata = await getJobData();

    if (!jobdata) {
        return  (
            <div className="w-screen h-screen flex flex-col gap-4 place-items-center place-content-center bg-gray-200">
                <span>We're sorry, but something went wrong. Please try refreshing the page in a few seconds..</span>
                <button className='bg-blue-500 px-4 py-2 rounded-lg text-white'>Try Again</button>
            </div>
        )
    }

    return (
        <>
            <EditJob jobdata={jobdata} />
        </>
    );
}