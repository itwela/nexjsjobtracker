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

export default function Clock({userdata}: {userdata: any}) {

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
                    id: "success",
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
                
                <div className=" rounded-[10em] h-full flex place-items-center">        
                    <div className="flex text-3xl font-black sm:flex-row flex-col place-items-start place-content-start sm:gap-3 ">
                            <span className="">Greetings, </span>
                            
                            <h3 className=''>
                                {/* so basically this say if the usere didnt submit a first and last name to display their username instead so the app will always be personalized! */}
                                { userdata?.firstName ? userdata?.firstName : userdata?.username}.
                            </h3>
                    </div>        
                </div>

        </>
    )
}
