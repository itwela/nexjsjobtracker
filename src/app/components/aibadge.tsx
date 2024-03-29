'use client'

import { WiStars } from "react-icons/wi";

export default function AiBadge() {

    return (
        <>
            <span className='select-none opacity-[0.7] w-max px-1 text-[0.8em] flex font-bold text-blue-700 outline outline-[1px] outline-blue-700 bg-blue-300 rounded-full'>
                Ai <WiStars/>
            </span>
        </>
    )
}