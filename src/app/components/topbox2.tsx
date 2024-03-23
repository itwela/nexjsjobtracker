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
            <div className="flex md:flex-row flex-col place-content-end place-items-center  text-[0.8em]  z-10  relative md:gap-2  h-full">
                <span className='flex place-content-end place-items-center gap-1 pt-3 md:pt-0'>
                    <h2 className=" flex  text-center ">{weekday},</h2>
                    <h2 className=" flex  text-center ">{datemonth}</h2>
                    <h2 className=" flex  text-center ">{dayday}</h2>
                </span>
                <h2 className=" flex pb-3 md:pb-0  text-center ">{time}</h2>
                {/* <h2 className="text-main-w flex  text-center ">{time}</h2> */}
            </div>

        </>
    )
}