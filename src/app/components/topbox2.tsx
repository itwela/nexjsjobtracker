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
            <div className="flex text-[0.8em]  z-10 justify-around place-content-center  place-items-center bg-mprimary rounded-[0.5em] py-2 m-4 relative gap-2 w-full h-[5vh]">
                <span className='flex gap-1'>
                    <h2 className="text-main-w flex  text-center ">{weekday},</h2>
                    <h2 className="text-main-w flex  text-center ">{datemonth}</h2>
                    <h2 className="text-main-w flex  text-center ">{dayday}</h2>
                </span>
                <h2 className="text-main-w flex  text-center ">{time}</h2>
                {/* <h2 className="text-main-w flex  text-center ">{time}</h2> */}
            </div>

        </>
    )
}