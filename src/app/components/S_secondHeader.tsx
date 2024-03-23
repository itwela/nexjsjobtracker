import { get } from "http";
import Secondheader from "./secondHeader";
import { getUserData } from "@/actions/databaseAc";
import {  auth } from '@clerk/nextjs';


export default async function SecondHeaderS() {
    


    const {userId} = await auth();
    const userdata = await getUserData()    

    return (
        <>
        <Secondheader userdata={userdata} userauth={userId}/>
        </>
    )
}

async function fetchData() {
    const userId = await auth();
    const userdata = await getUserData();

    return { userId, userdata };
}