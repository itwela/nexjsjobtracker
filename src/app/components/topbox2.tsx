import { DateTime } from 'luxon';
import { unstable_noStore as noStore } from "next/cache";

const hour = DateTime.local().hour //=> 25
const minute = DateTime.local().minute //=> 25
const goodtime = DateTime.fromObject({ hour, minute }).toLocaleString(DateTime.TIME_SIMPLE)


export default function TopboxTwo() {
    return(
        <> 
            <div className="flex bg-dprimary shadow relative flex-col gap-2 w-[25%] h-[95%] py-6 px-5 justify-between rounded-[0.5em]">
                <h2 className="text-main-w flex flex-col text-center text-2xl">{goodtime}</h2>
            </div>

        </>
    )
}