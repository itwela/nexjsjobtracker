import Link from "next/link";


export default function NLoginHeader() {
    return (
        <>
            <div className="w-full text-[1em]  z-[3] flex place-items-center justify-between max-h-max ">
                <span>JobKompass</span>

                <span className="flex gap-2">
                    <Link href='/sign-in'>
                        <button className="px-5 py-2 outline outline-1 rounded-lg ">Sign in</button>
                    </Link>
                    <Link href='/sign-up'>
                        <button className="rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-200 px-5 py-2">Sign up</button>
                    </Link>
                    
                </span>
            </div>
        </>
    )
}