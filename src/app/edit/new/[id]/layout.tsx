import { getJobData } from "@/actions/databaseAc";
import EditJob from "./page";
import { Suspense } from "react";


export default async function EditSWithData() {
    const jobdata = await getJobData();

    if (!jobdata) {
        return  (
            <div className="w-screen h-screen flex place-items-center place-content-center bg-gray-200">
                <span>We're sorry, but something went wrong. Please try refreshing the page</span>
            </div>
        )
    }

    return (
        <>
            <EditJob jobdata={jobdata} />
        </>
    );
}