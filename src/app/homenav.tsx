import Link from "next/link";
import fulllogo from '../app/assets/full-logo-black.png'
import fulllogoblue from '../app/assets/full-logo.png'

export default function NLoginHeader() {
    return (
        <>
            <div className="w-full text-[1em]  z-[3] flex place-items-center justify-between max-h-max ">
                {/* <span className="select-none">JobKompass</span> */}
                {/* <img src={fulllogo.src} className="h-[50px]" alt="" /> */}
                <img src={fulllogoblue.src} className="h-[35px]" alt="" />

                <span className="flex gap-2">
                    <Link href='/sign-in'>
                        <button className="px-5 py-2 outline outline-1 text-blue-500 outline-blue-500 rounded-lg hover:bg-blue-100 ">Sign in</button>
                    </Link>
                    <Link href='/sign-up'>
                        <button className="rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-200 px-5 py-2">Sign up</button>
                    </Link>
                    
                </span>
            </div>
        </>
    )
}