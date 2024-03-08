import { FaDiscord } from "react-icons/fa";

export default function Footer() {

    const getYear = new Date().getFullYear();

    return (
        <>
            <div className="w-[100vw] text-opacity-50 text-main-w gap-8 h-[20vh] bg-dprimary outline px-3 outline-main-w/20 outline-[1px] flex place-items-center place-content-center">
                <span><a href="https://discord.gg/YjQgUqdX" className="hover:text-main-w"><FaDiscord/></a></span>
                <span>© {getYear} JobKompass</span>
            </div>
        </>
    )
}