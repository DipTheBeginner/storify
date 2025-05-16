"use client"

import { useSession } from "next-auth/react";



export default async function AccountPage(){

    const {data:session,status}=useSession();


    return (
        <div>
            
        </div>
    )
}