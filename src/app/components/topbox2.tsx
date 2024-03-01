'use client'

import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';

const datenumber = DateTime.local().day //=> 25
    const datemonth = DateTime.local().monthShort //=> 25
    const dayday = DateTime.local().day //=> 25
    const dateyear = DateTime.local().year //=> 25
    const weekday = DateTime.local().weekdayShort //=> 25
    const hour = DateTime.local().hour //=> 25
    const minute = DateTime.local().minute //=> 25
export default function TopboxTwo() {
    const [time, setTime] = useState('');
    
    useMemo(() => {
      const timeout = setTimeout(() => {
        const { hour, minute } = DateTime.local();
        const goodTime = DateTime.fromObject({ hour, minute }).toLocaleString(DateTime.TIME_SIMPLE);
        setTime(goodTime);
      }, 63000); // 1 minute and 3 seconds in milliseconds
    
      return () => clearTimeout(timeout); // Cleanup timeout on component unmount
    }, []); // Empty dependency array ensures the effect runs only once
    
    return(
        <> 
            <div className="flex   z-10 justify-around place-content-center  place-items-center bg-mprimary rounded-[0.5em] py-2 m-4 relative gap-2 w-[80%] h-[5vh]">
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