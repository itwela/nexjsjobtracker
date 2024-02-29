'use client'

import { DateTime } from 'luxon';
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner"


interface UserData {
    userdata: {
        id: string;
        username: string | undefined;
        firstName: string | undefined;
        lastName: string | undefined;
        email: string;
        stripeCustomerId: string | null;
    }
}

export default function Clock() {

    const [theUser, setTheUser] = useState<UserData>({ userdata: { id: "", username: "", email: '', stripeCustomerId: "", firstName: '', lastName: ''} });

    useEffect(() => {

        const getUserStuff = async () => {
            
            const hello = 'hi api';
            // console.log(endOfUrl)

            try {
                    const response = await fetch('/api/db/getuniquedata', {
                        method: 'POST',
                        next: {
                            revalidate: 5
                          },
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            input: hello
                        })
                    });
                
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                
                    const data = await response.json();
                    setTheUser(data); // Set the form data in state   
                    // console.log(data)


    
            
                    
                } catch (error) {
                    // Handle error
                }

                toast("Welcome to JobKompass!",{
                    description: "Good to see you today!",
                  })

                //   revalidatePath('/dashboard/[slug]', 'page')

                  
            }


        getUserStuff();




    }, [])

    const date = DateTime.now().toLocaleString(DateTime.DATE_MED);
    const datenumber = DateTime.local().day //=> 25
    const datemonth = DateTime.local().monthShort //=> 25
    const dateyear = DateTime.local().year //=> 25
    const weekday = DateTime.local().weekdayShort //=> 25
    const hour = DateTime.local().hour //=> 25
    const minute = DateTime.local().minute //=> 25
    const goodtime = DateTime.fromObject({ hour, minute }).toLocaleString(DateTime.TIME_SIMPLE)


    return (
        <>
            <div className="flex relative flex-col gap-2 w-[25%] h-[95%] py-6 justify-between">
                
                <div className="shadow rounded-[10em] h-[45%] flex place-items-center px-10">        
                    <div className="flex place-items-center place-content-center gap-3 w-[100%] text-center ">
                            <span className="">Greetings, </span>
                            
                            <h3 className='font-black text-2x;'>
                                {/* so basically this say if the usere didnt submit a first and last name to display their username instead so the app will always be personalized! */}
                                { theUser?.userdata.firstName ? theUser?.userdata.firstName : theUser?.userdata.username}.
                            </h3>
                    </div>        
                </div>

                {/* <div className="bg-lprimary shadow rounded-[10em] h-[45%] flex place-items-center px-2">
                    <div className="flex place-items-center justify-evenly w-[100%]">
                        <div className="w-[0.7em] h-[0.1em] bg-dprimary"></div>
                        <h2 className="text-dprimary font-bold text-4xl">{datenumber}</h2>
                        <div className="flex flex-col ">
                            <h2 className="text-main-w text-xl uppercase">{weekday}</h2>
                            <h2 className="text-main-w text-muted-foreground text-xl uppercase ">{datemonth}</h2>
                        </div>
                    </div>
                </div> */}

            </div>
        </>
    )
}
