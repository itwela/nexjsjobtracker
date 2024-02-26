import { ReactNode } from 'react';




export default async function CoverLetterdLayout({ children}: { children: ReactNode }) {
    

    return (
        <>
            <div className="flex">
                <div className="flex">
                    <main>{children}</main>
                </div>
            </div>
        </>
    )
}