"use client"

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Plus } from "lucide-react"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import UserDropdown from "./UserDropDown";


export default function () {


    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div className="bg-neutral-100 w-full h-18 flex flex-row items-center justify-between px-8 py-2 border-b-[1px] border-neutral-200">

            <div className="text-xl  font-bold text-[#fc4f4c] hover:translate-x-2 transition-all ease-in inline-block">Storify</div>

            <div className="flex flex-row justify-between gap-6">
                <input className=" bg-neutral-100 border-[1px] border-neutral-700 px-3 py-1 placeholder:text-neutral-400 placeholder:text-xs rounded-full outline-none text-neutral-100 text-sm" type="text" placeholder="Search Author" />


                <UserDropdown image={session?.user.image!} email={session?.user.email!} />

            </div>

        </div>
    )
}


