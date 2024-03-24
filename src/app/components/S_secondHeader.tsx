import { get } from "http";
import Secondheader from "./secondHeader";
import { getJobData, getUserData } from "@/actions/databaseAc";
import {  auth } from '@clerk/nextjs';


export default async function SecondHeaderS() {
    


    const {userId} = await auth();
    const userdata = await getUserData()    
    const jobdata = await getJobData();

    return (
        <>
        <Secondheader userdata={userdata} jobdata={jobdata}  userauth={userId}/>
        </>
    )
}

async function fetchData() {
    const userId = await auth();
    const userdata = await getUserData();
    const jobdata = await getJobData();

    return { userId, userdata, jobdata };
}