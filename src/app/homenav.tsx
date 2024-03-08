export default function NLoginHeader() {
    return (
        <>
            <div className="w-full text-[1em] px-[5vw] absolute z-[3] text-main-w flex place-items-center justify-between max-h-max py-[4.5vh]">
                <span>JobKompass</span>

                <span className="hidden sm:flex gap-2">
                    <button className="px-5 py-2 outline outline-1 rounded-lg">Sign in</button>
                    <button className="rounded-lg bg-main-w text-dprimary px-5 py-2">Sign up</button>
                </span>
            </div>
        </>
    )
}