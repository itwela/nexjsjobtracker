import { getJobData } from "@/actions/databaseAc";
import EditJob from "./page";
import { Suspense } from "react";


export default async function EditSWithData() {
    const jobdata = await getJobData();

    return (
        <>
            <EditJob jobdata={jobdata} />
        </>
    );
}