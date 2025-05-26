"use client"

import { useSession } from "next-auth/react";
import Image from "next/image";
import Button from "../buttons/Button";






export default function () {

    
    const { data: session } = useSession();
    console.log("Session is ", session?.user.token);

    return (
        <div className="bg-neutral-900 w-full h-18 flex flex-row items-center justify-between px-8 py-2">

            <div className="text-xl  font-bold text-purple-700  hover:translate-x-2 transition-all ease-in inline-block">Storify</div>

            <div className="flex flex-row justify-between gap-6">
                <input className=" bg-neutral-800 px-3 py-1 placeholder:text-neutral-400 placeholder:text-xs rounded-full outline-none text-neutral-100 text-sm" type="text" placeholder="Search Author" />

                <Button>Create Story</Button>

                {
                    session?.user?.image && (<Image className="rounded-full" src={session?.user?.image as string} alt="user" width={40} height={40} />)
                }

            </div>



        </div>
    )
}