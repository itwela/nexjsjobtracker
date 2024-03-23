'use client'

import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

    const datemonth = DateTime.local().monthShort //=> 25
    const dayday = DateTime.local().day //=> 25
    const weekday = DateTime.local().weekdayShort //=> 25

    export default function TopboxTwo() {
    const [time, setTime] = useState('');
        
    useEffect(() => {
        const intervalId = setInterval(() => {
            const { hour, minute, second } = DateTime.local();
            const goodTime = DateTime.fromObject({ hour, minute, second }).toLocaleString(DateTime.TIME_SIMPLE);
            setTime(goodTime);
            }, 1000)
    
        return () => clearInterval(intervalId);
      }, [])

    return(
        <> 
            <div className="flex sm:flex-row flex-col place-content-center  text-left   text-[0.8em]  z-10  relative gap-2  h-full">
                <span className='flex place-content-end place-items-center gap-1'>
                    <h2 className="   ">{weekday},</h2>
                    <h2 className="">{datemonth}</h2>
                    <h2 className=" ">{dayday}</h2>
                </span>
                <h2 className="text-left ">{time}</h2>
                {/* <h2 className="text-main-w flex  text-center ">{time}</h2> */}
            </div>

        </>
    )
}